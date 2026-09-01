from datetime import date
from decimal import Decimal

from sqlalchemy import Date, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    invoice_number: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )

    issue_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    due_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="draft",
        nullable=False,
    )

    subtotal: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
        nullable=False,
    )

    tax: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
        nullable=False,
    )

    total: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
        nullable=False,
    )

    customer_id: Mapped[int] = mapped_column(
        ForeignKey("customers.id"),
        nullable=False,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )
