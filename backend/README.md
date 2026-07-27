# LoanBook Backend

This backend serves the LoanBook frontend with a cloud MongoDB database.

## Environment variables

Set these before starting the server:

- `MONGODB_URI` or `MONGODB_URL` for a full connection string
- `DATABASE_URL` as an alternative connection string

## Default credentials

- username: `admin`
- password: `admin`

## Run

```bash
cd backend
npm install
npm start
```

## API

- `GET /api/borrowers`
- `POST /api/borrowers`
- `GET /api/loans`
- `POST /api/loans`
- `POST /api/pay`
- `POST /api/auth/login`
