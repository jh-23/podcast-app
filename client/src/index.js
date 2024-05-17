import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/components/App.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import routes from "../src/components/routes.js"

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
