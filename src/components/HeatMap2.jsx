// import React, { useState, useEffect } from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";
// import { Tooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css";

// const customStyles = `
//   .color-dark-green { fill: #388E3C; }
//   .color-medium-green { fill: #81C784; }
//   .color-light-green { fill: #A5D6A7; }
//   .color-empty { fill: #D3D3D3; }
// `;

// const HeatMap2 = () => {
//   const [data, setData] = useState([]);
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   const user = JSON.parse(localStorage.getItem("persist:root"));
//   const currentUser = user ? JSON.parse(user.user).currentUser : null;
//   const userId = currentUser ? currentUser._id : null;

//   console.log("User ID from Local Storage:", userId);

//   const fetchContestProgress = async () => {
//     try {
//       const response = await fetch(`/api/contest/progress/${userId}`);
//       const data = await response.json();

//       console.log("Contest Progress Data:", data);

//       if (
//         data.success &&
//         data.data &&
//         Array.isArray(data.data.problemsSolved)
//       ) {
//         const problemsSolved = data.data.problemsSolved;

//         console.log("Problems Solved Array:", problemsSolved);

//         const formattedData = problemsSolved
//           .map((entry) => {
//             const date = entry.solvedAt;
//             if (date) {
//               const dateOnly = new Date(date).toISOString().split("T")[0];
//               return {
//                 date: dateOnly,
//                 count: 1,
//               };
//             }
//             return null;
//           })
//           .filter(Boolean);

//         console.log("Formatted Data:", formattedData);

//         const aggregatedData = formattedData.reduce((acc, current) => {
//           const { date, count } = current;
//           if (acc[date]) {
//             acc[date].count += count;
//           } else {
//             acc[date] = { date, count };
//           }
//           return acc;
//         }, {});

//         console.log("Aggregated Data:", aggregatedData);

//         const finalData = Object.values(aggregatedData);

//         console.log("Final Data for Heatmap:", finalData);

//         setData(finalData);
//       } else {
//         console.error("Error: problemsSolved is missing or empty.");
//       }
//     } catch (error) {
//       console.error("Failed to fetch contest progress:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchContestProgress();
//     } else {
//       console.log("No userId found, skipping data fetch.");
//     }
//   }, [userId]);

//   const getColorClass = (value) => {
//     if (!value) return "color-empty";
//     if (value.count >= 8) return "color-dark-green";
//     if (value.count >= 5) return "color-medium-green";
//     if (value.count > 0) return "color-light-green";
//     return "color-empty";
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <style>{customStyles}</style>
//       <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
//         Contribution Heatmap
//       </h2>
//       <CalendarHeatmap
//         startDate={new Date(`${currentYear}-01-01`)}
//         endDate={new Date(`${currentYear}-12-31`)}
//         values={data}
//         gutterSize={4}
//         showWeekdayLabels={true}
//         classForValue={getColorClass}
//         tooltipDataAttrs={(value) => {
//           if (!value || !value.date)
//             return { "data-tooltip-id": "heatmap-tooltip" };

//           return {
//             "data-tooltip-id": "heatmap-tooltip",
//             "data-tooltip-content": `${value.date}: ${value.count} ${
//               value.count === 1 ? "problem" : "problems"
//             } solved`,
//           };
//         }}
//       />
//       <Tooltip id="heatmap-tooltip" />
//     </div>
//   );
// };

// export default HeatMap2;

import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Siren as Fire } from "lucide-react";

const customStyles = `
  .color-dark-green { fill: #388E3C; }
  .color-medium-green { fill: #81C784; }
  .color-light-green { fill: #A5D6A7; }
  .color-empty { fill: #D3D3D3; }
`;

const HeatMap2 = () => {
  const [data, setData] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const user = JSON.parse(localStorage.getItem("persist:root"));
  const currentUser = user ? JSON.parse(user.user).currentUser : null;
  const userId = currentUser ? currentUser._id : null;

  const calculateStreaks = (solvedDates) => {
    if (!solvedDates.length) return { current: 0, longest: 0 };

    // Sort dates in ascending order
    const sortedDates = solvedDates.sort((a, b) => new Date(a) - new Date(b));

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let previousDate = null;

    // Get today's date without time
    const today = new Date().toISOString().split("T")[0];

    // Calculate streaks
    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      const dateStr = currentDate.toISOString().split("T")[0];

      if (!previousDate) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(previousDate);
        const diffDays = Math.floor(
          (currentDate - prevDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          tempStreak = 1;
        }
      }

      longestStreak = Math.max(longestStreak, tempStreak);
      previousDate = dateStr;
    }

    // Check if the streak is still active (last solved problem was today or yesterday)
    const lastDate = new Date(sortedDates[sortedDates.length - 1]);
    const diffToToday = Math.floor(
      (new Date(today) - lastDate) / (1000 * 60 * 60 * 24)
    );

    currentStreak = diffToToday <= 1 ? tempStreak : 0;

    return { current: currentStreak, longest: longestStreak };
  };

  const fetchContestProgress = async () => {
    try {
      const response = await fetch(`https://serverz-78ek.onrender.com/api/contest/progress/${userId}`);
      const data = await response.json();

      if (
        data.success &&
        data.data &&
        Array.isArray(data.data.problemsSolved)
      ) {
        const problemsSolved = data.data.problemsSolved;

        const formattedData = problemsSolved
          .map((entry) => {
            const date = entry.solvedAt;
            if (date) {
              const dateOnly = new Date(date).toISOString().split("T")[0];
              return {
                date: dateOnly,
                count: 1,
              };
            }
            return null;
          })
          .filter(Boolean);

        const aggregatedData = formattedData.reduce((acc, current) => {
          const { date, count } = current;
          if (acc[date]) {
            acc[date].count += count;
          } else {
            acc[date] = { date, count };
          }
          return acc;
        }, {});

        const finalData = Object.values(aggregatedData);
        setData(finalData);

        // Calculate streaks
        const solvedDates = problemsSolved
          .map(
            (problem) => new Date(problem.solvedAt).toISOString().split("T")[0]
          )
          .filter(Boolean);

        const { current, longest } = calculateStreaks(solvedDates);
        setCurrentStreak(current);
        setLongestStreak(longest);
      }
    } catch (error) {
      console.error("Failed to fetch contest progress:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchContestProgress();
    }
  }, [userId]);

  const getColorClass = (value) => {
    if (!value) return "color-empty";
    if (value.count >= 8) return "color-dark-green";
    if (value.count >= 5) return "color-medium-green";
    if (value.count > 0) return "color-light-green";
    return "color-empty";
  };

  return (
    <div className="p-6 bg-white dark:bg-black rounded-lg shadow-lg">
      <style>{customStyles}</style>
      <h2 className="text-2xl font-thin mb-4 text-gray-900 dark:text-white text-center">
        Problems Solved
      </h2>
      <CalendarHeatmap
        startDate={new Date(`${currentYear}-01-01`)}
        endDate={new Date(`${currentYear}-12-31`)}
        values={data}
        gutterSize={4}
        showWeekdayLabels={true}
        classForValue={getColorClass}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date)
            return { "data-tooltip-id": "heatmap-tooltip" };

          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${value.date}: ${value.count} ${
              value.count === 1 ? "problem" : "problems"
            } solved`,
          };
        }}
      />
      <Tooltip id="heatmap-tooltip" />

      <div className="flex items-center justify-center gap-8 mt-4 text-gray-900 dark:text-white">
        <div className="flex items-center gap-2">
          <Fire className="w-5 h-5 text-green-500" />
          <span className="font-medium">Current Streak:</span>
          <span className="font-bold">{currentStreak} days</span>
        </div>
        <div className="flex items-center gap-2">
          <Fire className="w-5 h-5 text-green-700" />
          <span className="font-medium">Longest Streak:</span>
          <span className="font-bold">{longestStreak} days</span>
        </div>
      </div>
    </div>
  );
};

export default HeatMap2;
