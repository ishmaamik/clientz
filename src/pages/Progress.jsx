import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideButtons from "../components/SideButtons";

const languageData = [
  { language: "Python", solved: 10, attempted: 15 },
  { language: "JavaScript", solved: 8, attempted: 12 },
  { language: "C++", solved: 5, attempted: 7 },
  { language: "Java", solved: 3, attempted: 5 },
  { language: "Go", solved: 2, attempted: 4 },
];



function Progress() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const userId= currentUser._id
  
  const [stats, setStats] = useState({
    solved: 0,
    attempted: 0,
    totalSubmissions: 0,
  });
  const [languageStats, setLanguageStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        
        const response = await fetch(`https://serverz-78ek.onrender.com/api/contest/recent-activity/${userId}`);
        const data = await response.json();

        if (data.success) {
          setRecentActivity(data.data);  // Set the recent activity
        } else {
          console.error("Error fetching recent activity:", data.message);
        }
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      }
    };

    fetchRecentActivity();
    console.log(userId)
  }, []); // Run only once when the component mounts

  const fetchContestProgress = async () => {
    try {
      const response = await fetch(`https://serverz-78ek.onrender.com/api/contest/progress/${currentUser._id}`);
      const data = await response.json();

      if (data.success) {
        const progress = data.data;
        setLanguageStats(data.data.languageStats);
        setStats({
          solved: progress.solvedCount,
          attempted: progress.attemptedCount,
          totalSubmissions: (progress.totalAttempted) + (progress.totalSolved ),
        });
      }
    } catch (error) {
      console.error("Failed to fetch contest progress:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchContestProgress();
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        {/* Progress Header */}
        <div className="ml-10 mr-10 mb-8 p-10 bg-yellow-50 dark:bg-black rounded-lg shadow-sm">
          <h2 className="text-3xl dark:text-yellow-300 font-bold mb-4">
            Your Progress
          </h2>
          <p className="text-gray-600 dark:text-white">
            Track your problem-solving progress across multiple programming
            languages.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 ml-10 mr-10 ">
          <div className="p-6 bg-white dark:bg-transparent dark:border dark:border-yellow-400/40 rounded-lg shadow-md dark:shadow-yellow-200/20">
            <h3 className="text-xl dark:text-yellow-200 font-semibold mb-2">
              Total Problems Solved
            </h3>
            <p className="text-4xl font-bold text-green-600">{stats.solved}</p>
          </div>
          <div className="p-6 bg-white dark:bg-transparent dark:border dark:border-yellow-400/40 rounded-lg shadow-md dark:shadow-yellow-200/20">
            <h3 className="text-xl dark:text-yellow-200 font-semibold mb-2">
              Total Problems Attempted
            </h3>
            <p className="text-4xl font-bold text-blue-600">{stats.attempted}</p>
          </div>
        </div>

         {/* Language-wise Stats */}
         <div className="ml-10 mr-10 bg-white dark:bg-black rounded-lg shadow-md dark:shadow-yellow-200/20 p-6">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Language-wise Progress
          </h2>
          <div className="space-y-4">
            {Object.keys(languageStats).map((language) => {
              const data = languageStats[language];
              return (
                <div
                  key={language}
                  className="p-4 border rounded-lg bg-yellow-50 dark:bg-transparent dark:border-yellow-200 dark:hover:bg-yellow-100/20 hover:bg-yellow-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold dark:text-yellow-100">
                      {language}
                    </h3>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Solved
                        </p>
                        <p className="text-green-600 dark:text-green-500 font-bold text-xl">
                          {data.solved}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-sm dark:text-gray-300">
                          Attempted
                        </p>
                        <p className="text-blue-600 dark:text-blue-500 font-bold text-xl">
                          {data.attempted}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

       

         {/* Recent Activity */}
         <div className="mt-8 ml-10 mr-10 bg-white dark:bg-black rounded-lg shadow-md dark:shadow-yellow-200/20 p-6 dark:border dark:border-yellow-200">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Recent Activity
          </h2>
          <ul className="space-y-4">
            {recentActivity.map((activity, index) => (
              <li
                key={index}
                className="p-4 bg-yellow-50 dark:bg-transparent dark:border dark:text-white dark:border-yellow-200 rounded-lg shadow-md"
              >
                {activity.verdict === "Accepted" ? (
                  <>
                    Solved "{activity.problemTitle}" -{" "}
                    <span className="text-green-600 dark:text-green-400">
                      Accepted
                    </span>
                  </>
                ) : (
                  <>
                    Attempted "{activity.problemTitle}" -{" "}
                    <span className="text-red-600 dark:text-red-500">
                      {activity.verdict}
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Progress;
