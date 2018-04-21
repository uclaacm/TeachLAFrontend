import React from 'react';

const LoginForm = () => {
  return (
    <div className="page">
      <h1>The Coding School</h1>
      <input type="text" name="email" placeholder="Email" /><br/>
      <input type="password" name="password" placeholder="Password" /><br/>
    </div>
  );
}

export default LoginForm;
