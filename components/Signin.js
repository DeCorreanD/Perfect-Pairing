import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>The Perfect Pairing Is Only A Click Away!</h1>
      <button type="button" className="btn btn-primary btn copy-btn" onClick={signIn}>
        Join The Family
      </button>
    </div>
  );
}

export default Signin;
