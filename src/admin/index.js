//react router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Home from "./Routes/home";
import Manage from "./Routes/manage";
import Products from "./Routes/products";
import Product from "./Routes/product";
import Finance from "./Routes/finance";
import Order from "./Routes/order";
import NotFound from "../Components/NotFound/404";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="manage" element={<Manage />} />
        <Route path="finance" element={<Finance />} />
        <Route path="order/:id" element={<Order />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
