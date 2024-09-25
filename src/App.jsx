import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigate from "./pages/Navigate";
import Main4A from "./pages/4A";
import Main4B from "./pages/4B";
import Main5A from "./pages/5A";
import Main5B from "./pages/5B";
import Main6A from "./pages/6A";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate />}></Route>
        <Route path="/4.A" element={<Main4A />}></Route>
        <Route path="/4.B" element={<Main4B />}></Route>
        <Route path="/5.A" element={<Main5A />}></Route>
        <Route path="/5.B" element={<Main5B />}></Route>
        <Route path="/6.A" element={<Main6A />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
