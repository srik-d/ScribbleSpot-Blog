## ScribbleSpot - Blog
### *Stories Unleashed*

ScribbleSpot is a dynamic blogging platform built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a seamless and interactive experience for users to share and discover stories.

### MERN Stack Overview

The MERN stack consists of:
- **MongoDB:** A NoSQL database.
- **Express.js:** A web application framework for Node.js.
- **React:** A library for building user interfaces.
- **Node.js:** A JavaScript runtime for server-side development.

### Key Features

1. **User Authentication and Authorization:**
   - **Registration and Login:** Users can create accounts and securely log in.
   - **Role-Based Access Control:** Permissions are set up so that only authenticated users can create, edit, or delete blogs.

2. **Blog Management:**
   - **View Blogs:** All users, regardless of authentication status, can view blogs created by others.
   - **Create, Edit, and Delete Blogs:** Authenticated users can create new blogs, edit their own posts, and delete them if necessary.

3. **Notifications:**
   - **React Hot Toast:** Instant notifications are implemented for actions like successful login, blog creation, and deletion confirmation, enhancing the user experience.

4. **Security:**
   - **Password Hashing:** User passwords are hashed using bcrypt before being stored in the database, ensuring they remain private even from administrators.

5. **Developer Experience:**
   - **Console-Based Error Handling:** Comprehensive error handling is implemented with console logs for developers to debug and resolve issues efficiently.

### Technical Stack

- **Frontend:**
  - **React:** For building the dynamic and responsive user interface.
  - **Material-UI:** Used to replace CSS and reduce the lines of code, providing a consistent and sleek design.
  - **React Hot Toast:** For user notifications.

- **Backend:**
  - **Node.js and Express.js:** For building the server and handling API requests.
  - **MongoDB:** As the database to store user information and blog data.
  - **Mongoose:** For object data modeling (ODM) to interact with MongoDB.

- **Middleware and Utilities:**
  - **bcrypt:** For hashing user passwords.
  - **jsonwebtoken (JWT):** For authentication and secure communication.
  - **concurrently:** To run the client and server simultaneously during development.
  - **dotenv:** For environment variable management.

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/srik-d/sspot.git
   cd sspot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. **Create a `.env` file in the root directory with the following variable:**
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

### Conclusion

ScribbleSpot leverages modern web technologies to provide a robust and secure platform for blogging. With a focus on both user experience and developer efficiency, it aims to make the process of sharing and managing stories as seamless as possible.
