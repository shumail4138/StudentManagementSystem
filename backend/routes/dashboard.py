from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.security import verify_token
from database.database import get_db
from models.student import Student
from models.course import Course

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    user: str = Depends(verify_token)
):

    # ==========================
    # Total Students
    # ==========================
    total_students = db.query(Student).count()

    # ==========================
    # Total Courses
    # ==========================
    total_courses = db.query(Course).count()

    # ==========================
    # Student Statistics
    # ==========================
    today = date.today()

    today_students = (
        db.query(Student)
        .filter(
            func.date(Student.created_at) == today
        )
        .count()
    )

    month_students = (
        db.query(Student)
        .filter(
            func.extract("month", Student.created_at) == today.month,
            func.extract("year", Student.created_at) == today.year
        )
        .count()
    )

    year_students = (
        db.query(Student)
        .filter(
            func.extract("year", Student.created_at) == today.year
        )
        .count()
    )

    # ==========================
    # Recent Students
    # ==========================
    recent_students = (
        db.query(Student, Course)
        .join(Course, Student.course_id == Course.id)
        .order_by(Student.created_at.desc())
        .limit(5)
        .all()
    )

    recent = []

    for student, course in recent_students:
        recent.append({
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "course": course.name,
            "created_at": student.created_at
        })

    # ==========================
    # Students by Course
    # ==========================
    students_by_course = (
        db.query(
            Course.name.label("course"),
            func.count(Student.id).label("count")
        )
        .outerjoin(
            Student,
            Student.course_id == Course.id
        )
        .group_by(Course.id)
        .all()
    )

    chart = []

    for row in students_by_course:
        chart.append({
            "course": row.course,
            "count": row.count
        })

    # ==========================
    # Response
    # ==========================
    return {
        "total_students": total_students,
        "total_courses": total_courses,

        "today_students": today_students,
        "month_students": month_students,
        "year_students": year_students,

        "recent_students": recent,
        "students_by_course": chart
    }