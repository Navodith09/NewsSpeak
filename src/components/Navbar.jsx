import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMicrophone,
  FaSearch,
  FaNewspaper,
  FaSun,
  FaMoon,
} from "react-icons/fa";

export default function Navbar({ onCategorySelect }) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const categories = [
    { id: "business", label: "Business", icon: "💼" },
    { id: "entertainment", label: "Entertainment", icon: "🎬" },
    { id: "general", label: "General", icon: "📰" },
    { id: "health", label: "Health", icon: "🏥" },
    { id: "science", label: "Science", icon: "🔬" },
    { id: "sports", label: "Sports", icon: "⚽" },
    { id: "technology", label: "Technology", icon: "💻" },
  ];

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
    setShowDropdown(false);
  };

  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setTranscript("");
      setListening(true);
    };

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setTranscript(voiceText);
      setQuery(voiceText);
      navigate(`/search?q=${encodeURIComponent(voiceText.trim())}`);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              {/* <FaNewspaper className="text-2xl text-blue-600 dark:text-blue-400" /> */}
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                {
                  <img
                    src="/logo-1.png"
                    alt="NewsSpeak"
                    className="h-20 w-auto mx-4"
                  />
                }
              </Link>
            </div>

            {/* Search Section */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search breaking news, topics, or keywords..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full pl-12 pr-16 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-200 shadow-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-2">
                  <button
                    onClick={handleSearchClick}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    title="Search"
                  >
                    <FaSearch className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={startVoiceSearch}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      listening
                        ? "bg-red-500 text-white animate-pulse"
                        : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                    }`}
                    title="Voice Search"
                  >
                    <FaMicrophone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6 mr-5">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium focus:outline-none transition-colors duration-200"
                >
                  Categories
                </button>
                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowDropdown(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 z-50 py-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                          onClick={() => handleCategorySelect(category.id)}
                        >
                          <span className="text-lg">{category.icon}</span>
                          <span className="font-medium">{category.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <Link
                to="/bookmarks"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Bookmarks
              </Link>

              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                About
              </Link>

              {/* Dark Mode Toggle Slider */}
              <div className="flex items-center space-x-2">
                <FaSun
                  className={`h-4 w-4 transition-colors duration-200 ${
                    darkMode ? "text-gray-400" : "text-yellow-500"
                  }`}
                />
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    darkMode ? "bg-blue-600" : "bg-gray-200"
                  }`}
                  role="switch"
                  aria-checked={darkMode}
                  aria-label="Toggle dark mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      darkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <FaMoon
                  className={`h-4 w-4 transition-colors duration-200 ${
                    darkMode ? "text-blue-400" : "text-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Voice Search Indicator */}
        {listening && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse z-50">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              <span className="text-sm font-medium">
                {transcript ? `"${transcript}"` : "Listening..."}
              </span>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
