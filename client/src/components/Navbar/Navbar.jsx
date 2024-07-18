import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector for Redux state access
import './Navbar.css';

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const cartItems = useSelector(state => state.cart.cartItems) || [];

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavClick = () => {
    setExpanded(false);
  };

  // Close the navbar when the route changes
  React.useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  // Function to calculate total items in cart
  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Navbar bg="light" expand="lg" className="sticky-top" expanded={expanded}>
      <Container>
        <Navbar.Brand href="#" className="d-lg-none">
          InsideOut
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between custom-navbar-collapse">
          <Nav className="me-auto" onClick={handleNavClick}>
            <Nav.Link as={Link} to="/products/english" className="nav-link">
              English Books
            </Nav.Link>
            <Nav.Link as={Link} to="/products/chinese" className="nav-link">
              Chinese Books
            </Nav.Link>
            <Nav.Link as={Link} to="/products/malay" className="nav-link">
              Malay Books
            </Nav.Link>
          </Nav>
          <Link to="/" className="navbar-brand mx-auto d-none d-lg-block logo">
            <h3>InsideOut</h3>
          </Link>
          <Nav className="ms-auto icons-wrapper" onClick={handleNavClick}>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/store">Stores</Nav.Link>
            <div className='nav-icons'>
            <Nav.Link className='smicon' as={Link} to="/profile"><FaUser /></Nav.Link>
            <Nav.Link as={Link} to="/like"><FaHeart /></Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart />
              <span className="cart-badge">{getTotalItemsInCart()}</span> {/* Display total items in cart */}
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
