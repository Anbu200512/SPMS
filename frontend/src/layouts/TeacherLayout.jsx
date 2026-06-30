import { Outlet } from 'react-router-dom';
import PortalLayout from '../components/portal/PortalLayout';

const TeacherLayout = () => {
  return (
    <PortalLayout role="teacher">
      <Outlet />
    </PortalLayout>
  );
};

export default TeacherLayout;
