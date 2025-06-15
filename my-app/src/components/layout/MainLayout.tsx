import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { Header } from './Header';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { token: { colorBgContainer } } = theme.useToken();

  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setUserData(JSON.parse(user));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header userData={userData} mounted={mounted} />
      <Layout>
        <Content style={{ 
          padding: '24px',
          margin: '24px',
          width: '97%',
        }}>
          <div style={{
            background: colorBgContainer,
            borderRadius: '8px',
            minHeight: 280,
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;