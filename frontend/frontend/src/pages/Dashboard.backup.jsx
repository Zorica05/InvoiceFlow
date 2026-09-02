```jsx
import { useMemo } from 'react'

function Dashboard() {
  const customers = JSON.parse(
    localStorage.getItem('customers') || '[]'
  )

  const invoices = JSON.parse(
    localStorage.getItem('invoices') || '[]'
  )

  const paid = useMemo(() => {
    return invoices
      .filter((invoice) => invoice.status === 'Paid')
      .reduce(
        (total, invoice) =>
          total + Number(invoice.amount || 0),
        0
      )
  }, [invoices])

  const outstanding = useMemo(() => {
    return invoices
      .filter((invoice) => invoice.status !== 'Paid')
      .reduce(
        (total, invoice) =>
          total + Number(invoice.amount || 0),
        0
      )
  }, [invoices])

  const recentInvoices = [...invoices]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)

  return (
    <div>
      <header>
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back to InvoiceFlow.
          </p>
        </div>

        <button
          className="primary"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent('open-new-invoice')
            )
          }
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
          <strong>
            €{paid.toFixed(2)}
          </strong>
        </div>

        <div className="card">
          <span>Outstanding</span>
          <strong>
            €{outstanding.toFixed(2)}
          </strong>
        </div>
      </section>

      <section className="recent">
        <h2>Recent Invoices</h2>

        {recentInvoices.length === 0 ? (
          <div className="empty">
            <h3>No invoices yet</h3>

            <p>
              Create your first invoice to get started.
            </p>
          </div>
        ) : (
          <div className="customer-list">
            {recentInvoices.map((invoice) => (
              <div
                className="customer-card"
                key={invoice.id}
              >
                <div>
                  <h3>{invoice.number}</h3>

                  <p>{invoice.customer}</p>

                  <p className="invoice-amount">
                    €{Number(
                      invoice.amount || 0
                    ).toFixed(2)}
                  </p>

                  <span
                    className={`status-badge status-${invoice.status.toLowerCase()}`}
                  >
                    {invoice.status}
                  </span>
                </div>

                <div>
                  <p>
                    Due: {invoice.dueDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard
```
