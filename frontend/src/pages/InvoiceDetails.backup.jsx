function InvoiceDetails({ invoice, onBack }) {
  if (!invoice) {
    return (
      <div className="empty">
        <h3>Invoice not found</h3>
        <button className="primary" onClick={onBack}>
          Back to Invoices
        </button>
      </div>
    )
  }

  return (
    <div className="invoice-details">
      <div className="invoice-toolbar">
        <button onClick={onBack}>
          ← Back
        </button>

        <button
          className="primary"
          onClick={() => window.print()}
        >
          Print / Save PDF
        </button>
      </div>

      <div className="invoice-paper">
        <div className="invoice-top">
          <div>
            <h1>InvoiceFlow</h1>
            <p>Professional Invoice</p>
          </div>

          <div className="invoice-number">
            <span>Invoice</span>
            <strong>{invoice.number}</strong>
          </div>
        </div>

        <div className="invoice-info">
          <div>
            <span>Billed to</span>
            <strong>{invoice.customer}</strong>
          </div>

          <div>
            <span>Invoice date</span>
            <strong>{invoice.date}</strong>
          </div>

          <div>
            <span>Due date</span>
            <strong>{invoice.dueDate}</strong>
          </div>
        </div>

        <div className="invoice-table">
          <div className="invoice-table-header">
            <span>Description</span>
            <span>Amount</span>
          </div>

          <div className="invoice-table-row">
            <span>Invoice total</span>
            <strong>
              €{Number(invoice.amount).toFixed(2)}
            </strong>
          </div>
        </div>

        <div className="invoice-total">
          <span>Total</span>
          <strong>
            €{Number(invoice.amount).toFixed(2)}
          </strong>
        </div>

        <div className="invoice-status-section">
          <span>Status</span>

          <span
            className={`status-badge status-${invoice.status.toLowerCase()}`}
          >
            {invoice.status}
          </span>
        </div>

        <div className="invoice-footer">
          <p>Thank you for your business.</p>
          <p>InvoiceFlow</p>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetails
