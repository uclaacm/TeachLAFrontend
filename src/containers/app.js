import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './login';
import EditorPage from './editor';
import '../styles/app.css'
class App extends React.Component {
  constructor(props){
  	super(props)
  }

  render() {
  	let {loggedIn} = this.props

    return (
      	<Router>
     		 <div className="App">
			    <Route exact path="/" render={() => (		{/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
					  loggedIn ? (
					    <Redirect to="/editor"/>
					  ) : (<LoginPage/>)	
					)}
				/>
			    <Route path="/login" render={() => (		{/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
					  loggedIn ? (
					    <Redirect to="/editor"/>
					  ) : (<LoginPage/>)	
					)}
			    />
			    <Route path="/editor" render={() => (		{/*if the user is not loggedIn, redirect them to the login page, otherwise, show the editor page*?*/}
					  !loggedIn ? (
					    <Redirect to="/login"/>
					  ) : (<EditorPage/>)	
					)}
			    />
			    <Route path="/test" component={EditorPage}/>
  			</div>
  		</Router>
    );
  }
}

export default App;
