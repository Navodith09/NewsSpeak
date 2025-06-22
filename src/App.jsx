import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-black transition-colors duration-300">
        <Navbar />
        <Suspense
          fallback={
            <div className="text-white text-center mt-20">Loading...</div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
