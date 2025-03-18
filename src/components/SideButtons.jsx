import {
  Bell,
  BookOpen,
  ChevronLeft,
  Code2,
  Haze,
  Laptop,
  LogOut,
  MessageSquare,
  PenTool,
  Terminal,
  Timer,
  UserRound
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";

const sidebarItems = [
  { name: "Learning Path", icon: BookOpen, route: "/home" },
  { name: "Code Editor", icon: Terminal, route: "/compiler" },
  { name: "Practice Problems", icon: Code2, route: "/practice" },
  // { name: "AI Assistant", icon: Brain, route: "/ai-assistant" },
  { name: "Progress Tracker", icon: Timer, route: "/progress" },
  // { name: "Achievements", icon: Trophy, route: "/achievements" },
  { name: "Community Forum", icon: MessageSquare, route: "/community" },
  { name: "Take Notes", icon: PenTool, route: "/notes" },
  // { name: "Resources", icon: LayoutList, route: "/resources" },
  { name: "Interview Preparation", icon: UserRound, route: "/mock" },
  { name: "News Portal", icon: Bell, route: "/news" },
  { name: "Certificate", icon: Haze, route: "/certificate" },
  { name: "Mock Interview", icon: Laptop, route: "/lobby" }
];

const SideButtons = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.marginLeft = isExpanded ? "260px" : "80px";
      mainContent.style.transition =
        "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    }
  }, [isExpanded]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <style>
        {`
          .side-buttons-container {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            z-index: 1000;
          }

          .side-menu {
            height: 100%;
            background: #d1cb90;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 4px 0 10px rgba(0, 0, 0, 0.4);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            border-right: 1px solid darkkhaki;
          }
           .dark .side-menu {
  height: 100%;
  background: rgba(218, 165, 33, 0.099);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(250, 204, 21, 0.1);
}

          .side-menu.expanded {
            width: 260px;
          }

          .side-menu.collapsed {
            width: 80px;
            overflow: hidden;
            
          }

          .toggle-button {
            position: absolute;
            right: -12px;
            top: 20px;
            width: 24px;
            height: 24px;
            background: #facc15;
            border: none;
            border-radius: 50%;
            color: #18181b;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 2;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          }

          .toggle-button:hover {
            background: #fbbf24;
            transform: scale(1.1);
          }

          .menu-header {
            padding: 16px;
            text-align: center;
            border-bottom: 1px solid darkkhaki;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
           .dark .menu-header {
            padding: 16px;
            text-align: center;
            border-bottom: 1px solid rgba(250, 204, 21, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .expanded .menu-header {
            padding: 24px;
          }

          .logo {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            object-fit: contain;
          }

          .expanded .logo {
            height: 75px;
            width: auto;
          }

          .collapsed .logo {
            height: 32px;
            width: 32px;
          }

          .menu-items {
            padding: 10px;
            overflow-y: auto;
            flex: 1;
          }

          .collapsed .menu-items {
            overflow: hidden;
          }

          .menu-item {
            display: flex;
            align-items: center;
            padding: 12px;
            color: black;
            text-decoration: none;
            border-radius: 8px;
            margin: 4px 0;
            transition: all 0.2s ease;
            position: relative;
          }
            .dark .menu-item {
            display: flex;
            align-items: center;
            padding: 12px;
            color: #e5e7eb;
            text-decoration: none;
            border-radius: 8px;
            margin: 4px 0;
            transition: all 0.2s ease;
            position: relative;
          }

          .menu-item:hover {
            background: rgba(250, 204, 21, 0.1);
            transform: translateX(4px);
          }

          .menu-item.active {
            background: #f0ebc2;
            color: #66602e;
          }
           .dark .menu-item.active {
            background: rgba(235, 196, 41, 0.2);
            color: #facc15;
          }

          .item-content {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
          }

          .item-icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
          }

          .item-text {
            font-size: 16px; /* Reduced font size */
            white-space: nowrap;
            opacity: 1;
            transition: opacity 0.2s ease;
          }

          .collapsed .item-text {
            opacity: 0;
            width: 0;
          }

          .tooltip {
            position: absolute;
            left: calc(100% + 10px);
            top: 50%;
            transform: translateY(-50%);
            background: #facc15;
            color: #18181b;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          }

          .tooltip::before {
            content: '';
            position: absolute;
            left: -4px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 4px;
            border-style: solid;
            border-color: transparent #facc15 transparent transparent;
          }

          .menu-item:hover .tooltip {
            opacity: 1;
          }

          .active-indicator {
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: linear-gradient(45deg, rgba(250, 204, 21, 0.2), transparent);
            pointer-events: none;
            animation: pulse 2s infinite;
          }

          .logout-button {
            margin: 16px;
            padding: 12px;
            background: rgba(250, 204, 21, 0.4);
            border: none;
            border-radius: 8px;
            color: black;
            display: flex;
            align-items: center;
            gap: 12px;
            width: calc(100% - 32px);
            cursor: pointer;
            transition: all 0.2s ease;
          }
            .dark .logout-button {
            margin: 16px;
            padding: 12px;
            background: rgba(250, 204, 21, 0.1);
            border: none;
            border-radius: 8px;
            color: #facc15;
            display: flex;
            align-items: center;
            gap: 12px;
            width: calc(100% - 32px);
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .logout-button:hover {
            background: rgba(250, 204, 21, 0.2);
            transform: translateX(4px);
          }
            .doodle-text {
            display: inline-block;
          }

            .single-line {
            white-space: nowrap;
           }

           .multi-line {
           display: block;
           }


          #main-content {
            margin-left: 80px;
            padding: 20px;
            min-height: 100vh;
            transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}
      </style>

      <div className="side-buttons-container">
        <div className={`side-menu ${isExpanded ? "expanded" : "collapsed"}`}>
          <button
            className="toggle-button"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              transform: `rotate(${isExpanded ? "0" : "180deg"})`,
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="menu-header">
            <Link to="/home">
              <h1
                className={`font-bold text-yellow-700 dark:text-yellow-400 text-2xl ${
                  !isExpanded ? "text-md" : "text-2xl"
                }`}
              >
                <span
                  className={`doodle-text ${
                    isExpanded ? "single-line" : "multi-line"
                  }`}
                >
                   &lt;/Cod
                </span>
                <span
                  className={`doodle-text ${
                    isExpanded ? "single-line" : "multi-line"
                  }`}
                >
                  ERA&gt;
                </span>
              </h1>
            </Link>
          </div>

          <div className="menu-items">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.route;

              return (
                <Link
                  key={item.route}
                  to={item.route}
                  className={`menu-item ${isActive ? "active" : ""}`}
                  onMouseEnter={() => setHoveredItem(item.route)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="item-content">
                    <Icon className="item-icon" />
                    <span className="item-text">{item.name}</span>
                  </div>

                  {!isExpanded && hoveredItem === item.route && (
                    <div className="tooltip">{item.name}</div>
                  )}

                  {isActive && <div className="active-indicator" />}
                </Link>
              );
            })}
          </div>

          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={20} />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default SideButtons;

