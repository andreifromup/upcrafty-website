import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Inter font to document
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap";
document.head.appendChild(link);

// Add title to the page
const title = document.createElement("title");
title.textContent = "Upcrafty Co.";
document.head.appendChild(title);

createRoot(document.getElementById("root")!).render(<App />);
