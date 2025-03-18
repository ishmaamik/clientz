// import React, { useState, useEffect } from "react";
// import MonacoEditor from "@monaco-editor/react";
// import axios from "axios";

// export default function CodeEditor() {
//   const [code, setCode] = useState("");
//   const [input, setInput] = useState(""); // Add input state for user input
//   const [output, setOutput] = useState("");
//   const [language, setLanguage] = useState("c"); // Default to C language
//   const [loading, setLoading] = useState(false);
//   const [inputNeeded, setInputNeeded] = useState(false); // Track if input is needed

//   // Input-related keywords based on language
//   const inputKeywords = {
//     c: ["scanf"],
//     cpp: ["cin"],
//     java: ["Scanner"],
//     python3: ["input"],
//     javascript: ["prompt"], // Example for JS
//   };

//   // Handle code change in the editor
//   const handleEditorChange = (value) => {
//     setCode(value);
//   };

//   // Handle language selection change
//   const handleLanguageChange = (event) => {
//     setLanguage(event.target.value);
//   };

//   // Detect if input is needed
//   const checkForInputFunctions = () => {
//     const keywords = inputKeywords[language] || [];
//     return keywords.some((keyword) => code.includes(keyword));
//   };

//   // Function to compile and execute the code
//   const compileCode = async () => {
//     const requiresInput = checkForInputFunctions(); // Check if input functions are present
//     setInputNeeded(requiresInput); // Set inputNeeded state based on check

//     if (requiresInput && !input) {
//       alert("This code requires input. Please enter input data.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("/api/execute", {
//         script: code,
//         language: language, // Send selected language
//         input: input, // Send the user input if available
//       });
//       setOutput(response.data.output);
//     } catch (error) {
//       setOutput("Error in executing the code.");
//     }
//     setLoading(false);

//     setInput("");
//     setInputNeeded(false);
//   };

//   // Function to define the custom theme and apply it using onMount
//   const handleEditorDidMount = (editor, monaco) => {
//     // Define the custom theme
//     monaco.editor.defineTheme("vscodeTheme", {
//       base: "vs-dark", // Base theme (dark theme similar to VS Code)
//       inherit: true, // Inherit base theme properties
//       rules: [
//         { token: "comment", foreground: "6A9955", fontStyle: "italic" }, // Green comments
//         { token: "keyword", foreground: "569CD6" }, // Blue keywords
//         { token: "string", foreground: "CE9178" }, // Orange strings
//         { token: "function", foreground: "DCDCAA" }, // Light yellow function names
//         { token: "variable", foreground: "9CDCFE" }, // Light blue variables
//         { token: "number", foreground: "B5CEA8" }, // Light green numbers
//         { token: "operator", foreground: "D4D4D4" }, // Light grey operators
//       ],
//       colors: {
//         "editor.background": "#1E1E1E", // Dark grey background (VS Code default)
//         "editor.foreground": "#D4D4D4", // Light grey default text color
//         "editorCursor.foreground": "#AEAFAD", // Light grey cursor color
//         "editor.lineHighlightBackground": "#5c5a3b", // Blue line highlight background
//         "editorLineNumber.foreground": "#858585", // Light grey line numbers
//         "editor.selectionBackground": "#264F78", // Blue selection background
//         "editorIndentGuide.background": "#404040", // Light grey indent guide
//         "editorWhitespace.foreground": "#404040", // Light grey whitespace characters
//       },
//     });

//     // Apply the custom theme
//     monaco.editor.setTheme("vscodeTheme");
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-700 p-4">
//       <h1 className="text-2xl font-bold mb-4">Code Compiler</h1>

//       <select
//         value={language}
//         onChange={handleLanguageChange}
//         className="mb-4 p-2 border rounded bg-yellow-200"
//       >
//         <option value="c">C</option>
//         <option value="cpp">C++</option>
//         <option value="java">Java</option>
//         <option value="python3">Python</option>
//         <option value="javascript">JavaScript</option>
//       </select>

//       {/* Code Editor */}
//       <MonacoEditor
//         height="50vh"
//         width="200vh"
//         defaultLanguage={language}
//         theme="vscodeTheme" // Use the custom theme
//         value={code}
//         onChange={handleEditorChange}
//         onMount={handleEditorDidMount} // Use onMount to define the theme
//       />
//       {inputNeeded && (
//         <textarea
//           className="mt-4 p-2 w-1/2 bg-zinc-800 text-white"
//           rows="5"
//           placeholder="Enter input for your program"
//           value={input}
//           onChange={(e) => setInput(e.target.value)} // Update input state
//         />
//       )}
//       <button
//         onClick={compileCode}
//         className="mt-4 p-2 bg-yellow-500 text-black rounded"
//       >
//         {loading ? "Compiling..." : "Compile & Execute"}
//       </button>

//       {/* Display Output */}
//       <div className="mt-4 p-4 bg-yellow-200 border border-gray-300 rounded w-1/2">
//         <h2 className="text-xl font-semibold mb-2">Output:</h2>
//         <pre className="whitespace-pre-wrap">{output}</pre>
//       </div>
//     </div>
//   );
// }

//---------------------------
