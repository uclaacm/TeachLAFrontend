import React from 'react'
import '../../../styles/Login.css'

{/*type.charAt(0).toUpperCase() + type.substr(1)*/}
const LoginInput = ({type, waiting, data, onChange}) => (
  <div>
    <div className="login-form-input-header">{type.charAt(0).toUpperCase() + type.substr(1)}</div>
    <input className="login-form-input" type={type === "password" ? "password" : "text"} disabled={waiting} name={type} placeholder="" value={data} onChange={(inputType, e)=>{onChange(inputType, e)}} />
    <br/>
  </div>
)

export default LoginInput
