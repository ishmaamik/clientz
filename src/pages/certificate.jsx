import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import html2canvas from "html2canvas";

const CertificatePage = () => {
  const [showCertificate, setShowCertificate] = useState(true);

  // Function to handle closing the certificate
  const handleClose = () => {
    setShowCertificate(false); // This will hide the certificate when "Close" is clicked
  };

  return <div>{showCertificate && <Certificate onClose={handleClose} />}</div>;
};

const Certificate = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [rank, setRank] = useState("");
  const [stats, setStats] = useState({
    solved: 0,
    attempted: 0,
    totalSubmissions: 0,
  });

  useEffect(() => {
    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem("persist:root"));
    console.log("user from localStorage:", user); // Debugging: Check the value of user

    // Access currentUser directly without parsing user again
    const currentUser = user ? JSON.parse(user.user).currentUser : null;
    console.log("currentUser:", currentUser); // Debugging: Check if currentUser is properly fetched

    const userId = currentUser ? currentUser._id : null;

    if (currentUser) {
      const userNameFromStorage = currentUser.username; // Take username from currentUser directly
      console.log("Fetched userName:", userNameFromStorage); // Debugging: Check the userName
      setUserName(userNameFromStorage);
    } else {
      console.log("No currentUser found in localStorage");
      setUserName("User");
    }

    // Fetch contest progress data
    const fetchContestProgress = async () => {
      if (!userId) {
        console.error("No user ID found");
        return;
      }

      try {
        const response = await fetch(`/api/contest/progress/${userId}`);
        const data = await response.json();

        if (data.success) {
          const progress = data.data;
          setStats({
            solved: progress.solvedCount,
            attempted: progress.attemptedCount,
            totalSubmissions: progress.totalAttempted + progress.totalSolved,
          });

          // Generate rank based on total solutions
          const totalSolutions = progress.solvedCount;
          if (totalSolutions < 5) {
            setRank("Newbie");
          } else if (totalSolutions >= 5 && totalSolutions < 10) {
            setRank("Pupil");
          } else if (totalSolutions >= 10 && totalSolutions < 15) {
            setRank("Specialist");
          } else if (totalSolutions >= 15 && totalSolutions < 20) {
            setRank("Expert");
          } else if (totalSolutions >= 20 && totalSolutions < 25) {
            setRank("Candidate Master");
          } else if (totalSolutions >= 25 && totalSolutions < 30) {
            setRank("Master");
          } else {
            setRank("International Master");
          }
        }
      } catch (error) {
        console.error("Failed to fetch contest progress:", error);
      }
    };

    if (userId) {
      fetchContestProgress();
    }
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const downloadCertificate = () => {
    const certificateElement = document.getElementById("certificate");
    if (!certificateElement) return;

    html2canvas(certificateElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${userName.replace(/\s+/g, "_")}_certificate.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6">
        <div
          id="certificate"
          className="bg-white p-8 rounded-lg border-8 border-double border-gray-300"
        >
          <div className="text-center">
            {/* Logo Circle */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-gray-900 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">CodERA</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-serif mb-6">
              Certificate of Accomplishment
            </h1>
            <div className="bg-gray-900 text-white py-2 px-8 inline-block rounded-full mb-8">
              {rank}
            </div>

            <div className="mb-8">
              <p className="text-gray-600 mb-4">PRESENTED TO</p>
              <p className="text-3xl font-serif italic mb-2">{userName}</p>{" "}
              {/* Display User's Name */}
            </div>

            <p className="text-gray-600 mb-8">
              The bearer of this certificate has passed the problem-solving
              tests.
            </p>

            <div className="flex justify-between items-end mt-16">
              <div>
                <p className="text-gray-600">Earned on: {currentDate}</p>
                <p className="text-gray-500 text-sm">
                  ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <div className="mb-2"></div>
                <p className="font-semibold">&lt;/CodERA&gt;</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose} // Close the certificate modal
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
          <button
            onClick={downloadCertificate} // Download the certificate image
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

Certificate.propTypes = {
  onClose: PropTypes.func.isRequired, // Ensure onClose is passed to the Certificate component
};

export default CertificatePage;
