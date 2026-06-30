import { Outlet } from 'react-router-dom';
import PortalLayout from '../components/portal/PortalLayout';

const StudentLayout = () => {
  return (
    <PortalLayout role="student">
      <Outlet />
    </PortalLayout>
  );
};

export default StudentLayout;
