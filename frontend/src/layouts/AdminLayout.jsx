import { Outlet } from 'react-router-dom';
import PortalLayout from '../components/portal/PortalLayout';

const AdminLayout = () => {
  return (
    <PortalLayout role="admin">
      <Outlet />
    </PortalLayout>
  );
};

export default AdminLayout;
