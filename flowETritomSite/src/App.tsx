import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { Home } from "./pages/Home";
import { BrandPage } from "./pages/BrandPage";
import { GrupoFVT } from "./pages/GrupoFTV";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-dvh bg-white">
      <ScrollTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grupo-fvt" element={<GrupoFVT />} />
        <Route path="/grupo-ftv" element={<Navigate to="/grupo-fvt" replace />} />
        <Route path="/flow" element={<BrandPage brand="flow" />} />
        <Route path="/triton" element={<BrandPage brand="triton" />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
