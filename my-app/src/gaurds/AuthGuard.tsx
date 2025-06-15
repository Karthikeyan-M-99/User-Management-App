import { FC, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { selectAuthToken } from '../store/authSlice';

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLIC_ROUTES = ['/login', '/register'];

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const token = useSelector(selectAuthToken);
  const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname);

  useEffect(() => {
    setIsInitialized(true);
    if (!token && !isPublicRoute) {
      router.replace('/login');
    } else if (token && isPublicRoute) {
      router.replace('/users');
    }
  }, [token, router, isPublicRoute]);

  if (!isInitialized) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;