import React, {Component} from 'react';
import {loginController} from './loginController';
import './login.css';

export class Login extends Component{
    constructor(props){
        super(props);
        if(typeof this.props.loginController == "object" && typeof this.props.loginController.loginUser == "function"){
            this.loginController = this.props.loginController;
        } else {
            this.loginController = loginController;
        }
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateDisplayPassword = this.updateDisplayPassword.bind(this);
        this.state = {username:"",password:"",displayPassword:false,error:false,errorMessage:""};
        this.clickLogin = this.clickLogin.bind(this);
    }

    updateUsername(evt){
        this.setState({username:evt.target.value});
    }

    updatePassword(evt){
        this.setState({password:evt.target.value});
    }

    updateDisplayPassword(evt){
        this.setState({displayPassword:evt.target.checked});
    }

    clickLogin(evt){
        let user = {username:this.state.username,password:this.state.password};
        this.loginController.loginUser(user);
    }

    onSubmit(evt){
        evt.preventDefault();
        return null;
    }

    render(){
        var passType = this.state.displayPassword ? "text" : "password";
        return(
            <form onSubmit={this.onSubmit}>
                <div className={"error " + this.state.error} id="ErrorMessage"></div>
                <label className="textLabel" id="UsernameLabel">Username</label>
                <input className="textInput" id="UsernameInput" type="text" value={this.state.username} onChange={this.updateUsername}></input>
                <label className="textLabel" id="PasswordLabel">Password</label>
                <input className="passwordInput" id="PasswordInput" type={passType} value={this.state.password} onChange={this.updatePassword}></input>
                <label id="DisplayPasswordCheckbox"><input type="checkbox" onChange={this.updateDisplayPassword}></input> Show Password?</label>
                <input className="submitButton" id="LoginButton" type="submit" value="Login" onClick={this.clickLogin}></input>
            </form>
        );
    }
}