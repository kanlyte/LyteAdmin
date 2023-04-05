//styling
import "./app.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";

//react
import React from "react";

//react router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import user from "./app.config";
import Login from "./login/login";
import Admin from "./admin/index";
import NotFound from "./admin/Components/NotFound/404";

const App = () =>
  user ? (
    <Admin />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );

export default App;
