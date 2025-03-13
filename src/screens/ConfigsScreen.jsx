import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";


const ConfigsScreen = () => {
  const { logout } = useAuth();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'synthwave';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themes = [
    "lofi",
    "bumblebee",
    "retro",
    "valentine",
    "pastel",
    "autumn",
    "acid",
    "nord",
    "black",
    "synthwave",
    "forest",
    "aqua",
    "luxury",
    "business",
    "night",
    "dim",
  ];

  const handleLogout = async () => {
    await logout();
  };

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setTheme(newTheme);
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-4">

      <label className="form-control">
        <div className="label">
          <span className="label-text">Select Color Theme</span>
        </div>
        <select
          className="select select-primary"
          value={theme}
          onChange={handleThemeChange}
        >
          <option disabled>Select a theme</option>
          {themes.map((themeOption) => (
            <option key={themeOption} value={themeOption}>
              {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <button className="btn btn-warning" onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
};

export default ConfigsScreen;
