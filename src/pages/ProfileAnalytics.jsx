import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import SideButtons from "../components/SideButtons";
import Graphs from "../components/Graphs.jsx";
import HeatMap from "../components/HeatMap.jsx"; // Importing HeatMap
import HeatMap2 from "../components/HeatMap2.jsx"; // Importing HeatMap2

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

export default function Profile() {
  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [runData, setRunData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const getCurrentDate = () => {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, "0")}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getFullYear()}`;
  };

  const currentDate = getCurrentDate();

  useEffect(() => {
    fetchRunData();
  }, []);

  const fetchRunData = async () => {
    try {
      const res = await fetch(`https://serverz-78ek.onrender.com/api/run?userId=${currentUser._id}`);
      const data = await res.json();
      console.log("Run Data from API:", data);

      if (Array.isArray(data)) {
        setRunData(data);
      } else {
        console.error("Invalid data format. Expected an array:", data);
        setRunData([]);
      }
    } catch (err) {
      console.error("Error fetching run data:", err);
      setRunData([]);
    }
  };

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
      <SideButtons />

      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div>
          <div className="flex flex-col bg-gray-50 dark:bg-yellow-200/40 p-4 rounded-lg shadow-lg w-[800px] dark:shadow-black mb-2">
            <Link to="/profile" className="ml-auto flex gap-2 text-black">
              {/* Pencil Icon */}
              <img
                src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                alt="Edit Icon"
                className="h-5 w-5"
              />
              <span className="dark:text-black dark:font-semibold">
                Edit your public profile
              </span>
            </Link>

            {/* Profile Info */}
            <div className="flex">
              {/* Profile Picture */}
              <img
                src={formData.profilePicture || currentUser.profilePicture}
                alt="profile"
                className="h-32 w-32 rounded-full object-cover border-2 border-gray-300"
              />

              {/* User Details */}
              <div className="ml-6 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-gray-900">
                  Hey, {currentUser.username}!
                </h2>
              </div>
            </div>
          </div>

          {/* Graphs Section */}
          <Graphs runData={runData || []} currentDate={currentDate} />
        </div>

        {/* HeatMap Section */}
        <div className="mt-5 mb-7">
          <HeatMap runData={runData || []} currentDate={currentDate} />
        </div>

        {/* HeatMap2 Section */}
        <div className="mt-5 mb-7">
          <HeatMap2 runData={runData || []} currentDate={currentDate} />
        </div>
      </div>
    </div>
  );
}
