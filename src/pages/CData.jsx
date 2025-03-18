import { jsPDF } from "jspdf";
import {
  BookOpen,
  ChevronLeft,
  Download,
  ExternalLink,
  GraduationCap,
  Play,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SideButtons from "../components/SideButtons";

export default function CData() {
  const location = useLocation();
  const navigate = useNavigate();
  const [completedQuizzes, setCompletedQuizzes] = useState(["data-types"]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Define the learning content for the "C Data Types" lesson
  const learningContent = {
    "data-types": {
      title: "C Language Data Types",
      intro:
        "Data types in C are used to define the type of data a variable can hold. In this lesson, you'll learn about the basic data types and their usage in C programming.",
      sections: [
        {
          title: "What Are Data Types?",
          content: `Data types define the type of data that a variable can hold. In C, data types are categorized into several types:

• Primary Data Types
• Derived Data Types
• User-defined Data Types`,
        },
        {
          title: "Primary Data Types",
          content: `C has four basic types of primary data types:

• int: Integer type used to store whole numbers.
• float: Floating-point type used to store decimal numbers.
• char: Character type used to store single characters.
• double: Double-precision floating-point type used to store large decimal numbers.`,
        },
        {
          title: "Size of Data Types",
          content: `The size of data types can vary based on the system and compiler. Typically, the size is as follows:

• int: 4 bytes
• float: 4 bytes
• char: 1 byte
• double: 8 bytes`,
        },
        {
          title: "Derived and User-Defined Data Types",
          content: `Derived data types in C include arrays, pointers, and structures.

User-defined data types include:

• typedef
• enum
• struct`,
        },
      ],
      practice: [
        "Declare an integer variable and assign a value to it.",
        "Create a float variable to store a temperature value.",
        "Create a char variable and assign a character.",
        "Use a typedef to define a new type.",
      ],
    },
  };

  // Fetch related videos and articles
  useEffect(() => {
    setRelatedVideos([
      {
        id: "1",
        title: "Understanding C Data Types",
        thumbnail:
          "data:image/jpeg;base64,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",
        duration: "11:30",
        url: "https://www.youtube.com/watch?v=1eyf1-RU_eg&pp=ygUMZGF0YSB0eXBlcyBj",
        author: "CodeMaster",
      },
      {
        id: "2",
        title: "C Programming - Data Types and Operators",
        thumbnail:
          "https://images.unsplash.com/photo-1518565305704-c03a758c6996?w=500&auto=format",
        duration: "14:15",
        url: "https://youtu.be/MzGEQJ0sy6s",
        author: "TechTutorials",
      },
    ]);

    setRelatedArticles([
      {
        id: "1",
        title: "A Comprehensive Guide to C Data Types",
        source: "GeeksForGeeks",
        url: "#",
        readTime: "7 min",
      },
      {
        id: "2",
        title: "C Data Types - An In-Depth Explanation",
        source: "TutorialsPoint",
        url: "#",
        readTime: "9 min",
      },
    ]);
  }, []);

  // Get the current lesson based on the path
  const lessonId = location.pathname.split("/").pop();
  const lesson = learningContent[lessonId];

  const handleQuizCompletion = () => {
    navigate(`/courses/c/${lessonId}/quiz`);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const marginX = 20;
    const lineSpacing = 10;

    doc.setFontSize(16);
    doc.text(lesson.title, marginX, 20);

    doc.setFontSize(12);
    const introText = doc.splitTextToSize(lesson.intro, 170);
    doc.text(introText, marginX, 30);

    lesson.sections.forEach((section, index) => {
      const yPosition = 50 + index * 40;
      doc.setFontSize(14);
      doc.text(section.title, marginX, yPosition);

      doc.setFontSize(12);
      const content = doc.splitTextToSize(section.content, 170);
      doc.text(content, marginX, yPosition + 10);
    });

    doc.save(`${lesson.title.replace(/\s+/g, "_").toLowerCase()}.pdf`);
  };

  const handleMarkAsRead = () => {
    const user = JSON.parse(localStorage.getItem("persist:root"));
    const currentUser = user ? JSON.parse(user.user).currentUser : null;
    const userId = currentUser ? currentUser._id : null;

    if (userId) {
      // Update progress by making a POST request to mark the lesson as read
      fetch("https://serverz-78ek.onrender.com/api/progress/mark-as-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, lessonId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.progress) {
            console.log("Progress updated:", data.progress);
            // You can update local progress state here if needed
          }
        })
        .catch((error) => {
          console.error("Error updating progress:", error);
        });
    }
  };

  if (!lesson) {
    return <div className="text-center p-8">Lesson not found.</div>;
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="min-h-screen bg-white dark:bg-[#18181b]">
          <div className="bg-yellow-50 dark:bg-black border-b border-yellow-100 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link
                to="/courses/c"
                className="flex items-center text-yellow-600 hover:text-yellow-700 dark:text-yellow-300 dark:hover:text-yellow-500 transition-colors"
              >
                <ChevronLeft className="mr-2" />
                Back to Course
              </Link>
              <div className="flex gap-4">
                <button
                  onClick={handleQuizCompletion}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                >
                  <GraduationCap size={20} />
                  Take Quiz
                </button>
                <button
                  onClick={downloadPDF}
                  className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors flex items-center gap-2"
                >
                  <Download size={20} />
                  Download PDF
                </button>
                <button
                  onClick={handleMarkAsRead}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  Mark as Read
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Lesson Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-transparent rounded-xl shadow-sm border border-yellow-100 dark:border-yellow-200/20 p-8">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    {lesson.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    {lesson.intro}
                  </p>

                  {lesson.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-yellow-100 mb-4">
                        {section.title}
                      </h2>
                      {section.content && (
                        <div className="text-gray-600 dark:text-white whitespace-pre-line mb-4">
                          {section.content}
                        </div>
                      )}
                    </div>
                  ))}

                  {lesson.practice && (
                    <div className="bg-yellow-50 dark:bg-yellow-200/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Practice Exercises
                      </h3>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        {lesson.practice.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-8">
                {/* Related Videos */}
                <div className="bg-white dark:bg-yellow-200/20 rounded-xl shadow-sm border border-yellow-100 dark:border-yellow-800/40 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Play size={20} className="text-yellow-600" />
                    Related Videos
                  </h3>
                  <div className="space-y-4">
                    {relatedVideos.map((video) => (
                      <a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer"
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <span className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-300 mt-2 group-hover:text-yellow-600">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {video.author}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Related Articles */}
                <div className="bg-white dark:bg-yellow-200/20 rounded-xl shadow-sm border border-yellow-100 dark:border-yellow-800/40 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-yellow-600" />
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <a
                        key={article.id}
                        href={article.url}
                        className="block p-4 rounded-lg hover:bg-yellow-50 dark:hover:bg-black/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-300">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {article.source} • {article.readTime} read
                            </p>
                          </div>
                          <ExternalLink size={16} className="text-gray-400" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
