import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../pages/LoginPage";

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
    }
]);