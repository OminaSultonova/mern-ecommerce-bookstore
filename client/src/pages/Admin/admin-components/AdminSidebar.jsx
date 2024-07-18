import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure FontAwesome is imported
import '../Admin.css'; // Import custom CSS for styling

const AdminSidebar = () => {
  return (
    <ListGroup className="sidebar">
      <ListGroup.Item className="sidebar-item">
        <NavLink to="/admin/dashboard" className="sidebar-link" activeClassName="active-link">
          <i className="fas fa-tachometer-alt fa-fw me-3"></i> Dashboard
        </NavLink>
      </ListGroup.Item>
      <ListGroup.Item className="sidebar-item">
        <NavLink to="/admin/products" className="sidebar-link" activeClassName="active-link">
          <i className="fas fa-boxes fa-fw me-3"></i> Products
        </NavLink>
      </ListGroup.Item>
      <ListGroup.Item className="sidebar-item">
        <NavLink to="/admin/users" className="sidebar-link" activeClassName="active-link">
          <i className="fas fa-users fa-fw me-3"></i> Users
        </NavLink>
      </ListGroup.Item>
      <ListGroup.Item className="sidebar-item">
        <NavLink to="/admin/orders" className="sidebar-link" activeClassName="active-link">
          <i className="fas fa-shopping-cart fa-fw me-3"></i> Orders
        </NavLink>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default AdminSidebar;
