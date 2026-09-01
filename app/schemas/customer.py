from pydantic import BaseModel


class CustomerCreate(BaseModel):
    name: str
    email: str
    company: str | None = None
    phone: str | None = None
    user_id: int
