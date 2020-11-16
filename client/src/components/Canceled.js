import React from 'react';
import { Link } from 'react-router-dom';

const Canceled = () => {
  return (
    <div className="container pt-4">
      <div className="main">
        <header className="header">
          <div className="header-logo"></div>
        </header>
        <div className="payment-summary completed-view">
          <h3>Your payment was canceled</h3>
          <Link to="/surveys">Go to surveys</Link>
        </div>
      </div>
      <div className="content">
        Some content
      </div>
    </div>
  );
};

export default Canceled;
