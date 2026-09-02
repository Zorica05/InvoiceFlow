from datetime import date
from decimal import Decimal

from pydantic import BaseModel


class InvoiceCreate(BaseModel):
    invoice_number: str
    issue_date: date
    due_date: date
    status: str = "draft"
    subtotal: Decimal = 0
    tax: Decimal = 0
    total: Decimal = 0
    customer_id: int
