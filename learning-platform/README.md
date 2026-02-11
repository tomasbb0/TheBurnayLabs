# The Burnay Lab - Platform

A student learning management platform powered by Firebase.

## 🚀 Quick Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or use existing)
3. Give it a name (e.g., "learning-with-tomas")
4. Click **Continue** through the setup

### 2. Enable Firestore Database

1. In Firebase Console, click **"Build" → "Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location and click **Enable**

### 3. Get Your Firebase Config

1. In Firebase Console, click the **gear icon** → **"Project settings"**
2. Scroll down to **"Your apps"**
3. Click the **web icon `</>`** to add a web app
4. Register app with a nickname (e.g., "learning-platform")
5. Copy the `firebaseConfig` object

### 4. Configure the App

Open `public/firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Your actual API key
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
};
```

### 5. Install & Run

```bash
cd learning-platform
npm install
npm start
```

Open http://localhost:3000

### 6. First Login

- **Username:** `tomas`
- **Password:** `admin123`

The admin account is automatically created on first load!

---

## 🔒 Firestore Security Rules

For production, update your Firestore rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users
    match /{document=**} {
      allow read, write: if true; // Change this for production!
    }
  }
}
```

---

## 📁 Project Structure

```
learning-platform/
├── public/
│   ├── index.html         # Main HTML with SVG icons
│   ├── styles.css         # All styling
│   ├── app.js             # Firebase-connected app logic
│   └── firebase-config.js # Your Firebase credentials
├── server.js              # Simple Express server
├── package.json
└── README.md
```

---

## ✨ Features

- **Teacher Dashboard**: Manage students, assign content
- **Student Portal**: Access diagnostics, games, tests, links
- **Diagnostics**: Assignable assessments with various question types
- **Games**: Link to external learning games
- **Tests**: Track scores and due dates
- **Links**: Organized resource library
- **Progress Tracking**: Visual progress by topic/level
- **Password Management**: Users can change their passwords

---

## 🔧 VS Code Firebase Extensions

You have these Firebase extensions installed:

- **Firebase Snippets** - Code snippets
- **VS Fire** - Firebase viewer
- **Firebase Data Connect** - Database tools

These can help you view and manage your Firestore data directly from VS Code!
