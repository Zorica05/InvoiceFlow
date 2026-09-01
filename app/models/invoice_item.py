from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class InvoiceItem(Base):
    __tablename__ = "invoice_items"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    description: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    quantity: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    total: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    invoice_id: Mapped[int] = mapped_column(
        ForeignKey("invoices.id"),
        nullable=False,
    )
