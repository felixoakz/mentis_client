import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) return null

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
};
