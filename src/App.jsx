import Home from "./Pages/Home";
import Costumizer from "./Pages/Costumizer";
import { Routes, Route } from "react-router-dom";
import CostumRing from "./3ds/CostumRing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="costumize" element={<CostumRing />} />
    </Routes>
  );
}

export default App;
