import React from "react";
import "./NotFound.css";
import { Result } from "antd";

function NotFound() {
  return (
    <div className="App">
      <header className="App-header">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <a className="App-link" href="#/login" rel="noopener noreferrer">
              Go Home
            </a>
          }
        />
      </header>
    </div>
  );
}

export default NotFound;
