import React from 'react';
import { Layout, Typography, Avatar, Space } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/authSlice';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  userData: any;
  mounted: boolean;
}

export const Header: React.FC<HeaderProps> = ({ userData, mounted }) => {
  const authToken = useSelector(selectAuthToken);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (!mounted || !authToken) return null;

  return (
    <AntHeader 
      style={{ 
        padding: '0 24px', 
        background: '#001529',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      <Space>
        <Avatar 
          style={{ backgroundColor: '#1677ff' }}
          icon={<UserOutlined />}
          src={userData?.avatar}
        />
        <Title level={5} style={{ margin: 0, color: 'white' }}>
          {userData ? `${userData.first_name} ${userData.last_name}` : 'Welcome'}
        </Title>
        <Avatar 
          style={{ 
            cursor: 'pointer',
            backgroundColor: '#ff4d4f',
          }}
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        />
      </Space>
    </AntHeader>
  );
};
