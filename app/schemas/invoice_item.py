from decimal import Decimal

from pydantic import BaseModel


class InvoiceItemCreate(BaseModel):
    description: str
    quantity: Decimal
    unit_price: Decimal
    invoice_id: int
