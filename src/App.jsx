import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/contact";
import Product from "./pages/product";
import Address from "./pages/Address";


function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Product" element={<Product />} />      
          <Route path="/Address" element={<Address />} />      
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;