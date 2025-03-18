// import React, { useEffect, useState } from "react";
// import { Line, Bar } from "react-chartjs-2";

// const Graphs = ({ runData, currentDate }) => {
//   const [totalRunsData, setTotalRunsData] = useState({
//     labels: [],
//     datasets: [],
//   });
//   const [languageRunsData, setLanguageRunsData] = useState({
//     labels: [],
//     datasets: [],
//   });
//   const [languageCounts, setLanguageCounts] = useState({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     // Prepare data for Total No. of Runs vs Date graph
//     const aggregatedRunsByDate = {};
//     runData.forEach((run) => {
//       const date = run.date;
//       if (date) {
//         aggregatedRunsByDate[date] = (aggregatedRunsByDate[date] || 0) + 1;
//       }
//     });
//     const totalRunsLabels = Object.keys(aggregatedRunsByDate);
//     const totalRunsDataPoints = Object.values(aggregatedRunsByDate);
//     setTotalRunsData({
//       labels: totalRunsLabels,
//       datasets: [
//         {
//           label: "Total No. of Runs",
//           data: totalRunsDataPoints,
//           borderColor: "rgba(75,192,192,1)",
//           backgroundColor: "rgba(75,192,192,0.2)",
//           fill: true,
//         },
//       ],
//     });

//     // Prepare data for No. of Runs vs Language graph
//     const languageDataForCurrentDate = runData.filter(
//       (run) => run.date === currentDate
//     );
//     const counts = {};
//     languageDataForCurrentDate.forEach((run) => {
//       counts[run.language] = (counts[run.language] || 0) + 1;
//     });
//     setLanguageCounts(counts);
//     setLanguageRunsData({
//       labels: Object.keys(counts),
//       datasets: [
//         {
//           label: `No. of Runs by Language on ${currentDate}`,
//           data: Object.values(counts),
//           backgroundColor: "rgba(255,99,132,0.6)",
//         },
//       ],
//     });
//   }, [runData, currentDate]);

//   return (
//     <div className="flex-1">
//       {/* Total Runs vs Date Graph */}
//       <div
//         className="mb-8 bg-white dark:bg-yellow-300/20 p-4 rounded-lg shadow-md"
//         style={{ height: "400px" }}
//       >
//         <h2 className="text-lg font-semibold text-center text-yellow-700">
//           Total No. of Runs vs Date
//         </h2>
//         <Line
//           data={totalRunsData}
//           options={{
//             responsive: true,
//             maintainAspectRatio: true,
//             plugins: {
//               legend: { display: true },
//             },
//             scales: {
//               x: {
//                 title: {
//                   display: true,
//                   text: "Date",
//                 },
//               },
//               y: {
//                 title: {
//                   display: true,
//                   text: "No. of Runs",
//                 },
//                 beginAtZero: true,
//               },
//             },
//           }}
//         />
//       </div>

//       {/* No. of Runs vs Language Graph */}
//       <div
//         className="bg-white dark:bg-yellow-300/20 p-4 rounded-lg shadow-md"
//         style={{ height: "400px" }}
//       >
//         <h2 className="text-lg font-semibold text-center text-yellow-700">
//           No. of Runs vs Language on {currentDate}
//         </h2>
//         {Object.keys(languageCounts).length === 0 ? (
//           <p className="text-center text-gray-500">
//             No language data available for {currentDate}.
//           </p>
//         ) : (
//           <Bar
//             data={languageRunsData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: true,
//               plugins: {
//                 legend: { display: true },
//               },
//               scales: {
//                 x: {
//                   title: { display: true, text: "Language" },
//                 },
//                 y: {
//                   title: { display: true, text: "No. of Runs" },
//                   beginAtZero: true,
//                 },
//               },
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Graphs;

import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";

const Graphs = ({ runData, currentDate }) => {
  const [totalRunsData, setTotalRunsData] = useState({
    labels: [],
    datasets: [],
  });
  const [languageRunsData, setLanguageRunsData] = useState({
    labels: [],
    datasets: [],
  });
  const [languageCounts, setLanguageCounts] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Prepare data for Total No. of Runs vs Date graph
    const aggregatedRunsByDate = {};
    runData.forEach((run) => {
      const date = run.date;
      if (date) {
        aggregatedRunsByDate[date] = (aggregatedRunsByDate[date] || 0) + 1;
      }
    });
    const totalRunsLabels = Object.keys(aggregatedRunsByDate);
    const totalRunsDataPoints = Object.values(aggregatedRunsByDate);
    setTotalRunsData({
      labels: totalRunsLabels,
      datasets: [
        {
          label: "Total No. of Runs",
          data: totalRunsDataPoints,
          borderColor: "burlywood",
          backgroundColor: "white",
          fill: true,
        },
      ],
    });

    // Prepare data for No. of Runs vs Language graph
    const languageDataForCurrentDate = runData.filter(
      (run) => run.date === currentDate
    );
    const counts = {};
    languageDataForCurrentDate.forEach((run) => {
      counts[run.language] = (counts[run.language] || 0) + 1;
    });
    setLanguageCounts(counts);
    setLanguageRunsData({
      labels: Object.keys(counts),
      datasets: [
        {
          label: `No. of Runs by Language on ${currentDate}`,
          data: Object.values(counts),
          backgroundColor: "darkkhaki",
        },
      ],
    });
  }, [runData, currentDate]);

  return (
    <div className="flex flex-wrap gap-4">
      {/* Total Runs vs Date Graph */}
      <div
        className="flex-1 bg-white dark:bg-yellow-200/10 p-4 rounded-lg shadow-md"
        style={{ flexBasis: "calc(50% - 1rem)", height: "400px" }}
      >
        <h2 className="text-lg font-semibold dark:font-normal text-center text-yellow-700 dark:text-yellow-100">
          Total No. of Runs vs Date
        </h2>
        <Line
          data={totalRunsData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "gray", // Change legend label color
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                  color: "gray", // Change x-axis title color
                },
                ticks: {
                  color: "gray", // Change x-axis tick color
                },
              },
              y: {
                title: {
                  display: true,
                  text: "No. of Runs",
                  color: "gray", // Change y-axis title color
                },
                ticks: {
                  color: "gray", // Change y-axis tick color
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      {/* No. of Runs vs Language Graph */}
      <div
        className="flex-1 bg-white dark:bg-yellow-200/10 p-4 rounded-lg shadow-md"
        style={{ flexBasis: "calc(50% - 1rem)", height: "400px" }}
      >
        <h2 className="text-lg text-yellow-700 font-semibold text-center dark:font-normal dark:text-yellow-100">
          No. of Runs vs Language on {currentDate}
        </h2>
        {Object.keys(languageCounts).length === 0 ? (
          <p className="text-center text-gray-500">
            No language data available for {currentDate}.
          </p>
        ) : (
          <Bar
            data={languageRunsData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    color: "gray", // Change legend label color
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Language",
                    color: "gray", // Change x-axis title color
                  },
                  ticks: {
                    color: "gray", // Change x-axis tick color
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "No. of Runs",
                    color: "gray", // Change y-axis title color
                  },
                  ticks: {
                    color: "gray", // Change y-axis tick color
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Graphs;
