import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  if (isAuth) {
    return <Navigate to="/selection" replace />;
  }

  return <>{children}</>;
}