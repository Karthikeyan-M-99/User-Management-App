
import { Form, Input, Button, message, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { login, setLoginEmail } from '../src/store/authSlice';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      dispatch(setLoginEmail(values?.email))
      message.success('Login successful');
      router.push('/users');
    } catch (error) {
      message.error('Invalid login credentials');
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#f2f2f2', 
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 0
    }}>
      <div style={{ maxWidth: 400, width: '100%'}}>
        <Card style={{ marginBottom: 20 }}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password placeholder='Enter your password'/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
