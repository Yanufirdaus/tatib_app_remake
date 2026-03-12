import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../pages/LoginPage";
import HomeAdminPage from "../pages/HomeAdminPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ManajemenKelas from "../pages/ManajemenKelas";
import ManajemenPelanggaran from "../pages/ManajemenPelanggaran";
import ManajemenSiswa from "../pages/ManajemenSiswa";
import SiswaKelasPage from "../pages/SiswaKelasPage";

export const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                path: "/",
                element: < RootLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />
                    }
                ]
            }
        ]

    },
    {
        element: <PublicRoute />,
        children: [
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
        ]

    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/home",
                element: <RootLayout />,
                children: [
                    {
                        index: true,
                        element: <HomeAdminPage />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/kelas",
                element: <RootLayout />,
                children: [
                    {
                        index: true,
                        element: <ManajemenKelas />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/pelanggaran",
                element: <RootLayout />,
                children: [
                    {
                        index: true,
                        element: <ManajemenPelanggaran />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/manajemen-siswa",
                element: <RootLayout />,
                children: [
                    {
                        index: true,
                        element: <ManajemenSiswa />,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/manajemen-siswa/kelas/:id",
                element: <RootLayout />,
                children: [
                    {
                        index: true,
                        element: <SiswaKelasPage />,
                    },
                ],
            },
        ],
    },
]);