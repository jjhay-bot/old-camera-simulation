import React from 'react';
import { Form, Input } from 'antd';

function renderInput(type, placeholder, prefix, defaultValue) {
  switch (type) {
    case 'password':
      return <Input.Password placeholder={placeholder} prefix={prefix} defaultValue={defaultValue} />;
    case 'textarea':
      return <Input.TextArea placeholder={placeholder} defaultValue={defaultValue} />;
    default:
      return <Input placeholder={placeholder} prefix={prefix} defaultValue={defaultValue} />;
  }
}

function FormText({ type, name, label, rules, placeholder, prefix, defaultValue }) {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      defaultValue={defaultValue}
      validateTrigger={['onChange', 'onBlur']}
    >
      {renderInput(type, placeholder, prefix, defaultValue)}
    </Form.Item>
  );
}

export default FormText;
