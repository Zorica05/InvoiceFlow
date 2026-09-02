import { useState } from 'react'
import Customers from './pages/Customers.jsx'
import Invoices from './pages/Invoices.jsx'
import InvoiceDetails from './pages/InvoiceDetails.jsx'
import './App.css'

function App() {
  const [page, setPage] = useState('dashboard')
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const customers = JSON.parse(
    localStorage.getItem('customers') || '[]'
  )

  const invoices = JSON.parse(
    localStorage.getItem('invoices') || '[]'
  )

  const paid = invoices
    .filter((invoice) => invoice.status === 'Paid')
    .reduce(
      (total, invoice) => total + Number(invoice.amount || 0),
      0
    )

  const outstanding = invoices
    .filter((invoice) => invoice.status !== 'Paid')
    .reduce(
      (total, invoice) => total + Number(invoice.amount || 0),
      0
    )

  function viewInvoice(invoice) {
    setSelectedInvoice(invoice)
    setPage('invoice-details')
  }

  function backToInvoices() {
    setSelectedInvoice(null)
    setPage('invoices')
  }

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

        <button className="logout">
          Logout
        </button>
      </aside>

      <main className="main">
        {page === 'dashboard' && (
          <>
            <header>
              <div>
                <h1>Dashboard</h1>
                <p>Welcome back to InvoiceFlow.</p>
              </div>

              <button
                className="primary"
                onClick={() => setPage('invoices')}
              >
                + New Invoice
              </button>
            </header>

            <section className="cards">
              <div className="card">
                <span>Total Invoices</span>
                <strong>{invoices.length}</strong>
              </div>

              <div className="card">
                <span>Customers</span>
                <strong>{customers.length}</strong>
              </div>

              <div className="card">
                <span>Paid</span>
                <strong>€{paid.toFixed(2)}</strong>
              </div>

              <div className="card">
                <span>Outstanding</span>
                <strong>€{outstanding.toFixed(2)}</strong>
              </div>
            </section>

            <section className="recent">
              <h2>Recent Invoices</h2>

              {invoices.length === 0 ? (
                <div className="empty">
                  <h3>No invoices yet</h3>
                  <p>
                    Create your first invoice to get started.
                  </p>
                </div>
              ) : (
                <div className="customer-list">
                  {invoices
                    .slice(-5)
                    .reverse()
                    .map((invoice) => (
                      <div
                        className="customer-card"
                        key={invoice.id}
                      >
                        <div>
                          <h3>{invoice.number}</h3>
                          <p>{invoice.customer}</p>
                        </div>

                        <div>
                          <strong>
                            €{Number(invoice.amount).toFixed(2)}
                          </strong>

                          <p>{invoice.status}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </section>
          </>
        )}

        {page === 'customers' && <Customers />}

        {page === 'invoices' && (
          <Invoices onView={viewInvoice} />
        )}

        {page === 'invoice-details' && (
          <InvoiceDetails
            invoice={selectedInvoice}
            onBack={backToInvoices}
          />
        )}
      </main>
    </div>
  )
}

export default App
