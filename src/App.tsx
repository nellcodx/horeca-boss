import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/contexts/RoleContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CustomerMenu from "./pages/customer/CustomerMenu.tsx";
import CustomerQR from "./pages/customer/CustomerQR.tsx";
import CustomerCart from "./pages/customer/CustomerCart.tsx";
import CustomerReservation from "./pages/customer/CustomerReservation.tsx";
import StaffHub from "./pages/staff/StaffHub.tsx";
import WaiterFloor from "./pages/waiter/WaiterFloor.tsx";
import WaiterOrders from "./pages/waiter/WaiterOrders.tsx";
import KitchenDisplay from "./pages/kitchen/KitchenDisplay.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminTableMap from "./pages/admin/AdminTableMap.tsx";
import AdminMenu from "./pages/admin/AdminMenu.tsx";
import AdminStaff from "./pages/admin/AdminStaff.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import AuthPage from "./pages/auth/AuthPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              {/* Customer area */}
              <Route path="/customer" element={<CustomerMenu />} />
              <Route path="/customer/qr/:tableId" element={<CustomerQR />} />
              <Route path="/customer/cart" element={<CustomerCart />} />
              <Route path="/customer/reservation" element={<CustomerReservation />} />
              {/* Staff area */}
              <Route path="/staff" element={<StaffHub />} />
              <Route path="/staff/floor" element={<WaiterFloor />} />
              <Route path="/staff/orders" element={<WaiterOrders />} />
              <Route path="/staff/kitchen" element={<KitchenDisplay />} />
              <Route path="/staff/dashboard" element={<AdminDashboard />} />
              <Route path="/staff/tablemap" element={<AdminTableMap />} />
              <Route path="/staff/menu" element={<AdminMenu />} />
              <Route path="/staff/team" element={<AdminStaff />} />
              <Route path="/staff/settings" element={<AdminSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
