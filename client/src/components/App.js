import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
    async componentDidMount() {
        await this.props.fetchUser();
    }
    render() {
        return (
            <BrowserRouter>
                <div className="ui container">
                    <Header></Header>
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/" component={Landing}></Route>
                    <Route path="/room/:id" component={Room}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);
