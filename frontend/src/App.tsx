import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import BulletinBoard from "./pages/BulletinBoard";
import FlyerDetails from "./pages/FlyerDetails";
import UploadFlyer from "./pages/UploadFlyer";
import Register from "./pages/Register";
import EditFlyer from "./pages/EditFlyer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<BulletinBoard />} />
        <Route path="/flyers/:id" element={<FlyerDetails />} />
        <Route path="/edit/:id" element={<EditFlyer />} />
        <Route path="/upload" element={<UploadFlyer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;