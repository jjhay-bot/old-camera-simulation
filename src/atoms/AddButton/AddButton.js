import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function AddButton({ path }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(path);
  };

  return (
    <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
      New
    </Button>
  );
}

export default AddButton;
