from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func

from database.database import get_db
from models.course import Course
from models.student import Student
from schemas.course import CourseCreate, CourseUpdate

router = APIRouter(
    prefix="/api/courses",
    tags=["Courses"]
)


# Get All Courses
from fastapi import Query

@router.get("/")
def get_courses(
    search: str = Query(default=""),
    page: int = Query(default=1),
    limit: int = Query(default=10),
    db: Session = Depends(get_db),
):

    query = (
        db.query(
            Course.id,
            Course.name,
            func.count(Student.id).label("students")
        )
        .outerjoin(Student, Student.course_id == Course.id)
    )

    # Search
    if search:
        query = query.filter(
            Course.name.ilike(f"%{search}%")
        )

    query = query.group_by(Course.id)

    # Pagination
    skip = (page - 1) * limit

    courses = (
        query
        .offset(skip)
        .limit(limit)
        .all()
    )

    result = []

    for course in courses:
        result.append({
            "id": course.id,
            "name": course.name,
            "students": course.students
        })

    return result


# Get Course By ID
@router.get("/{course_id}")
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    return course


# Create Course
@router.post("/")
def create_course(course: CourseCreate, db: Session = Depends(get_db)):

    existing = db.query(Course).filter(
        Course.name == course.name
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Course already exists"
        )

    new_course = Course(
        name=course.name
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course


# Update Course
@router.put("/{course_id}")
def update_course(
    course_id: int,
    updated: CourseUpdate,
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(
        Course.id == course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    course.name = updated.name

    db.commit()
    db.refresh(course)

    return course


# Delete Course
@router.delete("/{course_id}")
def delete_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(
        Course.id == course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    db.delete(course)
    db.commit()

    return {
        "message": "Course deleted successfully"
    }