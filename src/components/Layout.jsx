import React, { useEffect } from "react";

const Layout = ({ children }) => {

  useEffect(() => {
    const applyTheme = () => {
      const theme = localStorage.getItem("theme") || "synthwave";
      document.documentElement.setAttribute("data-theme", theme);
    };

    applyTheme();
    window.addEventListener("storage", applyTheme);

    return () => {
      window.removeEventListener("storage", applyTheme);
    };
  }, []);

  return (
    <div className="flex h-screen w-full items-center">
      <main className="flex flex-grow justify-center items-center w-full h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
