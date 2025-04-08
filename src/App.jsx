import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BuyerPage from "./pages/buyer/BuyerPage";
import SellerPage from "./pages/seller/SellerPage";
import CollectorPage from "./pages/collector/CollectorPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/buyer"
          element={
            <RequireAuth>
              <BuyerPage />
            </RequireAuth>
          }
        />
        <Route
          path="/seller"
          element={
            <RequireAuth>
              <SellerPage />
            </RequireAuth>
          }
        />
        <Route
          path="/collector"
          element={
            <RequireAuth>
              <CollectorPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
