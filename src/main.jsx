import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeWrapper from "./Wrappers/ThemeWrapper.jsx";
import RouterWrapper from "./Wrappers/RouterWrapper.jsx";;
createRoot(document.getElementById("root")).render(
  <ThemeWrapper>
    <RouterWrapper />
  </ThemeWrapper>
);
