# 📦 **Giving-Block**

### _A Community-driven Web Platform for Neighborhood Support_

**Giving-Block** is a web platform designed to foster community support within neighborhoods. It allows residents to post tasks they are willing to do for others voluntarily. Community members can also browse available tasks posted by others and offer their assistance. Real-time communication is enabled using **Socket.io**, allowing users to connect instantly with task posters, ensuring efficient coordination and collaboration.

---

# 📚 **Index**

- [1️⃣ Introduction](#1-introduction)
- [2️⃣ MoSCoW Method](#2-moscow-method)
  - [🔑 Must Have (M)](#must-have-m)
  - [✅ Should Have (S)](#should-have-s)
  - [🌟 Could Have (C)](#could-have-c)
  - [❌ Won't Have (W)](#wont-have-w)
- [3️⃣ Technologies Used](#3-technologies-used)
  - [🔹 Core Technologies (MERN Stack)](#core-technologies-mern-stack)
  - [🔹 Tools](#tools)
  - [🔹 Libraries](#libraries)
  - [🔹 Frontend Frameworks and UI Libraries](#frontend-frameworks-and-ui-libraries)
- [4️⃣ Next Steps](#4-next-steps)

---

# 1️⃣ **Introduction** 🌍 <a id="1-introduction"></a>

**Giving-Block** is a web platform designed to foster community support within neighborhoods. It allows residents to post tasks they are willing to do for others voluntarily. Community members can also browse available tasks posted by others and offer their assistance. Real-time communication is enabled using **Socket.io**, allowing users to connect instantly with task posters, ensuring efficient coordination and collaboration.

---

<br><br><br><br>

# 2️⃣ **MoSCoW Method** 🎯 <a id="2-moscow-method"></a>

## 🔑 [Must Have (M)](#must-have-m) <a id="must-have-m"></a>

These features are essential for the platform's basic functionality and cannot be launched without them.

- [ ] **User Authentication & Profile page**: Essential for users to sign up/login securely using JWT, and manage their profiles.
- [ ] **Task Posting System**: Core feature allowing users to post, edit, and delete tasks with proper categorization and task status.
- [ ] **Real-Time Chat**: Enables real-time communication through **Socket.io**, ensuring efficient coordination between task posters and helpers.
- [ ] **File Uploads**: Allows users to upload task-related images for clarity, and profile images as well, using **Multer**.
- [ ] **Profile Pictures**: Users can upload profile images, with automatic resizing and compression using **Sharp**.

- [ ] **Task Browsing & Discovery**: Allows users to search, filter, and discover tasks based on keywords, category, and urgency.
- [ ] **Security Features**: Ensures safe user interactions with password encryption (**Bcrypt**).
      <br><br>

## ✅ [Should Have (S)](#should-have-s) <a id="should-have-s"></a>

These features are important but not critical for the initial launch. They can be added later without affecting the core functionality.

- [ ] **User Feedback & Ratings**: Builds trust by allowing users to rate and review each other after completing tasks.
- [ ] **Task Bidding / Application System**: Allows users to apply for tasks with a message, supporting multiple helpers for a single task.
- [ ] **Task Management Dashboard**: Provides users with an overview of their active, completed, and canceled tasks.
- [ ] **Admin Dashboard (Superuser)**: Allows administrators to manage users, moderate content, and view platform analytics.
- [ ] **In-App Payments (Optional)**: Enables tipping or payment through **PayPal**, making it easier for users to compensate helpers.
- [ ] **Real-Time Notifications**: Keeps users informed with notifications about key actions, such as task updates or new messages.
- [ ] **Location-Based Discovery**: Helps users find tasks near their location, prioritizing tasks nearby for better engagement.

- [ ] **User Roles & Permissions**: Differentiates between Task Posters and Helpers, enhancing user flow by showing relevant tasks.
      <br><br>

## 🌟 [Could Have (C)](#could-have-c) <a id="could-have-c"></a>

These are nice-to-have features that can enhance the user experience but can be postponed for later versions if time is limited.

- [ ] **Gamification**: Introduces a badge system and a leaderboard for top helpers, encouraging engagement.
      <br><br>

## ❌ [Won't Have (W)](#wont-have-w) <a id="wont-have-w"></a>

These features are considered out of scope for now and will not be part of the initial release. They are nice but not essential for the first iteration.

- [ ] **Localization / Multilingual Support**: Broadens platform accessibility by supporting multiple languages.
- [ ] **Mobile App**: Creates a **PWA** or **React Native** app, offering a mobile-friendly experience.
- [ ] **Dark Mode / Theme Customization**: Provides a toggle between light and dark themes, improving user experience.

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

---

## 🔹 **Libraries** <a id="libraries"></a>

- ![Bcrypt](https://img.shields.io/badge/Bcrypt-8a8a8a?style=flat&logo=python&logoColor=white) - Library for hashing passwords and enhancing security.
- ![CORS](https://img.shields.io/badge/CORS-4285F4?style=flat&logo=googlechrome&logoColor=white) - Middleware for handling cross-origin requests.
- ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white) - Secure authentication method using JSON Web Tokens.

---

## 🔹 **Frontend Frameworks and UI Libraries** <a id="frontend-frameworks-and-ui-libraries"></a>

- ![Bootstrap](https://img.shields.io/badge/Bootstrap-563d7c?style=flat&logo=bootstrap&logoColor=white) - Framework for responsive and mobile-first web design.
- ![MaterialUI](https://img.shields.io/badge/Bootstrap-563d7c?style=flat&logo=bootstrap&logoColor=white) - React UI framework that provides pre-built, customizable components following Google's Material Design guidelines.

---

<br><br><br><br>

# 4️⃣ **Next Steps** 🚀 <a id="4-next-steps"></a>

- Implement the **Must Have (M)** features first to ensure the core functionality.
- Once the platform is functional, focus on the **Should Have (S)** features.
- **Could Have (C)** features can be explored once the primary features are stable and fully operational.
- Features in the **Won't Have (W)** section will not be part of the initial release but can be considered for future updates.
