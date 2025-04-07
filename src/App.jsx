import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BuyerPage from "./pages/buyer/BuyerPage";
import SellerPage from "./pages/seller/SellerPage";
import CollectorPage from "./pages/collector/CollectorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buyer" element={<BuyerPage />} />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/collector" element={<CollectorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
