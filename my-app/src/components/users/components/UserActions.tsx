import React from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UserInterface } from '../../../types/user';

interface UserTableItemProps {
  user: UserInterface;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const UserActions: React.FC<UserTableItemProps> = ({
  user,
  onEdit,
  onDelete
}) => {
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
    <>
      <Button
        style={{ 
          marginRight: 8,
          backgroundColor: '#1677ff',
          color: 'white'
        }}
        onClick={() => onEdit(user.id)}
      >
        Edit
      </Button>
      <Button
        style={{
          backgroundColor: '#ff4d4f',
          color: 'white'
        }}
        onClick={showDeleteConfirm}
      >
        Delete
      </Button>
    </>
  );
};