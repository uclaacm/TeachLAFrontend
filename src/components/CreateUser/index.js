import React from 'react';
import {RingLoader} from 'react-spinners'
import {Link} from 'react-router-dom'
import SocialButton from '../SocialButton'
import firebase from 'firebase'
import AES from 'crypto-js/aes'
import SHA256 from 'crypto-js/sha256'
import Filter from 'bad-words'
// import '../styles/app.css'
import '../../styles/CreateUser.css'
import {SERVER_URL,
    MINIMUM_USERNAME_LENGTH,
    MINIMUM_PASSWORD_LENGTH,
    MINIMUM_DISPLAY_NAME_LENGTH,
    MAXIMUM_USERNAME_LENGTH,
    MAXIMUM_PASSWORD_LENGTH,
    MAXIMUM_DISPLAY_NAME_LENGTH,
} from '../../constants';

const filter = new Filter();

class CreateUser extends React.Component {
	constructor(props){
		super(props)
		this.state={
            username:"",
            password:"",
            displayName:"",
            waiting:false,
            message:null,
            usernameMessage:null,
            passwordMessage:null,
            displaynameMessage:null,
        }

        this.handleFetchSuccess = this.handleFetchSuccess.bind(this)
        this.handleFetchFailure = this.handleFetchFailure.bind(this)
    }

    checkInputs = () => {
        const {username, password, displayName} = this.state
        let badInputs = false

        if(username.length < MINIMUM_USERNAME_LENGTH){
            this.setState({usernameMessage:`Username must be at least ${MINIMUM_USERNAME_LENGTH} characters`})
            badInputs = true
        } else if(username.length > MAXIMUM_USERNAME_LENGTH){
            this.setState({usernameMessage:`Username must be at most ${MAXIMUM_USERNAME_LENGTH} characters`})
            badInputs = true
        } else if(username.match(/[^a-zA-Z0-9!@#$%]/)){
            this.setState({usernameMessage:"Username must only use upper case and lower case letters, numbers, and/or the special characters !@#$%"})
            badInputs = true
        } else if(filter.isProfane(username)) {
            this.setState({usernameMessage:"Username must not contain profanity"})
            badInputs = true
        } else {
            this.setState({usernameMessage:null})
        }

        if(password.length < MINIMUM_PASSWORD_LENGTH){
            this.setState({passwordMessage:`Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters`})
            badInputs = true
        } else if(password.length > MAXIMUM_PASSWORD_LENGTH){
            this.setState({passwordMessage:`Password must be at most ${MAXIMUM_PASSWORD_LENGTH} characters`})
            badInputs = true
        } else if(password.match(/[^a-zA-Z0-9!@#$%]/)){
            this.setState({passwordMessage:"Password must only use upper case and lower case letters, numbers, and/or the special characters !@#$%"})
            badInputs = true
        } else {
            this.setState({passwordMessage:null})
        }

        if(displayName.length < MINIMUM_DISPLAY_NAME_LENGTH){
            this.setState({displaynameMessage:`Display Name must be at least ${MINIMUM_DISPLAY_NAME_LENGTH} characters`})
            badInputs = true
        } else if(displayName.length > MAXIMUM_DISPLAY_NAME_LENGTH){
            this.setState({displaynameMessage:`Display Name must be at most ${MAXIMUM_DISPLAY_NAME_LENGTH} characters`})
            badInputs = true
        } else if(displayName.match(/[^a-zA-Z0-9!@#$% ]/)){
            this.setState({displaynameMessage:"Display Name must only use upper case and lower case letters, numbers, spaces, and/or the special characters !@#$%"})
            badInputs = true
        } else if(filter.isProfane(displayName)) {
            this.setState({displaynameMessage:"Display Name must not contain profanity"})
            badInputs = true
        } else {
            this.setState({displaynameMessage:null})
        }
        return badInputs
    }
    
    handleFetchSuccess = async function(response){
        let {ok, data} = await response.json();

        console.log(ok)
        console.log(data)
        if(!data){
            this.setState({waiting:false, message: "Failed to connect to server..."})
            return
        }

        //checking ok second bc maybe there is no response and thus there would be no data; ok can be either true or false so !ok would happen for both cases
        if(!ok){
            let {code, message} = data                      //if ok is false, data will be a json with 2 keys containing strings, code and message
            console.log(message)
            if(!message){                                               
                this.setState({waiting:false, message:"Failed to get error message from server..."})
                return
            }
            this.setState({waiting:false, message:message.replace(/uid/i, 'username')})             //replace instances of uid in the error string with username
            return
        }

        //if no errors occured, login the user with the token sent by the server
        firebase.auth().signInWithCustomToken(data)
    }
    
    handleFetchFailure = (err) => {
        this.setState({waiting:false, message: "Failed to communicate with server..."})
    }

    submit = (e) => {
        e.preventDefault()
        const {username, password, displayName} = this.state

        console.log(username.match(/[^a-zA-Z0-9!@#$%]/))
        console.log(username.length)
        // console.log(username.match(/[^a-zA-Z\d]/))

        let badInputs = this.checkInputs()

        //if we found any bad inputs, don't try to create the user on the server
        if(badInputs){
            return
        }

        this.setState({waiting:true, message:null})

        let url = `${SERVER_URL}/createUser`
        
        /**
         * createRequest json as follows
         * {
         *  disabled: boolean
         *  displayName: string
         *  email: string
         *  emailVerified: boolean
         *  password: string
         *  phoneNumber: string
         *  photoURL: string
         *  uid: string
         * }
         */
        
        let content = {
            uid: SHA256(username).toString(),
            password: SHA256(password).toString(),
            displayName: displayName,
        }
        

        let init = {
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
              'content-type': 'application/json'
            },
        }
    
        return fetch(url, init)
            .then(this.handleFetchSuccess)
            .catch(this.handleFetchFailure)
    }

	render() {
		let {loggedIn} = this.props
        let {waiting, message, usernameMessage, passwordMessage, displaynameMessage} = this.state
		//if we haven't checked if the user is logged in yet, show a loading screen


		return (
            <div className='create-page'>
                <div className='create-page-content'>
                    <div className='create-modal'>
                        <form className='create-form' onSubmit={this.submit}>	{/*Form doesn't do anything rn, just an example of a stateful React form.*/}
                            <div className="create-header" >{"Create a new account"}</div>
                            <br/>
                            <div className="create-form-input-list">
                                <div className="create-form-input-header">
                                    Username
                                </div>
                                <input className="create-form-input" type="text" name="username"
                                    placeholder="" value={this.state.username}
                                    onChange={(e)=>{this.setState({username:e.target.value})}}
                                />
                                {usernameMessage ? <div style={{color:'red', fontSize:'0.8em'}}>{usernameMessage}</div> : <br/>}
                                <div className="create-form-input-header">Password</div>
                                <input className='create-form-input' type="password" name="password"
                                    placeholder="" value={this.state.password}
                                    onChange={(e)=>{this.setState({password:e.target.value})}}
                                />
                                {passwordMessage ? <div style={{color:'red', fontSize:'0.8em'}}>{passwordMessage}</div> : <br/>}
                                <div className="create-form-input-header">
                                    Display Name
                                </div>
                                <input className='create-form-input' type="text" name="displayname"
                                    placeholder="First Last" value={this.state.displayName}
                                    onChange={(e)=>{this.setState({displayName:e.target.value})}}
                                />
                                {displaynameMessage ? <div style={{color:'red', fontSize:'0.8em'}}>{displaynameMessage}</div> : <br/>}
                            </div>
                            <RingLoader
                            color={'#171124'} 
                            size={50}
                            loading={waiting} 
                            />
                            {message ? <div style={{color:'red'}}>{message}</div> : <span/>}
                            <button className='create-form-button' type="submit">create</button>
                            <Link to="/login" className="create-form-link">Already have an account? Click here to log in</Link>
                        </form>
                    </div>
                </div>
                <div className="create-footer">
                    <img className="create-footer-image" src="img/tla-footer.png"/>
                </div>
            </div>
		);
	}
}

export default CreateUser;
