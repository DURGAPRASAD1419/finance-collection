import Database from "better-sqlite3";
import { Borrower, Due, Loan } from "./app-store";

const db = new Database("./data/loanbook.db", { verbose: console.log });

const createBorrowersTable = `
  CREATE TABLE IF NOT EXISTS borrowers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    fatherName TEXT NOT NULL,
    mobile TEXT NOT NULL,
    mobile2 TEXT,
    work TEXT NOT NULL,
    address TEXT NOT NULL
  )
`;

const createLoansTable = `
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
`;

const createDuesTable = `
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
`;

for (const stmt of [createBorrowersTable, createLoansTable, createDuesTable]) {
  db.prepare(stmt).run();
}

export function getBorrowers() {
  return db
    .prepare("SELECT * FROM borrowers ORDER BY name")
    .all() as Borrower[];
}

export function getLoans() {
  const loans = db.prepare("SELECT * FROM loans ORDER BY startDate DESC").all() as Loan[];
  return loans.map((loan) => {
    const dues = db
      .prepare("SELECT * FROM dues WHERE loanId = ? ORDER BY no")
      .all(loan.id)
      .map((due: any) => ({ ...due, paid: !!due.paid })) as Due[];
    return { ...loan, dues };
  });
}

export function addBorrower(borrower: Borrower) {
  db.prepare(
    `INSERT INTO borrowers (id, name, fatherName, mobile, mobile2, work, address)
     VALUES (@id, @name, @fatherName, @mobile, @mobile2, @work, @address)`,
  ).run(borrower);
  return borrower;
}

export function addLoan(loan: Loan) {
  db.prepare(
    `INSERT INTO loans (id, code, borrowerId, frequency, amount, interest, installments, perInstallment, startDate, endDate)
     VALUES (@id, @code, @borrowerId, @frequency, @amount, @interest, @installments, @perInstallment, @startDate, @endDate)`,
  ).run(loan);

  const insertDue = db.prepare(
    `INSERT INTO dues (loanId, no, date, amount, paid, paidDate, collectedBy)
     VALUES (@loanId, @no, @date, @amount, @paid, @paidDate, @collectedBy)`,
  );

  for (const due of loan.dues) {
    insertDue.run({
      loanId: loan.id,
      no: due.no,
      date: due.date,
      amount: due.amount,
      paid: due.paid ? 1 : 0,
      paidDate: due.paidDate ?? null,
      collectedBy: due.collectedBy ?? null,
    });
  }

  return loan;
}

export function payDue(loanId: string, dueNo: number, paidDate: string, collectedBy: string) {
  const update = db.prepare(
    `UPDATE dues SET paid = 1, paidDate = @paidDate, collectedBy = @collectedBy WHERE loanId = @loanId AND no = @no`,
  );
  update.run({ loanId, no: dueNo, paidDate, collectedBy });
}
