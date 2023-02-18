//react router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Home from "./Routes/home";
import Manage from "./Routes/manage";
import NotFound from "./Components/NotFound/404";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="manage" element={<Manage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
