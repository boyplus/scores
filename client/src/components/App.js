import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import * as actions from '../actions';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Landing from './Landing/Landing';
import Room from './room/Room';
import NewRoom from './room/NewRoom';
import NewStudent from './student/NewStudent';

import './style.css';
const ENDPOINT = 'http://127.0.0.1:5000';

class App extends React.Component {
    async componentDidMount() {}
    render() {
        return (
            <BrowserRouter>
                <div className="ui container">
                    <Header></Header>
                    <Route exact path="/" component={Landing}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route exact path="/room/:id" component={Room}></Route>
                    <Route path="/new/room" component={NewRoom}></Route>
                    <Route
                        path="/new/student/:id"
                        component={NewStudent}
                    ></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);
