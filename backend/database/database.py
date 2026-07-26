from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///./students.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def migrate_legacy_schema():
    with engine.begin() as connection:
        columns = {
            row[1]
            for row in connection.exec_driver_sql("PRAGMA table_info(students)")
        }

        if "course_id" not in columns:
            connection.exec_driver_sql(
                "ALTER TABLE students ADD COLUMN course_id INTEGER"
            )

        if "course" in columns:
            connection.exec_driver_sql(
                """
                UPDATE students
                SET course_id = (
                    SELECT courses.id
                    FROM courses
                    WHERE courses.name = students.course
                )
                WHERE course IS NOT NULL AND course_id IS NULL
                """
            )

            connection.exec_driver_sql(
                """
                CREATE TABLE students_new (
                    id INTEGER NOT NULL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    phone VARCHAR(20),
                    dob DATE,
                    course_id INTEGER,
                    created_at DATETIME,
                    FOREIGN KEY(course_id) REFERENCES courses (id)
                )
                """
            )
            connection.exec_driver_sql(
                """
                INSERT INTO students_new
                    (id, name, email, phone, dob, course_id, created_at)
                SELECT id, name, email, phone, dob, course_id, created_at
                FROM students
                """
            )
            connection.exec_driver_sql("DROP TABLE students")
            connection.exec_driver_sql(
                "ALTER TABLE students_new RENAME TO students"
            )
            connection.exec_driver_sql(
                "CREATE INDEX ix_students_id ON students (id)"
            )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()