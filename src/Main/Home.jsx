// import axios from "axios";
// import {
//   ArrowRight,
//   BookOpen,
//   Brain,
//   Code2,
//   Cpu,
//   Database,
//   Globe,
//   Laptop,
//   PenTool,
//   Rocket,
//   Server,
//   Sparkles,
//   Terminal,
//   Timer,
//   Trophy,
// } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import SideButtons from "../components/SideButtons";

// function Home() {
//   const [rank, setRank] = useState("");
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState(0);
//   const [languages, setLanguages] = useState([
//     {
//       name: "C",
//       route: "/courses/c",
//       image:
//         "https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//       description: "Master the fundamentals of programming with C language.",
//       progress: 0, // Default value, will be updated dynamically
//       features: [
//         "System Programming",
//         "Memory Management",
//         "Algorithms",
//         "DSA",
//       ],
//     },
//     {
//       name: "Python",
//       route: "/courses/python",
//       image:
//         "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//       description:
//         "Perfect for beginners. Learn Python's simple syntax and powerful libraries.",
//       progress: 65,
//       features: ["Data Science", "Web Development", "AI & ML", "Automation"],
//     },
//     {
//       name: "JavaScript",
//       route: "/courses/javascript",
//       image:
//         "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//       description:
//         "Master web development with JavaScript, the language of the browser.",
//       progress: 35,
//       features: [
//         "Frontend Development",
//         "Node.js",
//         "React",
//         "Full Stack",
//         "Web Application",
//       ],
//     },
//     {
//       name: "Java",
//       route: "/courses/java",
//       image:
//         "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//       description:
//         "Build robust applications with Java's object-oriented approach.",
//       progress: 20,
//       features: [
//         "Android Dev",
//         "Enterprise",
//         "Spring Boot",
//         "Microservices",
//         "Development",
//       ],
//     },
//   ]);

//   const [isExpanded, setIsExpanded] = useState(true);
//   const [currentSlide, setCurrentSlide] = useState(1);
//   const { currentUser } = useSelector((state) => state.user);
//   const [completedCourses, setCompletedCourses] = useState(0);
//   const [linesOfCode, setLinesOfCode] = useState(0);

//   useEffect(() => {
//     if (currentUser) {
//       const fetchContestProgress = async () => {
//         try {
//           const response = await axios.get(
//             `/api/contest/progress/${currentUser._id}`
//           );
//           if (response.data.success) {
//             const progress = response.data.data;
//             setSolvedProblems(progress.solvedCount);

//             // Calculate rank based on solved problems
//             const totalSolutions = progress.solvedCount;
//             let calculatedRank = "";
//             if (totalSolutions < 5) calculatedRank = "Newbie";
//             else if (totalSolutions >= 5 && totalSolutions < 10)
//               calculatedRank = "Pupil";
//             else if (totalSolutions >= 10 && totalSolutions < 15)
//               calculatedRank = "Specialist";
//             else if (totalSolutions >= 15 && totalSolutions < 20)
//               calculatedRank = "Expert";
//             else if (totalSolutions >= 20 && totalSolutions < 25)
//               calculatedRank = "Candidate Master";
//             else if (totalSolutions >= 25 && totalSolutions < 30)
//               calculatedRank = "Master";
//             else calculatedRank = "International Master";
//             setRank(calculatedRank);
//           }
//         } catch (error) {
//           console.error("Error fetching contest progress:", error);
//           toast.error("Failed to fetch contest progress.");
//         }
//       };

//       fetchContestProgress();
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     // Fetch the contest progress when the component mounts
//     if (currentUser) {
//       const fetchContestProgress = async () => {
//         try {
//           const response = await axios.get(
//             `/api/contest/progress/${currentUser._id}`
//           );
//           if (response.data.success) {
//             setSolvedProblems(response.data.data.solvedCount); // Set solved problems count from API response
//           } else {
//             console.error("Error fetching contest progress.");
//           }
//         } catch (error) {
//           console.error("Error fetching contest progress:", error);
//           toast.error("Failed to fetch contest progress.");
//         }
//       };

//       fetchContestProgress();
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     if (currentUser) {
//       const fetchRuns = async () => {
//         try {
//           const response = await axios.get(
//             `/api/run?userId=${currentUser._id}`
//           );
//           if (response.data.length >= 0) {
//             setLinesOfCode(response.data.length); // Set number of runs (lines of code)
//           } else {
//             console.error("Error fetching run details.");
//           }
//         } catch (error) {
//           console.error("Error fetching run details:", error);
//           toast.error("Failed to fetch run details.");
//         }
//       };

//       fetchRuns();
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     if (currentUser) {
//       const fetchUserProgress = async () => {
//         try {
//           const response = await axios.get(
//             `/api/progress/get-progress/${currentUser._id}`
//           );
//           if (response.data.progress) {
//             setCompletedCourses(response.data.progress.completedLessons.length); // Set number of completed courses
//           } else {
//             console.error("Error fetching user progress.");
//           }
//         } catch (error) {
//           console.error("Error fetching user progress:", error);
//           toast.error("Failed to fetch user progress.");
//         }
//       };

//       fetchUserProgress();
//     }
//   }, [currentUser]);

//   const techIcons = [
//     { icon: Database, color: "text-blue-500" },
//     { icon: Globe, color: "text-green-500" },
//     { icon: Server, color: "text-purple-500" },
//     { icon: Laptop, color: "text-pink-500" },
//     { icon: Code2, color: "text-yellow-500" },
//     { icon: Terminal, color: "text-cyan-500" },
//   ];

//   const stats = [
//     { icon: Timer, label: "Rank", value: rank },
//     { icon: Trophy, label: "Completed Courses", value: completedCourses },
//     { icon: Brain, label: "Solved Problems", value: solvedProblems },
//     { icon: Code2, label: "Submissions", value: linesOfCode },
//   ];

//   const features = [
//     {
//       icon: Terminal,
//       title: "Code Editor",
//       description: "Write and test code in browser",
//     },
//     {
//       icon: Brain,
//       title: "AI Assistant",
//       description: "Get personalized help",
//     },
//     {
//       icon: BookOpen,
//       title: "Courses",
//       description: "Structured learning paths",
//     },
//     { icon: PenTool, title: "Practice", description: "Hands-on exercises" },
//     { icon: Cpu, title: "Compilation", description: "Instant code results" },
//     { icon: Trophy, title: "Achievements", description: "Track your progress" },
//   ];

//   useEffect(() => {
//     // Fetching user's progress for C course dynamically
//     const fetchProgress = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("persist:root"));
//         const currentUser = user ? JSON.parse(user.user).currentUser : null;
//         const userId = currentUser ? currentUser._id : null;

//         if (userId) {
//           const response = await fetch(
//             `http://localhost:3000/api/progress/get-progress/${userId}`
//           );
//           const data = await response.json();
//           if (response.ok) {
//             // Assuming the "C" course has 10 lessons and we calculate progress based on completed lessons
//             const completedLessons = data.progress.completedLessons || [];
//             const totalLessons = 20; // You can dynamically adjust this based on the course length

//             const progressValue = Math.round(
//               (completedLessons.length / totalLessons) * 100
//             );
//             setLanguages((prevLanguages) =>
//               prevLanguages.map((language) =>
//                 language.name === "C"
//                   ? { ...language, progress: progressValue }
//                   : language
//               )
//             );
//           } else {
//             console.error("Error fetching progress");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching progress:", error);
//       }
//     };

//     fetchProgress();
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === languages.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? languages.length - 1 : prev - 1));
//   };

//   return (
//     <div className="flex min-h-screen bg-white dark:bg-[#18181b]">
//       <SideButtons />
//       <div
//         id="main-content"
//         className="flex-1 transition-all duration-300"
//         style={{ marginLeft: isExpanded ? "260px" : "80px" }}
//       >
//         {/* Compact Hero Section */}
//         <div className="relative bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/10 dark:to-[#18181b] overflow-hidden">
//           <div className="container mx-auto px-6 py-8">
//             <div className="grid lg:grid-cols-12 gap-8 items-center">
//               {/* Left Content Column */}
//               <div className="lg:col-span-7 space-y-6 z-10">
//                 <div className="inline-flex items-center space-x-2 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-full px-3 py-1">
//                   <Sparkles className="text-yellow-600 dark:text-yellow-400 w-4 h-4" />
//                   <span className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
//                     Your Coding Adventure Awaits
//                   </span>
//                 </div>

//                 <div className="space-y-4">
//                   <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
//                     Welcome back,{" "}
//                     <span className="text-yellow-600 dark:text-yellow-400 inline-block">
//                       {currentUser.username}!
//                     </span>
//                   </h1>
//                   <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
//                     Continue your journey to becoming a coding master.
//                   </p>
//                 </div>

//                 <div className="flex flex-wrap gap-4">
//                   <Link to="/compiler">
//                     <button className="group bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-xl font-semibold text-base transition-all duration-300 flex items-center space-x-2">
//                       <span>Start Coding</span>
//                       <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </Link>
//                   <Link to="/practice">
//                     <button className="group bg-white dark:bg-transparent border-2 border-yellow-500 dark:border-yellow-600 text-yellow-600 dark:text-yellow-400 px-6 py-2.5 rounded-xl font-semibold text-base transition-all duration-300 flex items-center space-x-2">
//                       <span>Solve Problems</span>
//                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </Link>
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
//                   {stats.map((stat, index) => {
//                     const Icon = stat.icon;
//                     return (
//                       <div
//                         key={index}
//                         className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center group hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300"
//                       >
//                         <Icon className="w-6 h-6 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
//                         <div className="text-xl font-bold text-gray-900 dark:text-white">
//                           {stat.value}
//                         </div>
//                         <div className="text-xs text-gray-600 dark:text-gray-400">
//                           {stat.label}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Right Image Column */}
//               <div className="lg:col-span-5 relative hidden lg:block">
//                 <div className="relative rounded-2xl overflow-hidden group">
//                   <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 via-transparent to-transparent group-hover:from-yellow-500/30 transition-all duration-500"></div>
//                   <img
//                     src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
//                     alt="Coding Environment"
//                     className="rounded-2xl w-full h-[400px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
//                   />
//                   {/* Floating Tech Icons */}
//                   <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-3">
//                     {techIcons.map((tech, index) => {
//                       const Icon = tech.icon;
//                       return (
//                         <div
//                           key={index}
//                           className={`${tech.color} bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg transform hover:scale-110 transition-transform cursor-pointer`}
//                         >
//                           <Icon size={20} />
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Language Cards Section */}
//         <div className="container mx-auto px-6 py-12">
//           <h2 className="text-2xl md:text-4xl font-bold text-center text-yellow-500 mb-8">
//             Choose Your Path
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {languages.map((language, index) => (
//               <Link
//                 key={index}
//                 to={language.route}
//                 className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl bg-white border border-yellow-100 hover:border-yellow-200"
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={language.image}
//                     alt={language.name}
//                     className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50"></div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     {language.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                     {language.description}
//                   </p>
//                   <div className="flex flex-wrap gap-1 mb-3">
//                     {language.features.map((feature, i) => (
//                       <span
//                         key={i}
//                         className="bg-yellow-50 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between text-gray-700 text-sm">
//                       <span className="font-medium">Progress</span>
//                       <span>{language.progress}%</span>
//                     </div>
//                     <div className="h-1.5 bg-yellow-100 rounded-full overflow-hidden">
//                       <div
//                         style={{ width: `${language.progress}%` }}
//                         className="h-full bg-yellow-400 rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-105"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="py-12 bg-yellow-50 dark:bg-[#18181b]">
//           <div className="container mx-auto px-6">
//             <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 dark:text-white">
//               Everything You Need
//             </h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {features.map((feature, index) => {
//                 const Icon = feature.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="group bg-white dark:bg-yellow-900/20 p-4 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-yellow-500/20 border border-yellow-200/50"
//                   >
//                     <div className="mb-3">
//                       <Icon className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
//                     </div>
//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//                       {feature.title}
//                     </h3>
//                     <p className="text-sm text-gray-700 dark:text-gray-400">
//                       {feature.description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Progress Section */}
//         {/* <div className="bg-white dark:bg-black py-12">
//           <div className="container mx-auto px-6">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-yellow-100 mb-8 text-center">
//               Your Progress
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-gradient-to-br from-yellow-50 to-white dark:from-transparent dark:to-transparent rounded-xl p-4 shadow-md border border-yellow-200/50">
//                 <h3 className="text-lg font-bold text-gray-900 dark:text-yellow-200 mb-4">
//                   Latest Achievements
//                 </h3>
//                 <div className="space-y-2">
//                   {[
//                     "Completed Python Basics",
//                     "Solved 50 Problems",
//                     "7-Day Streak",
//                     "First Place in Weekly Challenge",
//                     "Completed Advanced JavaScript",
//                   ].map((achievement, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center space-x-3 p-2 bg-white dark:bg-gray-950 rounded-lg transform hover:scale-102 transition duration-300 shadow-sm"
//                     >
//                       <Trophy className="text-yellow-600" size={16} />
//                       <span className="text-sm text-gray-800 dark:text-gray-300">
//                         {achievement}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="bg-gradient-to-br from-yellow-50 to-white dark:from-black dark:to-[#18181b] rounded-xl p-4 shadow-lg dark:shadow-black border border-yellow-200/50">
//                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
//                   Learning Streak
//                 </h3>
//                 <div className="grid grid-cols-7 gap-2">
//                   {[...Array(7)].map((_, index) => (
//                     <div
//                       key={index}
//                       className={`h-16 rounded-lg ${
//                         index < 5
//                           ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
//                           : "bg-yellow-100"
//                       } transition-all duration-300 hover:scale-105 cursor-pointer relative group shadow-sm`}
//                       title={`Day ${index + 1}`}
//                     >
//                       <div className="absolute inset-0 bg-yellow-600 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
//                     </div>
//                   ))}
//                 </div>
//                 <p className="text-sm text-gray-700 dark:text-yellow-100 mt-4 text-center font-medium">
//                   🔥 Keep up the 5-day streak!
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div> */}

//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
//       </div>
//     </div>
//   );
// }

// export default Home;



import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  Cpu,
  Database,
  Flame,
  Globe,
  Laptop,
  PenTool,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Timer,
  Trophy
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeatMap from "../components/HeatMap";
import SideButtons from "../components/SideButtons";

function Home() {
  const [problems, setProblems] = useState([]);
  const [runData, setRunData] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [languages, setLanguages] = useState([
    {
      name: "C",
      route: "/courses/c",
      image:
        "https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      description: "Master the fundamentals of programming with C language.",
      progress: 0,
      features: [
        "System Programming",
        "Memory Management",
        "Algorithms",
        "DSA",
      ],
    },
    {
      name: "Python",
      route: "/courses/python",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      description:
        "Perfect for beginners. Learn Python's simple syntax and powerful libraries.",
      progress: 65,
      features: ["Data Science", "Web Development", "AI & ML", "Automation"],
    },
    {
      name: "JavaScript",
      route: "/courses/javascript",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      description:
        "Master web development with JavaScript, the language of the browser.",
      progress: 35,
      features: [
        "Frontend Development",
        "Node.js",
        "React",
        "Full Stack",
        "Web Application",
      ],
    },
    {
      name: "Java",
      route: "/courses/java",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      description:
        "Build robust applications with Java's object-oriented approach.",
      progress: 20,
      features: [
        "Android Dev",
        "Enterprise",
        "Spring Boot",
        "Microservices",
        "Development",
      ],
    },
  ]);

  const [isExpanded, setIsExpanded] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(1);
  const { currentUser } = useSelector((state) => state.user);

  const getCurrentDate = () => {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, "0")}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getFullYear()}`;
  };

  const currentDate = getCurrentDate();

  useEffect(() => {
    fetchRunData();
  }, [currentUser._id]);

  const fetchRunData = async () => {
    try {
      const res = await fetch(`/api/run?userId=${currentUser._id}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setRunData(data);
        calculateStreaks(data);
      }
    } catch (err) {
      console.error("Error fetching run data:", err);
      setRunData([]);
    }
  };

  const calculateStreaks = (data) => {
    if (!data.length) {
      setCurrentStreak(0);
      setLongestStreak(0);
      return;
    }

    // Convert dates to ISO format and sort them
    const dates = data.map(run => {
      const [dd, mm, yyyy] = run.date.split("-");
      return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    }).sort();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let previousDate = null;

    // Calculate streaks
    for (let i = 0; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      
      if (!previousDate) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(previousDate);
        const diffDays = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          tempStreak = 1;
        }
      }

      longestStreak = Math.max(longestStreak, tempStreak);
      previousDate = dates[i];
    }

    // Check if the streak is still active (last activity was today or yesterday)
    const lastDate = new Date(dates[dates.length - 1]);
    const diffToToday = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    
    // Current streak is only maintained if the last activity was today or yesterday
    const finalCurrentStreak = diffToToday <= 1 ? tempStreak : 0;

    setCurrentStreak(finalCurrentStreak);
    setLongestStreak(longestStreak);
  };

  const techIcons = [
    { icon: Database, color: "text-blue-500" },
    { icon: Globe, color: "text-green-500" },
    { icon: Server, color: "text-purple-500" },
    { icon: Laptop, color: "text-pink-500" },
    { icon: Code2, color: "text-yellow-500" },
    { icon: Terminal, color: "text-cyan-500" },
  ];

  const stats = [
    { icon: Trophy, label: "Total Courses", value: "4" },
    { icon: Timer, label: "Videos", value: "50+" },
    { icon: Brain, label: "Problems", value: "50+" },
    { icon: Code2, label: "Availability", value: "24/7" },
  ];

  const features = [
    {
      icon: Terminal,
      title: "Code Editor",
      description: "Write and test code in browser",
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Get personalized help",
    },
    {
      icon: BookOpen,
      title: "Courses",
      description: "Structured learning paths",
    },
    { icon: PenTool, title: "Practice", description: "Hands-on exercises" },
    { icon: Cpu, title: "Compilation", description: "Instant code results" },
    { icon: Trophy, title: "Achievements", description: "Track your progress" },
  ];

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("persist:root"));
        const currentUser = user ? JSON.parse(user.user).currentUser : null;
        const userId = currentUser ? currentUser._id : null;

        if (userId) {
          const response = await fetch(
            `http://localhost:3000/api/progress/get-progress/${userId}`
          );
          const data = await response.json();
          if (response.ok) {
            const completedLessons = data.progress.completedLessons || [];
            const totalLessons = 20;

            const progressValue = Math.round(
              (completedLessons.length / totalLessons) * 100
            );
            setLanguages((prevLanguages) =>
              prevLanguages.map((language) =>
                language.name === "C"
                  ? { ...language, progress: progressValue }
                  : language
              )
            );
          }
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Inter']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/10 dark:to-[#18181b] overflow-hidden">
          <div className="container mx-auto px-6 py-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Content Column */}
              <div className="lg:col-span-7 space-y-6 z-10">
                <div className="inline-flex items-center space-x-2 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-full px-3 py-1">
                  <Sparkles className="text-yellow-600 dark:text-yellow-400 w-4 h-4" />
                  <span className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                    Your Coding Adventure Awaits
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    Welcome back,{" "}
                    <span className="text-yellow-600 dark:text-yellow-400 inline-block">
                      {currentUser.username}!
                    </span>
                  </h1>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
                    Continue your journey to becoming a coding master.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/compiler">
                    <button className="group bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-xl font-semibold text-base transition-all duration-300 flex items-center space-x-2">
                      <span>Start Coding</span>
                      <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link to="/practice">
                    <button className="group bg-white dark:bg-transparent border-2 border-yellow-500 dark:border-yellow-600 text-yellow-600 dark:text-yellow-400 px-6 py-2.5 rounded-xl font-semibold text-base transition-all duration-300 flex items-center space-x-2">
                      <span>Solve Problems</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* Streak Cards */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 dark:from-yellow-500/20 dark:to-yellow-600/10 rounded-xl p-6 backdrop-blur-sm border border-yellow-200/30 dark:border-yellow-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <Flame className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Current</span>
                    </div>
                    <div className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">
                      {currentStreak}
                    </div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                      Day Streak
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-900/10 to-yellow-600/5 dark:from-yellow-500/20 dark:to-yellow-600/10 rounded-xl p-6 backdrop-blur-sm border border-yellow-200/30 dark:border-yellow-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Best</span>
                    </div>
                    <div className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">
                      {longestStreak}
                    </div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                      Longest Streak
                    </div>
                  </div>
                </div>


                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center group hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300"
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2 text-yellow-600 dark:text-yellow-400" />
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Image Column */}
              <div className="lg:col-span-5 relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 via-transparent to-transparent group-hover:from-yellow-500/30 transition-all duration-500"></div>
                  <img
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
                    alt="Coding Environment"
                    className="rounded-2xl w-full h-[400px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Tech Icons */}
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-3">
                    {techIcons.map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <div
                          key={index}
                          className={`${tech.color} bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg transform hover:scale-110 transition-transform cursor-pointer`}
                        >
                          <Icon size={20} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Cards Section */}
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-yellow-500 mb-8">
            Choose Your Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((language, index) => (
              <Link
                key={index}
                to={language.route}
                className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl bg-white border border-yellow-100 hover:border-yellow-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={language.image}
                    alt={language.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {language.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {language.features.map((feature, i) => (
                      <span
                        key={i}
                        className="bg-yellow-50 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-gray-700 text-sm">
                      <span className="font-medium">Progress</span>
                      <span>{language.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-yellow-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${language.progress}%` }}
                        className="h-full bg-yellow-400 rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-105"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-12 bg-yellow-50 dark:bg-[#18181b]">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 dark:text-white">
              Everything You Need
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white dark:bg-yellow-900/20 p-4 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-yellow-500/20 border border-yellow-200/50"
                  >
                    <div className="mb-3">
                      <Icon className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hidden HeatMap for Activity Tracking */}
        <div className="hidden">
          <HeatMap runData={runData} currentDate={currentDate} />
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export default Home;