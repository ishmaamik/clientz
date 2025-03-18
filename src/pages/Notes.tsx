// import hljs from "highlight.js/lib/core";
// import javascript from "highlight.js/lib/languages/javascript";
// import "highlight.js/styles/github.css";
// import { jsPDF } from "jspdf";
// import { Code, Copy, Download } from "lucide-react";
// import React, { useState } from "react";
// import SideButtons from "../components/SideButtons";
// hljs.registerLanguage("javascript", javascript);

// function Notes() {
//   const [text, setText] = useState("");
//   const [fontSize, setFontSize] = useState(16);
//   const [isCodeMode, setIsCodeMode] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(true);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(text);
//     alert("Text copied to clipboard!");
//   };

//   const handleDownload = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(fontSize);
//     doc.text(text, 10, 10);
//     doc.save("notes.pdf");
//   };

//   const wordCount = text
//     .trim()
//     .split(/\s+/)
//     .filter((word) => word.length > 0).length;

//   return (
//     <div className="flex min-h-screen bg-white dark:bg-[#18181b] font-['Poppins']">
//       <SideButtons />
//       <div
//         id="main-content"
//         className="flex-1 transition-all duration-300"
//         style={{ marginLeft: isExpanded ? "260px" : "80px" }}
//       >
//         <div className="flex flex-col min-h-screen p-8 bg-yellow-50 dark:bg-[#18181b] font-['Poppins'] dark:border dark:border-yellow-200/50 dark:rounded-xl">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-2xl font-bold dark:text-yellow-100">Notes</h1>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={handleCopy}
//                 className="px-3 py-2 bg-blue-600 dark:bg-blue-400 text-white dark:text-black rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition"
//               >
//                 <Copy size={18} />
//               </button>
//               <button
//                 onClick={handleDownload}
//                 className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//               >
//                 <Download size={18} />
//               </button>
//               <button
//                 onClick={() => setIsCodeMode(!isCodeMode)}
//                 className={`px-3 py-2 rounded ${
//                   isCodeMode
//                     ? "bg-gray-800 dark:bg-yellow-500/70 dark:text-black text-white"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 <Code size={18} />
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-between mb-4">
//             <div>
//               <label className="mr-2 dark:text-gray-300">Font Size:</label>
//               <input
//                 type="range"
//                 min="12"
//                 max="24"
//                 value={fontSize}
//                 onChange={(e) => setFontSize(Number(e.target.value))}
//                 className="cursor-pointer"
//               />
//             </div>
//             <p className="text-gray-700 dark:text-white">
//               Word Count: <span className="font-bold">{wordCount}</span>
//             </p>
//           </div>

//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className={`w-full h-96 p-4 border rounded ${
//               isCodeMode
//                 ? "font-mono bg-gray-100 dark:bg-yellow-50/10 text-white"
//                 : "bg-white dark:bg-gray-400/10 dark:border dark:border-black dark:focus:ring-black text-white"
//             }`}
//             style={{ fontSize: `${fontSize}px` }}
//             placeholder="Start typing your notes here..."
//           />

//           {isCodeMode && (
//             <div className="mt-6 p-4 bg-gray-900 dark:bg-transparent dark:border dark:border-yellow-100/40 text-white  dark:text-white rounded">
//               <pre>
//                 <code
//                   dangerouslySetInnerHTML={{
//                     __html: hljs.highlight(text, { language: "javascript" })
//                       .value,
//                   }}
//                 />
//               </pre>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notes;



import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/github-dark.css";
import { jsPDF } from "jspdf";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Copy,
  Download,
  FileUp,
  Italic,
  List,
  ListOrdered,
  Moon,
  Save,
  Search,
  Settings,
  Share2,
  Sun,
  Trash2,
  Underline
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import SideButtons from "../components/SideButtons";

// Register languages for syntax highlighting
hljs.registerLanguage("javascript", javascript);
//hljs.registerLanguage("python", python);
hljs.registerLanguage("typescript", typescript);

const AUTOSAVE_DELAY = 1000;
const SUPPORTED_LANGUAGES = ["javascript", "python", "typescript"];
const FONT_FAMILIES = [
  "Inter",
  "Roboto Mono",
  "Merriweather",
  "Playfair Display",
  "system-ui",
];

const THEMES = {
  light: {
    primary: "bg-yellow-50",
    secondary: "bg-white",
    text: "text-gray-800",
    border: "border-gray-200",
    accent: "bg-blue-600",
  },
  dark: {
    primary: "bg-gray-900",
    secondary: "bg-gray-800",
    text: "text-gray-100",
    border: "border-gray-700",
    accent: "bg-blue-500",
  },
};

function Notes() {
  const [text, setText] = useState(() => {
    return localStorage.getItem("notes") || "";
  });
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState(FONT_FAMILIES[0]);
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [textAlignment, setTextAlignment] = useState<"left" | "center" | "right">("left");
  const [formatOptions, setFormatOptions] = useState({
    bold: false,
    italic: false,
    underline: false,
    bulletList: false,
    numberedList: false,
  });

  const theme = isDarkMode ? THEMES.dark : THEMES.light;

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("notes", text);
      toast.success("Notes auto-saved!", {
        duration: 1000,
        position: "bottom-right",
        style: {
          background: isDarkMode ? "#374151" : "#fff",
          color: isDarkMode ? "#fff" : "#374151",
        },
      });
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(timer);
  }, [text, isDarkMode]);

  // Handle file import
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
        toast.success("File imported successfully!", {
          icon: "📄",
        });
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard!", {
      icon: "📋",
    });
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(fontSize);
    doc.text(text, 10, 10);
    doc.save("notes.pdf");
    toast.success("PDF downloaded!", {
      icon: "📥",
    });
  };

  const handleSearch = () => {
    if (!searchTerm) return;

    const searchRegex = new RegExp(searchTerm, "gi");
    const matches = text.match(searchRegex);
    
    if (matches) {
      toast.success(`Found ${matches.length} matches!`, {
        icon: "🔍",
      });
    } else {
      toast.error("No matches found!", {
        icon: "❌",
      });
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all text?")) {
      setText("");
      toast.success("Notes cleared!", {
        icon: "🗑️",
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "My Notes",
        text: text,
      });
      toast.success("Notes shared successfully!");
    } catch (error) {
      toast.error("Sharing failed. Try copying instead.");
    }
  };

  const applyFormatting = (type: keyof typeof formatOptions) => {
    setFormatOptions((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const characterCount = text.length;

  const getTextStyles = () => {
    return `
      ${formatOptions.bold ? "font-bold" : ""} 
      ${formatOptions.italic ? "italic" : ""} 
      ${formatOptions.underline ? "underline" : ""}
      ${textAlignment === "center" ? "text-center" : ""}
      ${textAlignment === "right" ? "text-right" : ""}
    `;
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Toaster />
      <SideButtons />
      <div
        id="main-content"
        className={`flex-1 transition-all duration-300 ${theme.primary}`}
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <div className="flex flex-col min-h-screen p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
    Capture Your Thoughts Here
</h1>


              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded-full hover:bg-opacity-80 transition ${
                    showSettings ? theme.accent : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <Settings size={20} className="text-white" />
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {isDarkMode ? (
                    <Sun className="text-yellow-400" size={20} />
                  ) : (
                    <Moon className="text-gray-600" size={20} />
                  )}
                </button>
              </div>
            </div>
            
            {/* Main Toolbar */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <button
                  onClick={() => setTextAlignment("left")}
                  className={`p-2 rounded ${
                    textAlignment === "left" ? theme.accent + " text-white" : ""
                  }`}
                >
                  <AlignLeft size={18} />
                </button>
                <button
                  onClick={() => setTextAlignment("center")}
                  className={`p-2 rounded ${
                    textAlignment === "center" ? theme.accent + " text-white" : ""
                  }`}
                >
                  <AlignCenter size={18} />
                </button>
                <button
                  onClick={() => setTextAlignment("right")}
                  className={`p-2 rounded ${
                    textAlignment === "right" ? theme.accent + " text-white" : ""
                  }`}
                >
                  <AlignRight size={18} />
                </button>
              </div>

              <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <button
                  onClick={() => applyFormatting("bold")}
                  className={`p-2 rounded ${
                    formatOptions.bold ? theme.accent + " text-white" : ""
                  }`}
                >
                  <Bold size={18} />
                </button>
                <button
                  onClick={() => applyFormatting("italic")}
                  className={`p-2 rounded ${
                    formatOptions.italic ? theme.accent + " text-white" : ""
                  }`}
                >
                  <Italic size={18} />
                </button>
                <button
                  onClick={() => applyFormatting("underline")}
                  className={`p-2 rounded ${
                    formatOptions.underline ? theme.accent + " text-white" : ""
                  }`}
                >
                  <Underline size={18} />
                </button>
              </div>

              <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <button
                  onClick={() => applyFormatting("bulletList")}
                  className={`p-2 rounded ${
                    formatOptions.bulletList ? theme.accent + " text-white" : ""
                  }`}
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => applyFormatting("numberedList")}
                  className={`p-2 rounded ${
                    formatOptions.numberedList ? theme.accent + " text-white" : ""
                  }`}
                >
                  <ListOrdered size={18} />
                </button>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={handleCopy}
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition tooltip"
                  data-tooltip="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  <Download size={18} />
                </button>
                <label className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition cursor-pointer">
                  <FileUp size={18} />
                  <input
                    type="file"
                    onChange={handleFileImport}
                    className="hidden"
                    accept=".txt,.md,.js,.ts,.py"
                  />
                </label>
                <button
                  onClick={() => setIsCodeMode(!isCodeMode)}
                  className={`p-2 rounded ${
                    isCodeMode
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <Code size={18} />
                </button>
                <button
                  onClick={() => setIsSearchVisible(!isSearchVisible)}
                  className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                  <Search size={18} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={handleClear}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className={`mb-4 p-4 rounded-lg ${theme.secondary} ${theme.border} border`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block mb-2 ${theme.text}`}>Font Family</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className={`w-full p-2 rounded border ${theme.border} ${theme.secondary} ${theme.text}`}
                  >
                    {FONT_FAMILIES.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block mb-2 ${theme.text}`}>Font Size</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="flex-1 cursor-pointer"
                    />
                    <span className={theme.text}>{fontSize}px</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          {isSearchVisible && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in notes..."
                className={`flex-1 p-2 rounded border ${theme.border} ${theme.secondary} ${theme.text}`}
              />
              <button
                onClick={handleSearch}
                className={`px-4 py-2 ${theme.accent} text-white rounded hover:bg-opacity-90`}
              >
                Search
              </button>
            </div>
          )}

          {/* Language Selector for Code Mode */}
          {isCodeMode && (
            <div className="mb-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`p-2 rounded border ${theme.border} ${theme.secondary} ${theme.text}`}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Stats Bar */}
          <div className={`flex justify-between mb-4 ${theme.text}`}>
            <div className="flex items-center gap-4">
              <span>
                Words: <strong>{wordCount}</strong>
              </span>
              <span>
                Characters: <strong>{characterCount}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Save size={16} />
              <span>Auto-saving enabled</span>
            </div>
          </div>

          {/* Main Editor */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`w-full h-[calc(100vh-300px)] p-4 rounded-lg transition-all duration-200 
              ${getTextStyles()}
              ${isCodeMode
                ? "font-mono bg-gray-900 text-gray-100"
                : `${theme.secondary} ${theme.text} ${theme.border}`
              } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            style={{ 
              fontSize: `${fontSize}px`,
              fontFamily: fontFamily,
              resize: "none",
            }}
            placeholder="Start typing your notes here..."
          />

          {/* Code Preview */}
          {isCodeMode && text && (
            <div className="mt-6 p-4 bg-gray-900 rounded-lg overflow-x-auto">
              <pre className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-800 border-r border-gray-700">
                  {text.split("\n").map((_, i) => (
                    <div
                      key={i}
                      className="text-gray-500 text-right pr-2 text-sm"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <code
                  className="block pl-10"
                  dangerouslySetInnerHTML={{
                    __html: hljs.highlight(text, {
                      language: selectedLanguage,
                    }).value,
                  }}
                />
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Tooltip Styles */}
      <style >{`
        .tooltip {
          position: relative;
        }
        .tooltip:before {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 8px;
          background: rgba(12, 2, 2, 0.8);
          color: white;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s;
        }
        .tooltip:hover:before {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
    </div>
  );
}

export default Notes;