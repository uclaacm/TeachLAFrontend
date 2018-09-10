import React from 'react';
import {RingLoader} from 'react-spinners'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import SHA256 from 'crypto-js/sha256'
import Filter from 'bad-words'
import Footer from './common/Footer.js'
import '../styles/CreateUser.css'
import {
    MINIMUM_USERNAME_LENGTH,
    MINIMUM_PASSWORD_LENGTH,
    MAXIMUM_USERNAME_LENGTH,
    MAXIMUM_PASSWORD_LENGTH,
} from '../constants';

const filter = new Filter();

class CreateUser extends React.Component {
  /**
   * constructor - sets initial state and props
   * @param {Object} props - properties passed down by the super component
   */
  constructor(props){
    super(props)
    this.state= {
      username:"",
      password:"",
      errorMessage:"",
      waiting:false,
      message:null,
      usernameMessage:null,
      passwordMessage:null,
      displaynameMessage:null,
    }
  }

  /**
   * checkInputs - validates username and password.
   * The criteria checked:
   *    -Username length: as defined in constants file
   *    -Username characters: only alphanumeric characters, plus !@#$%
   *    -Username profanity: please see bad-words package
   *    -Password length: as defined in constants file
   *    -Password characters: only alphanumeric characters, plus !@#$%
   * @return {boolean} badInputs - indicates whether any of the inputs given do
   * not fall within the criteria above
   */
  checkInputs = () => {
    const {username, password,} = this.state
    let badInputs = false

    //if username is too long, too short, has non ascii and some special characters, or has profanity in it, reject it
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

    //if password is too long, too short, has non ascii and some special characters, reject it
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

    return badInputs
  }

  /**
   * createUserSketches - initializes sample sketches in firestore for the user.
   * This function is intended for use only on user creation, as it makes an implicit
   * assumption that the user is currently signed in, as is guaranteed on user creation.
   */
  createUserSketches = () => {
    let uid = firebase.auth().currentUser.uid
    if(firebase.auth().currentUser.uid){
      // set general fields of user in firestore
      let displayName = firebase.auth().currentUser.displayName
      this.props.firestore.doc(`users/${uid}`).set({
        displayName: (displayName ? displayName : ''),
        uid: uid
      })
      // create template sketches and initialize their fields
      const sketchTemplates = new Map([
        ["Python", 'print("Hello World!")'],
        ["Javascript", 'console.log("Hello World!")'],
        ["Java", 'System.out.println("Hello World!")'],
        ["HTML", "<html><head></head><body><div style='width: 100px; height: 100px; background-color: black'></div></body></html>"],
        ["C++", 'std::cout << "Hello World!" << std::endl'],
        ["Processing", "void setup(){} void draw(){}"]
      ])
      sketchTemplates.forEach((code, name) => {
        this.props.firestore.doc(`users/${uid}/programs/${name}`).set({
          language: name,
          title: `my_first_${name.toLowerCase()}_sketch`,
          creationDate: new Date(Date.now()),
          lastModified: new Date(Date.now()),
          code: code
        })
      })
    }
  }


  /**
  * submit - this function executes on the click of the button to create a new user on the
  * createUser page
  * @param  {HTMLElement} e - solely used to prevent default page behavior on the clicking
  * of the button
  * @return {void}   submit returns early if the inputs passed by a prospective user
  * are bad.
  */
  submit = (e) => {
    e.preventDefault()
    const {username, password} = this.state

    let badInputs = this.checkInputs()

    //if we found any bad inputs, don't try to create the user on the server
    if(badInputs){
        return
    }

    this.setState({waiting:true, message:null})

    let content = {
        uid: SHA256(username).toString(),
        password: SHA256(password).toString(),
    }

    // This is part of the firebase email/password workaround.
    // We create an email lookalike to trick firebase into thinking the user
    // signed up with an email, instead of a username, display name, and password
    let email = String(content.uid) + "@fake.com"

    // regiser user in firebase
    firebase.auth().createUserWithEmailAndPassword(email, content.password).then((user) => {
      // initialize user sketches on successful account creation
      this.createUserSketches()
    }).catch((error) => {
        console.log(error.message)
        this.setState({waiting:false, errorMessage:error.message})
    })
  }

  renderInputs = () => (
    <div className="create-form-input-list" style={{width:"460px"}}>
      <div className="create-form-input-header">
        Username
      </div>
      <input className="create-form-input" type="text" name="username"
        placeholder="" value={this.state.username}
        onChange={(e)=>{this.setState({username:e.target.value})}}
      />
      {this.state.usernameMessage ? <div style={{color:'red', fontSize:'0.8em'}}>{this.state.usernameMessage}</div> : <br/>}
      <div className="create-form-input-header">Password</div>
      <input className='create-form-input' type="password" name="password"
        placeholder="" value={this.state.password}
        onChange={(e)=>{this.setState({password:e.target.value})}}
      />
      {this.state.passwordMessage ? <div style={{color:'red', fontSize:'0.8em'}}>{this.state.passwordMessage}</div> : <br/>}
    </div>
  )

  renderModal = () => {
    const modal = {
      container:{
        fontFamily: "'Josefin Slab', sans-serif",      /*font for the whole create page*/
        marginTop: "2%",                      /*modal distance from top of the screen*/
        marginLeft: "5%",                     /*modal distance from left side of the screen*/
        width:"50%",
      },
      form: {
        display: "flex",
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"center",
        padding: "15px",
        color: "#dddcdf",
        backgroundColor: "#272134",
      },
      header: { fontSize: "3em", fontWeight: "bold", marginBottom: "10px", },


    }
    return (
      <div className='create-modal' style={modal.container}>
        <form style={modal.form} onSubmit={this.submit}>
          <div style={modal.header}>
            Create a new account
          </div>
          {this.renderInputs()}
          <RingLoader color={'#171124'} size={50} loading={this.state.waiting}/>
          {this.state.errorMessage ? <div style={{color:'red'}}>{this.state.errorMessage}</div> : <span/>}
          {this.renderButton()}
          <Link to="/login" className="create-form-link">
            Already have an account? Click here to log in
          </Link>
        </form>
      </div>
    )
  }

  renderButton = () => {
    const buttonStyle = {
      border: "0px",
      borderRadius: "5px",
      fontFamily: "'Josefin Slab', sans-serif",
      fontSize: "1.3rem",
      color: "#dddcdf",
      backgroundColor: "#857e8f",
      height: "40px",
    }

    return (
      <button style={buttonStyle} type="submit">
        Create Account
      </button>
    )
  }

	render() {
		//if we haven't checked if the user is logged in yet, show a loading screen
		return (
      <div style={{margin: "0px",}}>
        <div className='create-page-content'>
          {this.renderModal()}
        </div>
        <Footer/>
      </div>
		);
	}
}

export default CreateUser;
