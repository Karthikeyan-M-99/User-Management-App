import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { fetchUserById, selectUser } from '../../../store/userSlice';

interface UserModalProps {
  userId?: number | null;
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const User: React.FC<UserModalProps> = ({ userId, open, onCancel, onSubmit }) => {
  console.log(userId);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    if(userId){
      values.id = userId;
    }
    onSubmit(values);
  };

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId && user) form.setFieldsValue(user);
  }, [user]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      title={userId ? 'Edit User' : 'Create New User'}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} >
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input placeholder="Please enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input placeholder="Please enter last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Please enter email" />
        </Form.Item>

        <Form.Item
          label="Profile Image Link"
          name="avatar"
          rules={[{ required: true, message: 'Please enter profile image link' }]}
        >
          <Input placeholder="Please enter profile image link" />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default User;
