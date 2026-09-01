from decimal import Decimal
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.auth import router as auth_router
from app.api.dependencies import get_current_user
from app.models.customer import Customer
from app.models.invoice import Invoice
from app.models.invoice_item import InvoiceItem
from app.models.user import User
from app.schemas.customer import CustomerCreate
from app.schemas.invoice import InvoiceCreate
from app.schemas.invoice_item import InvoiceItemCreate

app = FastAPI(
    title="InvoiceFlow API",
    description="API for managing invoices and customers",
    version="1.0.0",
)


@app.get("/")
def root():
    return {"message": "InvoiceFlow API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/customers")
def get_customers(db: Session = Depends(get_db)):
    return db.query(Customer).all()


@app.post("/customers")
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_customer = Customer(
        name=customer.name,
        email=customer.email,
        company=customer.company,
        phone=customer.phone,
        user_id=current_user.id,
    )

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return new_customer


@app.put("/invoices/{invoice_id}")
def update_invoice(
    invoice_id: int,
    invoice_data: InvoiceCreate,
    db: Session = Depends(get_db),
):
    invoice = db.query(Invoice).filter(
        Invoice.id == invoice_id
    ).first()

    if not invoice:
        return {"error": "Invoice not found"}

    invoice.invoice_number = invoice_data.invoice_number
    invoice.issue_date = invoice_data.issue_date
    invoice.due_date = invoice_data.due_date
    invoice.status = invoice_data.status
    invoice.customer_id = invoice_data.customer_id
    invoice.user_id = invoice_data.user_id

    db.commit()
    db.refresh(invoice)

    return invoice


@app.post("/invoices")
def create_invoice(
    invoice: InvoiceCreate,
    db: Session = Depends(get_db),
):
    new_invoice = Invoice(
        invoice_number=invoice.invoice_number,
        issue_date=invoice.issue_date,
        due_date=invoice.due_date,
        status=invoice.status,
        subtotal=invoice.subtotal,
        tax=invoice.tax,
        total=invoice.total,
        customer_id=invoice.customer_id,
        user_id=invoice.user_id,
    )

    db.add(new_invoice)
    db.commit()
    db.refresh(new_invoice)

    return new_invoice


@app.get("/invoices")
def get_invoices(db: Session = Depends(get_db)):
    return db.query(Invoice).all()


@app.post("/invoice-items")
def create_invoice_item(
    item: InvoiceItemCreate,
    db: Session = Depends(get_db),
):
    item_total = item.quantity * item.unit_price

    new_item = InvoiceItem(
        description=item.description,
        quantity=item.quantity,
        unit_price=item.unit_price,
        total=item_total,
        invoice_id=item.invoice_id,
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    items = db.query(InvoiceItem).filter(
        InvoiceItem.invoice_id == item.invoice_id
    ).all()

    subtotal = sum(item.total for item in items)
    tax = subtotal * Decimal("0.20")
    total = subtotal + tax

    invoice_record = db.query(Invoice).filter(
        Invoice.id == item.invoice_id
    ).first()

    if invoice_record:
        invoice_record.subtotal = subtotal
        invoice_record.tax = tax
        invoice_record.total = total
        db.commit()

    return new_item


@app.get("/invoice-items")
def get_invoice_items(db: Session = Depends(get_db)):
    return db.query(InvoiceItem).all()




@app.put("/invoice-items/{item_id}")
def update_invoice_item(
    item_id: int,
    item_data: InvoiceItemCreate,
    db: Session = Depends(get_db),
):
    item = db.query(InvoiceItem).filter(
        InvoiceItem.id == item_id
    ).first()

    if not item:
        return {"error": "Invoice item not found"}

    old_invoice_id = item.invoice_id

    item.description = item_data.description
    item.quantity = item_data.quantity
    item.unit_price = item_data.unit_price
    item.total = item_data.quantity * item_data.unit_price
    item.invoice_id = item_data.invoice_id

    db.commit()
    db.refresh(item)

    items = db.query(InvoiceItem).filter(
        InvoiceItem.invoice_id == item.invoice_id
    ).all()

    subtotal = sum(i.total for i in items)
    tax = subtotal * Decimal("0.20")
    total = subtotal + tax

    invoice_record = db.query(Invoice).filter(
        Invoice.id == item.invoice_id
    ).first()

    if invoice_record:
        invoice_record.subtotal = subtotal
        invoice_record.tax = tax
        invoice_record.total = total

    if old_invoice_id != item.invoice_id:
        old_invoice = db.query(Invoice).filter(
            Invoice.id == old_invoice_id
        ).first()

        if old_invoice:
            old_items = db.query(InvoiceItem).filter(
                InvoiceItem.invoice_id == old_invoice_id
            ).all()

            old_subtotal = sum(i.total for i in old_items)
            old_tax = old_subtotal * Decimal("0.20")
            old_total = old_subtotal + old_tax

            old_invoice.subtotal = old_subtotal
            old_invoice.tax = old_tax
            old_invoice.total = old_total

    db.commit()
    db.refresh(item)

    return item


@app.delete("/invoice-items/{item_id}")
def delete_invoice_item(
    item_id: int,
    db: Session = Depends(get_db),
):
    item = db.query(InvoiceItem).filter(
        InvoiceItem.id == item_id
    ).first()

    if not item:
        return {"error": "Invoice item not found"}

    invoice_id = item.invoice_id

    db.delete(item)
    db.commit()

    items = db.query(InvoiceItem).filter(
        InvoiceItem.invoice_id == invoice_id
    ).all()

    subtotal = sum(item.total for item in items)
    tax = subtotal * Decimal("0.20")
    total = subtotal + tax

    invoice_record = db.query(Invoice).filter(
        Invoice.id == invoice_id
    ).first()

    if invoice_record:
        invoice_record.subtotal = subtotal
        invoice_record.tax = tax
        invoice_record.total = total
        db.commit()

    return {"message": "Invoice item deleted"}


@app.delete("/invoices/{invoice_id}")
def delete_invoice(
    invoice_id: int,
    db: Session = Depends(get_db),
):
    invoice = db.query(Invoice).filter(
        Invoice.id == invoice_id
    ).first()

    if not invoice:
        return {"error": "Invoice not found"}

    db.delete(invoice)
    db.commit()

    return {"message": "Invoice deleted"}


app.include_router(auth_router)
