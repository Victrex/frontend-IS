import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/registro/RegisterForm";
import Oops from "./components/generalComponents/Oops";
import Landing from "./components/landing/Landing";
import { ProtectedUserValidationRoutes } from "./components/ProtectedRoutes";
import { useAuthStore } from "./components/store/auth";
import ProductRegister from "./components/products/ProductsSection";
import Products from "./components/products/Products";

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/" element={<Landing />}></Route>
          <Route path="*" element={<Oops />}></Route>
          <Route
            path="/prd"
            element={<ProtectedUserValidationRoutes isAllowed={!!isAuth} />}
          >
            <Route path="" element={<Products />} />
            <Route path="register" element={<ProductRegister />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
