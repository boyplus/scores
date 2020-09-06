import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing/Landing';
import Room from './room/Room';
import './style.css';
const ENDPOINT = 'http://127.0.0.1:5000';

class App extends React.Component {
    // state = { number: '' };
    // componentDidMount() {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on('new-number', (data) => {
    //         console.log(data);
    //         this.setState({ number: data });
    //     });
    // }
    // increase() {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.emit('increase', 1);
    // }

    async componentDidMount() {
        await this.props.fetchUser();
        console.log('fetch complete');
    }
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header></Header>
                    <Route exact path="/" component={Landing}></Route>
                    <Route path="/room/:id" component={Room}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);
