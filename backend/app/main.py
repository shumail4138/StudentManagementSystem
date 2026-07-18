from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import Base, engine

# Import models so SQLAlchemy creates the tables
import models.student

# Import routes
from routes.auth import router as auth_router
from routes.students import router as student_router
from routes.dashboard import router as dashboard_router

# Create database tables
Base.metadata.create_all(bind=engine)

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


@app.get("/")
def home():
    return {
        "message": "Welcome to Student Management System API"
    }