import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkX, Calendar, ExternalLink, Trash2 } from 'lucide-react';

// NewsCard Component 
const NewsCard = ({ title, url, publishedAt, source, onRemoveBookmark, showRemoveButton = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(true); // Always true for bookmarks page

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRemoveBookmark = () => {
    onRemoveBookmark(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 p-6">
      {/* Header with source and bookmark */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {source || 'Unknown Source'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {showRemoveButton && (
            <button
              onClick={handleRemoveBookmark}
              className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
              title="Remove from bookmarks"
            >
              <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
            </button>
          )}
          
          <div className="p-1.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20">
            <Bookmark className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
        </div>
      </div>

      {/* Article title */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-3 leading-tight">
        {title}
      </h2>

      {/* Date and read more */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(publishedAt)}</span>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Read More
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

// Main Bookmarks Page Component
export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load bookmarks from localStorage
  useEffect(() => {
    const loadBookmarks = () => {
      try {
        const savedBookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');
        setBookmarks(savedBookmarks);
      } catch (error) {
        console.error('Error loading bookmarks:', error);
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();

    // Listen for storage changes (if bookmarks are updated in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'newsBookmarks') {
        loadBookmarks();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Remove bookmark function
  const removeBookmark = (urlToRemove) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.url !== urlToRemove);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('newsBookmarks', JSON.stringify(updatedBookmarks));
  };

  // Clear all bookmarks
  const clearAllBookmarks = () => {
    if (window.confirm('Are you sure you want to remove all bookmarks?')) {
      setBookmarks([]);
      localStorage.removeItem('newsBookmarks');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Bookmark className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 dark:text-gray-100 bg-clip-text text-transparent">
                Bookmarked Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {bookmarks.length} {bookmarks.length === 1 ? 'article' : 'articles'} saved for later
              </p>
            </div>
          </div>

          {bookmarks.length > 0 && (
            <button
              onClick={clearAllBookmarks}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Bookmarks Grid */}
        {bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BookmarkX className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No bookmarks yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Start bookmarking articles you want to read later. They'll appear here for easy access.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark, index) => (
              <NewsCard
                key={`${bookmark.url}-${index}`}
                title={bookmark.title}
                url={bookmark.url}
                publishedAt={bookmark.publishedAt}
                source={bookmark.source}
                onRemoveBookmark={removeBookmark}
                showRemoveButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}