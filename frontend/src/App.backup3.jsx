import { useState } from 'react'
import Customers from './pages/Customers.jsx'
import './App.css'

function App() {
  const [page, setPage] = useState('dashboard')

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>InvoiceFlow</h2>

        <nav>
          <button
            className={page === 'dashboard' ? 'active' : ''}
            onClick={() => setPage('dashboard')}
          >
            Dashboard
          </button>

          <button
            className={page === 'customers' ? 'active' : ''}
            onClick={() => setPage('customers')}
          >
            Customers
          </button>

          <button
            className={page === 'invoices' ? 'active' : ''}
            onClick={() => setPage('invoices')}
          >
            Invoices
          </button>
        </nav>

        <button className="logout">Logout</button>
      </aside>

      <main className="main">
        {page === 'dashboard' && (
          <>
            <header>
              <div>
                <h1>Dashboard</h1>
                <p>Welcome back to InvoiceFlow.</p>
              </div>

              <button className="primary">
                + New Invoice
              </button>
            </header>

            <section className="cards">
              <div className="card">
                <span>Total Invoices</span>
                <strong>0</strong>
              </div>

              <div className="card">
                <span>Customers</span>
                <strong>0</strong>
              </div>

              <div className="card">
                <span>Paid</span>
                <strong>€0.00</strong>
              </div>

              <div className="card">
                <span>Outstanding</span>
                <strong>€0.00</strong>
              </div>
            </section>

            <section className="recent">
              <h2>Recent Invoices</h2>

              <div className="empty">
                <h3>No invoices yet</h3>
                <p>Create your first invoice to get started.</p>
              </div>
            </section>
          </>
        )}

        {page === 'customers' && <Customers />}

        {page === 'invoices' && (
          <section className="recent">
            <h2>Invoices</h2>

            <div className="empty">
              <h3>No invoices yet</h3>
              <p>Invoice management will be added next.</p>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
