# Subscription Tracker: Manage Your Subscriptions Seamlessly

## Live Site

[Subscription Tracker](https://subtracking.vercel.app)

## Overview

**Subscription Tracker** is a full-stack web application built to help users efficiently track their recurring subscriptions and receive timely email reminders before renewals.  
The platform offers a secure authentication system, a minimalistic UI for managing subscriptions, and an automated notification service — ensuring you never miss a renewal date.

## Features

* **User Authentication:** 
  * Secure registration and login using email and password.
  * JWT-based authentication with protected frontend routes.

* **Subscription Management:**
  * Add new subscriptions with renewal dates and pricing.
  * Edit or update existing subscription details.
  * Delete subscriptions no longer needed.
  * View a comprehensive list of all subscriptions.

* **Email Notifications:**
  * Daily automated cron job checks for upcoming renewals.
  * Sends email reminders on the day of renewal via Nodemailer.

* **Rate Limiting:**
  * Integrated Upstash Redis-based rate limiting to protect API endpoints from abuse.

* **Responsive UI:**
  * Built with Tailwind CSS for a clean and adaptive experience.

* **Toast Notifications:**
  * Real-time success and error feedback using React Toastify.

---

## Tech Stack

**Frontend:**
- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify
- clsx
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JSON Web Tokens (JWT)
- bcrypt.js (Password hashing)
- Nodemailer (Email notifications)
- node-cron (Scheduled jobs)
- Upstash Redis Rate Limit

**Hosting:**
- (Not deployed — prepared for Render, Railway, or other platforms)

---

## Code Structure and Explanation

### Frontend (`/client`)

Organized into a modular, scalable React app using Vite for optimized performance:

| Folder | Purpose |
|:---|:---|
| `/components` | Reusable UI components like Navbar, SubscriptionCard, Loader, ProtectedRoute |
| `/pages` | Main pages like Home, Login, Register, AddSubscription, UpdateSubscription, SubscriptionsList |
| `/contexts/AuthContext.jsx` | Context API to manage user authentication globally |
| `/services/api.js` | Centralized Axios instance with request methods for interacting with backend APIs |
| `/utils` | Utility functions (e.g., token handling) |
| `/assets` | Icons, Images |

#### Core Frontend Concepts

- **Protected Routing:**  
  Ensures only authenticated users can access subscription management routes.
  
- **Authentication State:**  
  Stored using Context API + localStorage for token persistence across sessions.

- **API Requests:**  
  Handled centrally through a customized Axios instance, attaching Authorization headers automatically.

- **UI Feedback:**  
  Loading indicators and real-time Toast messages for a polished UX.

---

### Backend (`/server`)

Built using Node.js and Express, organized for scalability and separation of concerns:

| Folder | Purpose |
|:---|:---|
| `/controllers` | Logic for auth (`authController.js`) and subscriptions (`subscriptionController.js`) |
| `/models` | Mongoose models: `User.js`, `Subscription.js` |
| `/routes` | Express routes: `/auth`, `/subscriptions` |
| `/middleware` | Custom middleware for JWT authentication, rate limiting |
| `/utils` | Email service (`sendEmail.js`) |

#### Core Backend Concepts

- **User Authentication:**
  - Passwords hashed with bcrypt before saving.
  - JWT tokens generated on successful login or registration.

- **Subscription Operations:**
  - CRUD operations (`Create`, `Read`, `Update`, `Delete`) linked to authenticated users.

- **Rate Limiting:**
  - Using Upstash Redis to throttle requests — protects against spam/abuse.

- **Cron Jobs:**
  - Scheduled via `node-cron` to:
    - Run daily at **9:00 AM**.
    - Find subscriptions renewing today.
    - Automatically send reminder emails using Nodemailer.

- **Error Handling:**
  - Standardized responses with appropriate HTTP codes.

---

## Project Working

1. **User Registration / Login:**
   - Users sign up by providing an email and password.
   - A JWT is generated and stored on the client side (localStorage).

2. **Subscription Management:**
   - Authenticated users can add new subscriptions with fields:
     - Subscription Name
     - Price
     - Renewal Date
   - They can update or delete subscriptions as needed.
   - All subscriptions are fetched and displayed under the 'Subscriptions' page.

3. **Email Notification System:**
   - Every day at 9 AM, a background job checks for subscriptions due on the same day.
   - If any are found, an email reminder is sent to the respective user’s email.

4. **Security Measures:**
   - Passwords are securely hashed using bcrypt.
   - JWT tokens are validated before allowing access to subscription APIs.
   - Rate limiting prevents excessive or abusive requests.

---

## Environment Variables

Create a `.env` file inside `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

## Installation and Local Setup

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/khatri-rohit/subscription_tracker.git
cd subscription_tracker
```

### 2. Setup Backend

```bash
cd server
npm install
npm run start
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```


## Future Enhancements

Here are some planned improvements for Subscription Tracker:

- **Enhanced Email Templates:**  
  Use rich HTML/CSS designs for email notifications instead of plain text.

- **Subscription Categorization:**  
  Allow users to group subscriptions by types such as Streaming, Utilities, Productivity, etc.

- **Analytics Dashboard:**  
  Provide a monthly overview of subscription expenses via charts and graphs.

- **Push Notifications:**  
  Send browser push notifications to remind users of upcoming renewals.

- **Mobile Application:**  
  Develop a companion mobile app using React Native for on-the-go subscription management.

- **Real-time Updates:**  
  Add real-time data syncing for subscription changes using web sockets.

- **Multi-User Support (Admin Dashboard):**  
  Introduce an admin panel for managing multiple users and subscriptions.

