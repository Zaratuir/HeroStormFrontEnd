import React,{Component} from 'react';
import {Redirect} from 'react-router';

export class Home extends Component{
    constructor(props){
        super(props);
        this.user = this.props.user;
    }

    render(){
        var internals;
        if(!this.user.getLoggedIn()){
            internals = <Redirect to="/login"></Redirect>
        } else {
            internals = "Welcome to the Home Page";
        }
        return(<div>{internals}</div>);
    }
}

export default Home;