import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
