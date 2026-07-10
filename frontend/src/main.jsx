import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="998860092433-9ri1tirmqujmj5lvm1mk1hu038sql7m0.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);