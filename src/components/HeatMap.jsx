// import React, { useEffect, useState } from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";
// import { Tooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css";

// const HeatMap = ({ runData, currentDate }) => {
//   const [heatmapData, setHeatmapData] = useState([]);

//   useEffect(() => {
//     const activityData = runData.reduce((acc, run, index) => {
//       const [dd, mm, yyyy] = run.date.split("-");
//       const isoDate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;

//       const existingEntry = acc.find((entry) => entry.date === isoDate);
//       if (existingEntry) {
//         existingEntry.count++;
//         existingEntry.runs.push(index + 1);
//       } else {
//         acc.push({ date: isoDate, count: 1, runs: [index + 1] });
//       }
//       return acc;
//     }, []);

//     setHeatmapData(activityData);
//   }, [runData]);

//   const getClassForValue = (value) => {
//     if (!value) return "color-empty";
//     if (value.count >= 5) return "color-scale-4";
//     if (value.count >= 3) return "color-scale-3";
//     if (value.count >= 1) return "color-scale-1";
//     return "color-empty";
//   };

//   const currentYear = new Date(
//     currentDate.split("-").reverse().join("-")
//   ).getFullYear();

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <style>{`
//         .react-calendar-heatmap .color-empty { fill: #ebedf0; }
//         .react-calendar-heatmap .color-scale-1 { fill: #80deea; }
//         .react-calendar-heatmap .color-scale-3 { fill: #00bcd4; }
//         .react-calendar-heatmap .color-scale-4 { fill: #0097a7; }
//         .react-calendar-heatmap .color-scale-5 { fill: #006064; }
//       `}</style>

//       <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
//         Activity Heatmap
//       </h2>

//       <CalendarHeatmap
//         startDate={new Date(`${currentYear}-01-01`)}
//         endDate={new Date(`${currentYear}-12-31`)}
//         values={heatmapData}
//         classForValue={getClassForValue}
//         showWeekdayLabels={true}
//         gutterSize={2}
//         tooltipDataAttrs={(value) => {
//           if (!value || !value.date)
//             return { "data-tooltip-id": "heatmap-tooltip" };

//           return {
//             "data-tooltip-id": "heatmap-tooltip",
//             "data-tooltip-content": `${value.date}: ${value.count} ${
//               value.count === 1 ? "run" : "runs"
//             }`,
//           };
//         }}
//       />

//       <Tooltip id="heatmap-tooltip" />
//     </div>
//   );
// };

// export default HeatMap;

import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Siren as Fire } from "lucide-react";

const HeatMap = ({ runData, currentDate }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    const activityData = runData.reduce((acc, run, index) => {
      const [dd, mm, yyyy] = run.date.split("-");
      const isoDate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;

      const existingEntry = acc.find((entry) => entry.date === isoDate);
      if (existingEntry) {
        existingEntry.count++;
        existingEntry.runs.push(index + 1);
      } else {
        acc.push({ date: isoDate, count: 1, runs: [index + 1] });
      }
      return acc;
    }, []);

    setHeatmapData(activityData);

    // Calculate streaks
    const calculateStreaks = (dates) => {
      if (!dates.length) return { current: 0, longest: 0 };

      // Sort dates in ascending order
      const sortedDates = dates.sort((a, b) => new Date(a) - new Date(b));

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

      // Check if the streak is still active (last run was today or yesterday)
      const lastDate = new Date(sortedDates[sortedDates.length - 1]);
      const diffToToday = Math.floor(
        (new Date(today) - lastDate) / (1000 * 60 * 60 * 24)
      );

      currentStreak = diffToToday <= 1 ? tempStreak : 0;

      return { current: currentStreak, longest: longestStreak };
    };

    const dates = activityData.map((data) => data.date);
    const { current, longest } = calculateStreaks(dates);
    setCurrentStreak(current);
    setLongestStreak(longest);
  }, [runData]);

  const getClassForValue = (value) => {
    if (!value) return "color-empty";
    if (value.count >= 5) return "color-scale-4";
    if (value.count >= 3) return "color-scale-3";
    if (value.count >= 1) return "color-scale-1";
    return "color-empty";
  };

  const currentYear = new Date(
    currentDate.split("-").reverse().join("-")
  ).getFullYear();

  return (
    <div className="p-6 bg-white dark:bg-black rounded-lg shadow-lg">
      <style>{`
        .react-calendar-heatmap .color-empty { fill: #ebedf0; }
        .react-calendar-heatmap .color-scale-1 { fill: #80deea; }
        .react-calendar-heatmap .color-scale-3 { fill: #00bcd4; }
        .react-calendar-heatmap .color-scale-4 { fill: #0097a7; }
        .react-calendar-heatmap .color-scale-5 { fill: #006064; }
      `}</style>

      <h2 className="text-xl font-thin mb-4 text-gray-900 dark:text-white text-center">
        Activity
      </h2>

      <CalendarHeatmap
        startDate={new Date(`${currentYear}-01-01`)}
        endDate={new Date(`${currentYear}-12-31`)}
        values={heatmapData}
        classForValue={getClassForValue}
        showWeekdayLabels={true}
        gutterSize={2}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date)
            return { "data-tooltip-id": "heatmap-tooltip" };

          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${value.date}: ${value.count} ${
              value.count === 1 ? "run" : "runs"
            }`,
          };
        }}
      />

      <Tooltip id="heatmap-tooltip" />

      <div className="flex items-center justify-center gap-8 mt-4 text-gray-900 dark:text-white">
        <div className="flex items-center gap-2">
          <Fire className="w-5 h-5 text-blue-500" />
          <span className="font-medium">Current Streak:</span>
          <span className="font-bold">{currentStreak} days</span>
        </div>
        <div className="flex items-center gap-2">
          <Fire className="w-5 h-5 text-blue-700" />
          <span className="font-medium">Longest Streak:</span>
          <span className="font-bold">{longestStreak} days</span>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
