import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import ActuatorPage from  '../views/ActuatorPage';

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
        },
        {
            path: '/actuator',
            exact: true,
            component: ActuatorPage
        },
        {
            path: '/actuator/:id',
            exact: true,
            component: ActuatorPage
        },
    ]
}
