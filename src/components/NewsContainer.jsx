import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NewsGrid from "./NewsGrid";

export default function NewsContainer({ selectedCategory }) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      const apiKey =
        import.meta.env.VITE_NEWS_API_KEY || "7444b735facd4527b4c8b088d9ed8f11";
      const now = Date.now();
      const query = getQuery();

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let url = "";
      let params = {
        apiKey,
        language: "en",
        pageSize: 50, // Get more articles
        sortBy: "publishedAt",
      };

      try {
        if (query) {
          // Use /v2/everything for search queries with date filtering
          url = "https://newsapi.org/v2/everything";
          params = {
            ...params,
            q: query,
            from: yesterday.toISOString().split("T")[0], // Last 24 hours
            sortBy: "popularity",
          };
        } else if (selectedCategory) {
          // Use /v2/top-headlines for category browsing
          url = "https://newsapi.org/v2/top-headlines";
          params = {
            ...params,
            country: "us",
            category: selectedCategory,
            pageSize: 50,
          };
        } else {
          // Default: show general headlines
          url = "https://newsapi.org/v2/top-headlines";
          params = {
            ...params,
            country: "us",
            pageSize: 50,
          };
        }

        console.log("Fetching news from:", url, "with params:", params);

        const fullUrl = `${url}?${new URLSearchParams(params).toString()}`;
        const proxiedUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          fullUrl
        )}`;

        const response = await axios.get(proxiedUrl);
        const data = JSON.parse(response.data.contents);

        if (data.status === "error") {
          throw new Error(data.message || "API Error");
        }

        if (!data || !data.articles) {
          throw new Error("Invalid response format: No articles found.");
        }

        const fetchedArticles = data.articles || [];

        // Filter out removed articles and duplicates
        const validArticles = fetchedArticles.filter(
          (article, index, self) =>
            article.title &&
            article.title !== "[Removed]" &&
            article.description &&
            article.description !== "[Removed]" &&
            article.url &&
            // Remove duplicates by URL
            index === self.findIndex((a) => a.url === article.url)
        );

        // Sort by publication date (newest first)
        validArticles.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        setArticles(validArticles);

        console.log(`Successfully loaded ${validArticles.length} articles`);
      } catch (error) {
        console.error("Error fetching news:", error);

        let errorMessage = "Failed to load news articles.";

        if (error.response) {
          // API responded with error status
          const status = error.response.status;
          if (status === 401) {
            errorMessage = "Invalid API key. Please check your configuration.";
          } else if (status === 429) {
            errorMessage = "Too many requests. Please try again later.";
          } else if (status === 426) {
            errorMessage = "API upgrade required. Please check your API plan.";
          } else {
            errorMessage = `API Error (${status}): ${
              error.response.data?.message || "Unknown error"
            }`;
          }
        } else if (error.request) {
          // Network error
          errorMessage =
            "Network error. Please check your internet connection.";
        }
        setError({ message: errorMessage, details: error.message });
      } finally {
        setLoading(false);
        console.log("Articles Loaded", articles.length);
        console.log("Loading Status", loading);
      }
    };
    fetchNews();
  }, [location.search, selectedCategory]);

  return (
    <div className="relative min-h-screen">
      {/* Background Image/Pattern */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/bg-image.jpg')`,
        }}
      >
        {/* Optional overlay to make text more readable */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Main Content */}
      <NewsGrid
        articles={articles}
        loading={loading}
        error={error}
        category={selectedCategory}
        searchQuery={getQuery()}
        // onRetry={handleRetry}
      />
    </div>
  );
}

