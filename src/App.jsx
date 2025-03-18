import { BrowserRouter, Route, Routes } from "react-router-dom";
import FloatingChatbot from "./components/Chatbot";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
//import Compiler from "./components/Workspace/CodeEditor";
import Home from "./Main/Home.jsx";
import About from "./pages/About";
import Chello from "./pages/Chello.jsx";
import CLanguagePage from "./pages/CLanguagePage";
import Community from "./pages/CommunityPage.jsx";
import Compiler from "./pages/Compiler.jsx";
import Content from "./pages/Content.jsx";
import Cpy from "./pages/Cpy.jsx";
import CQuizPage from "./pages/CQuizPage.jsx";
import Java from "./pages/Java.jsx";
import Javascript from "./pages/Javascript.jsx";
import LandingPage from "./pages/Landing.tsx";
import Notes from "./pages/Notes.tsx";
import Problems from "./pages/Problems.jsx";
import Profile from "./pages/Profile";
import ProfileAnalytics from "./pages/ProfileAnalytics";
import Progress from "./pages/Progress.jsx";
import RoadmapForm from "./pages/RoadMap.jsx";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { SocketProvider } from "./context/SocketProvider.jsx";
import CAdvancedPointers from "./pages/CAdvancedPointers.jsx";
import CArrays from "./pages/CArrays.jsx";
import CBitwiseOperations from "./pages/CBitwiseOperations.jsx";
import CControl from "./pages/CControl.jsx";
import CData from "./pages/CData.jsx";
import CDynamicMemory from "./pages/CDynamicMemory.jsx";
import Certificate from "./pages/certificate.jsx";
import CFileIO from "./pages/CFileIO.jsx";
import CFunctions from "./pages/CFunctions.jsx";
import CGraphicsProgramming from "./pages/CGraphicsProgramming.jsx";
import CLinkedList from "./pages/CLinkedList.jsx";
import CMemoryManagement from "./pages/CMemoryManagement.jsx";
import CMultithreading from "./pages/CMultithreading.jsx";
import CNetworkProgramming from "./pages/CNetworkProgramming.jsx";
import Collab from "./pages/Collab.jsx";
import CollabEditor from "./pages/CollabEditor.jsx";
import CPointers from "./pages/CPointers.jsx";
import CPreprocessor from "./pages/CPreprocessor.jsx";
import CRecursion from "./pages/CRecursion.jsx";
import CStrings from "./pages/CStrings.jsx";
import CStructures from "./pages/CStructures.jsx";
import Cvar from "./pages/Cvar.jsx";
import JHello from "./pages/JHello";
import PyString from "./pages/PyString.jsx";

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      <SocketProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/practice" element={<Problems />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/about" element={<About />} />
            <Route path="/compiler" element={<Compiler />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/mock" element={<RoadmapForm />} />
            <Route path="/courses/c" element={<CLanguagePage />} />
            <Route path="/courses/python" element={<Cpy />} />
            <Route path="/courses/java" element={<Java />} />
            <Route path="/courses/javascript" element={<Javascript />} />
            <Route path="/lobby" element={<Collab />} />
            <Route path="/codeRoom" element={<CollabEditor />} />

            <Route path="/courses/c/hello-world" element={<Chello />} />
            <Route path="/courses/c/variables" element={<Cvar />} />
            <Route path="/courses/c/data-types" element={<CData />} />
            <Route
              path="/courses/c/control-structures"
              element={<CControl />}
            />
            <Route path="/courses/c/functions" element={<CFunctions />} />
            <Route path="/courses/c/arrays" element={<CArrays />} />
            <Route path="/courses/c/pointers" element={<CPointers />} />
            <Route path="/courses/c/strings" element={<CStrings />} />
            <Route path="/courses/c/file-io" element={<CFileIO />} />
            <Route path="/courses/c/structures" element={<CStructures />} />
            <Route path="/courses/c/:lessonId/quiz" element={<CQuizPage />} />
            <Route path="/news" element={<Content />} />
            <Route path="/courses/c/hello-world" element={<Chello />} />
            <Route path="/courses/c/variables" element={<Cvar />} />
            <Route path="/courses/c/data-types" element={<CData />} />
            <Route path="/courses/python/strings-manipulation" element={<PyString/>} />
            <Route
              path="/courses/c/control-structures"
              element={<CControl />}
            />
            <Route
              path="/courses/c/memory-management"
              element={<CMemoryManagement />}
            />
            <Route
              path="/courses/c/dynamic-memory"
              element={<CDynamicMemory />}
            />
            <Route
              path="/courses/c/multithreading"
              element={<CMultithreading />}
            />
            <Route
              path="/courses/c/preprocessors"
              element={<CPreprocessor />}
            />
            <Route
              path="/courses/c/bitwise-operations"
              element={<CBitwiseOperations />}
            />
            <Route path="/courses/c/recursion" element={<CRecursion />} />
            <Route path="/courses/c/linked-lists" element={<CLinkedList />} />
            <Route
              path="/courses/c/advanced-pointers"
              element={<CAdvancedPointers />}
            />
            <Route
              path="/courses/c/graphics-programming"
              element={<CGraphicsProgramming />}
            />
            <Route
              path="/courses/c/network-programming"
              element={<CNetworkProgramming />}
            />
            <Route path="/courses/java/hello-world" element={<JHello />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/courses/c/:lessonId/quiz" element={<CQuizPage />} />
            <Route path="/news" element={<Content />} />

            <Route element={<PrivateRoute />}>
              <Route path="/profile-analytics" element={<ProfileAnalytics />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
        <FloatingChatbot iconSrc="/chatbot.png" />
      </SocketProvider>
    </BrowserRouter>
  );
}
