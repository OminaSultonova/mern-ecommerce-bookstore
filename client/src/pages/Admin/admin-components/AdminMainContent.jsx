import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard';
import ProductsAdmin from '../ProductsAdmin';
import Users from '../Users';
import Orders from '../Orders';
import '../Admin.css';

const AdminMainContent = () => {
  return (
    <div className='main-content' style={{ padding: '20px' }}>
      <Routes>
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/products" component={ProductsAdmin} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/orders" component={Orders} />
      </Routes>
    </div>
  );
};

export default AdminMainContent;
