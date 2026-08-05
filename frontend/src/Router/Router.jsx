import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Projects from "../pages/Projects/Projects";
import ProjectDetail from "../pages/ProjectDetail/ProjectDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />, // Layout wrapper
        children: [
            { path: "", element: <Home /> }, // default page
            { path: "projects", element: <Projects /> }, // projects page
            { path: "projects/:id", element: <ProjectDetail /> }, // project detail page
        ],
    },
    {
        path: "/warda",
        element: <MainLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "projects", element: <Projects /> },
            { path: "projects/:id", element: <ProjectDetail /> },
        ],
    },
]);

export default router;
