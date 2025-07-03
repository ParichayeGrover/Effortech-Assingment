# User Management Web Application

A full-stack user management app built with FastAPI (Python) and React (TypeScript). It supports CRUD operations, Excel bulk upload, and download of a sample Excel template.

---

## Technologies Used

- Backend: Python, FastAPI, SQLAlchemy, Pydantic
- Frontend: React (Vite + TypeScript), Tailwind CSS
- Database: MySQL
- Excel Handling: openpyxl

---

## Setup Instructions

### Backend

1. Create `.env` file inside `/backend` based on `.env.example`:

   ```
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_DB=user_db
   ```
2. Create the database using `user_schema.sql` or run these commands in MySQL Workbench:

   ```sql
   CREATE DATABASE IF NOT EXISTS user_db;
   USE user_db;
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       first_name VARCHAR(50) NOT NULL,
       last_name VARCHAR(50) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       phone VARCHAR(10) NOT NULL,
       pan VARCHAR(10) NOT NULL UNIQUE
   );
   ```
3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```
4. Run backend:

   ```
   uvicorn main:app --reload
   ```

### Frontend

1. Go to `/frontend` and install dependencies:

   ```
   npm install
   ```
2. Start the frontend dev server:

   ```sh
   npm run dev
   ```

---

## How to Run Locally

- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- Sample Excel: http://localhost:8000/download-template

---

## Assumptions & Known Issues

- PAN and Email must be unique
- Phone must be exactly 10 digits
- PAN format: 5 uppercase letters, 4 digits, 1 uppercase letter
- Excel bulk upload is all-or-nothing (rows with errors block full insertion)
- Local MySQL server must be running

---

## Requirements

- Python 3.9+
- Node.js 16+
- MySQL

---

## Notes

- All sensitive files and dependencies are ignored in `.gitignore`.
- If you have issues, check your Python/Node version and ensure your database is running.
- For any missing environment variables, see `.env.example` in `/backend`.

---

## Author & Submission

- Please contact me if you have any questions or issues running the assingment.

---
