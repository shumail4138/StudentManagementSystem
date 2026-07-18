from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.security import verify_token

from database.database import get_db
from models.student import Student
from schemas.student import StudentCreate, StudentUpdate, StudentResponse

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

    new_student = Student(
        name=student.name,
        email=student.email,
        phone=student.phone,
        course=student.course,
        dob=student.dob
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


# ----------------------------
# GET ALL STUDENTS
# SEARCH + PAGINATION
# ----------------------------
@router.get("/", response_model=list[StudentResponse])
def get_students(
    search: str = Query(default=""),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db)
):

    query = db.query(Student)

    # Search
    if search:
        query = query.filter(
            or_(
                Student.name.ilike(f"%{search}%"),
                Student.email.ilike(f"%{search}%"),
                Student.course.ilike(f"%{search}%")
            )
        )

    # Pagination
    skip = (page - 1) * limit

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
def get_student(student_id: int, db: Session = Depends(get_db)):

    student = db.query(Student).filter(
        Student.id == student_id
    ).first()

    if student is None:
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

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    # Check duplicate email
    email_exists = db.query(Student).filter(
        Student.email == updated.email,
        Student.id != student_id
    ).first()

    if email_exists:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    student.name = updated.name
    student.email = updated.email
    student.phone = updated.phone
    student.course = updated.course
    student.dob = updated.dob

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

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    db.delete(student)
    db.commit()

    return {
        "message": "Student deleted successfully"
    }