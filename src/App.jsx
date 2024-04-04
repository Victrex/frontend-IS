import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/registro/RegisterForm";
import Oops from "./components/generalComponents/Oops";
import Landing from "./components/landing/Landing";
import { ProtectedUserValidationRoutes } from "./components/ProtectedRoutes";
import { useAuthStore } from "./components/store/auth";
import ProductRegister from "./components/products/ProductsSection";
import Products from "./components/products/Products";
import Login from "./components/registro/Login";
import ProductEdit from "./components/products/ProductEdit";
import ProductById from "./components/landing/ProductById";
import WishList from "./components/landing/WishList";

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Landing />}>
            <Route path="show/:id" element={<ProductById />} />
            <Route
              path="/wishlist"
              element={<ProtectedUserValidationRoutes isAllowed={!!isAuth} />}
            >
              <Route path="" element={<WishList />} />
            </Route>
          </Route>



          <Route path="*" element={<Oops />}></Route>
          <Route
            path="/prd"
            element={<ProtectedUserValidationRoutes isAllowed={!!isAuth} />}
          >
            <Route path="" element={<Products />}>
              <Route path="edit/:id" element={<ProductEdit />} />
            </Route>
            <Route path="register" element={<ProductRegister />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
