import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Header from './Header';
import Landing from './Landing/Landing';
import Room from './room/Room';
const ENDPOINT = 'http://127.0.0.1:5000';

class App extends React.Component {
    state = { number: '' };
    componentDidMount() {
        const socket = socketIOClient(ENDPOINT);
        socket.on('new-number', (data) => {
            console.log(data);
            this.setState({ number: data });
        });
    }
    increase() {
        const socket = socketIOClient(ENDPOINT);
        socket.emit('increase', 1);
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header></Header>
                    <Route exact path="/" component={Landing}></Route>
                    <Route path="/room/:id" component={Room}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
