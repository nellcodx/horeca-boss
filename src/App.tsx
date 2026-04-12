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
import CustomerCart from "./pages/customer/CustomerCart.tsx";
import CustomerReservation from "./pages/customer/CustomerReservation.tsx";
import WaiterFloor from "./pages/waiter/WaiterFloor.tsx";
import WaiterOrders from "./pages/waiter/WaiterOrders.tsx";
import KitchenDisplay from "./pages/kitchen/KitchenDisplay.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminMenu from "./pages/admin/AdminMenu.tsx";
import AdminStaff from "./pages/admin/AdminStaff.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";

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
              <Route path="/customer" element={<CustomerMenu />} />
              <Route path="/customer/cart" element={<CustomerCart />} />
              <Route path="/customer/reservation" element={<CustomerReservation />} />
              <Route path="/waiter" element={<WaiterFloor />} />
              <Route path="/waiter/orders" element={<WaiterOrders />} />
              <Route path="/kitchen" element={<KitchenDisplay />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/menu" element={<AdminMenu />} />
              <Route path="/admin/staff" element={<AdminStaff />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
