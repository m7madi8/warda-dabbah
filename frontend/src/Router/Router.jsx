import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Projects from "../pages/Projects/Projects";

const router = createBrowserRouter([
    {
        path: "/capsule", // GitHub Pages repo name
        element: <MainLayout />, // Layout wrapper
        children: [
            { path: "", element: <Home /> }, // default page
            { path: "projects", element: <Projects /> }, // projects page
        ],
    },
]);

export default router;
