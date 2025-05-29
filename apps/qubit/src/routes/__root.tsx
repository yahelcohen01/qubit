import { Footer } from '../components/global/Footer';
import { Navbar } from '../components/global/Navbar';
import { Outlet, createRootRoute } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
