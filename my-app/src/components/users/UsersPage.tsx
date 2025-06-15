import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import { createUser, deleteUser, fetchUsers, selectIsFetching, selectUsers, setIsSubmitting, updateUser } from '../../store/userSlice';
import { selectAuthToken, selectLoginEmail } from '../../store/authSlice';
import { useRouter } from 'next/router';
import { Button, Input, Switch, Spin, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TableView } from './components/TableView';
import { GridView } from './components/GridView';
import { UserInterface } from '../../types/user';
import { ViewToggle } from './components/ViewToggle';
import User from './components/User';

const UsersPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const users = useSelector(selectUsers);
  const isFetching = useSelector(selectIsFetching);
  const token = useSelector(selectAuthToken);
  const loginEmail = useSelector(selectLoginEmail)

  const [search, setSearch] = useState('');
  const [isGridView, setIsGridView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null)

  const [showDialog, setShowDialog] = useState(false);

  const usersPerPage = 4;

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [token, dispatch, router]);
  // console.log('Users:', users);

  useEffect(() => {
    debugger
    const user = users.find(user => user.email === loginEmail);
    if (user) {
      const value = JSON.stringify(user)
      localStorage.setItem('user', value);
    }
  },[users])

  const filteredUsers = users.filter((user: UserInterface) => {
    const firstName = user?.first_name?.toLowerCase() || '';
    const lastName = user?.last_name?.toLowerCase() || '';
    const searchTerm = search.toLowerCase();

    return firstName.includes(searchTerm) || lastName.includes(searchTerm);
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  console.log('Paginated Users:', paginatedUsers);
  console.log('Filtered Users:', filteredUsers);

  const handleSubmit = (values: any) => {
  try{
    dispatch(setIsSubmitting(true));
    debugger
    if(values.id) {
      dispatch(updateUser({id: values.id, userData: values}));
    }else{
      dispatch(createUser(values));
    }
    setSelectedUserId(null)
    dispatch(fetchUsers(1));
    setShowDialog(false);
  } catch (error) {
    console.error('Error submitting user:', error);
  }finally{
    dispatch(setIsSubmitting(false));
  }
  };

  const handleDelete = (id: number) => {
    try{
      dispatch(setIsSubmitting(true));
      dispatch(deleteUser(id));
      dispatch(fetchUsers(1));
    }catch (error) {
      console.error('Error deleting user:', error);
    }finally{
      dispatch(setIsSubmitting(false));
    }
  };

  const handleEdit = (id: any) => {
    setSelectedUserId(id)
    setShowDialog(true);
  };

  const handleLogout = () => {
    // dispatch(logout());
    router.push('/login');
  };

  if (!token) return null;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px' }}>
        <h2 style={{ margin: 0 }}>Users</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Input
            placeholder="Search users"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 200 }}
          />
          <Button onClick={()=>handleEdit(null)} type="primary">Create User</Button>
        </div>
      </div>

      <ViewToggle isGridView={isGridView} onChange={setIsGridView} padingStyles='0 2px 20px 24px'/>

      {isGridView ? (
        <GridView
          loading={false}
          users={paginatedUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <TableView
          loading={false}
          users={paginatedUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <div style={{color:'#fff', padding: '12px 24px', display: 'flex', justifyContent: 'flex-end', backgroundColor: isGridView ? '#fff' : '#f2f2f2'}}>
        <Pagination
          current={currentPage}
          pageSize={usersPerPage}
          total={filteredUsers.length}
          onChange={setCurrentPage}
          showSizeChanger={false}

        />
      </div>

      {showDialog && (
        <User open={showDialog} onCancel={() => setShowDialog(false)} onSubmit={handleSubmit} userId={selectedUserId}/>
      )}
    </>
  );
};

export default UsersPage;
