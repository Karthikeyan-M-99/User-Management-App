import React from 'react';
import { List } from 'antd';
import { UserInterface } from '../../../types/user';
import { UserGridItem } from './UserGridItem';

interface GridViewProps {
  loading: boolean;
  users: UserInterface[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const GridView: React.FC<GridViewProps> = ({
  loading,
  users,
  onEdit,
  onDelete
}) => {
  return (
    <List
      grid={{ 
        gutter: [24, 24],
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4
      }}
      style={{ backgroundColor: '#f2f2f2', padding: '48px' }}
      dataSource={users}
      renderItem={(user: UserInterface) => (
        <List.Item>
          <UserGridItem user={user} onEdit={onEdit} onDelete={onDelete} />
        </List.Item>
      )}
      loading={loading}
    />
  );
};
