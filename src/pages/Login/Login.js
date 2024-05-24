import React, { useCallback } from 'react';
import { Row, Col, Button, Card, Form, Typography } from 'antd';
import { LockOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import axios from '../../utils/custom-axios';
import '../../css/index.css';
import 'antd/dist/antd.css';
import { FormInput } from '../../atoms';
import growsariLogo from '../../assets/Growsari-Logo-Main.png';
import { Center } from '../../templates'
import sendNotification from '../../utils/sendNotification';
import constants from '../../constants.json';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const { Title } = Typography;
var API_URI = constants.local_base_url;

const LoginForm = () => {
  const history = useHistory()
  const [loginForm] = Form.useForm();
  let loading = false;
  const login = useCallback((username, password) => {
    loading = true;
    const apiUrl = `${API_URI}/admin/v1/login`;
    console.log({ "user_name": username, "password": password });
    axios.post(apiUrl, { "user_name": username, "password": password }, { headers: { 'Content-type': 'application/json; charset=utf-8', 'Access-Control-Allow-Credentials': true } }
      , { withCredentials: false })
      .then((response) => {
        if (response.data['success']) {
          localStorage.setItem('userType', response.data.data.user_type);
          history.push(response.data.data.user_type === 'VERIFIER' ? '/verifier' : '/auditor')
        }
        else {
          sendNotification("Error", "Login Failed", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const handleLogin = async () => {
    const { username, password } = await loginForm.validateFields();
    login(username, password);
  };

  return (
    <Form form={loginForm} onFinish={(values) => handleLogin(values)}>
      <FormInput
        name="username"
        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      />
      <FormInput
        name="password"
        type="password"
        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      />
      <Form.Item style={{ marginBottom: '10px' }}>
        <Button
          type="primary"
          loading={loading}
          onClick={handleLogin}
          icon={<LoginOutlined />}
          style={{ fontWeight: 'bold' }}
          block
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

function Login() {
  return (

    <Center>
      <Row
        className="cen-login"
        type="flex"
        justify="space-around"
        align="middle"
      >
        <Col className="app-center" span={6}>
          <Card>
            <img src={growsariLogo} alt="growsari" />
            <Title level={4}>KYC</Title>
            <LoginForm />
          </Card>
        </Col>
      </Row>
    </Center>

  );
}

export default Login;
