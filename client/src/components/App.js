import React from 'react';
import { Router, Route, BrowserRouter, Link, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import * as actions from '../actions';
import Header from './Header';
import Login from './Login';
import Landing from './Landing/Landing';
import Room from './room/Room';
import './style.css';
const ENDPOINT = 'http://127.0.0.1:5000';

class App extends React.Component {
    async componentDidMount() {}
    render() {
        return (
            <div className="ui container">
                <Header></Header>
                <Switch>
                    <Route exact path="/" component={Landing}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/room" component={Room}></Route>
                </Switch>
            </div>
        );
    }
}

export default connect(null, actions)(App);
