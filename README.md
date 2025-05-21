# 🚀 Authentication API

![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg) ![Status](https://img.shields.io/badge/status-complete-brightgreen.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)


> Powerful and scalable backend API built with modern technologies.

---

## 📚 About

This is a RESTful API designed to handle user authentication, including registration, login, JWT-based session management, and secure password hashing using bcrypt. It supports modern best practices and is easily integrable with frontend applications or third-party services.

---

## 🧰 Tech Stack

- ⚙️ Node.js & Fastify 
- 📘 TypeScript  
- 🗃️ MongoDB  
- 🔐 JWT for Authentication
- 🧂 bcrypt for Password Hashing 

---

## 📂 Project Structure

```bash
📦 backend
|  | ├── public/
|      | └── imgs/
|        | ├── others
|        | └── users
|  | └──  src/
|  | ├── connection/
|  | ├── controllers/
|  | ├── helpers/
|      | ├── interfaces
|      | ├── types
|      | └── utils
|  | ├── middlewares/
|  | ├── models/
|  | ├── routes/
|  | └── server.ts

```
---

## 📬 Main Endpoints and Features

### 🔐 AuthController

| Method | Route              | Description                   |
| ------ | ------------------ | ----------------------------- |
| POST   | /api/auth/register | Register a new user           |
| POST   | /api/auth/login    | Authenticate and login a user |

###  👤 UserController

| Method | Route            | Description             |
| ------ | ---------------- | ----------------------- |
| PUT    | /api/user/update | Update user information |
| DELETE | /api/user/delete | Delete the current user |


###  🛡️ AdminController 

| Method | Route                      | Description                            |
| ------ | -------------------------- | -------------------------------------- |
| GET    | /api/admin/findAdminUsers  | Retrieve all users with admin access   |
| GET    | /api/admin/findAllUsers    | Retrieve all registered users          |
| POST   | /api/admin/giveAccessLevel | Assign or update a user's access level |

---

## 🖥️ Running the Project

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/Hugolelis/AuthAPI.git
cd AuthAPI
```

### 📦 2. Install Dependencies

```bash
npm install
```

### ⚙️ 3. Set Up Environment Variables (.env)

```bash
DB_URI=mongodb://localhost:27017/authAPI
PORT=3000
HOST=0.0.0.0
SECRET=secreta123
```

### ▶️ 4. Start the Server

```bash
npm start
```
