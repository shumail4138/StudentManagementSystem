from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.security import verify_token

from database.database import get_db
from models.student import Student

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    user: str = Depends(verify_token)
):

    # Total students
    total_students = db.query(Student).count()

    # Total unique courses
    total_courses = db.query(
        func.count(func.distinct(Student.course))
    ).scalar()

    # Recent 5 students
    recent_students = (
        db.query(Student)
        .order_by(Student.created_at.desc())
        .limit(5)
        .all()
    )

    recent = []

    for student in recent_students:
        recent.append({
            "id": student.id,
            "name": student.name,
            "course": student.course,
            "email": student.email
        })

    return {
        "total_students": total_students,
        "total_courses": total_courses,
        "recent_students": recent
    }
