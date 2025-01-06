# User Onboarding Platform

This is a user onboarding platform built using the **MERN stack** (MongoDB, Express, React, Node.js). The platform allows users to authenticate via Google or email, link their bank accounts through the **Plaid API**, and track their progress through the onboarding process.

Live demo: [https://useronboarding01.netlify.app/](https://useronboarding01.netlify.app/)

---

## Features

### **1. Registration**

- Users can create an account by providing:
  - **Username**
  - **Email**
  - **Password** (with confirmation)
  - **Address** (using **Geoapify** for location-based suggestions)
- Upon successful registration, users are redirected to the login page.

### **2. Login & Authentication**

- **Manual Login**:
  - Users log in using their email and password.
  - A verification link is sent to the user's email for manual login to ensure secure authentication.
- **Google Sign-In**:
  - Users can log in using **Google** for faster authentication.

### **3. Onboarding Progress**

- Users are guided through the onboarding process, with a progress bar on the homepage that tracks their completion of various steps.

### **4. Bank Account Linking**

- Users can securely link their bank accounts using the **Plaid API**.
- After linking, users can view account details, transactions, and other financial information.

---

## Technologies Used

- **Frontend**:

  - **React.js**: Dynamic user interface with real-time updates.
  - **Geoapify API**: Location-based suggestions for addresses.

- **Backend**:
  - **Node.js**: Backend server for handling business logic.
  - **Express.js**: Routes and middleware for backend.
  - **MongoDB**: Database for storing user and authentication data.
  - **JWT**: For secure token-based user authentication.
  - **Plaid API**: For bank account linking and transaction management.
  - **Google OAuth**: For Google Sign-In authentication.

---

## Installation

Follow these steps to get the project up and running locally.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
