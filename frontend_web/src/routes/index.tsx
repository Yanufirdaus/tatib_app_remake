import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../pages/LoginPage";
import HomeAdminPage from "../pages/HomeAdminPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: < RootLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            }
        ]
    },
    {
        path: "/login",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />
            }
        ]
    },
    {
        path: "/home",
        element: < RootLayout />,
        children: [
            {
                index: true,
                element: <HomeAdminPage />
            }
        ]
    }
]);