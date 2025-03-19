import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import { Groq } from "groq-sdk";
import peer from "../service/peer";
import SideButtons from "../components/SideButtons";
import {
  Code2,
  Copy,
  Download,
  Play,
  RefreshCw,
  Trash2,
  Wand2,
} from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../context/SocketProvider";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const languageExamples = {
  python3: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`,
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
};

const RoomPage = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [muted, setMuted] = useState(false);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [code, setCode] = useState(languageExamples["python3"]);
  const [language, setLanguage] = useState("python3");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [groqAnalysis, setGroqAnalysis] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [inputNeeded, setInputNeeded] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [panelHeight, setPanelHeight] = useState(40); // Default 40%
  const [isDragging, setIsDragging] = useState(false);
  const [input, setInput] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const languages = [
    { id: "c", name: "C", icon: "🎯" },
    { id: "cpp", name: "C++", icon: "⚡" },
    { id: "java", name: "Java", icon: "☕" },
    { id: "python3", name: "Python", icon: "🐍" },
  ];

  const inputKeywords = {
    c: ["scanf"],
    cpp: ["cin"],
    java: ["Scanner"],
    python3: ["input"],
  };

  useEffect(() => {
    setCode(languageExamples[language]); // Always set to languageExamples
  }, [language]);

  const handleEditorChange = (value) => {
    setCode(value);
    if (autoSave) {
      localStorage.setItem(`code-${language}`, value);
    }
    checkForInputFunctions();
    console.log("Emitting code update:", value); // Add a log to check if the emit happens
    socket.emit("code:update", { roomId, code: value });
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    setCode(languageExamples[newLanguage]);
    setOutput("");
    setGroqAnalysis("");
  };

  const checkForInputFunctions = () => {
    const keywords = inputKeywords[language] || [];
    const needsInput = keywords.some((keyword) => code.includes(keyword));
    setInputNeeded(needsInput);
    return needsInput;
  };

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const compileCode = async () => {
    if (inputNeeded && !input) {
      alert("This code requires input. Please provide input data.");
      return;
    }

    setIsLoading(true);
    try {
      // Execute the code
      const executionResponse = await axios.post("https://serverz-78ek.onrender.com/api/execute", {
        script: code,
        language: language,
        input: input,
      });
      const executionOutput = executionResponse.data.output;
      setOutput(executionOutput);
      // Format the current date in `dd-mm-yyyy` format
      const now = new Date();
      const formattedDate = `${now.getDate().toString().padStart(2, "0")}-${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${now.getFullYear()}`;

      // Save run details
      try {
        await axios.post("https://serverz-78ek.onrender.com/api/run", {
          userId: currentUser._id,
          date: formattedDate,
          language,
        });
        console.log("Run details saved successfully!");
      } catch (saveError) {
        console.error("Error saving run details:", saveError);
        alert("Failed to save run details. Please try again.");
      }

      // Analyze the code using Groq AI
      const analysisResponse = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content:
              "You are a programming expert. Analyze the provided code for its space and time complexity. Suggest any potential improvements for performance optimization in a clear and concise way. Format your response in markdown.",
          },
          {
            role: "user",
            content: `Here is the code:\n\nLanguage: ${language}\n\nCode:\n${code}`,
          },
        ],
      });

      const aiAnalysis =
        analysisResponse.choices[0]?.message?.content ||
        "No analysis available.";
      setGroqAnalysis(aiAnalysis);
    } catch (error) {
      setOutput("Error: Failed to execute code. Please try again.");
      setGroqAnalysis("Error: Failed to analyze code.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const container = document.getElementById("main-content");
    if (!container) return;

    const containerHeight = container.clientHeight;
    const mouseY = e.clientY;
    const containerTop = container.getBoundingClientRect().top;
    const relativeY = mouseY - containerTop;

    // Convert to percentage and clamp between 20% and 70%
    const newHeight = Math.min(
      Math.max((1 - relativeY / containerHeight) * 100, 20),
      70
    );
    setPanelHeight(newHeight);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const clearOutput = () => {
    setOutput("");
    setInput("");
    setGroqAnalysis("");
  };

  const downloadCode = () => {
    const extensions = {
      c: ".c",
      cpp: ".cpp",
      java: ".java",
      python3: ".py",
    };

    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code${extensions[language]}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleEditorDidMount = (editor, monaco) => {
    monaco.editor.defineTheme("customDark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955", fontStyle: "italic" },
        { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
        { token: "string", foreground: "CE9178" },
        { token: "function", foreground: "DCDCAA" },
        { token: "variable", foreground: "9CDCFE" },
        { token: "number", foreground: "B5CEA8" },
      ],
      colors: {
        "editor.background": "#1E1E1E",
        "editor.foreground": "#D4D4D4",
        "editor.lineHighlightBackground": "#2F3139",
        "editorLineNumber.foreground": "#858585",
      },
    });

    monaco.editor.defineTheme("customLight", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "008000", fontStyle: "italic" },
        { token: "keyword", foreground: "0000FF", fontStyle: "bold" },
        { token: "string", foreground: "A31515" },
        { token: "function", foreground: "795E26" },
      ],
      colors: {
        "editor.background": "#FFFFFF",
        "editor.foreground": "#000000",
        "editor.lineHighlightBackground": "#F7F7F7",
        "editorLineNumber.foreground": "#237893",
      },
    });

    monaco.editor.setTheme(theme === "vs-dark" ? "customDark" : "customLight");
  };

  // WebRTC logic for video calling
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  // Start the video stream (video-only functionality)
  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    setVideoEnabled(true);
  };

  // Start the call after video has been enabled
  const startCall = useCallback(async () => {
    if (!videoEnabled) {
      console.error("Video is not enabled. Cannot start the call.");
      return;
    }

    // Create an offer for the call after the video has started
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });

    // Emit the stream to the server for the call
    socket.emit("send:stream", myStream);
  }, [remoteSocketId, videoEnabled, myStream, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call from ${from}`);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(async ({ from, ans }) => {
    try {
      if (peer.peer.signalingState === "stable") {
        console.error("RTCPeerConnection not in the correct state to set remote description");
        return;
      }

      await peer.setLocalDescription(ans);
      sendStreams();
    } catch (err) {
      console.error("Error in handleCallAccepted", err);
    }
  }, [sendStreams]);

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  // Ensure track order is consistent when handling the offer/answer
  const handleNegoNeedIncomming = useCallback(async ({ from, offer }) => {
    try {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    } catch (err) {
      console.error("Error during negotiation:", err);
    }
  }, [socket]);

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);


  useEffect(() => {
    peer.peer.addEventListener("track", (ev) => {
      const remoteStream = ev.streams[0];
      if (remoteStream) {
        setRemoteStream(remoteStream); // Update remote stream for display
      }
    });
  }, []);

  useEffect(() => {
    socket.emit("room:join", { room: roomId });

    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    roomId,
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  const handleStopVideo = useCallback(() => {
    setVideoEnabled(false);
    myStream.getTracks().forEach((track) => track.stop());
    setMyStream(null);
  }, [myStream]);

  const handleMute = useCallback(() => {
    setMuted(!muted);
    myStream.getTracks().forEach((track) => track.kind === "audio" && (track.enabled = !muted));
  }, [muted, myStream]);

  useEffect(() => {
    socket.on("code:update", ({ code }) => {
      console.log("Received code update:", code);  // Add a log to verify if the event is triggered
      setCode(code);  // Update the code when received
    });
  
    return () => {
      socket.off("code:update");  // Clean up the event listener
    };
  }, [socket]);
  

  return (
    <div className="flex min-h-screen bg-yellow-50 dark:bg-[#18181b] font-['Poppins']">
      <SideButtons />
      <div id="main-content" className="flex-1 transition-all duration-300" style={{ marginLeft: isExpanded ? "260px" : "80px" }}>
        <div className="flex h-full overflow-hidden">
          {/* Video Panels - Stacked Vertically on the Left */}
          <div className="flex flex-col gap-20 w-[40%] p-4">
            {/* My Video Panel */}
            <div className="w-full h-[300px] text-center">
              <h2 className="text-yellow-200 mb-2">My Video</h2>
              {videoEnabled ? (
                <ReactPlayer url={myStream} playing muted width="100%" height="100%" />
              ) : (
                <div className="border-2 border-yellow-200 h-full flex justify-center items-center text-white">
                  Video sharing is turned off
                </div>
              )}
              <button onClick={videoEnabled ? handleStopVideo : startVideo} className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded">
                {videoEnabled ? "Stop Video" : "Start Video"}
              </button>
              <button onClick={handleMute} className="mt-2 ml-2 px-4 py-2 bg-yellow-600 text-white rounded">
                {muted ? "Unmute" : "Mute"}
              </button>
            </div>

            {/* Other's Video Panel */}
            <div className="w-full h-[300px] text-center">
              <h2 className="text-yellow-200 mb-2">Other's Video</h2>
              {remoteStream ? (
                <ReactPlayer url={remoteStream} playing muted width="100%" height="100%" />
              ) : (
                <div className="border-2 border-yellow-200 h-full flex justify-center items-center text-white">
                  Waiting for other participant...
                </div>
              )}
            </div>
          </div>

          {/* Right Section for Header, Monaco Editor, Output */}
          <div className="flex flex-col w-[60%] ml-auto p-4 flex-grow">
            {/* Header */}
            <div className={`${theme === "vs-dark" ? "bg-black border-[#404040]" : "bg-white border-gray-200"} w-full p-4 border-b shadow-sm`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Code2 className="text-yellow-500" size={24} />
                  <h1 className={`text-xl font-semibold ${theme === "vs-dark" ? "text-white" : "text-gray-800"}`}>Online Code Compiler</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${theme === "vs-dark" ? "bg-[#3C3C3C] text-white border-[#505050]" : "bg-white text-gray-800 border-gray-300"}`}
                  >
                    {languages.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.icon} {lang.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setTheme(theme === "vs-dark" ? "vs" : "vs-dark")}
                    className={`p-2 rounded-lg transition-colors ${theme === "vs-dark" ? "bg-[#3C3C3C] text-white hover:bg-[#4C4C4C]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    <RefreshCw size={20} />
                  </button>
                  <button onClick={downloadCode} className={`p-2 rounded-lg transition-colors ${theme === "vs-dark" ? "bg-[#3C3C3C] text-white hover:bg-[#4C4C4C]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`} title="Download Code">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Monaco Editor Section */}
            <div className="h-[60%] relative flex-grow">
              <MonacoEditor
                height="500px"
                language={language}
                value={code}
                onChange={handleEditorChange}
                theme={theme === "vs-dark" ? "customDark" : "customLight"}
                onMount={handleEditorDidMount}
                options={{
                  fontSize: fontSize,
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  wordWrap: "on",
                  folding: true,
                  automaticLayout: true,
                  lineHeight: 21,
                  suggestOnTriggerCharacters: true,
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
              <div className="absolute bottom-7 right-4 flex space-x-2">
                <button onClick={copyCode} className={`p-2 rounded-lg transition-colors ${theme === "vs-dark" ? "bg-[#3C3C3C] text-white hover:bg-[#4C4C4C]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`} title="Copy Code">
                  <Copy size={20} />
                </button>
                <button
                  onClick={compileCode}
                  disabled={isLoading}
                  className={`p-2 rounded-lg ${isLoading ? "bg-yellow-600 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"} text-black transition-colors flex items-center space-x-2`}
                  title="Run Code"
                >
                  <Play size={20} />
                  <span>{isLoading ? "Running..." : "Run"}</span>
                </button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="flex flex-col w-full mt-1">
              <h2 className="text-yellow-200 mb-2">Output</h2>
              <div className="p-4 bg-gray-800 text-white rounded w-full">
                <pre className="whitespace-pre-wrap font-mono text-sm">{output || "Output will appear here..."}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
