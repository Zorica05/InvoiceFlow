import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>InvoiceFlow</h2>

        <nav>
          <button className="active">Dashboard</button>
          <button>Customers</button>
          <button>Invoices</button>
        </nav>

        <button className="logout">Logout</button>
      </aside>

      <main className="main">
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
      </main>
    </div>
  )
}

export default App
