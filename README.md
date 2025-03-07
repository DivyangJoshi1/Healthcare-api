# Backend Intern Assignment  

## 📖 Overview  
This project is part of the Backend Intern Assignment, where we implemented user authentication and management functionalities using **NestJS**, **Prisma ORM**, **Postgre SQL**, and **JWT authentication**.

## ✅ Features Implemented  

### **Phase 1: Project Setup & Database Integration**  
- Initialized a **NestJS** project and configured **Prisma ORM** with **POSTGRESQL**.  
- Defined database models for **User**.  

### **Phase 2: User Authentication (Register & Login)**  
- Implemented **user registration** with hashed passwords using **bcrypt**.  
- Added **email-based login** with JWT authentication.  
- Handled errors for missing fields, existing users, and invalid credentials.  

### **Phase 3: Role-Based Access Control (RBAC)**  
- Defined **roles**: `ADMIN`, `DOCTOR`, `PATIENT`.  
- Ensured role assignment during registration.  
- Secured routes based on user roles.  

## ⚠️ **Pending Work (Phase 4)**  
- Further enhancements to user authorization and additional security measures.  

## 🛠️ **Tech Stack**  
- **NestJS** - Backend framework  
- **Prisma ORM** - Database management  
- **MongoDB** - NoSQL database  
- **JWT** - Authentication  
- **Bcrypt** - Password hashing  

## 📌 How to Run  
1. Clone the repository:  

```sh
npm install
```

## Compile and run the project

```sh
npm run start
```

# watch mode
```sh
npm run start:dev
```


