import { HashRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/registro/RegisterForm";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<RegisterForm />}></Route>
          <Route path="/login" element={'s'}></Route>
          <Route path="/terms" element={'s'}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App





