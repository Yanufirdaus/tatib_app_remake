import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import RootLayout from "@/layouts/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Lazy load pages
import { LazyElement } from "./RouteHelpers";

// Lazy load pages
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const HomeAdminPage = lazy(() => import("@/pages/HomeAdminPage"));
const ManajemenKelasPage = lazy(() => import("@/pages/ManajemenKelasPage"));
const ManajemenPelanggaranPage = lazy(() => import("@/pages/ManajemenPelanggaranPage"));
const ManajemenSiswaPage = lazy(() => import("@/pages/ManajemenSiswaPage"));
const SiswaKelasPage = lazy(() => import("@/pages/SiswaKelasPage"));
const ManajemenTendikPage = lazy(() => import("@/pages/ManajemenTendikPage"));
const TendikPerRolePage = lazy(() => import("@/pages/TendikPerRolePage"));

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                element: <PublicRoute />,
                children: [
                    { path: "/", element: <LazyElement><DashboardPage /></LazyElement> },
                    { path: "/login", element: <LazyElement><LoginPage /></LazyElement> },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/home", element: <LazyElement><HomeAdminPage /></LazyElement> },
                    { path: "/kelas", element: <LazyElement><ManajemenKelasPage /></LazyElement> },
                    { path: "/pelanggaran", element: <LazyElement><ManajemenPelanggaranPage /></LazyElement> },
                    { path: "/manajemen-siswa", element: <LazyElement><ManajemenSiswaPage /></LazyElement> },
                    { path: "/manajemen-siswa/kelas/:id", element: <LazyElement><SiswaKelasPage /></LazyElement> },
                    { path: "/manajemen-tendik", element: <LazyElement><ManajemenTendikPage /></LazyElement> },
                    { path: "/manajemen-tendik/role/:role", element: <LazyElement><TendikPerRolePage /></LazyElement> },
                ],
            },
        ],
    },
]);
