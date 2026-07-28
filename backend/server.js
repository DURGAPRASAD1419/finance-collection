import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { MongoClient } from "mongodb";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");

fs.mkdirSync(dataDir, { recursive: true });

// Use only the explicit MongoDB URI provided via `MONGODB_URI` in the environment.
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI is not set. Set it in .env and restart the server.");
  process.exit(1);
}

const client = new MongoClient(mongoUri);
let database = null;

async function getDatabase() {
  if (!database) {
    try {
      await client.connect();
    } catch (err) {
      console.error("Failed to connect to MongoDB using MONGODB_URI:", err.message || err);
      throw err;
    }

    try {
      const parsedUrl = new URL(mongoUri);
      const dbName = parsedUrl.pathname.replace(/^\//, "") || "";
      database = dbName ? client.db(dbName) : client.db();
    } catch (e) {
      // If parsing fails, fall back to default database selection by the driver
      database = client.db();
    }

    console.log("Connected to Mongo host:", (() => { try { return new URL(mongoUri).hostname } catch { return 'unknown' } })());
  }

  return database;
}

async function initializeDatabase() {
  const db = await getDatabase();
  await db.collection("borrowers").createIndex({ id: 1 }, { unique: true });
  await db.collection("loans").createIndex({ id: 1 }, { unique: true });
  await db.collection("loans").createIndex({ borrowerId: 1 });
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
    const db = await getDatabase();
    const borrowers = await db.collection("borrowers").find({}).sort({ name: 1 }).toArray();
    res.json(borrowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/borrowers", async (req, res) => {
  try {
    const borrower = req.body;
    const db = await getDatabase();
    const payload = {
      ...borrower,
      id: borrower.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    };
    await db.collection("borrowers").insertOne(payload);
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/borrowers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const borrower = req.body;
    const db = await getDatabase();
    await db.collection("borrowers").updateOne(
      { id },
      {
        $set: {
          name: borrower.name,
          fatherName: borrower.fatherName,
          mobile: borrower.mobile,
          mobile2: borrower.mobile2 || null,
          work: borrower.work,
          address: borrower.address,
        },
      },
    );
    res.json({ ...borrower, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/borrowers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDatabase();
    await db.collection("loans").deleteMany({ borrowerId: id });
    await db.collection("borrowers").deleteOne({ id });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/loans", async (req, res) => {
  try {
    const db = await getDatabase();
    const loans = await db.collection("loans").find({}).sort({ startDate: -1 }).toArray();
    const fullLoans = loans.map((loan) => ({
      ...loan,
      dues: (loan.dues || []).map(mapDueRow),
    }));
    res.json(fullLoans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/loans", async (req, res) => {
  try {
    const loan = req.body;
    const payload = {
      ...loan,
      id: loan.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      dues: Array.isArray(loan.dues) ? loan.dues.map((due) => ({ ...due, paid: !!due.paid })) : [],
    };
    const db = await getDatabase();
    await db.collection("loans").insertOne(payload);
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/loans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDatabase();
    await db.collection("loans").deleteOne({ id });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/pay", async (req, res) => {
  try {
    const { loanId, dueNo, paidDate, collectedBy } = req.body;
    const db = await getDatabase();
    await db.collection("loans").updateOne(
      { id: loanId, "dues.no": dueNo },
      {
        $set: {
          "dues.$.paid": true,
          "dues.$.paidDate": paidDate || null,
          "dues.$.collectedBy": collectedBy || null,
        },
      },
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

app.get("/api/database/export", async (req, res) => {
  try {
    res.json({
      message: "MongoDB export is handled by your cloud database tooling.",
      database: mongoUri,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/database/backup", async (req, res) => {
  try {
    res.json({
      message: "MongoDB backup is handled by your cloud database tooling.",
      database: mongoUri,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/database/import", async (req, res) => {
  try {
    res.status(501).json({
      error: "Importing into a cloud MongoDB database is not supported from this endpoint. Use your MongoDB client or cloud backup tools instead.",
    });
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
