import Home from "./Pages/Home";
import Costumizer from "./Pages/Costumizer";
import { Routes, Route } from "react-router-dom";
import CostumRing from "./3ds/CostumRing";
import About from "./Pages/About";
import NavBar from "./Sections/NavBar";
import Footerr from "./Sections/Footerr";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="costumize" element={<CostumRing />} />
        <Route path="about" element={<About />} />
      </Routes>
      <Footerr />
    </>
  );
}

export default App;
