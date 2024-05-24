import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import growsariLogo from '../../assets/Growsari-Logo-Main.png';

function Logo() {
  return (
    <Link className="logo" to="/">
      <img src={growsariLogo} alt="growsari" />
    </Link>
  );
}

export default withRouter(Logo);
