import { useState } from 'react'

function Customers() {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('customers')
    return saved ? JSON.parse(saved) : []
  })
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')

  function saveCustomers(data) {
    setCustomers(data)
    localStorage.setItem('customers', JSON.stringify(data))
  }

  function clearForm() {
    setName('')
    setEmail('')
    setCompany('')
    setPhone('')
    setEditingId(null)
    setShowForm(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (editingId !== null) {
      setCustomers((current) => {
        const updated = current.map((customer) =>
          customer.id === editingId
            ? {
                ...customer,
                name,
                email,
                company,
                phone,
              }
            : customer
        )
        localStorage.setItem('customers', JSON.stringify(updated))
        return updated
      })
    } else {
      const newCustomer = {
        id: Date.now(),
        name,
        email,
        company,
        phone,
      }

      setCustomers((current) => {
        const updated = [...current, newCustomer]
        localStorage.setItem('customers', JSON.stringify(updated))
        return updated
      })
    }

    clearForm()
  }

  function handleEdit(customer) {
    setEditingId(customer.id)
    setName(customer.name)
    setEmail(customer.email)
    setCompany(customer.company)
    setPhone(customer.phone)
    setShowForm(true)
  }

  function handleDelete(id) {
    setCustomers((current) => {
      const updated = current.filter((customer) => customer.id !== id)
      localStorage.setItem('customers', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your customers.</p>
        </div>

        <button
          className="primary"
          onClick={() => {
            clearForm()
            setShowForm(true)
          }}
        >
          + New Customer
        </button>
      </div>

      {showForm && (
        <form className="customer-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="form-actions">
            <button type="submit" className="primary">
              {editingId !== null ? 'Save Changes' : 'Save Customer'}
            </button>

            <button type="button" onClick={clearForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {customers.length === 0 ? (
        <div className="empty">
          <h3>No customers yet</h3>
          <p>Add your first customer to get started.</p>
        </div>
      ) : (
        <div className="customer-list">
          {customers.map((customer) => (
            <div className="customer-card" key={customer.id}>
              <div>
                <h3>{customer.name}</h3>

                {customer.company && (
                  <p>{customer.company}</p>
                )}

                <p>{customer.email}</p>

                {customer.phone && (
                  <p>{customer.phone}</p>
                )}
              </div>

              <div>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(customer)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(customer.id)}
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

export default Customers
