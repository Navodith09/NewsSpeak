
---

```markdown
# 📰 NewsSpeak

A modern, fast, and intelligent news reader web application built with **React**, **TailwindCSS**, and the **News API**. This project supports both **text search** and **voice interaction**, allowing users to browse current events via category, search by topic, and even listen to the news read aloud.

---

## 📸 Preview

![App Screenshot](public/preview.png)

---

## 🚀 Features

- 🔎 **Search by keyword** using text or voice
- 🗂️ **Browse top headlines** by category
- 🎤 **Voice input** via Web Speech API
- 🔊 **Text-to-speech** playback of articles
- ⚡ **Responsive design** using TailwindCSS
- 🌙 **Dark mode** (upcoming)
- 🧠 **Caching** and **auto-refresh** of news
- 🧰 Custom error handling and fallback to cached news

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| [React](https://reactjs.org/) | UI Library |
| [TailwindCSS](https://tailwindcss.com/) | Utility-first CSS |
| [Vite](https://vitejs.dev/) | Development bundler |
| [NewsAPI.org](https://newsapi.org/) | News source |
| [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Voice input and output |
| [Axios](https://axios-http.com/) | HTTP client |
| [AllOrigins](https://allorigins.win/) | CORS proxy service |

---

## 📁 Folder Structure

```

NewsSpeak/
├── public/
│   ├── logo-1.png
│   ├── logo-small.png
│   ├── newspaper-dark.jpg
│   ├── newspaper-light.jpg
│   ├── preview.png
│   ├── thumbnail.png
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── NewsCard.jsx
│   │   ├── NewsContainer.jsx
│   │   └── NewsGrid.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Bookmarks.jsx
│   │   └── Home.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env
├── tailwind.config.js
└── vite.config.js

````

---

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/Navodith09/NewsSpeak.git
cd NewsSpeak

# Install dependencies
npm install

# Add your NewsAPI key in a .env file
echo "VITE_NEWS_API_KEY=your_api_key_here" > .env

# Run the development server
npm run dev
````

---

## 🧠 Usage Guide

### 🎤 Voice Search

* Click on the microphone icon in the navbar.
* Speak your query (e.g., “technology news”).
* Results will appear instantly.

### 🔊 Text-to-Speech

* Click the **speaker icon** on any article card.
* The article title and description will be read aloud.

### 📚 Category Navigation

* Choose from categories like `technology`, `sports`, `health`, etc.
* Use the search bar to find specific topics.

---

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```
VITE_NEWS_API_KEY=your_newsapi_key
```

> Visit [https://newsapi.org](https://newsapi.org) to get a free API key.

---

## ❗ Known Issues

* CORS is handled via [AllOrigins](https://allorigins.win/) proxy. If the proxy fails, you may need to switch to another.
* Voice input/output may behave differently on different browsers. Best supported in **Chrome**.

---

## 📌 Future Enhancements

* ✅ UI cleanup and animations
* 🔁 Pagination for older articles
* 💬 Multi-language support
* 📦 PWA support for offline use

---

## 🤝 Contributors

Built by:

* Navodith Mondal

Final Year IT Engineering Project
\[Calcutta Institute of Engineering and Management]

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---
