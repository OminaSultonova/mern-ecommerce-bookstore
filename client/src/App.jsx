// src/App.js
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import AboutPage from './pages/About/About';
import ContactPage from './pages/Contact/Contact';
import StorePage from './pages/Store/Store';
import ProfilePage from './pages/Profile/Profile';
import LikedItemsPage from './pages/Like/Like';
import CartPage from './pages/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AdminLayout from './pages/Admin/layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import Orders from './pages/Admin/Orders';
import ProductsAdmin from './pages/Admin/ProductsAdmin';
import BookForm from './pages/Admin/admin-components/BookForm';
import OrderDetails from './pages/Admin/OrderDetails';
import AdminLogin from './pages/Admin/admin-components/AdminLogin';
import './App.css'
import SignIn from './pages/SignIn/Signin';
import Checkout from './pages/Checkout/Checkout';
import Success from './pages/Success/Success';
import Cancel from './pages/Cancel/Cancel';
import PrivateRoute from './pages/Admin/admin-components/PrivateRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
useEffect(() => {
  fetch('/admin/check-auth')
    .then(response => response.json())
    .then(data => setIsAuthenticated(data.isAuthenticated))
    .catch(() => setIsAuthenticated(false));
}, []);

  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminLayout />
            </PrivateRoute>
          }
        >

        {/* <Route path="/admin/*" element={<AdminLayout />} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/order/:id" element={<OrderDetails />} /> {/* Route for order details */}
          <Route path="products/new" element={<BookForm />} /> {/* Route for creating a new book */}
          <Route path="products/edit/:id" element={<BookForm />} />  {/* Route for editing an existing book */}         
          {/* Product category routes */}
        </Route>


        {/* Main site routes */}
        <Route
          path="*"
          element={
            <div className="app">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/product/:id" element={<Product  />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/like" element={<LikedItemsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success/>} />
                <Route path="/cancel" element={<Cancel />} />

              </Routes>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
