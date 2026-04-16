import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import VooglaadijaCountdown from "./components/VooglaadijaCountdown";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VooglaadijaCountdown />
  </StrictMode>,
);
