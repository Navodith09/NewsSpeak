import React, { useState } from "react";
import NewsContainer from "../components/NewsContainer";
import Navbar from "../components/Navbar";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="relative min-h-screen">
      {/* Background Image only for Home page */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/newspaper-light.jpg')`, // Light mode image
        }}
      >
        {/* Dark mode background overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-100 transition-opacity duration-300"
          style={{
            backgroundImage: `url('/newspaper-dark.jpg')`, // Dark mode image - replace with your image path
          }}
        ></div>

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 dark:bg-opacity-50"></div>
      </div>

      {/* Actual Content */}
      <Navbar onCategorySelect={setSelectedCategory} />
      <div className="pt-24 px-6 min-h-screen text-black transition-colors duration-300">
        <NewsContainer selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
