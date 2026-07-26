import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const dbFile = path.join(dataDir, "loanbook.db");

fs.mkdirSync(dataDir, { recursive: true });

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(dbFile);
const dbRun = promisify(db.run.bind(db));
const dbAll = promisify(db.all.bind(db));

async function ensureBorrowersTable() {
  const existingTables = await dbAll(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'borrowers'",
  );

  if (existingTables.length === 0) {
    await dbRun(`
      CREATE TABLE borrowers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        fatherName TEXT NOT NULL,
        mobile TEXT NOT NULL,
        mobile2 TEXT,
        work TEXT NOT NULL,
        address TEXT NOT NULL
      )
    `);
    return;
  }

  const columns = await dbAll("PRAGMA table_info(borrowers)");
  const hasLegacyColumns = columns.some((column) =>
    ["aadhar", "doorNo", "street", "post", "taluk"].includes(column.name),
  );

  if (!hasLegacyColumns) {
    return;
  }

  await dbRun("DROP TABLE IF EXISTS borrowers_legacy");
  await dbRun("ALTER TABLE borrowers RENAME TO borrowers_legacy");
  await dbRun(`
    CREATE TABLE borrowers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      fatherName TEXT NOT NULL,
      mobile TEXT NOT NULL,
      mobile2 TEXT,
      work TEXT NOT NULL,
      address TEXT NOT NULL
    )
  `);
  await dbRun(`
    INSERT INTO borrowers (id, name, fatherName, mobile, mobile2, work, address)
    SELECT
      id,
      name,
      fatherName,
      mobile,
      mobile2,
      work,
      COALESCE(address, TRIM(COALESCE(doorNo, '') || ' ' || COALESCE(street, '')), '')
    FROM borrowers_legacy
  `);
  await dbRun("DROP TABLE borrowers_legacy");
}

async function initializeDatabase() {
  await ensureBorrowersTable();

  await dbRun(`
    CREATE TABLE IF NOT EXISTS loans (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      borrowerId TEXT NOT NULL,
      frequency TEXT NOT NULL,
      amount REAL NOT NULL,
      interest REAL NOT NULL,
      installments INTEGER NOT NULL,
      perInstallment REAL NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      FOREIGN KEY(borrowerId) REFERENCES borrowers(id)
    )
  `);

  await dbRun(`
    CREATE TABLE IF NOT EXISTS dues (
      loanId TEXT NOT NULL,
      no INTEGER NOT NULL,
      date TEXT NOT NULL,
      amount REAL NOT NULL,
      paid INTEGER NOT NULL,
      paidDate TEXT,
      collectedBy TEXT,
      PRIMARY KEY (loanId, no),
      FOREIGN KEY(loanId) REFERENCES loans(id)
    )
  `);
}

function mapDueRow(row) {
  return {
    no: row.no,
    date: row.date,
    amount: row.amount,
    paid: !!row.paid,
    paidDate: row.paidDate || undefined,
    collectedBy: row.collectedBy || undefined,
  };
}

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/borrowers", async (req, res) => {
  try {
    const borrowers = await dbAll("SELECT * FROM borrowers ORDER BY name");
    res.json(borrowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/borrowers", async (req, res) => {
  try {
    const borrower = req.body;
    await dbRun(
      `INSERT INTO borrowers (id, name, fatherName, mobile, mobile2, work, address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      borrower.id,
      borrower.name,
      borrower.fatherName,
      borrower.mobile,
      borrower.mobile2 || null,
      borrower.work,
      borrower.address,
    );
    res.json(borrower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/borrowers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const borrower = req.body;
    await dbRun(
      `UPDATE borrowers SET name = ?, fatherName = ?, mobile = ?, mobile2 = ?, work = ?, address = ? WHERE id = ?`,
      borrower.name,
      borrower.fatherName,
      borrower.mobile,
      borrower.mobile2 || null,
      borrower.work,
      borrower.address,
      id,
    );
    res.json({ ...borrower, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/borrowers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await dbRun("DELETE FROM dues WHERE loanId IN (SELECT id FROM loans WHERE borrowerId = ?)", id);
    await dbRun("DELETE FROM loans WHERE borrowerId = ?", id);
    await dbRun("DELETE FROM borrowers WHERE id = ?", id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/loans", async (req, res) => {
  try {
    const loans = await dbAll("SELECT * FROM loans ORDER BY startDate DESC");
    const fullLoans = await Promise.all(
      loans.map(async (loan) => {
        const dues = await dbAll("SELECT * FROM dues WHERE loanId = ? ORDER BY no", loan.id);
        return { ...loan, dues: dues.map(mapDueRow) };
      }),
    );
    res.json(fullLoans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/loans", async (req, res) => {
  try {
    const loan = req.body;
    await dbRun(
      `INSERT INTO loans (id, code, borrowerId, frequency, amount, interest, installments, perInstallment, startDate, endDate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      loan.id,
      loan.code,
      loan.borrowerId,
      loan.frequency,
      loan.amount,
      loan.interest,
      loan.installments,
      loan.perInstallment,
      loan.startDate,
      loan.endDate,
    );

    const dues = Array.isArray(loan.dues) ? loan.dues : [];
    for (const due of dues) {
      await dbRun(
        `INSERT INTO dues (loanId, no, date, amount, paid, paidDate, collectedBy)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        loan.id,
        due.no,
        due.date,
        due.amount,
        due.paid ? 1 : 0,
        due.paidDate || null,
        due.collectedBy || null,
      );
    }

    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/loans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await dbRun("DELETE FROM dues WHERE loanId = ?", id);
    await dbRun("DELETE FROM loans WHERE id = ?", id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/pay", async (req, res) => {
  try {
    const { loanId, dueNo, paidDate, collectedBy } = req.body;
    await dbRun(
      `UPDATE dues SET paid = 1, paidDate = ?, collectedBy = ? WHERE loanId = ? AND no = ?`,
      paidDate || null,
      collectedBy || null,
      loanId,
      dueNo,
    );
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    return res.json({ token: "default-token", user: { username: "admin" } });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});

// Database backup/export endpoints
app.get("/api/database/export", (req, res) => {
  try {
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `loanbook-export-${timestamp}.db`;
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.sendFile(dbFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/database/backup", (req, res) => {
  try {
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `loanbook-backup-${timestamp}.db`;
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.sendFile(dbFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/database/import", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const importedFile = req.files.file;
    const backupPath = path.join(dataDir, `loanbook-backup-${Date.now()}.db`);
    
    // Create a backup of current database
    await new Promise((resolve, reject) => {
      fs.copyFile(dbFile, backupPath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Replace database with imported file
    await new Promise((resolve, reject) => {
      importedFile.mv(dbFile, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({ message: "Database imported successfully. Server will restart to apply changes." });
    
    // Restart the server after a short delay
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 4000;
initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend started on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });
