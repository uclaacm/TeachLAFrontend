import React from 'react';
import '../../styles/Login.scss';

/** -------Props-------
 * type: string, if password, hides the input with dots; also used as the header for the input
 * waiting: boolean that disables the input if true
 * data: value inside the input
 * onChange: function to be called when input changes
 */

const LoginInput = function ({
  type, waiting, data, onChange,
}) {
  return (
    <div>
      <div className="login-form-input-header">{type}</div>
      <input
        className="login-form-input"
        type={type === 'Password' || type === 'Confirm Password' ? 'password' : 'text'}
        disabled={waiting}
        name={type}
        placeholder=""
        value={data}
        onChange={(e) => onChange(e.target.value)}
      />
      <br />
    </div>
  );
};

export default LoginInput;
