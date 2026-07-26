from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.security import verify_token
from database.database import get_db
from models.student import Student
from models.course import Course
from schemas.student import (
    StudentCreate,
    StudentUpdate,
    StudentResponse,
)

router = APIRouter(
    prefix="/api/students",
    tags=["Students"]
)


# ----------------------------
# CREATE STUDENT
# ----------------------------
@router.post("/", response_model=StudentResponse)
def create_student(
    student: StudentCreate,
    db: Session = Depends(get_db),
    user: str = Depends(verify_token)
):

    existing = db.query(Student).filter(
        Student.email == student.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    course = db.query(Course).filter(
        Course.id == student.course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    new_student = Student(
        name=student.name,
        email=student.email,
        phone=student.phone,
        dob=student.dob,
        course_id=student.course_id
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


# ----------------------------
# GET ALL STUDENTS
# ----------------------------
@router.get("/", response_model=list[StudentResponse])
def get_students(
    search: str = Query(default=""),
    course_id: int | None = Query(default=None),
    sort: str = Query(default="newest"),
    page: int = Query(default=1),
    limit: int = Query(default=10),
    db: Session = Depends(get_db)
):

    query = db.query(Student)

    if course_id:
        query = query.filter(Student.course_id == course_id)

    if search:
        query = (
            query.join(Course)
            .filter(
                or_(
                    Student.name.ilike(f"%{search}%"),
                    Student.email.ilike(f"%{search}%"),
                    Course.name.ilike(f"%{search}%")
                )
            )
        )

    skip = (page - 1) * limit

    if sort == "az":
        query = query.order_by(Student.name.asc())

    elif sort == "za":
        query = query.order_by(Student.name.desc())

    elif sort == "oldest":
        query = query.order_by(Student.created_at.asc())

    else:
        query = query.order_by(Student.created_at.desc())

    students = (
        query
        .offset(skip)
        .limit(limit)
        .all()
    )

    return students


# ----------------------------
# GET SINGLE STUDENT
# ----------------------------
@router.get("/{student_id}", response_model=StudentResponse)
def get_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student


# ----------------------------
# UPDATE STUDENT
# ----------------------------
@router.put("/{student_id}", response_model=StudentResponse)
def update_student(
    student_id: int,
    updated: StudentUpdate,
    db: Session = Depends(get_db),
    user: str = Depends(verify_token)
):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    email_exists = db.query(Student).filter(
        Student.email == updated.email,
        Student.id != student_id
    ).first()

    if email_exists:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    course = db.query(Course).filter(
        Course.id == updated.course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    student.name = updated.name
    student.email = updated.email
    student.phone = updated.phone
    student.dob = updated.dob
    student.course_id = updated.course_id

    db.commit()
    db.refresh(student)

    return student


# ----------------------------
# DELETE STUDENT
# ----------------------------
@router.delete("/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db),
    user: str = Depends(verify_token)
):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    db.delete(student)
    db.commit()

    return {
        "message": "Student deleted successfully"
    }