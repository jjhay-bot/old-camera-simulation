import React from 'react';
import { Menu, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

function HeaderMenu() {
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('userType');
    window.location.reload();
  };
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectable={false}
      style={{ height: '64px' }}
    >
      <SubMenu
        icon={
          <Avatar
            size="small"
            style={{ backgroundColor: '#06b7ab' }}
            icon={<UserOutlined />}
          />
        }
        style={{ float: 'right' }}
      >
        <Menu.Item onClick={handleLogout} icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default HeaderMenu;
