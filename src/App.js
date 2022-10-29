import './main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Routes, Route } from "react-router-dom";
import { Navbar } from './Components/Navigation Bar/Navbar';
import { MenuSidebar } from './Components/Navigation Bar/MenuSidebar';
import { CartSidebar } from './Components/Navigation Bar/CartSidebar';
import { Footer } from './Components/Footer/Footer';
import { HomePage } from './Components/Home Page/HomePage';
import { Products } from './Components/Products Page/Products';
import { ProductPage } from './Components/Products Page/SingleProduct';
import { ShippingPage } from './Components/Other Pages/Shipping';
import { ContactUsPage } from './Components/Other Pages/ContactUs';
import { AboutUsPage} from './Components/Other Pages/AboutUs';
import { Checkout } from './Components/Checkout Page/Checkout';
import { NotFound } from './Components/Other Pages/NotFound';
import { Final } from './Components/Final Page/Final';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MenuSidebar />
      <CartSidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/latie-gloss" element={<HomePage />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductPage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="contact" element={<ContactUsPage />} />
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="success" element={<Final />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;