import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router';
import {Home} from './home.js';
import {User} from './User/user.js';
import {Login} from './Login/login';

class App extends React.Component{

  constructor(props){
    super(props);
    this.myUser = new User();
  }
  
  render(){
    return (
      <div className="App">
        <div id="MainGrid">
          <div id="header">
            <header className="App-header">
              <div className="App-title" id="App-Title">
                <h2>Hero Storm</h2> Powered By React
              </div>
              <img src={logo} className="App-logo" id="App-Logo" alt="logo" />
            </header>
          </div>
          <div id="App-Body">
            <BrowserRouter>
              <Route exact path="/" render={()=>(<Home user={this.myUser}></Home>)}>
              </Route>
              <Route path="/login" render={()=>(<Login></Login>)}>
              </Route>
            </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
