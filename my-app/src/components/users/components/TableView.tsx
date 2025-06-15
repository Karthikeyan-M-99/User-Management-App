import React from 'react';
import { Table, Pagination, Spin, Avatar, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UserInterface } from '../../../types/user';
import { UserActions } from './UserActions';

interface TableViewProps {
  loading: boolean;
  users: UserInterface[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  loading,
  users,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      width: 80,
      render: (_: any, record: UserInterface) => <Avatar size={40} src={record.avatar} shape='circle' style={{ marginLeft: '40px'}} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email: string) => <a style={{ color: '#1677ff' }}>{email}</a>,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
    },
    {
      title: 'Action',
      width: 300,
      render: (_: any, record: UserInterface) => (
        <div style={{paddingRight: '40px'}}><UserActions user={record} onEdit={onEdit} onDelete={onDelete} /></div>
      ),
    },
  ];

  return (
      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
        pagination={false}
        loading={loading}
        style={{backgroundColor:'#f2f2f2'}}
      />
  );
};
