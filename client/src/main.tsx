import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set environment variable for Google Analytics
if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
  // Use the provided GA key directly
  (window as any).VITE_GA_MEASUREMENT_ID = "G-22BF5BGNSX";
}

createRoot(document.getElementById("root")!).render(<App />);
