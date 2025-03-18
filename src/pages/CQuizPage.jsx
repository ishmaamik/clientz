//-----------------------------------------------------------------------------------------------

import {
  ArrowRight,
  CheckCircle2,
  Play,
  RefreshCcw,
  Timer,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideButtons from "../components/SideButtons";

export default function CQuizPage() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(300);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const allQuestions = [
    {
      id: 1,
      question: "What does 'C' in C language stand for?",
      options: ["Code", "Compiled", "Computer", "Circuit"],
      answer: "Compiled",
    },
    {
      id: 2,
      question: "Which operator is used to include a header file in C?",
      options: ["#", "include", ":", "->"],
      answer: "#",
    },
    {
      id: 3,
      question: "What is the correct syntax for declaring an integer?",
      options: ["int x;", "integer x;", "num x;", "x int;"],
      answer: "int x;",
    },
    {
      id: 4,
      question: "What is the correct syntax for printf function?",
      options: [
        'printf("Hello");',
        'print("Hello");',
        "printf(Hello);",
        'System.out.println("Hello");',
      ],
      answer: 'printf("Hello");',
    },
    {
      id: 5,
      question: "How do you read an integer using scanf?",
      options: [
        'scanf("%d", &num);',
        'scanf("%d", num);',
        "scanf(&num);",
        "scanf(num);",
      ],
      answer: 'scanf("%d", &num);',
    },
    {
      id: 6,
      question:
        "Which of the following is the correct 'Hello, World!' program in C?",
      options: [
        '#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
        'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
        '#include <iostream>\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}',
        'print("Hello, World!")',
      ],
      answer:
        '#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
    },
    {
      id: 7,
      question: "What is the format specifier for double in C?",
      options: ["%d", "%f", "%lf", "%L"],
      answer: "%lf",
    },
    {
      id: 8,
      question: "Which header file is required for using malloc()?",
      options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<math.h>"],
      answer: "<stdlib.h>",
    },
    {
      id: 9,
      question: "What is the size of int data type in C?",
      options: [
        "2 bytes",
        "4 bytes",
        "8 bytes",
        "Depends on the compiler/system",
      ],
      answer: "Depends on the compiler/system",
    },
    {
      id: 10,
      question: "Which of the following is not a valid variable name in C?",
      options: ["_variable", "variable123", "123variable", "my_variable"],
      answer: "123variable",
    },
    {
      id: 11,
      question: "What is the purpose of break statement in C?",
      options: [
        "To terminate the program",
        "To exit from a loop or switch",
        "To skip one iteration",
        "To continue execution",
      ],
      answer: "To exit from a loop or switch",
    },
    {
      id: 12,
      question: "How do you declare a constant in C?",
      options: [
        "#define MAX 100",
        "const MAX = 100;",
        "constant MAX = 100;",
        "final MAX = 100;",
      ],
      answer: "#define MAX 100",
    },
    {
      id: 13,
      question: "Which operator is used for pointer declaration?",
      options: ["&", "*", "->", "."],
      answer: "*",
    },
    {
      id: 14,
      question: "What is the correct way to read a character in C?",
      options: ["getchar();", "scanf('%c');", "read();", "input();"],
      answer: "getchar();",
    },
    {
      id: 15,
      question: "How do you declare an array in C?",
      options: [
        "int numbers[];",
        "array numbers[10];",
        "int numbers[10];",
        "numbers = array(10);",
      ],
      answer: "int numbers[10];",
    },
    {
      id: 16,
      question: "What is the purpose of sizeof operator?",
      options: [
        "To get the address of a variable",
        "To get the size of a data type or variable",
        "To allocate memory",
        "To compare sizes",
      ],
      answer: "To get the size of a data type or variable",
    },
    {
      id: 17,
      question: "Which function is used to allocate memory dynamically?",
      options: ["alloc()", "malloc()", "new()", "create()"],
      answer: "malloc()",
    },
    {
      id: 18,
      question: "What is the correct way to open a file in C?",
      options: [
        'fopen("file.txt", "r");',
        'open("file.txt");',
        'File.open("file.txt");',
        'readFile("file.txt");',
      ],
      answer: 'fopen("file.txt", "r");',
    },
    {
      id: 19,
      question: "How do you define a structure in C?",
      options: [
        "struct { ... };",
        "class { ... };",
        "typedef struct { ... };",
        "object { ... };",
      ],
      answer: "struct { ... };",
    },
    {
      id: 20,
      question: "What is the purpose of union in C?",
      options: [
        "To create a new data type",
        "To share memory between variables",
        "To combine multiple structures",
        "To create an array",
      ],
      answer: "To share memory between variables",
    },
  ];

  useEffect(() => {
    if (quizStarted) {
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, 10));

      const timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted]);

  const calculateTimeProgress = () => {
    return (seconds / 300) * 100;
  };

  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmitQuiz = () => {
    const calculatedScore = questions.reduce((acc, question) => {
      if (answers[question.id] === question.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(calculatedScore);
    setShowResults(true);
  };

  const handleRetake = () => {
    setQuizStarted(false);
    setAnswers({});
    setSeconds(300);
    setShowResults(false);
    setQuestions([]);
  };

  const handleNextLesson = () => {
    navigate(`/courses/c/${parseInt(lessonId) + 1}`);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
        <SideButtons />
        <div
          id="main-content"
          className="flex-1 transition-all duration-300"
          style={{ marginLeft: isExpanded ? "260px" : "80px" }}
        >
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-2xl px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                C Programming Quiz
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                You have 5 minutes to complete 10 questions. You need to score
                at least 80% to pass.
              </p>
              <button
                onClick={startQuiz}
                className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-yellow-100 hover:bg-yellow-200 rounded-lg font-semibold text-lg mx-auto transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            {/* Timer Column - Moved to top on mobile */}
            <div className="md:col-span-3 md:order-2">
              <div className="sticky top-4">
                <div className="bg-white dark:bg-black rounded-xl p-4 md:p-6 shadow-lg border-2 border-yellow-100 dark:border-yellow-200/50">
                  <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="#FEF3C7"
                        strokeWidth="12"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="#FCD34D"
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * (seconds > 0 ? 88 : 0)}
                        strokeDashoffset={
                          2 * Math.PI * 88 * (1 - calculateTimeProgress() / 100)
                        }
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <Timer className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 mx-auto mb-2" />
                      <span className="text-xl md:text-2xl font-bold dark:text-white">
                        {Math.floor(seconds / 60)}:
                        {String(seconds % 60).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                      Questions Answered: {Object.keys(answers).length}/10
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Column */}
            <div className="md:col-span-9 md:order-1">
              <div className="bg-yellow-50 dark:bg-black rounded-xl p-4 mb-6 sticky top-4 z-10 shadow-md">
                <h1 className="text-xl md:text-2xl dark:text-yellow-100 font-bold text-center">
                  C - Basic Quiz
                </h1>
              </div>

              {!showResults ? (
                <div className="space-y-6 md:space-y-8">
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="bg-white dark:bg-transparent dark:border-yellow-200/30 rounded-xl p-4 md:p-6 shadow-md border-2 border-yellow-100"
                    >
                      <h3 className="text-base md:text-lg dark:text-white font-semibold mb-4">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2 md:space-y-3 dark:text-gray-300">
                        {question.options.map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-3 p-2 md:p-3 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-200/20 cursor-pointer transition-colors"
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              onChange={() =>
                                handleOptionChange(question.id, option)
                              }
                              checked={answers[question.id] === option}
                              className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                              disabled={seconds === 0}
                            />
                            <span className="flex-1 text-sm md:text-base">
                              {option.includes("\n") ? (
                                <pre className="whitespace-pre-wrap font-mono text-xs md:text-sm bg-gray-50 dark:bg-black p-2 rounded">
                                  {option}
                                </pre>
                              ) : (
                                option
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={seconds === 0}
                      className="px-6 md:px-8 py-3 bg-yellow-100 hover:bg-yellow-200 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Quiz
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-2xl mx-auto bg-white dark:bg-yellow-200/20 rounded-xl shadow-lg p-6 md:p-8 border-2 border-yellow-100">
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 dark:text-white">
                    Quiz Results
                  </h2>
                  <div className="text-center mb-6 md:mb-8">
                    {score >= 8 ? (
                      <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-green-500 mx-auto mb-4" />
                    ) : (
                      <XCircle className="w-16 h-16 md:w-20 md:h-20 text-red-500 mx-auto mb-4" />
                    )}
                    <p className="text-xl md:text-2xl font-semibold mb-2 dark:text-gray-200">
                      Your Score: {score}/10 ({((score / 10) * 100).toFixed(1)}
                      %)
                    </p>
                    <p className="text-base md:text-lg text-gray-600 dark:text-yellow-100">
                      {score >= 8
                        ? "Congratulations! You've passed the quiz!"
                        : "Keep practicing! You need 80% to pass."}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-center gap-4">
                    {score < 8 && (
                      <button
                        onClick={handleRetake}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-100 hover:bg-yellow-200 rounded-lg font-semibold transition-colors"
                      >
                        <RefreshCcw className="w-5 h-5" />
                        Retake Quiz
                      </button>
                    )}
                    {score >= 8 && (
                      <button
                        onClick={handleNextLesson}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-100 hover:bg-yellow-200 rounded-lg font-semibold transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                        Next Lesson
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
