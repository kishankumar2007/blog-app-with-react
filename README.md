## 📰 Apna Blog App

A clean and modern blog application built with **React + Vite** and powered by **Appwrite (BaaS)**. Users can register, log in, create, edit, and delete blog posts with ease. The app is responsive and optimized for both desktop and mobile devices.

---

## 🚀 Features

- 🔐 User Authentication (Login / Register)
- 📝 Create, Read, Update, Delete (CRUD) blog posts
- 📸 Image upload support via Appwrite Storage
- 📱 Mobile responsive UI with TailwindCSS

---

## 🛠 Tech Stack

- **Frontend**: React (via Vite), TailwindCSS  
- **State Management**: Redux  
- **Routing**: React Router DOM  
- **Backend**: Appwrite (Backend as a Service)  
- **Database**: Appwrite Database  
- **Hosting**: Vercel  

---

## 🌐 Live Demo

👉 [Click here to view the live app](https://apnablog-app.vercel.app)

---

## 📦 Installation & Setup (Vite)

1. **Clone the repository**

```bash
git clone https://github.com/kishankumar20007/blog-app-with-react.git
cd blog-app-with-react

	2.	Install dependencies

npm install

	3.	Install Appwrite SDK

npm install appwrite

	4.	Start the development server (Vite)

npm run dev

	5.	Open in browser

Visit http://localhost:5173

⸻

📁 Folder Structure

src/
├── components/       # Reusable components (Navbar, PostCard, etc.)
├── pages/            # Pages like Home, Login, Register
├── context/          # Appwrite client and auth context
├── assets/           # Static assets like images
├── utils/            # Helper functions
└── main.jsx          # Entry point for React with Vite


⸻

⚙️ Environment Variables

Create a .env file in the root and add your Appwrite credentials:

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

⚠️ Note: Vite requires all env variables to start with VITE_.
⚠️ Do NOT commit your .env file to version control.
```
---

## 👤 Author
- **Name**: Kishan
- **GitHub**: ```@kishankumar20007```
- **LinkedIn**: ```linkedin.com/in/kishankr2007```
---
## 📄 License
<h4> This project is open source and available under the MIT License. </h4>
