import React from 'react'
import SocialLogin from 'react-social-login'
import '../../styles/SocialButton.css'
 
/*
	Props:
		bgColor: string representing the color of the background of the img (can be hex color, rgb(r, g, b, a), or color name)
		textColor: string representing the color of the text in the button (can be hex color, rgb(r, g, b, a), or color name)
		imgSrc: string representing the location of the img used as the icon (can be in the form of URL, path location, or data representing image)
		textPadding: string representing padding to the left of the text, i.e. distance from the img (give px units)
*/

const Button = ({ children, triggerLogin, triggerLogout, bgColor, imgSrc, value, textColor, textPadding, ...props }) => {
	let buttonStyle = {}
	if(bgColor)
		buttonStyle.backgroundColor = bgColor
	if(textColor)
		buttonStyle.color = textColor

	let textStyle ={}
	if(textPadding)
		textStyle.left = textPadding

	return (
	  <button className="login-button" style={buttonStyle} onClick={triggerLogin} {...props}>
	  	<div style={{position:'relative'}}>
		  	<span className="login-button-content">
		  		{imgSrc ? <img className="login-button-img" src={imgSrc}/> : <span/>}
		  		<span className="login-button-text" style={textStyle}>
		    		{ children ? children : (value ? value : "Login") }
		  		</span>
		    </span>
	    </div>
	  </button>
    )
}
 
export default SocialLogin(Button)