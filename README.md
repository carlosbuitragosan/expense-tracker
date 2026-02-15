# Expense Tracker

A full-stack expense tracking application built with React, Express, and PostgreSQL.  
The application allows users to register, log in, and manage daily expenses with persistent storage and authenticated API access.

This project demonstrates real-world CRUD operations, authentication handling, and client-server architecture.

---

## Features

- User authentication (register / login)
- Secure API routes with protected endpoints
- Create, read, update, and delete expenses
- Persistent PostgreSQL database storage
- Expense filtering by date
- Responsive React frontend
- RESTful API design
- Environment-based configuration

---

## Tech Stack

### Frontend

- React
- JavaScript
- Axios
- CSS

### Backend

- Node.js
- Express
- PostgreSQL
- JWT-based authentication
- Environment variables for configuration

### Deployment

- Frontend hosted on Vercel
- Backend hosted on Render
- Database hosted on Supabase (PostgreSQL)
- Automated deployment via GitHub Actions

---

## Architecture Overview

The application follows a client-server architecture:

- The React frontend communicates with an Express REST API.
- Express handles authentication, validation, and business logic.
- PostgreSQL stores user accounts and expense records.
- Protected routes ensure only authenticated users can access their data.

---

## Purpose

This project was built to:

- Practice building a production-style REST API
- Work with relational databases (PostgreSQL)
- Implement authentication and secure route handling
- Deploy a full-stack application across multiple services
- Maintain and iterate on a real-world application used for daily personal finance tracking

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/carlosbuitragosan/expense-tracker.git
cd expense-tracker
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

### 4. Configure environment variables

Create `.env` files in both the server and client directories and configure:

- Database connection string
- JWT secret
- API base URL

### 5. Start development servers

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm start
```

---

## Future Improvements

- Data visualisation and expense analytics
- Enhanced dashboard metrics
