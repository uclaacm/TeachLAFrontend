import React from 'react';
import LoginPage from './login';
import EditorPage from './editor';
import '../styles/app.css'
class App extends React.Component {

  render() {
    return (
      <div className="App">
        <LoginPage></LoginPage>
        <EditorPage></EditorPage>
      </div>
    );
  }
}

export default App;
