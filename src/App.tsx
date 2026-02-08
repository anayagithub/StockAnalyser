

// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { AppLayout } from "@/components/layout/AppLayout";
// import ProtectedRoute from "@/components/ProtectedRoute";

// import Dashboard from "@/pages/Dashboard";
// import StockAnalysis from "@/pages/StockAnalysis";
// import CompareStocks from "@/pages/CompareStocks";
// import Watchlist from "@/pages/Watchlist";
// import AgentReasoning from "@/pages/AgentReasoning";
// import NewsSentimentPage from "@/pages/NewsSentimentPage";
// import Settings from "@/pages/Settings";
// import Login from "@/pages/Login";
// import NotFound from "@/pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>

//           {/* Public Route */}
//           <Route path="/login" element={<Login />} />

//           {/* Protected Routes */}
//           <Route
//             element={
//               <ProtectedRoute>
//                 <AppLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/analysis" element={<StockAnalysis />} />
//             <Route path="/compare" element={<CompareStocks />} />
//             <Route path="/watchlist" element={<Watchlist />} />
//             <Route path="/reasoning" element={<AgentReasoning />} />
//             <Route path="/news" element={<NewsSentimentPage />} />
//             <Route path="/settings" element={<Settings />} />
//           </Route>

//           {/* Catch-all */}
//           <Route path="*" element={<NotFound />} />

//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;




import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

import Dashboard from "@/pages/Dashboard";
import StockAnalysis from "@/pages/StockAnalysis";
import CompareStocks from "@/pages/CompareStocks";
import Watchlist from "@/pages/Watchlist";
import AgentReasoning from "@/pages/AgentReasoning";
import NewsSentimentPage from "@/pages/NewsSentimentPage";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/analysis" element={<StockAnalysis />} />
            <Route path="/compare" element={<CompareStocks />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/reasoning" element={<AgentReasoning />} />
            <Route path="/news" element={<NewsSentimentPage />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
