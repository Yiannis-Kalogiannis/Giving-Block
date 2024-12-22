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

   - [User API](#user-api)
   - [Service API](#service-api)

6. [Database Design](#6️⃣-database-design-📊)

- [User Schema](#user-schema)
- [Service Schema](#service-schema)
- [Chat Schema](#chat-schema)

7. [Page Structure](#7️⃣-page-structure-🌐)
8. [Development Log](#8️⃣-development-log-⌛)
9. [Issues](#9️⃣-Issues-⚠️)
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

### User API

#### Private Routes

##### Update User

- **Endpoint:** `/updateUser/:id`
- **Method:** `PUT`
- **Description:** Updates a user by their ID.
- **Parameters:** - `id` (URL parameter): The ID of the user to update.
- **Request Body:** - `firstName` (string): The first name of the user. - `lastName` (string): The last name of the user. - `email` (string): The email of the user. - `newPassword` (string): The new password for the user. - `bio` (string): The bio of the user. - `profilePicture` (string): The profile picture of the user. - `username` (string): The username of the user. - `oldPassword` (string): The old password of the user.
- **Responses:** - `200 OK`: User updated successfully. - `400 Bad Request`: Email or username already exists. - `401 Unauthorized`: Old password incorrect. - `404 Not Found`: User does not exist. - `422 Unprocessable Entity`: Password validation failed. - `500 Internal Server Error`: Error updating user.

##### Get User by ID

- **Endpoint:** `/getUserById/:id`
- **Method:** `GET`
- **Description:** Retrieves a user by their ID.
- **Parameters:** - `id` (URL parameter): The ID of the user to retrieve.
- **Responses:** - `200 OK`: User retrieved successfully. - `404 Not Found`: User doesn't exist. - `500 Internal Server Error`: Error retrieving user.

##### Get All Users

- **Endpoint:** `/getAllUsers`
- **Method:** `GET`
- **Description:** Retrieves all users.
- **Responses:** - `200 OK`: Users retrieved successfully. - `500 Internal Server Error`: Error retrieving users.

##### Delete All Users

- **Endpoint:** `/deleteAllUsers`
- **Method:** `DELETE`
- **Description:** Deletes all users.
- **Responses:** - `200 OK`: All users deleted successfully. - `500 Internal Server Error`: Error deleting users.

##### Delete User

- **Endpoint:** `/deleteUser/:id`
- **Method:** `DELETE`
- **Description:** Deletes a user by their ID.
- **Parameters:** - `id` (URL parameter): The ID of the user to delete.
- **Responses:** - `200 OK`: User deleted successfully. - `404 Not Found`: User does not exist. - `500 Internal Server Error`: Error deleting user.

#### Public Routes

##### User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Request Body:** - `email` (string): The email of the user. - `password` (string): The password of the user.
- **Responses:** - `200 OK`: User logged in successfully. - `400 Bad Request`: Both fields are required. - `401 Unauthorized`: Password incorrect. - `404 Not Found`: User doesn't exist. - `500 Internal Server Error`: Error logging in user.

##### User Register

- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Middleware:** `upload` (Handles image upload)
- **Request Body:** - `firstName` (string): The first name of the user. - `lastName` (string): The last name of the user. - `email` (string): The email of the user. - `password` (string): The password of the user. - `username` (string): The username of the user. - `bio` (string): The bio of the user. - `profilePicture` (string): The profile picture of the user.
- **Responses:** - `201 Created`: User created successfully. - `400 Bad Request`: All fields are required or email/username already exists. - `500 Internal Server Error`: Error creating user.

### Service API

#### Private Routes

##### Create Service

- **Endpoint:** `/createService/:id`
- **Method:** `POST`
- **Description:** Creates a new service.
- **Parameters:** - `id` (URL parameter): The ID of the user creating the service.
- **Request Body:** - `title` (string): The title of the service. - `body` (string): The body of the service. - `category` (string): The category of the service. - `image` (string): The image of the service. - `address` (string): The address of the service. - `city` (string): The city of the service. - `country` (string): The country of the service. - `zip` (string): The zip code of the service. - `phone` (string): The phone number of the service. - `status` (string): The status of the service.
- **Responses:** - `201 Created`: Service created successfully. - `400 Bad Request`: All fields are required. - `500 Internal Server Error`: Error creating service.

##### Update Service

- **Endpoint:** `/updateService/:id`
- **Method:** `PUT`
- **Description:** Updates a service by its ID.
- **Parameters:** - `id` (URL parameter): The ID of the service to update.
- **Request Body:** - `title` (string): The title of the service. - `body` (string): The body of the service. - `category` (string): The category of the service. - `image` (string): The image of the service. - `address` (string): The address of the service. - `city` (string): The city of the service. - `country` (string): The country of the service. - `zip` (string): The zip code of the service. - `phone` (string): The phone number of the service. - `status` (string): The status of the service.
- **Responses:** - `200 OK`: Service updated successfully. - `403 Forbidden`: User does not have access to this service. - `404 Not Found`: Service not found. - `500 Internal Server Error`: Error updating service.

##### Delete Service

- **Endpoint:** `/deleteService/:id`
- **Method:** `DELETE`
- **Description:** Deletes a service by its ID.
- **Parameters:** - `id` (URL parameter): The ID of the service to delete.
- **Responses:** - `200 OK`: Service deleted successfully. - `403 Forbidden`: User does not have access to this service. - `404 Not Found`: Service not found. - `500 Internal Server Error`: Error deleting service.

##### Get All Services of One User

- **Endpoint:** `/getAllServicesOfOneUser/:id`
- **Method:** `GET`
- **Description:** Retrieves all services of one user.
- **Parameters:** - `id` (URL parameter): The ID of the user.
- **Responses:** - `200 OK`: Services retrieved successfully. - `500 Internal Server Error`: Error retrieving services.

#### Public Routes

##### Get All Services

- **Endpoint:** `/getAllServices`
- **Method:** `GET`
- **Description:** Retrieves all services.
- **Responses:** - `200 OK`: Services retrieved successfully. - `500 Internal Server Error`: Error retrieving services.

## 6️⃣ Database Design 📊

## 1. UserSchema

Stores user details such as authentication and profile information.

```javascript
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    profilePicture: {
      type: String,
      default: '../assets/images/default-image.png',
    },
    bio: { type: String, trim: true, default: null },
  },
  { timestamps: true }
);
```

**Key Fields:**

- `username`, `email`: Authentication info (required).
- `firstName`, `lastName`: Personal details (required).
- `profilePicture`, `bio`: Optional user profile data.

## 2. Service Schema

Represents the services/tasks users can post, including task details.

```javascript
const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: { type: Boolean, default: true },
    image: { type: String, default: '../assets/images/default-image.png' },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    zip: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);
```

**Key Fields:**

- `title`, `body`: Service/task description (required).
- `userId`: Linked to the user offering the service.
- `status`: Indicates whether the service is active (default: true).

## 3. Chat Schema

Stores messages exchanged between users regarding tasks or services.

```javascript
const chatSchema = new mongoose.Schema(
  {
    msgContent: { type: String, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    readStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);
```

**Key Fields:**

- `msgContent`: The content of the message (required).
- `sender`, `receiver`: Users involved in the conversation.
- `readStatus`: Indicates if the message is read (default: false).

## Relationships

- **User ↔ Service**: A user can create many services. Services are linked to users via `userId`.
- **User ↔ Chat**: A user can send and receive many messages. Each chat has `sender` and `receiver` fields.

## 8️⃣ Development Log ⌛

# 🛠️ Giving-Block Dev Log (Dec 17 - Dec 22, 2024) 🛠️

## Week 3 (Dec 17 - Dec 22, 2024)

### ⚙️ Backend Development 🖥️

**Dec 17, 2024:**

- 📜 Created user registration and login controllers.

**Dec 18, 2024:**

- 🗂️ Completed CRUD operations for users (register, update, delete by ID, delete all, and get by ID).
- 🔐 Implemented authorization for secured access.
- ⚙️ Developed service CRUD operations (create, update, delete) and added filters for status and category.

**Dec 19, 2024:**

- 🔍 Updated backend GET services to handle search functionality.

**Dec 20, 2024:**

- ⚙️ Added serviceType to the schema to indicate if the user is offering help or requesting help.
- 📷 Added Sharp middleware for image processing (pending cleanup of original images post-resizing).

**Dec 21, 2024:**

- 🔄 Implemented debounce functionality in search.
- 📋 Added filters for service status (active/inactive) in search.

---

### ⚒️ Frontend Development 💻

**Dec 19, 2024:**

- 🛠️ Built service card and search components (functionality complete, styling pending).
- 🗂️ Populated services with user details for better display on cards.

**Dec 20, 2024:**

- ✅ Completed LogIn and Register pages.

**Dec 21, 2024:**

- 🛠️ Populated images in services via user relationships.
- 🏗️ Started separating global state stores for search and list.

**Dec 22, 2024:**

- ⚡ Added conditional rendering to allow only service owners to edit or delete their services.
- ➕ Added buttons for edit and delete in service cards (functionality pending).
- ✏️ Styled components and pages with Material-UI.
- 🖼️ Integrated images into the navbar.
- 📅 Added a footer (links pending).
- 🔍 Enhanced the search bar by adding a modal for creating services.
- 🧹 Minor improvements to home page and service card styling.

## 9️⃣ Issues ⚠️

### Issues Encountered

⚠️ **List Reload Issue**: The list does not reload after rendering (update or delete service).

⚠️ **User Image and info Persistence**: When logging out and logging in again, the user image and name remain the same unless the page is reloaded.

⚠️ **Default Service Image**: Ensure a default image is added to services even if the user hasn't uploaded one.

⚠️ **Default Profile Image**: Ensure a default image is added to user profiles even if the user hasn't uploaded one.

⚠️ **Close form after submitting new service**: Create service page is a modal that wont close after press submit, tried to add the handle close function from parent component (navbar) but wont work

⚠️ **Delete image after resize**: Make SHARP(the resize tool) to delete the image after resizing it

## 🔒 Security

blank

## 🔧 Future Enhancements(wishlist/as i code things i remember to add)

blank
