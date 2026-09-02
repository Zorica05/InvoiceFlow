import { useState } from 'react'

function Invoices() {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('invoices')
    return saved ? JSON.parse(saved) : []
  })

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [number, setNumber] = useState('')
  const [customer, setCustomer] = useState('')
  const [date, setDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('Draft')

  function updateInvoices(updated) {
    setInvoices(updated)
    localStorage.setItem('invoices', JSON.stringify(updated))
  }

  function clearForm() {
    setNumber('')
    setCustomer('')
    setDate('')
    setDueDate('')
    setAmount('')
    setStatus('Draft')
    setEditingId(null)
    setShowForm(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const invoiceData = {
      number,
      customer,
      date,
      dueDate,
      amount,
      status,
    }

    if (editingId !== null) {
      const updated = invoices.map((invoice) =>
        invoice.id === editingId
          ? { ...invoice, ...invoiceData }
          : invoice
      )

      updateInvoices(updated)
    } else {
      const newInvoice = {
        id: Date.now(),
        ...invoiceData,
      }

      updateInvoices([...invoices, newInvoice])
    }

    clearForm()
  }

  function handleEdit(invoice) {
    setEditingId(invoice.id)
    setNumber(invoice.number)
    setCustomer(invoice.customer)
    setDate(invoice.date)
    setDueDate(invoice.dueDate)
    setAmount(invoice.amount)
    setStatus(invoice.status)
    setShowForm(true)
  }

  function handleDelete(id) {
    const updated = invoices.filter(
      (invoice) => invoice.id !== id
    )

    updateInvoices(updated)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Invoices</h1>
          <p>Create and manage your invoices.</p>
        </div>

        <button
          className="primary"
          onClick={() => {
            clearForm()
            setShowForm(true)
          }}
        >
          + New Invoice
        </button>
      </div>

      {showForm && (
        <form className="customer-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Invoice Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Customer"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Paid">Paid</option>
          </select>

          <div className="form-actions">
            <button type="submit" className="primary">
              {editingId !== null
                ? 'Save Changes'
                : 'Create Invoice'}
            </button>

            <button type="button" onClick={clearForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {invoices.length === 0 ? (
        <div className="empty">
          <h3>No invoices yet</h3>
          <p>Create your first invoice to get started.</p>
        </div>
      ) : (
        <div className="customer-list">
          {invoices.map((invoice) => (
            <div className="customer-card" key={invoice.id}>
              <div>
                <h3>{invoice.number}</h3>
                <p>{invoice.customer}</p>
                <p>
                  {invoice.date} → {invoice.dueDate}
                </p>
                <p>
                  €{Number(invoice.amount).toFixed(2)}
                </p>
                <p>
                  Status: <strong>{invoice.status}</strong>
                </p>
              </div>

              <div>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(invoice)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(invoice.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Invoices
