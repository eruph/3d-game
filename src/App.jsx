import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigate from "./pages/Navigate";
import Main from "./pages/Main";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate />}></Route>
        <Route path="/main" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
