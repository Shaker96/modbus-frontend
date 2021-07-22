import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import ActuatorReadings from  '../views/ActuatorReadings';
import ActuatorTabs from '../views/ActuatorTabs';

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
            component: ActuatorTabs
        },
        {
            path: '/actuator/:id',
            exact: true,
            component: ActuatorTabs
        },
    ]
}
