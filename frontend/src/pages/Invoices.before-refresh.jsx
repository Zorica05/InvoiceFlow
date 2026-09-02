import { useState } from 'react'

function Invoices({ onView = () => {} }) {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('invoices')
    return saved ? JSON.parse(saved) : []
  })

  const customers = JSON.parse(
    localStorage.getItem('customers') || '[]'
  )

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const [number, setNumber] = useState('')
  const [customer, setCustomer] = useState('')
  const [date, setDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('Draft')

  const [items, setItems] = useState([
    {
      id: Date.now(),
      description: '',
      quantity: 1,
      price: 0,
    },
  ])

  function updateInvoices(updated) {
    setInvoices(updated)
    localStorage.setItem('invoices', JSON.stringify(updated))
  }

  function getNextInvoiceNumber() {
    const numbers = invoices.map((invoice) => {
      const match = invoice.number?.match(/^INV-(\d+)$/)
      return match ? Number(match[1]) : 0
    })

    const nextNumber = Math.max(0, ...numbers) + 1

    return `INV-${String(nextNumber).padStart(3, '0')}`
  }

  function openNewInvoice() {
    setEditingId(null)
    setNumber(getNextInvoiceNumber())
    setCustomer('')
    setDate('')
    setDueDate('')
    setStatus('Draft')

    setItems([
      {
        id: Date.now(),
        description: '',
        quantity: 1,
        price: 0,
      },
    ])

    setShowForm(true)
  }

  function openEditInvoice(invoice) {
    setEditingId(invoice.id)
    setNumber(invoice.number)
    setCustomer(invoice.customer)
    setDate(invoice.date)
    setDueDate(invoice.dueDate)
    setStatus(invoice.status)

    setItems(
      invoice.items?.length
        ? invoice.items
        : [
            {
              id: Date.now(),
              description: 'Invoice total',
              quantity: 1,
              price: Number(invoice.amount || 0),
            },
          ]
    )

    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
  }

  function addItem() {
    setItems((current) => [
      ...current,
      {
        id: Date.now(),
        description: '',
        quantity: 1,
        price: 0,
      },
    ])
  }

  function removeItem(id) {
    if (items.length === 1) return

    setItems((current) =>
      current.filter((item) => item.id !== id)
    )
  }

  function updateItem(id, field, value) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === 'description'
                  ? value
                  : Number(value),
            }
          : item
      )
    )
  }

  function getSubtotal() {
    return items.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0) *
          Number(item.price || 0),
      0
    )
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!customer) {
      alert('Please select a customer.')
      return
    }

    if (items.some((item) => !item.description.trim())) {
      alert('Please enter a description for every item.')
      return
    }

    const subtotal = getSubtotal()

    const invoiceData = {
      number,
      customer,
      date,
      dueDate,
      status,
      items,
      amount: subtotal,
    }

    if (editingId !== null) {
      const updated = invoices.map((invoice) =>
        invoice.id === editingId
          ? {
              ...invoice,
              ...invoiceData,
            }
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

    closeForm()
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this invoice?'
    )

    if (!confirmed) return

    updateInvoices(
      invoices.filter((invoice) => invoice.id !== id)
    )
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const searchValue = search.toLowerCase().trim()

    const matchesSearch =
      invoice.number
        ?.toLowerCase()
        .includes(searchValue) ||
      invoice.customer
        ?.toLowerCase()
        .includes(searchValue)

    const matchesStatus =
      filterStatus === 'All' ||
      invoice.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Invoices</h1>
          <p>Create and manage your invoices.</p>
        </div>

        <button
          className="primary"
          onClick={openNewInvoice}
        >
          + New Invoice
        </button>
      </div>

      {showForm && (
        <form
          className="invoice-form"
          onSubmit={handleSubmit}
        >
          <div className="invoice-form-header">
            <div>
              <h2>
                {editingId !== null
                  ? 'Edit Invoice'
                  : 'New Invoice'}
              </h2>

              <p>{number}</p>
            </div>
          </div>

          <div className="invoice-form-grid">
            <div>
              <label>Customer</label>

              <select
                value={customer}
                onChange={(e) =>
                  setCustomer(e.target.value)
                }
                required
              >
                <option value="">
                  Select Customer
                </option>

                {customers.map((item) => (
                  <option
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                    {item.company
                      ? ` — ${item.company}`
                      : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Invoice Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                required
              />
            </div>

            <div>
              <label>Due Date</label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
                required
              />
            </div>

            <div>
              <label>Status</label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>

          <div className="items-section">
            <div className="items-header">
              <div>
                <h3>Invoice Items</h3>
                <p>Add products or services.</p>
              </div>

              <button
                type="button"
                className="add-item-button"
                onClick={addItem}
              >
                + Add Item
              </button>
            </div>

            <div className="items-table">
              <div className="items-table-header">
                <span>Description</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Total</span>
                <span></span>
              </div>

              {items.map((item) => {
                const itemTotal =
                  Number(item.quantity || 0) *
                  Number(item.price || 0)

                return (
                  <div
                    className="item-row"
                    key={item.id}
                  >
                    <input
                      type="text"
                      placeholder="Product or service"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          'description',
                          e.target.value
                        )
                      }
                      required
                    />

                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          'quantity',
                          e.target.value
                        )
                      }
                      required
                    />

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          'price',
                          e.target.value
                        )
                      }
                      required
                    />

                    <strong>
                      €{itemTotal.toFixed(2)}
                    </strong>

                    <button
                      type="button"
                      className="remove-item"
                      onClick={() =>
                        removeItem(item.id)
                      }
                      disabled={items.length === 1}
                    >
                      ×
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="invoice-summary">
              <div>
                <span>Subtotal</span>
                <strong>
                  €{getSubtotal().toFixed(2)}
                </strong>
              </div>

              <div className="grand-total">
                <span>Total</span>
                <strong>
                  €{getSubtotal().toFixed(2)}
                </strong>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={closeForm}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary"
              disabled={customers.length === 0}
            >
              {editingId !== null
                ? 'Save Invoice'
                : 'Create Invoice'}
            </button>
          </div>
        </form>
      )}

      {customers.length === 0 && showForm && (
        <div className="error">
          Please create a customer before creating
          an invoice.
        </div>
      )}

      {invoices.length > 0 && (
        <div className="invoice-filters">
          <input
            type="text"
            placeholder="Search by invoice or customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
          >
            <option value="All">
              All statuses
            </option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      )}

      {invoices.length === 0 ? (
        <div className="empty">
          <h3>No invoices yet</h3>
          <p>
            Create your first invoice to get started.
          </p>
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="empty">
          <h3>No matching invoices</h3>
          <p>
            Try a different search or status filter.
          </p>
        </div>
      ) : (
        <div className="customer-list">
          {filteredInvoices.map((invoice) => (
            <div
              className="customer-card"
              key={invoice.id}
            >
              <div>
                <h3>{invoice.number}</h3>

                <p>{invoice.customer}</p>

                <p>
                  {invoice.date} → {invoice.dueDate}
                </p>

                <p className="invoice-amount">
                  €{Number(invoice.amount || 0).toFixed(2)}
                </p>

                <span
                  className={`status-badge status-${invoice.status.toLowerCase()}`}
                >
                  {invoice.status}
                </span>
              </div>

              <div className="invoice-actions">
                <button
                  className="view-button"
                  onClick={() => onView(invoice)}
                >
                  View
                </button>

                <button
                  className="edit-button"
                  onClick={() =>
                    openEditInvoice(invoice)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(invoice.id)
                  }
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
