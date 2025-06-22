import React, { useState, useMemo } from "react";
import NewsCard from "./NewsCard";
import {
  FaSearch,
  FaNewspaper,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaCalendarAlt,
  FaFire,
} from "react-icons/fa";

export default function NewsGrid({
  articles,
  loading,
  error,
  category,
  searchQuery,
}) {
  const [sortBy, setSortBy] = useState("publishedAt"); // publishedAt, title, source
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc
  const [viewMode, setViewMode] = useState("grid"); // grid, list

  // Memoized sorted articles
  const sortedArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];

    const filtered = articles.filter(
      (article) =>
        article.title &&
        article.title !== "[Removed]" &&
        article.description &&
        article.description !== "[Removed]"
    );

    return [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "publishedAt":
          comparison =
            new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
          break;
        case "title":
          comparison = (a.title || "").localeCompare(b.title || "");
          break;
        case "source":
          comparison = (a.source?.name || "").localeCompare(
            b.source?.name || ""
          );
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "desc" ? comparison : -comparison;
    });
  }, [articles, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const getHeaderTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }
    if (category) {
      return `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
    }
    return "Latest Headlines";
  };

  const getHeaderIcon = () => {
    if (searchQuery) return <FaSearch className="text-blue-500" />;
    if (category === "business") return <span className="text-2xl">💼</span>;
    if (category === "entertainment")
      return <span className="text-2xl">🎬</span>;
    if (category === "health") return <span className="text-2xl">🏥</span>;
    if (category === "science") return <span className="text-2xl">🔬</span>;
    if (category === "sports") return <span className="text-2xl">⚽</span>;
    if (category === "technology") return <span className="text-2xl">💻</span>;
    return <FaFire className="text-red-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading Header */}
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
            </div>
          </div>

          {/* Loading Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-full mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-8 bg-blue-300 dark:bg-blue-600 rounded-lg w-24"></div>
                      <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error.message ||
              "Failed to load news articles. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!sortedArticles || sortedArticles.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📰</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            No Articles Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchQuery
              ? `No articles found for "${searchQuery}". Try a different search term.`
              : "No news articles available at the moment. Please check back later."}
          </p>
          {searchQuery && (
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-5 pb-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            {getHeaderIcon()}
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 dark:from-white dark:to-gray-500 bg-clip-text text-transparent">
              {getHeaderTitle()}
            </h1>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500 dark:text-gray-400" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="publishedAt">Date</option>
                <option value="title">Title</option>
                <option value="source">Source</option>
              </select>
            </div>

            <button
              onClick={toggleSortOrder}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
            >
              {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {sortOrder === "asc" ? "Asc" : "Desc"}
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          {sortedArticles.map((article, index) => (
            <div
              key={`${article.url}-${index}`}
              className="transform transition-all duration-300 hover:scale-[1.02]"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <NewsCard article={article} />
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-full border border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-2">
              <FaNewspaper className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {sortedArticles.length} Articles
              </span>
            </div>
            <div className="w-1 h-4 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Updated Now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
