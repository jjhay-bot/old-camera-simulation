import React from 'react';
import {
    Form,
    InputNumber,
    Switch,
    Select,
    TimePicker,
    DatePicker,
} from 'antd';
import moment from "moment";
import {
    FormInput,
    FormDynamicInput,
    FormCheckbox,
    FormSelect,
} from '../atoms';

function SimpleForm({
    form,
    inputs = [],
    initialValues,
    layout = 'horizontal',
    horizontal = { label: 8, input: 16 },
}) {
    const formItemLayout =
        layout === 'horizontal'
            ? {
                labelCol: { span: horizontal.label },
                wrapperCol: { span: horizontal.input },
            }
            : {};

    const buttonItemLayout =
        layout === 'horizontal'
            ? {
                wrapperCol: { span: horizontal.input, offset: horizontal.label },
            }
            : {};

    return (
        <Form
            labelCol={formItemLayout.labelCol}
            wrapperCol={formItemLayout.wrapperCol}
            layout={layout}
            form={form}
            initialValues={initialValues}
        >
            {inputs.map(
                ({
                    type,
                    name,
                    label,
                    rules,
                    placeholder,
                    prefix,
                    options,
                    indexAsValue,
                    mode,

                }) => {

                    switch (type) {
                        case 'checkbox':
                            return (
                                <FormCheckbox
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    options={options}
                                    key={name}
                                    style={{ width: '100%' }}
                                />
                            );
                        case 'dynamic-input':
                            return (
                                <FormDynamicInput
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    placeholder={placeholder}
                                    formItemLayout={formItemLayout}
                                    buttonItemLayout={buttonItemLayout}
                                    key={name}
                                    style={{ width: '100%' }}
                                />
                            );
                        case 'switch':
                            return (
                                <Form.Item
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    validateTrigger={['onChange', 'onBlur']}
                                    valuePropName="checked"
                                    key={name}
                                    style={{ width: '100%' }}
                                >
                                    <Switch />
                                </Form.Item>
                            );
                        case 'number':
                            return (
                                <Form.Item
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    validateTrigger={['onChange', 'onBlur']}
                                    key={name}
                                >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            );
                        case 'percentage':
                            return (
                                <Form.Item
                                    name={name}
                                    label={label}
                                    rules={rules}

                                    validateTrigger={['onChange', 'onBlur']}
                                    key={name}
                                >
                                    <InputNumber style={{ width: '100%' }}

                                        formatter={value => `${value}%`}
                                        parser={value => value.replace('%', '')}
                                    />
                                </Form.Item>
                            );
                        case 'float':
                            return (
                                <Form.Item
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    validateTrigger={['onChange', 'onBlur']}
                                    key={name}
                                >
                                    <InputNumber style={{ width: '100%' }} step='0.01' />
                                </Form.Item>
                            );
                        case 'select':
                            return (
                                <FormSelect
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    options={options}
                                    placeholder={placeholder}
                                    indexAsValue={indexAsValue}
                                    mode={mode}
                                    key={name}
                                />
                            );
                        case 'timepicker':
                            return (
                                <Form.Item
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    validateTrigger={['onChange', 'onBlur']}
                                    key={name}
                                >
                                    <TimePicker format="hh:mm A" use12Hours style={{ width: '100%' }} />
                                </Form.Item>
                            );
                        case 'rangepicker':
                            return (
                                <Form.Item
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    validateTrigger={['onChange', 'onBlur']}
                                    key={name}
                                >
                                    <DatePicker.RangePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                                </Form.Item>
                            );
                        case 'datepicker':
                            return (
                                <Form.Item
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    validateTrigger={['onChange', 'onBlur']}
                                    key={name}
                                    defaultValue={moment(moment(), 'YYYY-MM-DD')}
                                >
                                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                                </Form.Item>
                            );
                        case 'datetimepicker':
                            return (
                                <Form.Item
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    validateTrigger={['onChange', 'onBlur']}
                                    key={name}
                                >
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
                                </Form.Item>
                            );
                        case 'dynamic-tag':
                            return (
                                <Form.Item
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    validateTrigger={['onChange', 'onBlur']}
                                    key={name}
                                >
                                    <Select placeholder={placeholder} mode="tags" style={{ width: '100%' }} />
                                </Form.Item>
                            );
                        default:
                            return (
                                <FormInput
                                    type={type}
                                    name={name}
                                    label={label}
                                    rules={rules}
                                    placeholder={placeholder}
                                    prefix={prefix}
                                    key={name}

                                    style={{ width: '100%' }}
                                />
                            );
                    }
                },
            )}
        </Form >
    );
}

export default SimpleForm;
