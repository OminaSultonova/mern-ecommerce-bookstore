// src/layouts/AdminLayout.jsx

import { Outlet } from 'react-router-dom';
import AdminHeader from '../admin-components/AdminHeader';
import AdminSidebar from '../admin-components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <div style={{ display: 'flex' }}>
        <AdminSidebar />
        <div style={{ marginRight: '150px', marginLeft: '50px', padding: '20px', width: '100%' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
