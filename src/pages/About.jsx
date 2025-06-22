import React, { useState } from "react";
import {
  Mic,
  Volume2,
  Search,
  Filter,
  Smartphone,
  Globe,
  Code,
  Github,
  ExternalLink,
  Mail,
  MessageSquare,
} from "lucide-react";

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // EmailJS configuration
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // EmailJS service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Navodith Mondal",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // EmailJS public key
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Real-time News Fetching",
      description:
        "Stay updated with the latest news from around the world using NewsAPI.org integration",
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Category-wise Filtering",
      description:
        "Browse news by categories including Politics, Sports, Technology, Business, and more",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Advanced Search",
      description:
        "Find specific news articles with powerful search functionality",
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Input",
      description:
        "Use speech-to-text technology to search for news using voice commands",
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: "Voice Output",
      description:
        "Listen to articles with text-to-speech functionality for hands-free news consumption",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Responsive Design",
      description:
        "Optimized experience across all devices - mobile, tablet, and desktop",
    },
  ];

  const techStack = {
    frontend: ["React.js", "Tailwind CSS", "Web Speech API"],
    backend: ["News API integration"],
    others: ["Git & GitHub", "Vite / Webpack", "Vercel Deployment"],
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="pt-24 px-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 dark:text-gray-100 bg-clip-text text-transparent mb-6">
            About NewsSpeak
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A revolutionary voice-enabled news reader that transforms how you
            consume news. Search, listen, and stay informed with the power of
            your voice.
          </p>
        </div>

        {/* Purpose Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Purpose & Vision
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              NewsSpeak bridges the gap between traditional news consumption and
              modern accessibility needs. By integrating voice commands and
              speech synthesis, we make news accessible to everyone, including
              visually impaired users and those who prefer hands-free
              interaction. The app demonstrates the potential of web
              technologies in creating inclusive, user-friendly applications
              that enhance daily information consumption.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg text-white mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <Code className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Frontend
                </h3>
              </div>
              <ul className="space-y-2">
                {techStack.frontend.map((tech, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <Globe className="w-6 h-6 text-green-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Backend</h3>
              </div>
              <ul className="space-y-2">
                {techStack.backend.map((tech, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <Smartphone className="w-6 h-6 text-purple-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Tools & Others
                </h3>
              </div>
              <ul className="space-y-2">
                {techStack.others.map((tech, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Developer
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 text-center border border-gray-200">
            <a
              href="https://github.com/Navodith09"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block group"
            >
              <img
                src="https://github.com/Navodith09.png"
                alt="Navodith Mondal"
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gradient-to-br from-blue-500 to-indigo-500 group-hover:border-blue-600 transition-all duration-300 transform group-hover:scale-105 cursor-pointer shadow-lg"
              />
            </a>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Navodith Mondal
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Final Year B.Tech Student in Information Technology
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Passionate about creating innovative web applications that solve
              real-world problems. This project showcases the integration of
              modern web technologies with accessibility features, demonstrating
              expertise in full-stack development and user experience design.
            </p>
          </div>
        </div>

        {/* GitHub Repository */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Source Code
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
            <Github className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Open Source Project
            </h3>
            <p className="text-gray-600 mb-6">
              NewsSpeak is open source! Check out the code, contribute, or fork
              the project to create your own version.
            </p>
            <a
              href="https://github.com/Navodith09/NewsSpeak"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Additional Features [Performance & Optimization Section]
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">Performance & Optimization</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Lazy Loading</h3>
            <p className="text-gray-600">
              Optimized loading performance with lazy loading techniques, ensuring faster initial page loads 
              and better user experience across all devices.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Optimization</h3>
            <p className="text-gray-600">
              Built with modern bundling tools and optimization techniques to deliver a smooth, 
              fast experience with minimal resource consumption.
            </p>
          </div>
        </div>
      </div> */}

        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Get in Touch
          </h2>
          <div className="max-w-2xl mx-auto">
            {/* Quick Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
              <div className="flex items-center mb-6 justify-center">
                <MessageSquare className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Send a Message
                </h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Your feedback, questions, or suggestions..."
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    ❌ Failed to send message. Please try again or contact me
                    directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
              <p className="text-sm text-gray-600 mt-4 text-center">
                I'd love to hear your feedback and suggestions!
              </p>
            </div>
          </div>
        </div>

        {/* Social Media & Connect */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Connect & Follow
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
            <p className="text-gray-600 mb-6">
              Stay updated with my latest projects and connect with me on social
              media
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/Navodith09"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/navodithmondal2003/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
              <a
                href="https://x.com/NavodithM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-5 border-t border-gray-200">
        <p className="text-gray-600 dark:text-gray-400">
          © 2025 NewsSpeak by Navodith Mondal. All rights reserved.
        </p>
      </div>
    </div>
  );
}
