from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import Base, engine, migrate_legacy_schema

# Import models
import models.student
import models.course   # NEW

# Import routes
from routes.auth import router as auth_router
from routes.students import router as student_router
from routes.dashboard import router as dashboard_router
from routes.course import router as course_router   # NEW

# Create database tables
Base.metadata.create_all(bind=engine)
migrate_legacy_schema()

app = FastAPI(
    title="Student Management System API",
    version="1.0.0"
)

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(auth_router)
app.include_router(student_router)
app.include_router(dashboard_router)
app.include_router(course_router)   # NEW

@app.get("/")
def home():
    return {
        "message": "Welcome to Student Management System API"
    }