
import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Card, Modal, Spin, Select, Menu } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import SimpleForm from '../../utils/SimpleForm';
import moment from "moment";
import qs from 'querystring';
import axios from '../../utils/custom-axios';
import sendNotification from '../../utils/sendNotification';
import constants from '../../constants.json';
var API_URI = constants.local_base_url;
var statusOptions = [
    {
        value: 'VERIFIED',
        label: 'VERIFIED',
    }, {
        value: 'NON-VERIFIED',
        label: 'NON-VERIFIED',
    }];

function BasicFilter({ onComplete }) {

    const [form] = Form.useForm();
    const [groups, setGroupList] = useState([]);
    const initialValues = {
        "from_date": moment(moment(), 'YYYY-MM-DD'),
        "to_date": moment(moment(), 'YYYY-MM-DD'),
        "audit_percent": "100",
        "status": "VERIFIED",

    };
    const getQuestionGroups = useCallback((params) => {
        let data = '',
            apiUrl = `${API_URI}/audit/v1/question_groups`;
        if (params) {
            const { variables } = params;
            apiUrl += '?' + qs.stringify(variables);
        }
        axios.get(apiUrl, { headers: { 'Content-type': 'application/json;  charset=utf-8', 'authorization': sessionStorage.getItem("accessToken") } })
            .then((response) => {
                if ("data" in response && "data" in response.data) {
                    console.log('Setting data', response.data.data);

                    var questionGroups = response.data.data;
                    var groupIds = [];
                    for (var i = 0; i < questionGroups.length; i++) {

                        console.log(questionGroups[i].id);
                        var groupId = {
                            "value": questionGroups[i].id,
                            "label": questionGroups[i].group_key
                        }
                        groupIds.push(groupId);
                    }
                    console.log(groupIds);
                    setGroupList(groupIds);

                }
            }).catch((err) => {
                console.log(err)
            });
    }, []);

    useEffect(() => {
        getQuestionGroups();
    }, [getQuestionGroups]);

    const checkValue = (_, value) => {
        console.log(value);
        if (value > 0 && value <= 100) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Percentage must be in between 1 and 100'));
    };

    const inputs = [

        {
            name: 'status',
            label: 'Status',
            rules:
                [
                    {
                        required: false,
                        message: 'Status is required'
                    }
                ],
            options: statusOptions,
            hasFeedback: true,
            type: 'select',
        },
        {
            name: 'question_group_id',
            label: 'KYC Type',
            rules:
                [
                    {
                        required: false,
                        message: 'KYC Type is required'
                    }
                ],
            options: groups,
            hasFeedback: true,
            type: 'select',
        },

        {
            name: 'audit_percent',
            label: 'Audit Percentage(1-100%)',
            rules:
                [
                    {
                        required: true,

                        message: 'Audit Percentage is required'
                    },
                    {
                        validator: checkValue,
                    }
                ],
            hasFeedback: true,
            type: 'percentage',
        },
        {
            name: 'from_date',
            label: 'From Date',
            rules:
                [
                    {
                        required: true,
                        message: 'From Date is required'
                    }
                ],
            type: 'datepicker',
            hasFeedback: true,
        },
        {
            name: 'to_date',
            label: 'To Date',
            rules:
                [
                    {
                        required: true,
                        message: 'To Date is required'
                    }
                ],
            type: 'datepicker',
            hasFeedback: true,
        },

    ];


    const submitAction = (filterData) => {
        let apiUrl = `${API_URI}/audit/v1/data_for_audit`;
        console.log(filterData);

        console.log(filterData);
        axios.post(apiUrl, filterData, { headers: { 'Content-type': 'application/json; charset=utf-8', 'authorization': sessionStorage.getItem("accessToken") } })
            .then((response) => {
                console.log('create Route response ', response);

                // sendNotification("Okay", "Please Audit", "success");
                onComplete(response);
            }).catch(err => {

                console.log(err);
                sendNotification("Failed", "Please Try Again", "error");
            });
    };

    const handleSubmit = async () => {
        const { meta, ...values } = await form.validateFields();
        var addValues = {};
        for (var value in values) {
            addValues[value] = values[value];
            if (values[value] instanceof moment) {
                addValues[value] = values[value].format("YYYY-MM-DD");
            }
        }

        console.log(addValues);

        form.resetFields();
        submitAction(addValues);

    };
    return (
        <>
            <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Card>
                    <SimpleForm form={form} layout="vertical" inputs={inputs} initialValues={initialValues} />
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleSubmit}
                        icon={<SaveOutlined />}
                        style={{ marginTop: 30 }}
                    >
                        Send
                        </Button>
                </Card>

            </div>


        </>)

}

export default BasicFilter;
