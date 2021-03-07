import { lazy } from "react";

import Login from '../views/Login';
import Dashboard from '../views/Dashboard';

export const allRoutes = {
    public: [
        {
            path: '/login',
            exact: true,
            component: Login
        }
    ],
    private: [
        {
            path: '/dashboard',
            exact: true,
            component: Dashboard
        }
    ]
}