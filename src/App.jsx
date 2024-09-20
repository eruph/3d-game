import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigate from "./pages/Navigate";
import Main4A from "./pages/4A";
import Main4B from "./pages/4B";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate />}></Route>
        <Route path="/4.A" element={<Main4A />}></Route>
        <Route path="/4.B" element={<Main4B />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
