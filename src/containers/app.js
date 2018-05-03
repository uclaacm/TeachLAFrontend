import React from 'react';
import LoginPage2 from './login2';
import LoginPage from './login';
import EditorPage from './editor';
import '../styles/app.css'
class App extends React.Component {

  render() {
    return (
      <div className="App">
      	<LoginPage2></LoginPage2>
        <LoginPage></LoginPage>
        <EditorPage></EditorPage>
      </div>
    );
  }
}

export default App;
