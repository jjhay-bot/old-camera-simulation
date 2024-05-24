import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import growsariLogo from '../../assets/Growsari-Logo-Main.png';

const APP_STAGE = "STAGING";
function HeaderService({ serviceObj, serviceCode }) {
  const service = serviceObj
  return (
    <div style={{ float: 'left', marginLeft: 18 }}>
      <Link className="logo" to="/">
      <img src={growsariLogo} alt="growsari" />
    </Link>
    </div>
  );
}

export default HeaderService;
