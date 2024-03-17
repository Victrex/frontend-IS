import { HashRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/registro/RegisterForm";
import Oops from "./components/generalComponents/Oops";
import Landing from "./components/landing/Landing";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/?/error503" element={<Oops />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App





