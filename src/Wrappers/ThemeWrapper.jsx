import { useEffect } from "react";
import useStore from "../../Store";
function ThemeWrapper({ children }) {
  const { toggle } = useStore();
  useEffect(() => {
    if (toggle) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [toggle]);
  return (
    <div className="text-black dark:bg-gray-900 dark:text-white">
      {children}
    </div>
  );
}

export default ThemeWrapper;
