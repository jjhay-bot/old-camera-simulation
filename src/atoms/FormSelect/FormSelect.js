import React from 'react';
import { Form, Select } from 'antd';

function FormCheckbox({
  name,
  label,
  rules,
  placeholder,
  options,
  indexAsValue,
  mode,
}) {
  console.log(options);
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      validateTrigger={['onChange', 'onBlur']}
    >
      <Select placeholder={placeholder} mode={mode}>

        {options.map((option, index) => {
          console.log(option);

          let value;
          let label;
          console.log(typeof option);
          if (indexAsValue) {

            value = index;
            label = index;
          } else if (typeof option == "object") {

            value = option['value']
            label = option['label']
          }
          else {

            value =
              typeof option === 'string' ? option : Object.keys(option)[0];
            label = value;
          }
          // const text =
          //   typeof option === 'string' ? option : Object.values(option)[0];
          return (
            <Select.Option value={value} key={value}>
              {label}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
}

export default FormCheckbox;
