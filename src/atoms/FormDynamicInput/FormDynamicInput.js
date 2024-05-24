import React from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function FormDynamicText({
  name,
  label,
  rules,
  placeholder,
  formItemLayout,
  buttonItemLayout,
}) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : buttonItemLayout)}
                label={index === 0 ? label : ''}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={rules}
                  noStyle
                >
                  <Input
                    placeholder={placeholder}
                    style={{ width: '90%', marginRight: 8 }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item {...buttonItemLayout}>
              <Button type="dashed" onClick={() => add()}>
                <PlusOutlined /> Add field
              </Button>
            </Form.Item>
          </>
        );
      }}
    </Form.List>
  );
}

export default FormDynamicText;
