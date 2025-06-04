import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
