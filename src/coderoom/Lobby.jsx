import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import ThemeToggle from "../components/ThemeToggle";
import SideButtons from "../components/SideButtons";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Joining room", room, email); // Log room and email to verify they are being passed
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );
  

  useEffect(() => {
    socket.on("room:join:success", (data) => {
      const { room } = data;
      navigate(`/codeRoom/${room}`); // Navigate to the room
    });
    return () => {
      socket.off("room:join:success");
    };
  }, [navigate, socket]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">

      <div className="flex min-h-screen bg-yellow-50 dark:bg-[#18181b] font-['Poppins']">
        <SideButtons />
        <div className="relative flex-grow bg-cover bg-center py-32">
          <div className="absolute inset-0 bg-gray-900/50"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl font-bold text-yellow-200 mb-6">
              Join the Room
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Enter your email and room number to join the live session.
            </p>

            <form onSubmit={handleSubmitForm} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl space-y-6">
              <div>
                <label htmlFor="email" className="text-yellow-600 dark:text-yellow-200 font-semibold">
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    console.log("Email input changed:", e.target.value);  // Log email changes
                    setEmail(e.target.value);
                  }}
                  className="w-full p-4 mt-2 border-2 border-yellow-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="room" className="text-yellow-600 dark:text-yellow-200 font-semibold">
                  Room Number
                </label>
                <input
                  type="text"
                  id="room"
                  value={room}
                  onChange={(e) => {
                    console.log("Room input changed:", e.target.value);  // Log room changes
                    setRoom(e.target.value);
                  }}
                  className="w-full p-4 mt-2 border-2 border-yellow-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />

              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-yellow-500 hover:shadow-xl"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>

  );
};

export default LobbyScreen;
