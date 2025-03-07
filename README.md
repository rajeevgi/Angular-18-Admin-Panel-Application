# Admin Panel Application (Angular 18 & Node.js & MySQL)

## 🚀 Project Overview
This **Admin Panel Application** allows role-based access management for **Super Admin, Admin, and Users**. The application consists of:

- **Frontend:** Built with **Angular 18**.
- **Backend:** Node.js with Express and MySql.
- **Authentication:** Session-based authentication with middleware protection.

## 🏗️ Project Structure

### **Backend Structure (Node.js & Express)**
```
backend/
│── config/
│   ├── db.js                # MongoDB configuration
│
│── models/
│   ├── user.js              # User model schema
│   ├── admin.js             # Admin model schema
│
│── controllers/
│   ├── adminController.js   # Admin-related operations
│   ├── userController.js    # User-related operations
│   ├── loginController.js   # Authentication operations
│
│── middleware/
│   ├── authMiddleware.js    # Authentication Middleware
│
│── routes/
│   ├── adminRoutes.js       # Routes for Admin operations
│   ├── userRoutes.js        # Routes for User operations
│   ├── authRoutes.js        # Routes for Authentication
│
│── .env                     # Environment variables
│── server.js                 # Main entry file
│── package.json              # Dependencies
```

### **Frontend Structure (Angular 18)**
```
frontend/admin-panel
└── src/app/pages/
    ├── add-admin/           # Add new admin
    ├── update-admin/        # Update admin details
    ├── delete-admin/        # Delete an admin
    ├── list-admin/          # List all admins
    ├── add-user/            # Add new user
    ├── list-user/           # List all users
    ├── update-user/         # Update user details
    ├── delete-user/         # Delete a user
└── src/app/services/
    ├── api.service.ts       # Service for API calls
```

## 🛠️ Installation & Setup

### **Backend Setup**
1. Install dependencies:
   ```sh
   npm install
   ```
2. Configure **.env** file:
   ```env
   MYSQL_HOST
   MYSQL_USER
   MYSQL_PASS
   PORT=5000
    ```
3. Start the backend server:
   ```sh
   npm start
   ```

### **Frontend Setup**
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend/admin-panel
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Angular application:
   ```sh
   ng serve --open
   ```

## 🔑 Role-Based Access
| Role        | Permissions |
|------------|-------------|
| Super Admin | Manage Admins & Users |
| Admin       | Manage Users |
| User        | Access limited features |

## 📡 API Endpoints

### **Authentication Routes** (`authRoutes.js`)
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| POST   | /api/auth/login  | User Login |
| POST   | /api/auth/signup | User Signup |

### **Admin Routes** (`adminRoutes.js`)
| Method | Endpoint             | Description |
|--------|---------------------|-------------|
| GET    | /api/admins          | List all admins |
| POST   | /api/admins          | Add an admin |
| PUT    | /api/admins/:id      | Update admin |
| DELETE | /api/admins/:id      | Delete an admin |

### **User Routes** (`userRoutes.js`)
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| GET    | /api/users       | List all users |
| POST   | /api/users       | Add a user |
| PUT    | /api/users/:id   | Update user |
| DELETE | /api/users/:id   | Delete a user |

## 🔧 Key Features
✅ User Authentication
✅ Super Admin, Admin & User Role-Based Access  
✅ Manage Admins and Users  
✅ Project is under implementation or in-progress
