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

class Button extends React.Component {
	constructor(props){
		super(props)
	}

	render(){																													//called deconstruction; pulling children, triggerLogin, ..., textPadding out of props
		let { children, triggerLogin, triggerLogout, bgColor, imgSrc, value, textColor, textPadding, ...props } = this.props 	//and putting the rest of the props in a variable called props (the ...props part)
		let buttonStyle = {}																									//good for trying to pull out certain props you don't wanna pass
		if(bgColor)																												//if they specified backgroundColor, textColor, or textPadding, change the style of the buttons
			buttonStyle.backgroundColor = bgColor
		if(textColor)
			buttonStyle.color = textColor

		let textStyle ={}
		if(textPadding)
			textStyle.left = textPadding
		return (
		  <button className="login-button" style={buttonStyle} onClick={triggerLogin} {...props}> {/*Style in React is different than css, you give it a JSON with camelcased keys of css like background-color is backgroundColor*/}
		  	<div style={{position:'relative'}}>
			  	<span className="login-button-content">
			  		{imgSrc ? <img className="login-button-img" alt = "login button" src={imgSrc}/> : <span/>}
			  		<span className="login-button-text" style={textStyle}>
			    		{ children ? children : (value ? value : "Login") }						{/*if there's children, render the children, otherwise if value is defined, render value, otherwise just render "Login"*/}
			  		</span>
			    </span>
		    </div>
		  </button>
	    )
	}
}

export default SocialLogin(Button)
