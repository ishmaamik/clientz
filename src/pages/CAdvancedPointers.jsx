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

export default function CAdvancedPointers() {
  const location = useLocation();
  const navigate = useNavigate();
  const [completedQuizzes, setCompletedQuizzes] = useState([
    "advanced-pointers",
  ]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const learningContent = {
    "advanced-pointers": {
      title: "Advanced Pointers in C",
      intro:
        "Pointers are one of the most powerful features in C programming. In this lesson, we will dive into advanced topics related to pointers, including pointer arrays, function pointers, and pointer to pointer concepts.",
      sections: [
        {
          title: "Pointer Arrays",
          content: `A pointer array is an array of pointers, where each element holds the address of a variable. This allows for dynamic memory management and manipulation of data stored in non-contiguous memory locations.

Example:
\`int *arr[5]; // An array of 5 pointers to integers\`
Usage:
\`arr[0] = &a;\` // Storing the address of a variable a in the first element of the array`,
        },
        {
          title: "Pointer to Pointer",
          content: `A pointer to a pointer is a pointer that stores the address of another pointer. This concept allows for multi-level pointer dereferencing.

Example:
\`int **ptr;\` 
\`int *p = &a;\` 
\`ptr = &p;\`

To access the value of 'a' using ptr:
\`printf("%d", **ptr);\``,
        },
        {
          title: "Function Pointers",
          content: `Function pointers are pointers that point to functions instead of variables. This is useful for implementing callback functions, function arrays, and dynamic function calls.

Example:
\`void (*func_ptr)(int);\` 
\`func_ptr = &myFunction;\`
\`func_ptr(10);\` // Calling myFunction using the function pointer`,
        },
        {
          title: "Memory Management with Pointers",
          content: `Pointers are closely related to memory management in C. You can allocate and deallocate memory dynamically using malloc(), calloc(), realloc(), and free() functions. These operations are critical for efficient memory usage and for handling large datasets.

Example:
\`int *arr = (int *)malloc(sizeof(int) * 10);\` // Allocating memory for an integer array of size 10`,
        },
      ],
      practice: [
        "Create an array of pointers and store addresses of multiple variables.",
        "Implement a pointer to pointer and access the original variable's value.",
        "Use function pointers to implement a callback mechanism.",
        "Dynamically allocate memory for a multi-dimensional array and deallocate it.",
      ],
    },
  };

  useEffect(() => {
    setRelatedVideos([
      {
        id: "1",
        title: "Understanding Advanced Pointers in C",
        thumbnail:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format",
        duration: "15:00",
        url: "https://www.youtube.com/watch?v=Vtq7v0yxl2s",
        author: "CodeMaster",
      },
      {
        id: "2",
        title: "Mastering Function Pointers in C",
        thumbnail:
          "https://images.unsplash.com/photo-1518565305704-c03a758c6996?w=500&auto=format",
        duration: "18:30",
        url: "https://youtu.be/Ky7Zv0jTPlY",
        author: "TechTutorials",
      },
    ]);

    setRelatedArticles([
      {
        id: "1",
        title: "A Deep Dive into Advanced Pointers in C",
        source: "GeeksForGeeks",
        url: "#",
        readTime: "7 min",
      },
      {
        id: "2",
        title: "Pointers in C: Understanding the Basics and Beyond",
        source: "TutorialsPoint",
        url: "#",
        readTime: "9 min",
      },
    ]);
  }, []);

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
      fetch("http://localhost:3000/api/progress/mark-as-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, lessonId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.progress) {
            console.log("Progress updated:", data.progress);
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

          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      <div className="bg-pink-50 p-4 rounded-lg">
                        <p className="text-gray-600 dark:text-white">
                          {section.content}
                        </p>
                      </div>
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

              <div className="space-y-8">
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
