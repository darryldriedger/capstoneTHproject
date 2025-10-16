# 🌦️ Weather Lab 3D
A full-stack JavaScript capstone project that visualizes real-time weather data in a stylized 3D environment.

Built with 
**React (Vite)**, **Three.js / @react-three/fiber**, **Express**, and **MongoDB Atlas** 
— deployed via **Vercel** and **Render**.

---

## 🚀 Overview

**Weather Lab 3D** lets users:
- Search any city to view a 3D weather visualization.
- Retrieve current and daily forecasts using the **Open-Meteo API**.
- Automatically geocode place names to coordinates via the **OpenCage Geocoding API** (or **Nominatim** fallback).
- Save favorite locations to a MongoDB collection for quick access.
- Explore the app’s futuristic 3D interface, built with Three.js and @react-three/drei.

---

## 🧠 Tech Stack

**Frontend**
- React + Vite
- Three.js / @react-three/fiber / @react-three/drei
- Modern ES2023 JavaScript and functional components

**Backend**
- Node.js / Express
- MongoDB (via Mongoose)
- RESTful endpoints

**APIs**
1. 🌐 [Open-Meteo](https://open-meteo.com) — weather forecast data  
2. 📍 [OpenCage Geocoding](https://opencagedata.com) (fallback: [Nominatim](https://nominatim.org)) — geocoding

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v20+
- MongoDB Atlas (or local MongoDB)
- OpenCage API key (optional, for higher accuracy)

### 1️⃣ Clone the project
```bash
git clone https://github.com/darryldriedger/capstoneTHproject.git
cd capstoneTHproject

### 2️⃣ Install dependencies
npm install
npm --prefix client install
npm --prefix server install

### 3️⃣ Configure environment
Create a .env file in server/:
MONGO_URI=your_mongo_connection_string

4️⃣ Run locally
npm run dev

Client runs at http://localhost:5173
Server runs at http://localhost:8081


✨ Features

Responsive 3D UI with floating text and fog effects

Interactive weather panels and search interface

Saved locations persisted to MongoDB

Optional neon glow + environmental lighting

Error handling for missing or invalid locations

🧩 Extra Credit (for “Exceeds Expectations”)

✔️ More than two APIs (OpenCage + Nominatim + Open-Meteo)

✔️ Custom CSS and 3D UI styling beyond any framework defaults

✔️ HTML5 validation on all input forms

🧭 Credits

Weather Data: Open-Meteo

Geocoding: OpenCage / Nominatim

3D Scene: Three.js

Deployment: Vercel + Render