import { HashRouter, Route, Routes } from "react-router-dom";
import "./assets/css/index.css";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/register" element={'s'}></Route>
          <Route path="/login" element={'s'}></Route>
          <Route path="/terms" element={'s'}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
