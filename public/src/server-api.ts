import { json } from "@tanstack/react-start";
import { addBorrower, addLoan, getBorrowers, getLoans, payDue } from "./lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/g, "");

  if (path === "/api/borrowers") {
    return json(getBorrowers());
  }

  if (path === "/api/loans") {
    return json(getLoans());
  }

  return new Response(null, { status: 404 });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/g, "");
  const body = await request.json();

  if (path === "/api/borrowers") {
    return json(addBorrower(body));
  }

  if (path === "/api/loans") {
    return json(addLoan(body));
  }

  if (path === "/api/pay") {
    payDue(body.loanId, body.dueNo, body.paidDate, body.collectedBy);
    return new Response(null, { status: 204 });
  }

  return new Response(null, { status: 404 });
}
