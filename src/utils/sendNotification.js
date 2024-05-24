import React from 'react';
import { Button, notification } from 'antd';
import { SmileOutlined, CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const sendNotification = (title, description, type) => {
    var icon = <ExclamationCircleOutlined style={{ color: '#aaaaaa' }} />;
    if (type == "success") {
        icon = <CheckOutlined style={{ color: '#22bb33' }} />;
    }
    else if (type == "error" || type == "failed") {
        icon = <ExclamationCircleOutlined style={{ color: '#bb2124' }} />;
    }
    notification.open({
        message: title,
        description: description,
        icon: icon,
    });
};

export default sendNotification;
