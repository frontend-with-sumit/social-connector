import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import Home from "./components/Home";
import Payments from "./components/Payments";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="recover_password" element={<ChangePassword />} />
        <Route path="payments" element={<Payments />} />
        <Route path="home" element={<Home />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>You hit a wrong route</p>
            </main>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
