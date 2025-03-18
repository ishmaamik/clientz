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

export default function CControl() {
  const location = useLocation();
  const navigate = useNavigate();
  const [completedQuizzes, setCompletedQuizzes] = useState(["control-structures"]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Define the learning content for the "C Control Structures" lesson
  const learningContent = {
    "control-structures": {
      title: "C Language Control Structures",
      intro:
        "Control structures in C are used to make decisions, repeat code, and more. In this lesson, you'll learn about the different types of control structures in C, including if-else, loops, and switch statements.",
      sections: [
        {
          title: "What Are Control Structures?",
          content: `Control structures are the blocks that manage the flow of control in a program. They allow you to perform tasks based on conditions (if-else) or repeat tasks (loops). Common types include:

• Conditional statements (if, if-else, switch)
• Looping statements (for, while, do-while)
• Jump statements (break, continue, return)`,
        },
        {
          title: "If-Else Statement",
          content: `The if-else statement allows you to make decisions based on conditions.

Syntax:

if (condition) {
    // Code to execute if the condition is true
} else {
    // Code to execute if the condition is false
}
Example:

int age = 20;
if (age >= 18) {
    printf("Adult");
} else {
    printf("Minor");
}`,
        },
        {
          title: "Switch Statement",
          content: `The switch statement allows you to select one of many code blocks to be executed.

Syntax:

switch (variable) {
    case value1:
        // Code to execute if variable == value1
        break;
    case value2:
        // Code to execute if variable == value2
        break;
    default:
        // Code to execute if none of the cases match
}
Example:

int day = 2;
switch (day) {
    case 1:
        printf("Sunday");
        break;
    case 2:
        printf("Monday");
        break;
    default:
        printf("Invalid day");
}`,
        },
        {
          title: "Loops in C",
          content: `Loops are used to repeat a block of code multiple times.

• For Loop: Used when the number of iterations is known.
• While Loop: Used when the number of iterations is not known but a condition is true.
• Do-While Loop: Similar to while, but executes at least once.

Example of a for loop:

for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}`,
        },
      ],
      practice: [
        "Write a program to check whether a number is even or odd using an if-else statement.",
        "Create a switch-case statement to display the name of a day based on a number (1 for Sunday, 2 for Monday, etc.).",
        "Use a for loop to print numbers from 1 to 10.",
      ],
    },
  };

  // Fetch related videos and articles
  useEffect(() => {
    setRelatedVideos([
      {
        id: "1",
        title: "C Control Structures Explained",
        thumbnail:
          "https://mma.prnewswire.com/media/1100016/4169121/Simplilearn_Logo.jpg?p=facebook",
        duration: "14:30",
        url: "https://www.youtube.com/watch?v=YiPoFeWrSYY&pp=ygUTYyBjb250cm9sIHN0cnVjdHVyZQ%3D%3D",  // BroCode video link
        author: "Simplilearn",
      },
    ]);

    setRelatedArticles([
      {
        id: "1",
        title: "Understanding C Control Structures",
        source: "GeeksForGeeks",
        url: "#",
        readTime: "7 min",
      },
      {
        id: "2",
        title: "A Beginner's Guide to C Control Structures",
        source: "TutorialsPoint",
        url: "#",
        readTime: "8 min",
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
