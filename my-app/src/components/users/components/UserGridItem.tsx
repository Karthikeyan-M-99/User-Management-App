import React from 'react';
import { Card, Avatar, Tooltip, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { UserInterface } from '../../../types/user';

interface UserGridItemProps {
  user: UserInterface;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const UserGridItem: React.FC<UserGridItemProps> = ({ user, onEdit, onDelete }) => {
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: `This will permanently delete ${user.first_name} ${user.last_name}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDelete(user.id);
      },
    });
  };

  return (
    <Card
      hoverable
      style={{
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ padding: '20px 0' }}>
        <Avatar
          size={140}
          src={user.avatar}
          style={{
            marginBottom: '16px',
            border: '2px solid #f0f0f0',
          }}
        />
        <div style={{ marginBottom: '8px' }}>
          <h3
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >{`${user.first_name} ${user.last_name}`}</h3>
        </div>
        <div
          style={{
            color: '#8c8c8c',
            marginBottom: '16px',
          }}
        >
          {user.email}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() => onEdit(user.id)}
              style={{
                fontSize: '20px',
                color: '#1890ff',
                cursor: 'pointer',
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              onClick={showDeleteConfirm}
              style={{
                fontSize: '20px',
                color: 'red',
                cursor: 'pointer',
              }}
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};
