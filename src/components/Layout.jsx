// src/components/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SecondaryHeader from "./SecondaryHeader";


const Layout = () => {
  const location = useLocation();
  const excludeHeaderPaths = ["/sign-in", "/sign-up"];
  const shouldShowSecondaryHeader = excludeHeaderPaths.includes(
    location.pathname
  );

  console.log("Current Path:", location.pathname);
  console.log("Show Secondary Header:", shouldShowSecondaryHeader);

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowSecondaryHeader ? <SecondaryHeader /> : <Header />}
      <main className="flex-grow">
        <Outlet />
      </main>
     {/* Add the Footer component here */}
    </div>
  );
};

export default Layout;
