# Rick and Morty Repository App

## 🚀 Project Overview
This is a Vue 3 application built with TypeScript that allows users to browse and explore characters, locations, and episodes from the Rick and Morty universe. The app fetches data from the [Rick and Morty API](https://rickandmortyapi.com/) and presents it in a structured and interactive manner.

## 🛠️ Features
- **Character Browser**: Browse and view detailed information about each character.
- **Single Character Page**: Displays character details, including their status, species, location, and episodes they appear in.
- **Single Location Page**: Shows details about a location and all characters residing there.
- **Single Episode Page**: Displays episode details and lists all characters appearing in that episode.
- **Authentication**: Users can register and log in using Firebase Authentication.
- **Local Storage Support**: Tokens are stored with an expiration time.
- **Performance Enhancements**: Cached API responses, skeleton loaders, and optimized rendering.

## 🏗️ Tech Stack
- **Vue 3 + TypeScript**
- **Pinia (State Management)**
- **Vue Router**
- **Tailwind CSS (Styling)**
- **Axios (API Requests)**
- **Firebase Authentication**

## 📦 Project Setup

### 1️⃣ Install Dependencies
```sh
npm install
```

### 2️⃣ Start Development Server
```sh
npm run dev
```
The app will be available at `http://localhost:5173/`.

### 3️⃣ Build for Production
```sh
npm run build
```

## 🔥 API Integration
This app communicates with the [Rick and Morty API](https://rickandmortyapi.com/) to fetch characters, locations, and episodes.
- `GET /character/{id}` - Fetch single character details.
- `GET /location/{id}` - Fetch location details and residents.
- `GET /episode/{id}` - Fetch episode details and its characters.

## 🔐 Authentication
User authentication is handled via Firebase. Credentials are stored securely, and tokens are saved in local storage with an expiration time.

## 🏎️ Performance Optimizations
- Cached API responses to reduce redundant network calls.
- Skeleton loaders to prevent layout shifts.
- Lazy-loaded images for better performance.

## 📜 License
This project is licensed under the MIT License.

---

Made with ❤️ using Vue 3 & TypeScript
