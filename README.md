# 🎓 Student Management System

A modern, full-stack **Student Management System** built with **Next.js, FastAPI, SQLAlchemy, and SQLite**.

The application allows an administrator to securely manage students and courses through a responsive web interface with authentication, CRUD operations, search, dashboard statistics, and dark mode.

---

## 🌐 Live Demo

### Frontend

🔗 https://students-ms.netlify.app/

### Backend API

🔗 https://studentmanagementsystem-46mg.onrender.com/

### API Documentation

🔗 https://studentmanagementsystem-46mg.onrender.com/docs

---

## 📌 Project Overview

The Student Management System is a full-stack web application designed to simplify the management of student and course records.

An administrator can:

* 🔐 Login securely
* 📊 View dashboard statistics
* 👨‍🎓 Add students
* 👀 View student details
* ✏️ Edit student information
* 🗑️ Delete students
* 🔎 Search students
* 📚 Add courses
* 👀 View course details
* ✏️ Edit courses
* 🗑️ Delete courses
* 🔎 Search courses
* 🌙 Switch between light and dark mode
* 📱 Use the application on desktop, tablet, and mobile devices

---

# ✨ Features

## 🔐 Authentication

* Admin login
* JWT-based authentication
* Protected dashboard routes
* Protected student and course pages
* Automatic token storage
* Authorization header added to API requests
* Automatic redirect to login when authentication expires

### Default Admin Credentials

```text
Email: admin@example.com
Password: admin123
```

> ⚠️ These credentials are currently used for demonstration/testing. In a production application, credentials should be stored securely using environment variables and passwords should be hashed.

---

# 📊 Dashboard

The dashboard provides an overview of the system.

It displays:

* Total number of students
* Total number of courses
* Recently added students
* Responsive dashboard cards

---

# 👨‍🎓 Student Management

The student section provides complete CRUD functionality.

### Add Student

Administrators can add:

* Full Name
* Email
* Phone Number
* Course
* Date of Birth

### View Student

Displays:

* Student ID
* Full Name
* Email
* Phone
* Course
* Date of Birth
* Created Date

### Edit Student

Administrators can update all student information.

### Delete Student

Students can be deleted after confirmation.

### Search Students

Students can be searched using information such as:

* Name
* Email
* Course

---

# 📚 Course Management

The course section provides complete CRUD functionality.

### Add Course

Create a new course by entering the course name.

### View Course

Displays:

* Course ID
* Course Name

### Edit Course

Update the course name.

### Delete Course

Delete an existing course after confirmation.

### Search Courses

Courses can be searched by course name.

Example:

```text
B.TECH
BCA
MBBS
```

The course list also displays the number of students associated with each course.

---

# 🌙 Dark Mode

The application supports:

* ☀️ Light Mode
* 🌙 Dark Mode

The theme is applied across the application, including:

* Dashboard
* Students
* Courses
* Add Student
* Edit Student
* View Student
* Add Course
* Edit Course
* View Course
* Sidebar
* Forms
* Tables

The interface is also responsive for smaller screens.

---

# 🛠️ Tech Stack

## Frontend

| Technology   | Purpose              |
| ------------ | -------------------- |
| Next.js      | React framework      |
| React        | UI development       |
| Tailwind CSS | Styling              |
| Axios        | API communication    |
| JavaScript   | Frontend programming |

## Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Python     | Backend programming |
| FastAPI    | REST API framework  |
| SQLAlchemy | ORM                 |
| SQLite     | Database            |
| Pydantic   | Data validation     |
| JWT        | Authentication      |
| Uvicorn    | ASGI server         |

## Deployment

| Platform | Usage                           |
| -------- | ------------------------------- |
| Netlify  | Frontend hosting                |
| Render   | Backend hosting                 |
| GitHub   | Source code and version control |

---

# 🏗️ System Architecture

```text
                 ┌─────────────────────────┐
                 │        User             │
                 │   Desktop / Mobile      │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │       Next.js           │
                 │       Frontend          │
                 │                         │
                 │  Pages / Components     │
                 │  Forms / UI / Search    │
                 └────────────┬────────────┘
                              │
                              │ REST API
                              ▼
                 ┌─────────────────────────┐
                 │       FastAPI           │
                 │        Backend          │
                 │                         │
                 │ Routes / Validation     │
                 │ Authentication / CRUD   │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │       SQLAlchemy        │
                 │          ORM            │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │         SQLite          │
                 │        Database         │
                 └─────────────────────────┘
```

---

# 📁 Project Structure

```text
StudentManagementSystem/
│
├── frontend/
│   │
│   ├── app/
│   │   ├── login/
│   │   │   └── page.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   │
│   │   ├── students/
│   │   │   ├── page.jsx
│   │   │   ├── add/
│   │   │   │   └── page.jsx
│   │   │   ├── edit/
│   │   │   │   └── [id]/
│   │   │   │       └── page.jsx
│   │   │   └── view/
│   │   │       └── [id]/
│   │   │           └── page.jsx
│   │   │
│   │   ├── courses/
│   │   │   ├── page.jsx
│   │   │   ├── add/
│   │   │   │   └── page.jsx
│   │   │   ├── edit/
│   │   │   │   └── [id]/
│   │   │   │       └── page.jsx
│   │   │   └── view/
│   │   │       └── [id]/
│   │   │           └── page.jsx
│   │   │
│   │   ├── layout.js
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ModeToggle.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── app/
│   │   └── auth.py
│   │
│   ├── database/
│   │   └── database.py
│   │
│   ├── models/
│   │   ├── student.py
│   │   └── course.py
│   │
│   ├── schemas/
│   │   ├── student.py
│   │   └── course.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── students.py
│   │   ├── course.py
│   │   └── dashboard.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

> Folder names can differ depending on the final repository organization.

---

# 🗄️ Database

The application uses **SQLite** with **SQLAlchemy ORM**.

## Students Table

```text
students
────────────────────────────────────────
id
name
email
phone
course_id
dob
created_at
```

### Student Example

```json
{
  "id": 1,
  "name": "Shumail Rahat Khan",
  "email": "shumail@gmail.com",
  "phone": "9876543210",
  "course_id": 1,
  "dob": "2003-08-15",
  "created_at": "2026-06-26T17:43:11"
}
```

---

## Courses Table

```text
courses
────────────────────
id
name
```

Example:

```json
[
  {
    "id": 1,
    "name": "B.TECH"
  },
  {
    "id": 2,
    "name": "BCA"
  },
  {
    "id": 3,
    "name": "MBBS"
  }
]
```

---

# 🔗 Database Relationship

A course can have multiple students.

```text
Course
   │
   │ 1
   │
   │
   │ many
   ▼
Students
```

For example:

```text
BCA
 │
 ├── Student 1
 └── Student 2

B.TECH
 │
 └── Student 3

MBBS
 │
 └── Student 4
```

The relationship is implemented using:

```text
courses.id
     ↓
students.course_id
```

---

# 🔌 API Endpoints

## Authentication

### Login

```http
POST /api/auth/login
```

Content type:

```text
application/x-www-form-urlencoded
```

Parameters:

```text
username
password
```

Example:

```text
username=admin@example.com
password=admin123
```

Successful response:

```json
{
  "access_token": "JWT_TOKEN",
  "token_type": "bearer"
}
```

---

# 👨‍🎓 Student APIs

### Get Students

```http
GET /api/students/
```

### Get Student

```http
GET /api/students/{student_id}
```

### Add Student

```http
POST /api/students/
```

### Update Student

```http
PUT /api/students/{student_id}
```

### Delete Student

```http
DELETE /api/students/{student_id}
```

---

# 📚 Course APIs

### Get Courses

```http
GET /api/courses/
```

### Search Courses

```http
GET /api/courses/?search=BCA
```

### Get Course

```http
GET /api/courses/{course_id}
```

### Add Course

```http
POST /api/courses/
```

### Update Course

```http
PUT /api/courses/{course_id}
```

### Delete Course

```http
DELETE /api/courses/{course_id}
```

---

# 📊 Dashboard API

```http
GET /api/dashboard/
```

Example response:

```json
{
  "total_students": 4,
  "total_courses": 3,
  "recent_students": []
}
```

---

# 🚀 Running the Project Locally

## 1. Clone the Repository

```bash
git clone https://github.com/shumail4138/StudentManagementSystem.git
```

Move into the project:

```bash
cd StudentManagementSystem
```

---

# 🐍 Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Start FastAPI

Run:

```bash
python -m uvicorn main:app --reload
```

Depending on the project structure, use:

```bash
python -m uvicorn app.main:app --reload
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

# ⚛️ Frontend Setup

Open a new terminal.

Move to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:3000
```

---

# 🔧 API Configuration

The frontend communicates with the FastAPI backend through Axios.

Example:

```javascript
const api = axios.create({
  baseURL: "https://studentmanagementsystem-46mg.onrender.com/api",
});
```

For local development:

```javascript
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
```

For production, the API should point to the deployed backend.

---

# 🔐 JWT Authentication Flow

The authentication process works like this:

```text
User enters email/password
           │
           ▼
       Login Form
           │
           ▼
       Axios POST
           │
           ▼
    FastAPI /login
           │
           ▼
  Validate credentials
           │
           ▼
     Create JWT token
           │
           ▼
      Return token
           │
           ▼
 localStorage.setItem()
           │
           ▼
      Dashboard
```

For subsequent requests:

```text
Frontend
   │
   ▼
Axios interceptor
   │
   ▼
Read JWT from localStorage
   │
   ▼
Authorization: Bearer TOKEN
   │
   ▼
FastAPI
```

---

# 🔄 CRUD Flow

## Create

```text
User
 ↓
Add Form
 ↓
POST API
 ↓
FastAPI
 ↓
SQLAlchemy
 ↓
SQLite
 ↓
Response
 ↓
Frontend
```

## Read

```text
Frontend
 ↓
GET API
 ↓
FastAPI
 ↓
Database
 ↓
JSON Response
 ↓
React State
 ↓
UI
```

## Update

```text
Edit Form
 ↓
PUT API
 ↓
FastAPI
 ↓
SQLAlchemy
 ↓
SQLite
 ↓
Response
 ↓
Students/Courses Page
```

## Delete

```text
Delete Button
 ↓
Confirmation
 ↓
DELETE API
 ↓
FastAPI
 ↓
Database
 ↓
Reload Data
```

---

# 🔎 Search

The course search functionality allows users to search courses by name.

Example:

```text
Search:
BCA
```

The frontend sends:

```http
GET /api/courses/?search=BCA
```

The backend filters the course list and returns matching courses.

This provides a more useful search experience than downloading every record and filtering only in the browser.

---

# 📱 Responsive Design

The interface is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

Tailwind CSS responsive utilities are used to adjust:

* Layout
* Tables
* Forms
* Sidebar
* Buttons
* Cards
* Search bars

---

# 🎨 UI Features

The application includes:

* Modern gradient interface
* Responsive sidebar
* Dashboard cards
* Responsive tables
* Search bars
* Form validation
* Confirmation dialogs
* Loading states
* Error messages
* Dark mode
* Mobile navigation
* Responsive buttons and forms

---

# ☁️ Deployment

## Frontend

The Next.js frontend is deployed using:

```text
Netlify
```

Live application:

https://students-ms.netlify.app/

## Backend

The FastAPI backend is deployed using:

```text
Render
```

Backend:

https://studentmanagementsystem-46mg.onrender.com/

Swagger:

https://studentmanagementsystem-46mg.onrender.com/docs

---

# ⚠️ Important Production Notes

This project is primarily a learning/full-stack portfolio project.

Before using it in a real production environment, consider implementing:

* Password hashing
* Environment variables for secrets
* Secure JWT secret management
* Token expiration/refresh strategy
* HTTPS-only secure cookies
* Role-based authorization
* Rate limiting
* Stronger input validation
* Database backups
* Production database such as PostgreSQL
* Proper logging
* Error monitoring
* CSRF protection where applicable
* Security headers

Do not store real administrator passwords directly in source code.

---

# 🧪 Testing

The backend can be tested using Swagger:

```text
https://studentmanagementsystem-46mg.onrender.com/docs
```

You can test:

* Login
* Student APIs
* Course APIs
* Dashboard APIs

Frontend functionality can be tested manually through:

```text
https://students-ms.netlify.app/
```

---

# 🐛 Troubleshooting

## Backend not connecting

Check the API URL in:

```text
services/api.js
```

Make sure it points to the deployed Render backend:

```text
https://studentmanagementsystem-46mg.onrender.com/api
```

---

## Login not working

Verify:

```text
Email: admin@example.com
Password: admin123
```

Then check:

1. Render backend is running.
2. `/docs` opens.
3. `/api/auth/login` works.
4. Frontend API URL points to Render.
5. CORS allows the Netlify domain.

---

## CORS Error

Make sure FastAPI allows the frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://students-ms.netlify.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

# 📈 Future Improvements

Possible future features:

* 👤 Multiple admin accounts
* 🔑 Password hashing
* 👥 Role-based access
* 📧 Email notifications
* 📊 Advanced analytics
* 📅 Attendance management
* 📝 Examination/marks management
* 📄 PDF student reports
* 📥 CSV import
* 📤 CSV/Excel export
* 🖼️ Student profile photos
* 🔔 Notifications
* 🔍 Advanced filtering
* 📄 Better pagination
* 🐘 PostgreSQL production database
* 🧪 Automated frontend/backend tests
* 🚀 CI/CD pipeline

---

# 🎯 Learning Objectives

This project demonstrates practical experience with:

* Full-stack development
* React
* Next.js App Router
* REST APIs
* FastAPI
* Python
* SQLAlchemy
* SQLite
* CRUD operations
* JWT authentication
* Axios
* Tailwind CSS
* Responsive UI
* Database relationships
* API integration
* Error handling
* Git and GitHub
* Netlify deployment
* Render deployment

---

# 📚 What I Learned From This Project

Building this project helped demonstrate how a modern web application works from end to end:

```text
Frontend
   ↓
React / Next.js
   ↓
Axios
   ↓
REST API
   ↓
FastAPI
   ↓
SQLAlchemy
   ↓
SQLite
```

It also provided practical experience in debugging issues involving:

* API communication
* CORS
* Authentication
* JWT
* Database relationships
* CRUD operations
* Dynamic Next.js routes
* Responsive design
* Dark mode
* Deployment
* Environment configuration

---

# 👨‍💻 Author

## Shumail Rahat Khan

Frontend / Full-Stack Developer

### GitHub

https://github.com/shumail4138

### Portfolio

https://shumailrahatkhan07.netlify.app/

---

# ⭐ If You Like This Project

If you find this project useful or helpful for learning:

⭐ Star the repository

🍴 Fork the repository

🐛 Report issues

💡 Suggest improvements

---

# 📄 License

This project is available for educational and portfolio purposes.

You can modify and improve it for your own learning.
