import React, { useState, useEffect } from "react";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaClock,
  FaExternalLinkAlt,
  FaBookmark,
  FaRegBookmark,
  FaShare,
} from "react-icons/fa";

export default function NewsCard({ article }) {
  const { title, description, url, urlToImage, publishedAt, source } = article;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if article is bookmarked on mount
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("newsBookmarks") || "[]");
    setIsBookmarked(bookmarks.some((bookmark) => bookmark.url === url));
  }, [url]);

  const speakArticle = () => {
    const synth = window.speechSynthesis;

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    synth.cancel();

    const text = `Breaking news from ${
      source?.name || "unknown source"
    }. ${title}. ${description || "No additional details available."}`;
    const utterance = new SpeechSynthesisUtterance(text);

    // Enhanced voice settings for better female voice
    utterance.lang = "en-US";
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1.2; // Higher pitch for more feminine sound
    utterance.volume = 0.8;

    const loadVoices = () => {
      const voices = synth.getVoices();

      // Priority order for female voices
      const femaleVoicePatterns = [
        "Samantha",
        "Victoria",
        "Allison",
        "Ava",
        "Susan",
        "Vicki",
        "Microsoft Zira",
        "Microsoft Hazel",
        "Google UK English Female",
        "Google US English Female",
        "Karen",
        "Moira",
        "Tessa",
        "Veena",
        "Female",
        "Woman",
      ];

      let selectedVoice = null;

      // First, try to find a voice by name patterns
      for (const pattern of femaleVoicePatterns) {
        selectedVoice = voices.find(
          (voice) => voice.name.includes(pattern) && voice.lang.startsWith("en")
        );
        if (selectedVoice) break;
      }

      // If no specific female voice found, try to find any English female voice
      if (!selectedVoice) {
        selectedVoice = voices.find(
          (voice) =>
            voice.lang.startsWith("en") &&
            (voice.name.toLowerCase().includes("female") ||
              voice.name.toLowerCase().includes("woman"))
        );
      }

      // Fallback to any English voice with higher pitch
      if (!selectedVoice) {
        selectedVoice = voices.find((voice) => voice.lang.startsWith("en"));
        if (selectedVoice) {
          utterance.pitch = 1.4; // Increase pitch more for non-female voices
        }
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synth.speak(utterance);
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("newsBookmarks") || "[]");

    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark.url !== url
      );
      localStorage.setItem("newsBookmarks", JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      const newBookmark = { title, url, publishedAt, source: source?.name };
      bookmarks.push(newBookmark);
      localStorage.setItem("newsBookmarks", JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(url).then(() => {
      // You could add a toast notification here
      alert("Article link copied to clipboard!");
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <article className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 h-[450px] flex flex-col justify-between">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
          <img
            src={imageError || !urlToImage ? "/thumbnail.png" : urlToImage}
            alt={title || "News image"}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Top action buttons */}
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={toggleBookmark}
              className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
              title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
            >
              {isBookmarked ? (
                <FaBookmark className="text-yellow-500 text-sm" />
              ) : (
                <FaRegBookmark className="text-gray-600 dark:text-gray-300 text-sm" />
              )}
            </button>
            <button
              onClick={shareArticle}
              className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
              title="Share article"
            >
              <FaShare className="text-gray-600 dark:text-gray-300 text-sm" />
            </button>
          </div>
        </div>

        {/* Source badge */}
        {source?.name && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-blue-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            {source.name}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
          <FaClock className="mr-1" />
          <span>{formatDate(publishedAt)}</span>
        </div>

        <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {title || "No title available"}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 leading-relaxed">
          {description || "No description provided."}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm font-medium group/link"
              >
                <span className="mr-2">Read More</span>
                <FaExternalLinkAlt className="text-xs group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
              </a>
            )}
          </div>

          <button
            onClick={speakArticle}
            title={isSpeaking ? "Stop reading" : "Listen to article"}
            className={`p-3 rounded-full shadow-md transition-all duration-200 ${
              isSpeaking
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                : "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-700 dark:hover:text-blue-300"
            }`}
          >
            {isSpeaking ? (
              <FaVolumeMute className="text-sm" />
            ) : (
              <FaVolumeUp className="text-sm" />
            )}
          </button>
        </div>
      </div>

      {/* Speaking indicator */}
      {isSpeaking && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
      )}
    </article>
  );
}
