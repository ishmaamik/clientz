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
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideButtons from "../components/SideButtons";

export default function Cvar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [completedQuizzes, setCompletedQuizzes] = useState(["variables"]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Define learning content for the lesson
  const learningContent = {
    "variables": {
      title: "C Language Variables",
      intro:
        "Variables in C are used to store data values. This section will cover the types of variables, their declaration, and usage in C programming.",
      sections: [
        {
          title: "What Are Variables?",
          content: `Variables are containers for storing data values. In C, every variable has:

• A name (identifier)
• A type (determines the size and layout of the variable)
• A value (stored data)`
        },
        {
          title: "Declaring Variables",
          content: `Variables in C must be declared before use. Declaration syntax:

<type> <variable_name>;

Examples:

int age;
float temperature;
char grade;`
        },
        {
          title: "Initializing Variables",
          content: `Variables can be initialized at the time of declaration:

int age = 25;
float temperature = 36.5;
char grade = 'A';`
        },
        {
          title: "Scope and Lifetime of Variables",
          content: `Variable scope determines where the variable can be accessed. Common scopes are:

• Local: Declared inside a function
• Global: Declared outside all functions
• Static: Retains its value between function calls`,
        },
      ],
      practice: [
        "Declare an integer variable and assign a value to it.",
        "Create a float variable to store a temperature value.",
        "Experiment with local and global variables."
      ],
    },
  };

  // Fetch related videos and articles
  useEffect(() => {
    setRelatedVideos([
      {
        id: "1",
        title: "C Variables and Data Types Explained",
        thumbnail:
          "https://images.unsplash.com/photo-1472437774355-71ab6752b434?w=500&auto=format",
        duration: "10:15",
        author: "CodeExplained",
      },
      {
        id: "2",
        title: "C Programming - Variables, Constants and Scope",
        thumbnail:
          "https://images.unsplash.com/photo-1526374965328-7ea3c8b860aa?w=500&auto=format",
        duration: "12:45",
        author: "LearnCode",
      },
    ]);

    setRelatedArticles([
      {
        id: "1",
        title: "Understanding Variable Declaration in C",
        source: "GeeksForGeeks",
        url: "#",
        readTime: "6 min",
      },
      {
        id: "2",
        title: "A Beginner's Guide to C Variables",
        source: "TutorialsPoint",
        url: "#",
        readTime: "8 min",
      },
    ]);
  }, []);

  // Get the current lesson based on the path
  const lessonId = location.pathname.split("/").pop(); // Extract lessonId from path
  const lesson = learningContent[lessonId]; // Get the lesson content based on the lessonId

  useEffect(() => {
    if (!completedQuizzes.includes(lessonId)) {
      setCompletedQuizzes([...completedQuizzes, lessonId]);
    }
  }, [lessonId]);

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

  // Mark lesson as read and update progress
  const handleMarkAsRead = () => {
    const user = JSON.parse(localStorage.getItem("persist:root"));
    const currentUser = user ? JSON.parse(user.user).currentUser : null;
    const userId = currentUser ? currentUser._id : null;

    if (userId) {
      // Update progress by making a POST request to mark the lesson as read
      fetch("http://localhost:3000/api/progress/mark-as-read", {
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
    <div className="flex min-h-screen bg-white font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="min-h-screen bg-white">
          <div className="bg-yellow-50 border-b border-yellow-100 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link
                to="/courses/c"
                className="flex items-center text-yellow-600 hover:text-yellow-700 transition-colors"
              >
                <ChevronLeft className="mr-2" />
                Back to Course
              </Link>
              <div className="flex gap-4">
                <button
                  onClick={handleQuizCompletion}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
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
                <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-8">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    {lesson.title}
                  </h1>
                  <p className="text-gray-600 mb-8">{lesson.intro}</p>

                  {lesson.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {section.title}
                      </h2>
                      {section.content && (
                        <div className="text-gray-600 whitespace-pre-line mb-4">
                          {section.content}
                        </div>
                      )}
                    </div>
                  ))}

                  {lesson.practice && (
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Practice Exercises
                      </h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {lesson.practice.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Play size={20} className="text-yellow-600" />
                    Related Videos
                  </h3>
                  <div className="space-y-4">
                    {relatedVideos.map((video) => (
                      <div key={video.id} className="group cursor-pointer">
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
                        <h4 className="text-sm font-medium text-gray-800 mt-2 group-hover:text-yellow-600">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-500">{video.author}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-yellow-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-yellow-600" />
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <a
                        key={article.id}
                        href={article.url}
                        className="block p-4 rounded-lg hover:bg-yellow-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
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
