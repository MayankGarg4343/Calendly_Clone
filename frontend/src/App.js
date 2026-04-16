import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Chatbot } from './components/Chatbot';
import { AdminDashboard } from './pages/AdminDashboard';
import { PublicBooking } from './pages/PublicBooking';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { EventTypes } from './pages/EventTypes';
import { Availability } from './pages/Availability';
import { Meetings } from './pages/Meetings';
import { Contacts } from './pages/Contacts';
import { Workflows } from './pages/Workflows';
import { Integrations } from './pages/Integrations';
import { Analytics } from './pages/Analytics';
import { Help } from './pages/Help';
import { UpgradePlan } from './pages/UpgradePlan';
import { AdminCenter } from './pages/AdminCenter';

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAdminRoute && <Navbar />}
      <main className={`${!isAdminRoute ? 'container mx-auto px-4 py-8' : ''}`}>
        <Outlet />
      </main>
      <Chatbot />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PublicBooking />
      },
      {
        path: "admin",
        element: <AdminDashboard />
      },
      {
        path: "admin/event-types",
        element: <EventTypes />
      },
      {
        path: "admin/availability",
        element: <Availability />
      },
      {
        path: "admin/meetings",
        element: <Meetings />
      },
      {
        path: "admin/contacts",
        element: <Contacts />
      },
      {
        path: "admin/workflows",
        element: <Workflows />
      },
      {
        path: "admin/integrations",
        element: <Integrations />
      },
      {
        path: "admin/analytics",
        element: <Analytics />
      },
      {
        path: "admin/upgrade",
        element: <UpgradePlan />
      },
      {
        path: "admin/admin-center",
        element: <AdminCenter />
      },
      {
        path: "admin/help",
        element: <Help />
      },
      {
        path: "booking/:eventTypeId",
        element: <PublicBooking />
      },
      {
        path: "confirmation/:bookingId",
        element: <BookingConfirmation />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
