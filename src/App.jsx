import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/registro/RegisterForm";
import Oops from "./components/generalComponents/Oops";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<RegisterForm />}></Route>
          <Route path="/login" element={'s'}></Route>
          <Route path="/terms" element={'s'}></Route>
          <Route path="/?/error503" element={<Oops />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App





