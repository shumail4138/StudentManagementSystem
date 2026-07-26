from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from database.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(20))
    dob = Column(Date)

    course_id = Column(
        Integer,
        ForeignKey("courses.id")
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    course = relationship(
        "Course",
        back_populates="students"
    )