import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Groups from './pages/Groups';
import Subgroups from './pages/Subgroups';
import Products from './pages/Products';
import Orders from './pages/Orders';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Groups />} />
          <Route path="groups" element={<Groups />} />
          <Route path="subgroups" element={<Subgroups />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
