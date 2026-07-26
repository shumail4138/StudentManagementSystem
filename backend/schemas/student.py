from pydantic import BaseModel
from datetime import date, datetime


class StudentBase(BaseModel):
    name: str
    email: str
    phone: str
    dob: date
    course_id: int


class StudentCreate(StudentBase):
    pass


class StudentUpdate(StudentBase):
    pass


class CourseResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    dob: date
    course: CourseResponse
    created_at: datetime

    class Config:
        from_attributes = True