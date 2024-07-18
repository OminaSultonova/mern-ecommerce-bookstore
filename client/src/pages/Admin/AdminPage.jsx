// src/pages/admin/AdminPage.jsx

import AdminHeader from '../Admin/admin-components/AdminHeader';
import AdminSidebar from '../Admin/admin-components/AdminSidebar';
import AdminMainContent from '../Admin/admin-components/AdminMainContent';

const AdminPage = () => {
  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <AdminMainContent />
    </>
  );
};

export default AdminPage;
