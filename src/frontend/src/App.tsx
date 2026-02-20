import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import Departures from './pages/Departures';
import Careers from './pages/Careers';
import ApplicationForm from './pages/ApplicationForm';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Departures,
});

const departuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/departures',
  component: Departures,
});

const careersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/careers',
  component: Careers,
});

const applicationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/apply',
  component: ApplicationForm,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-ops',
  component: AdminLogin,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-ops/dashboard',
  component: AdminDashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  departuresRoute,
  careersRoute,
  applicationRoute,
  adminLoginRoute,
  adminDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
