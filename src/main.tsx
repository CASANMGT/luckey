import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LuckeyApp from "./luckey/LuckeyApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LuckeyApp />
  </StrictMode>
);
