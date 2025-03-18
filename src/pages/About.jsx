import { default as React, useState } from "react";
import SideButtons from "../components/SideButtons";

export default function About() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 to-white font-['Poppins'] dark:from-[#fff7e6] dark:to-[#f5e8b7]">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="relative flex flex-col items-center py-12">
          {/* Header Section */}
          <div className="w-full max-w-4xl bg-yellow-100 dark:bg-yellow-200/30 rounded-3xl p-10 shadow-lg dark:shadow-yellow-300/20 text-center transform transition hover:scale-105 duration-300">
            <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-600 dark:text-yellow-700 mb-4 tracking-tight">
              About CodERA
            </h1>
            <p className="text-lg md:text-xl text-gray-800 dark:text-gray-900 max-w-2xl mx-auto leading-relaxed">
              Welcome to CodERA! We’re your all-in-one platform to master
              programming—from beginner to advanced—breaking down language
              barriers with ease and innovation.
            </p>
          </div>

          {/* Main Content Sections */}
          <div className="w-full max-w-4xl mx-auto mt-16 space-y-16 px-6">
            {/* Motivation Section */}
            <div className="bg-white dark:bg-yellow-50/50 rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center gap-8 transform transition hover:shadow-xl duration-300">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="h-36 w-36 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-600 text-4xl font-bold shadow-md">
                  Why?
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-700 mb-4">
                  Our Motivation
                </h2>
                <p className="text-gray-700 dark:text-gray-800 text-lg leading-relaxed">
                  CodERA is designed to be the ultimate coding companion. We
                  empower users of all levels—beginners to experts—by offering
                  a unified platform that transcends language barriers and
                  fosters growth through accessible, tailored learning.
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-yellow-50 dark:bg-yellow-100/60 rounded-xl shadow-md p-8 transform transition hover:shadow-xl duration-300">
              <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-700 text-center mb-8">
                Platform Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: "💻", text: "Interactive Coding" },
                  { icon: "🌐", text: "Multi-Language Support" },
                  { icon: "📚", text: "Beginner to Advanced" },
                  { icon: "⏱️", text: "Real-Time Feedback" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="text-center transform transition hover:scale-105 duration-200"
                  >
                    <div className="h-16 w-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto shadow-md">
                      <span className="text-yellow-600 text-2xl">
                        {feature.icon}
                      </span>
                    </div>
                    <p className="mt-4 text-gray-700 dark:text-gray-800 font-medium">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Vision Section */}
            <div className="bg-yellow-100 dark:bg-yellow-200/40 rounded-xl shadow-md p-8 text-center transform transition hover:shadow-xl duration-300">
              <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-700 mb-6">
                Our Future Vision
              </h2>
              <p className="text-gray-700 dark:text-gray-800 text-lg leading-relaxed max-w-2xl mx-auto">
                We envision CodERA as a global leader in coding education,
                expanding with more languages, advanced challenges, and a
                mobile app—making learning limitless, inclusive, and fun for
                everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}