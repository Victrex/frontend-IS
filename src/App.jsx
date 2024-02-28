import { HashRouter, Route, Routes } from "react-router-dom";
import RegistroForm from "./components/registro/RegistroForm";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<RegistroForm />}></Route>
          <Route path="/login" element={'s'}></Route>
          <Route path="/terms" element={'s'}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App





