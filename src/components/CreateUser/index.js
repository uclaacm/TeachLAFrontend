import React from 'react';
import {RingLoader} from 'react-spinners'
import {Link} from 'react-router-dom'
import SocialButton from '../SocialButton'
import firebase from 'firebase'
import AES from 'crypto-js/aes'
import SHA256 from 'crypto-js/sha256'
// import '../styles/app.css'
import '../../styles/CreateUser.css'
import {SERVER_URL, MINIMUM_USERNAME_LENGTH} from '../../constants';

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
        


        // this.setState({waiting:true, message:null})

        // let url = `${SERVER_URL}/createUser`
        
        // /**
        //  * createRequest json as follows
        //  * {
        //  *  disabled: boolean
        //  *  displayName: string
        //  *  email: string
        //  *  emailVerified: boolean
        //  *  password: string
        //  *  phoneNumber: string
        //  *  photoURL: string
        //  *  uid: string
        //  * }
        //  */
        
        // let content = {
        //     uid: SHA256(username).toString(),
        //     password: SHA256(password).toString(),
        //     displayName: displayName,
        // }
        

        // let init = {
        //     method: 'POST',
        //     body: JSON.stringify(content),
        //     headers: {
        //       'content-type': 'application/json'
        //     },
        // }
    
        // return fetch(url, init)
        //     .then(this.handleFetchSuccess)
        //     .catch(this.handleFetchFailure)
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
                                    placeholder="firstnamelastnameschool" value={this.state.username}
                                    onChange={(e)=>{this.setState({username:e.target.value})}}
                                />
                                {usernameMessage ? <div style={{color:'red'}}>{usernameMessage}</div> : <br/>}
                                <div className="create-form-input-header">Password</div>
                                <input className='create-form-input' type="password" name="password"
                                    placeholder="" value={this.state.password}
                                    onChange={(e)=>{this.setState({password:e.target.value})}}
                                />
                                {passwordMessage ? <div style={{color:'red'}}>{passwordMessage}</div> : <br/>}
                                <div className="create-form-input-header">
                                    Display Name
                                </div>
                                {displaynameMessage ? <div style={{color:'red'}}>{displaynameMessage}</div> : <br/>}
                                <input className='create-form-input' type="text" name="displayname"
                                    placeholder="First Last" value={this.state.displayName}
                                    onChange={(e)=>{this.setState({displayName:e.target.value})}}
                                />
                                <br/>
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
