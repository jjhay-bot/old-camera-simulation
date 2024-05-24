import React from 'react';
import { Layout } from 'antd';
import '../../css/index.css';

import 'antd/dist/antd.css';
const { Content, Footer } = Layout;

function Center({ children }) {
  return (
    <Layout id="center-template">
      <Content className="cen-content">{children}</Content>
      <Footer className="app-footer">KYC © GrowSari 2021</Footer>
    </Layout>
  );
}

export default Center;
