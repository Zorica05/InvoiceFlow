# InvoiceFlow

InvoiceFlow is a full-stack web application for creating and managing customers and invoices.

The application is built with a React frontend and a Python FastAPI backend. It provides a simple and modern interface for managing customers, creating invoices, adding invoice items, and tracking invoice status.

## Features

* Dashboard with invoice statistics
* Customer management
* Create, edit, and delete customers
* Create, edit, and delete invoices
* Add multiple items to an invoice
* Quantity and price for each item
* Automatic total calculation
* Invoice statuses: Draft, Sent, and Paid
* Search invoices
* Filter invoices by status
* Invoice details page
* Print invoices
* Save invoices as PDF
* User authentication
* REST API
* Database integration
* Responsive user interface

## Technologies

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic

### Database

* SQLAlchemy ORM
* Relational database

## Project Structure

```text
InvoiceFlow/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Customers.jsx
│   │   │   ├── Invoices.jsx
│   │   │   └── InvoiceDetails.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── app/
│   ├── api/
│   │   ├── auth.py
│   │   ├── customers.py
│   │   └── dependencies.py
│   │
│   ├── core/
│   │   └── database.py
│   │
│   ├── models/
│   │   ├── customer.py
│   │   ├── user.py
│   │   ├── invoice.py
│   │   └── invoice_item.py
│   │
│   ├── schemas/
│   │   ├── customer.py
│   │   ├── invoice.py
│   │   └── invoice_item.py
│   │
│   ├── __init__.py
│   └── main.py
│
├── requirements.txt
└── README.md
```

## Getting Started

### Backend

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will run on:

`http://localhost:8000`

FastAPI documentation:

`http://localhost:8000/docs`

### Frontend

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite in your browser.

## Application Workflow

### Dashboard

The Dashboard provides an overview of the application, including:

* Total invoices
* Total customers
* Paid amount
* Outstanding amount
* Recent invoices

### Customers

Users can create, view, edit, and delete customers.

Each customer can contain:

* Name
* Email
* Company
* Phone

### Invoices

Users can create invoices for existing customers.

Each invoice can contain multiple items with:

* Description
* Quantity
* Price
* Total

The invoice total is calculated automatically.

## Backend API

The backend is built with Python and FastAPI.

It provides API functionality for:

* Authentication
* Customers
* Invoices
* Invoice items
* Database operations

The API can be tested through the FastAPI Swagger documentation at:

`http://localhost:8000/docs`

## Current Storage

The frontend currently uses browser localStorage for parts of the frontend workflow.

The project is structured so that the frontend can be connected to the FastAPI backend for persistent server-side data.

## Future Improvements

* Complete frontend and backend integration
* JWT authentication
* Full database persistence
* PDF invoice generation
* Email invoice delivery
* Invoice templates
* Payment tracking
* Better validation
* Production deployment

## Project Goal

The goal of InvoiceFlow is to provide a clean and professional invoicing system that makes customer and invoice management simple and efficient.

This project was developed as a practical full-stack application using React and Vite on the frontend and Python and FastAPI on the backend.

## Author

**Zorica**

Creator and developer of InvoiceFlow.

## Project Information

**Project:** InvoiceFlow
**Type:** Full-Stack Web Application
**Frontend:** React + Vite
**Backend:** Python + FastAPI
**ORM:** SQLAlchemy
**Year:** 2026

