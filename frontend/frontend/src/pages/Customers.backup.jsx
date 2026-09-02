import { useState } from 'react'

function Customers() {
  const [customers, setCustomers] = useState([])
  const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const newCustomer = {
      id: Date.now(),
      name,
      email,
      company,
      phone,
    }

    setCustomers((current) => [...current, newCustomer])

    setName('')
    setEmail('')
    setCompany('')
    setPhone('')
    setShowForm(false)
  }

  function handleDelete(id) {
    setCustomers((current) =>
      current.filter((customer) => customer.id !== id)
    )
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
          onClick={() => setShowForm(!showForm)}
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
              Save Customer
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
            >
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

              <button
                className="delete-button"
                onClick={() => handleDelete(customer.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Customers
