import React from "react";
import "../../styles/Login.css";

/**-------Props-------
 * type: string, if password, hides the input with dots; also used as the header for the input
 * waiting: boolean that disables the input if true
 * data: value inside the input
 * onChange: function to be called when input changes
 */

export default ({ type, waiting, data, onChange }) => (
  <div>
    <div className="login-form-input-header">{type.charAt(0).toUpperCase() + type.substr(1)}</div>
    <input
      className="login-form-input"
      type={type === "password" ? "password" : "text"}
      disabled={waiting}
      name={type}
      placeholder=""
      value={data}
      onChange={e => onChange(e.target.value)}
    />
    <br />
  </div>
);
