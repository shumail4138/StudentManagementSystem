from pydantic import BaseModel, EmailStr
from datetime import date, datetime


class StudentBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    course: str
    dob: date


class StudentCreate(StudentBase):
    pass


class StudentUpdate(StudentBase):
    pass


class StudentResponse(StudentBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True