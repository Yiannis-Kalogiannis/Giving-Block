# 🎟️ Giving-Block

A Community-driven Web Platform for Neighborhood Support

Giving-Block is a web platform designed to foster community support within neighborhoods. It allows residents to post tasks they are willing to do for others voluntarily. Community members can also browse available tasks posted by others and offer their assistance. Real-time communication is enabled using Socket.io, allowing users to connect instantly with task posters, ensuring efficient coordination and collaboration.

## 📚 Index

1. [Introduction](#1️⃣-introduction-🌍)
2. [MoSCoW Method](#2️⃣-moscow-🎯)
   - [Must Have (M)](#🔑-must-have-m)
   - [Should Have (S)](#✅-should-have-s)
   - [Could Have (C)](#🌟-could-have-c)
   - [Won't Have (W)](#❌-wont-have-w)
3. [Technologies Used](#3️⃣-technologies-used-🛠️)
   - [Core Technologies (MERN Stack)](#🔹-core-technologies-mern-stack)
   - [Tools](#🔹-tools)
   - [Libraries](#🔹-libraries)
   - [Frontend Frameworks and UI Libraries](#🔹-frontend-frameworks-and-ui-libraries)
4. [Installation](#4️⃣-installation-⚙️)
   - [Server Installation](#server-installation)
   - [Client Installation](#client-installation)
5. [API Documentation](#5️⃣-api-documentation-🔧)
6. [Database Design](#6️⃣-database-design-📊)
7. [Page Structure](#7️⃣-page-structure-🌐)
8. [Development Log](#8️⃣-development-log-⌛)
9. [Testing](#9️⃣-testing-✅)
10. [Security](#🔒-security)
11. [Future Enhancements](#🔧-future-enhancements)

## 1️⃣ Introduction 🌍

Giving-Block is a web platform designed to foster community support within neighborhoods. It allows residents to post tasks they are willing to do for others voluntarily. Community members can also browse available tasks posted by others and offer their assistance. Real-time communication is enabled using Socket.io, allowing users to connect instantly with task posters, ensuring efficient coordination and collaboration.

# 2️⃣ **MoSCoW** 🎯 <a id="2-moscow-method"></a>

## 🔑 [Must Have (M)](#must-have-m) <a id="must-have-m"></a>

These features are essential for the platform's basic functionality and cannot be launched without them.

- **User Authentication**: Essential for users to sign up/login securely using JWT, and manage their profiles(edit).
- **Profile page**: Users manage their profiles(password/names/profile image).
- **Security Features**: Ensures safe user interactions with password encryption (**Bcrypt**).
- **Task Posting System**: Core feature allowing users to post, edit, and delete tasks with proper categorization and task status.
- **File Uploads**: Allows users to upload task-related images for clarity, and profile images as well, using **Multer**.
- **Profile Pictures**: Users can upload profile images, with automatic resizing and compression using **Sharp**.
- **Task Browsing & Discovery**: Allows users to search, filter, and discover tasks(help wanted. or help offered) based on keywords and category.
- **Real-Time Chat**: Enables real-time communication through **Socket.io**, ensuring efficient coordination between task posters and helpers.
  <br><br>

## ✅ [Should Have (S)](#should-have-s) <a id="should-have-s"></a>

These features are important but not critical for the initial launch. They can be added later without affecting the core functionality.

- [ ] **Task Management Dashboard**: Provides users with an overview of their active, completed, and canceled tasks.
- [ ] **Real-Time Notifications**: Keeps users informed with notifications about key actions, such as task updates or new messages.
- [ ] **Dark Mode / Theme Customization**: Provides a toggle between light and dark themes, improving user experience.
      <br><br>

## 🌟 [Could Have (C)](#could-have-c) <a id="could-have-c"></a>

These are nice-to-have features that can enhance the user experience but can be postponed for later versions if time is limited.

- [ ] **User Feedback & Ratings**: Builds trust by allowing users to rate and review each other after completing tasks.
- [ ] **User Roles & Permissions**: Differentiates between Task Posters and Helpers, enhancing user flow by showing relevant tasks.
- [ ] **Task Bidding / Application System**: Allows users to apply for tasks with a message, supporting multiple helpers for a single task.
- [ ] **Gamification**: Introduces a badge system and a leaderboard for top helpers, encouraging engagement.
- [ ] **Admin Dashboard (Superuser)**: Allows administrators to manage users, moderate content, and view platform analytics.

<br><br>

## ❌ [Won't Have (W)](#wont-have-w) <a id="wont-have-w"></a>

These features are considered out of scope for now and will not be part of the initial release. They are nice but not essential for the first iteration.

- [ ] **Location-Based Discovery**: Helps users find tasks near their location, prioritizing tasks nearby for better engagement.
- [ ] **Localization / Multilingual Support**: Broadens platform accessibility by supporting multiple languages.
- [ ] **Mobile App**: Creates a **PWA** or **React Native** app, offering a mobile-friendly experience.
- [ ] **In-App Payments (Optional)**: Enables tipping or payment through **PayPal**, making it easier for users to compensate helpers.

---

<br><br><br><br>

# 3️⃣ **Technologies Used** 🛠️ <a id="3-technologies-used"></a>

## 🔹 **Core Technologies (MERN Stack)** <a id="core-technologies-mern-stack"></a>

The **MERN** stack powers the backend and frontend of Giving-Block, providing a full-stack JavaScript solution.

- ![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=flat&logo=mongodb&logoColor=white) - NoSQL database to store user data and tasks.
- ![Express](https://img.shields.io/badge/Express-4a4a4a?style=flat&logo=express&logoColor=white) - Web framework for Node.js to handle routes and server-side logic.
- ![React](https://img.shields.io/badge/React-61dafb?style=flat&logo=react&logoColor=black) - Library for building dynamic user interfaces.
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) - JavaScript runtime for server-side development.

---

## 🔹 **Tools** <a id="tools"></a>

- ![NPM](https://img.shields.io/badge/NPM-cc3534?style=flat&logo=npm&logoColor=white) - Package manager for JavaScript, used to manage dependencies.
- ![Multer](https://img.shields.io/badge/Multer-ff4b00?style=flat&logo=express&logoColor=white) - Middleware for handling file uploads.
- ![Sharp](https://img.shields.io/badge/Sharp-ff4b00?style=flat&logo=python&logoColor=white) - Image processing library to resize and optimize images.
- ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socketdotio&logoColor=white) - Real-time communication library for enabling instant chat.
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=FFD700) - Next generation frontend tooling for fast and optimized development.

---

## 🔹 **Libraries** <a id="libraries"></a>

- ![Bcrypt](https://img.shields.io/badge/Bcrypt-8a8a8a?style=flat&logo=python&logoColor=white) - Library for hashing passwords and enhancing security.
- ![CORS](https://img.shields.io/badge/CORS-4285F4?style=flat&logo=googlechrome&logoColor=white) - Middleware for handling cross-origin requests.
- ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white) - Secure authentication method using JSON Web Tokens.
- ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat&logo=react&logoColor=white) - A small, fast, and scalable state management solution for React.

---

## 🔹 **Frontend Frameworks and UI Libraries** <a id="frontend-frameworks-and-ui-libraries"></a>

- ![Bootstrap](https://img.shields.io/badge/Bootstrap-563d7c?style=flat&logo=bootstrap&logoColor=white) - Framework for responsive and mobile-first web design.
- ![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=flat&logo=material-ui&logoColor=white) - React UI framework that provides pre-built, customizable components following Google's Material Design guidelines.

---

<br><br>

## 4️⃣ Installation ⚙️

### Server Installation

To set up the server for the Giving-Block platform, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:nottiivago/Giving-Block.git
   cd giving-block
   ```

2. **Install Dependencies**:
   Navigate to the server directory and install the required dependencies using npm:

   ```bash
   cd server
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the server directory and add the necessary environment variables:

   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret
   SALT_ROUND=10-12
   ```

4. **Run the Server**:
   Start the server using npm:

   ```bash
   npm start
   ```

5. **Verify the Server**:
   Open your browser and navigate to `http://localhost:8080` to ensure the server is running correctly.

### Client Installation

To set up the client for the Giving-Block platform, follow these steps:

1. **Navigate to the Client Directory**:

   ```bash
   cd client
   ```

2. **Install Dependencies**:
   Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. **Run the Client**:
   Start the client using npm:

   ```bash
   npm start
   ```

4. **Verify the Client**:
   Open your browser and navigate to `http://localhost:5173` to ensure the client is running correctly.

---

## 5️⃣ API Documentation 🔧

## Private Routes

### Update User

- **Endpoint:** `/updateUser/:id`
- **Method:** `PUT`
- **Description:** Updates a user by their ID.
- **Parameters:** - `id` (URL parameter): The ID of the user to update.
- **Request Body:**

      - `firstName` (string): The first name of the user.
      - `lastName` (string): The last name of the user.
      - `email` (string): The email of the user.
      - `newPassword` (string): The new password for the user.
      - `bio` (string): The bio of the user.
      - `profilePicture` (string): The profile picture of the user.
      - `username` (string): The username of the user.
      - `oldPassword` (string): The old password of the user.

- **Responses:**

      - `200 OK`: User updated successfully.
      - `400 Bad Request`: Email or username already exists.
      - `401 Unauthorized`: Old password incorrect.
      - `404 Not Found`: User does not exist.
      - `422 Unprocessable Entity`: Password validation failed.
      - `500 Internal Server Error`: Error updating user.

### Get User by ID

- **Endpoint:** `/getUserById/:id`
- **Method:** `GET`
- **Description:** Retrieves a user by their ID.
- **Parameters:** - `id` (URL parameter): The ID of the user to retrieve.
- **Responses:**

      - `200 OK`: User retrieved successfully.
      - `404 Not Found`: User doesn't exist.
      - `500 Internal Server Error`: Error retrieving user.

### Get All Users

- **Endpoint:** `/getAllUsers`
- **Method:** `GET`
- **Description:** Retrieves all users.
- **Responses:**

      - `200 OK`: Users retrieved successfully.
      - `500 Internal Server Error`: Error retrieving users.

### Delete All Users

- **Endpoint:** `/deleteAllUsers`
- **Method:** `DELETE`
- **Description:** Deletes all users.
- **Responses:**

      - `200 OK`: All users deleted successfully.
      - `500 Internal Server Error`: Error deleting users.

## Public Routes

### User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Request Body:**

      - `email` (string): The email of the user.
      - `password` (string): The password of the user.

- **Responses:**

      - `200 OK`: User logged in successfully.
      - `400 Bad Request`: Both fields are required.
      - `401 Unauthorized`: Password incorrect.
      - `404 Not Found`: User doesn't exist.
      - `500 Internal Server Error`: Error logging in user.

### User Register

- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Middleware:** `upload` (Handles image upload)
- **Request Body:**

      - `firstName` (string): The first name of the user.
      - `lastName` (string): The last name of the user.
      - `email` (string): The email of the user.
      - `password` (string): The password of the user.
      - `username` (string): The username of the user.
      - `bio` (string): The bio of the user.
      - `profilePicture` (string): The profile picture of the user.

- **Responses:**

      - `201 Created`: User created successfully.
      - `400 Bad Request`: All fields are required or email/username already exists.
      - `500 Internal Server Error`: Error creating user.

## 6️⃣ Database Design 📊

blank

## 7️⃣ Page Structure 🌐

blank

## 8️⃣ Development Log ⌛

# 🛠️ Giving-Block Dev Log (Dec 11 - Dec 18, 2024) 🛠️

## Week 1 (Dec 11 - Dec 12, 2024)

- 📘 **Project Setup**: Initialized repository and project structure.
- ✍️ **Documentation**: Started and updated the README file.

## Week 2 (Dec 17 - Dec 18, 2024)

- ⚙️ **Backend Development**:
  - **User Management**: Created user schema, registration, login, update, delete (single and all), and get user by ID.
  - **Authorization**: Implemented user authorization.
- 📦 **Service Management**: Created schema, controllers, and routes for create, update, delete, and filter by status/category.
- 💬 **Chat System**: Initial chat schema completed.
- 🔧 **Bug Fixes**: Minor fixes to controllers.
- 🚀 **Server Live**: Project structure finalized, server is up and running.

## 9️⃣ Testing ??

blank

## 🔒 Security

blank

## 🔧 Future Enhancements(wishlist/as i code things i remember to add)

blank
