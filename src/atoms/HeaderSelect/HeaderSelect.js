import React from 'react';
import { Select, Typography } from 'antd';

const { Text } = Typography;

function HeaderSelect({
  onChange,
  loading,
  data = [],
  valueKey = 'id',
  labelKey = 'name',
  width = 200,
  defaultValue,
  placeholder,
  label,
}) {
  return (
    <>
      {label && <Text>{label}</Text>}
      <Select
        style={{ width }}
        placeholder={placeholder}
        onChange={onChange}
        loading={loading}
        value={
          data.find((a) => a[valueKey] === defaultValue)
            ? defaultValue
            : undefined
        }
      >
        {data.map((option) => (
          <Select.Option value={option[valueKey]} key={option[valueKey]}>
            {option[labelKey]}
          </Select.Option>
        ))}
      </Select>
    </>
  );
}

export default HeaderSelect;
