import React from 'react';
import { Form, Checkbox, Row, Col } from 'antd';

function FormCheckbox({ name, label, rules, options }) {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      validateTrigger={['onChange', 'onBlur']}
    >
      <Checkbox.Group>
        <Row>
          {options.map((option) => {
            const key =
              typeof option === 'string' ? option : Object.keys(option)[0];
            const value =
              typeof option === 'string' ? option : Object.values(option)[0];
            return (
              <Col span={8} key={key}>
                <Checkbox value={key}>{value}</Checkbox>
              </Col>
            );
          })}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );
}

export default FormCheckbox;
