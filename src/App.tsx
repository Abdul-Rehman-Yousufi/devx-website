import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ImageKitProvider } from "@imagekit/react";
import Index from "./pages/Index.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import AllProject from "./pages/AllProject.tsx";
import CapabilityDeck from "./pages/CapabilityDeck.tsx";
import VideoPortfolio from "./pages/VideoPortfolio.tsx";
import NotFound from "./pages/NotFound.tsx";
import { CommandPalette } from "./components/portfolio/CommandPalette.tsx";

const queryClient = new QueryClient();

const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT || "";

const App = () => {
  if (!urlEndpoint) {
    console.warn("VITE_IK_URL_ENDPOINT is not defined in .env file");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ImageKitProvider urlEndpoint={urlEndpoint}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CommandPalette />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/all-project" element={<AllProject />} />
            <Route path="/capability-deck" element={<CapabilityDeck />} />
            <Route path="/video-portfolio" element={<VideoPortfolio />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ImageKitProvider>
    </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
