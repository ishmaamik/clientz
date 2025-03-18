import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  LineChart,
  Network,
  Terminal,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideButtons from "../components/SideButtons";

export default function CLanguagePage() {
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [progress, setProgress] = useState(0); // State to hold the progress

  const contentList = [
    {
      id: "hello-world",
      title: "Hello World",
      icon: <Terminal size={20} />,
      quizCompleted: true,
    },
    {
      id: "variables",
      title: "Variables",
      icon: <Code2 size={20} />,
      quizCompleted: true,
    },
    {
      id: "data-types",
      title: "Data Types",
      icon: <Database size={20} />,
      quizCompleted: false,
    },
    {
      id: "control-structures",
      title: "Control Structures",
      icon: <LineChart size={20} />,
      quizCompleted: false,
    },
    {
      id: "functions",
      title: "Functions",
      icon: <Code2 size={20} />,
      quizCompleted: false,
    },
    {
      id: "arrays",
      title: "Arrays",
      icon: <Database size={20} />,
      quizCompleted: false,
    },
    {
      id: "pointers",
      title: "Pointers",
      icon: <Cpu size={20} />,
      quizCompleted: false,
    },
    {
      id: "strings",
      title: "Strings",
      icon: <Code2 size={20} />,
      quizCompleted: false,
    },
    {
      id: "structures",
      title: "Structures",
      icon: <Database size={20} />,
      quizCompleted: false,
    },
    {
      id: "file-io",
      title: "File I/O",
      icon: <Database size={20} />,
      quizCompleted: false,
    },
    {
      id: "memory-management",
      title: "Memory Management",
      icon: <Cpu size={20} />,
      quizCompleted: false,
    },
    {
      id: "dynamic-memory",
      title: "Dynamic Memory Allocation",
      icon: <Cpu size={20} />,
      quizCompleted: false,
    },
    {
      id: "multithreading",
      title: "Multithreading",
      icon: <Cpu size={20} />,
      quizCompleted: false,
    },
    {
      id: "preprocessors",
      title: "Preprocessors",
      icon: <Code2 size={20} />,
      quizCompleted: false,
    },
    {
      id: "bitwise-operations",
      title: "Bitwise Operations",
      icon: <Cpu size={20} />,
      quizCompleted: false,
    },
    {
      id: "recursion",
      title: "Recursion",
      icon: <Code2 size={20} />,
      quizCompleted: false,
    },
    {
      id: "linked-lists",
      title: "Linked Lists",
      icon: <Database size={20} />,
      quizCompleted: false,
    },
    {
      id: "advanced-pointers",
      title: "Advanced Pointers",
      icon: <Cpu size={20} />,
      quizCompleted: false,
    },
    {
      id: "graphics-programming",
      title: "Graphics Programming",
      icon: <Terminal size={20} />,
      quizCompleted: false,
    },
    {
      id: "network-programming",
      title: "Network Programming",
      icon: <Network size={20} />,
      quizCompleted: false,
    },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("persist:root"));
    const currentUser = user ? JSON.parse(user.user).currentUser : null;
    const userId = currentUser ? currentUser._id : null;

    if (userId) {
      const fetchProgress = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/progress/get-progress/${userId}`
          );
          const data = await response.json();

          if (response.ok) {
            // Ensure the response has the correct structure
            if (
              data &&
              data.progress &&
              Array.isArray(data.progress.completedLessons)
            ) {
              setCompletedQuizzes(data.progress.completedLessons);
              const progressValue =
                (data.progress.completedLessons.length / contentList.length) *
                100;
              setProgress(progressValue);
            } else {
              console.error("Invalid data structure", data);
              setProgress(0); // If invalid data, reset progress
            }
          } else {
            console.error("Failed to fetch progress");
            setProgress(0); // If API fails, reset progress
          }
        } catch (error) {
          console.error("Error fetching progress:", error);
          setProgress(0); // If there was an error, reset progress
        }
      };

      fetchProgress();
    } else {
      console.error("User not logged in");
    }
  }, [contentList.length]);

  const handleQuizCompletion = (id) => {
    if (!completedQuizzes.includes(id)) {
      setCompletedQuizzes([...completedQuizzes, id]);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-50 dark:from-black dark:to-[#18181b] to-yellow-100 py-16 px-8 rounded-2xl">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h1 className="text-5xl font-bold text-gray-800 dark:text-yellow-200 mb-4">
                  Master C Programming
                </h1>
                <p className="text-xl text-gray-600 dark:text-[#f5f5f5] mb-6">
                  From basics to advanced concepts, learn C programming through
                  interactive lessons and hands-on practice.
                </p>
                <div className="flex gap-4">
                  <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300 flex items-center gap-2">
                    Start Learning <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-full max-w-md bg-white dark:bg-gray-500/20 rounded-xl shadow-lg dark:shadow-yellow-200/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Your Progress
                    </h3>
                    <span className="text-yellow-600 font-bold">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-[#f5f5f5]">
                    <span>{completedQuizzes.length} completed</span>
                    <span>{contentList.length} total lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-transparent dark:border dark:border-yellow-200 dark:rounded-2xl py-12 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-yellow-50 dark:bg-yellow-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <BookOpen className="text-yellow-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    20 Lessons
                  </h3>
                  <p className="text-gray-600 dark:text-yellow-100">
                    Comprehensive curriculum
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <Code2 className="text-yellow-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Interactive
                  </h3>
                  <p className="text-gray-600 dark:text-yellow-100">
                    Hands-on exercises
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <Award className="text-yellow-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Certificate
                  </h3>
                  <p className="text-gray-600 dark:text-yellow-100">
                    Upon completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="py-12 px-8 bg-gray-50 dark:bg-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Course Content
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/courses/c/hello-world"
                onClick={() => handleQuizCompletion("hello-world")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Terminal size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        Hello World
                      </h3>
                    </div>
                    {completedQuizzes.includes("hello-world") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("hello-world")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/variables"
                onClick={() => handleQuizCompletion("variables")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        Variables
                      </h3>
                    </div>
                    {completedQuizzes.includes("variables") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("variables")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/data-types"
                onClick={() => handleQuizCompletion("data-types")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        Data Types
                      </h3>
                    </div>
                    {completedQuizzes.includes("data-types") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("data-types")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/control-structures"
                onClick={() => handleQuizCompletion("control-structures")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        Control Structures
                      </h3>
                    </div>
                    {completedQuizzes.includes("control-structures") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("control-structures")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/functions"
                onClick={() => handleQuizCompletion("functions")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        Functions
                      </h3>
                    </div>
                    {completedQuizzes.includes("functions") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("functions")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/arrays"
                onClick={() => handleQuizCompletion("arrays")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        Arrays
                      </h3>
                    </div>
                    {completedQuizzes.includes("arrays") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("arrays")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/pointers"
                onClick={() => handleQuizCompletion("pointers")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        Pointers
                      </h3>
                    </div>
                    {completedQuizzes.includes("pointers") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("pointers")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/strings"
                onClick={() => handleQuizCompletion("strings")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        Strings
                      </h3>
                    </div>
                    {completedQuizzes.includes("strings") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("strings")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/structures"
                onClick={() => handleQuizCompletion("structures")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        Structures
                      </h3>
                    </div>
                    {completedQuizzes.includes("structures") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("structures")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/file-io"
                onClick={() => handleQuizCompletion("file-io")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        File-io
                      </h3>
                    </div>
                    {completedQuizzes.includes("file-io") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("file-io")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/memory-management"
                onClick={() => handleQuizCompletion("memory-management")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        memory-management
                      </h3>
                    </div>
                    {completedQuizzes.includes("memory-management") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("memory-management")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/dynamic-memory"
                onClick={() => handleQuizCompletion("dynamic-memory")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        dynamic-memory
                      </h3>
                    </div>
                    {completedQuizzes.includes("dynamic-memory") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("dynamic-memory")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/multithreading"
                onClick={() => handleQuizCompletion("multithreading")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        multithreading
                      </h3>
                    </div>
                    {completedQuizzes.includes("multithreading") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("multithreading")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/preprocessors"
                onClick={() => handleQuizCompletion("preprocessors")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        preprocessors
                      </h3>
                    </div>
                    {completedQuizzes.includes("preprocessors") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("preprocessors")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/bitwise-operations"
                onClick={() => handleQuizCompletion("bitwise-operations")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        bitwise-operations
                      </h3>
                    </div>
                    {completedQuizzes.includes("bitwise-operations") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("bitwise-operations")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/recursion"
                onClick={() => handleQuizCompletion("recursion")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        recursion
                      </h3>
                    </div>
                    {completedQuizzes.includes("recursion") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("recursion")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/linked-lists"
                onClick={() => handleQuizCompletion("linked-lists")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        linked-lists
                      </h3>
                    </div>
                    {completedQuizzes.includes("linked-lists") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("linked-lists")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/advanced-pointers"
                onClick={() => handleQuizCompletion("advanced-pointers")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        advanced-pointers
                      </h3>
                    </div>
                    {completedQuizzes.includes("advanced-pointers") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("advanced-pointers")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/graphics-programming"
                onClick={() => handleQuizCompletion("graphics-programming")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        graphics-programming
                      </h3>
                    </div>
                    {completedQuizzes.includes("graphics-programming") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("graphics-programming")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>

              <Link
                to="/courses/c/network-programming"
                onClick={() => handleQuizCompletion("network-programming")}
                className="group"
              >
                <div className="bg-white dark:bg-transparent p-6 rounded-xl shadow-sm border-2 border-yellow-200 hover:border-yellow-500 transition duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-600">
                        <Code2 size={20} />
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 transition duration-300">
                        network-programming
                      </h3>
                    </div>
                    {completedQuizzes.includes("network-programming") && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedQuizzes.includes("network-programming")
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
