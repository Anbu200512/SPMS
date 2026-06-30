import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/common/Loader';

const ProtectedRoute = ({ role }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (role && user?.role !== role) {
    const redirectMap = {
      student: '/student',
      teacher: '/teacher',
      admin: '/admin',
    };
    return <Navigate to={redirectMap[user?.role] || '/'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
