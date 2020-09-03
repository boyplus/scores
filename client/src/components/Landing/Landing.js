import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Landing extends React.Component {
    state = { room: '', username: '', password: '' };
    roomChange = (e) => {
        this.setState({ room: e.target.value });
    };
    async componentDidMount() {
        // const res = await axios.get('/api/admin/profile', { withCredentials: true });
        // console.log(res);
    }
    onSubmit = async () => {
        const body = {
            username: this.state.username,
            password: this.state.password,
        };
        const res = await axios.post('/api/admin/login', body);
        localStorage.setItem('jwt', res.data.token);
        const token = localStorage.getItem('jwt');

        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        const admin = await axios.get('/api/admin/profile');
        console.log(admin);
    };
    fetchAdmin = async () => {
        const res = await axios.get('/api/admin/profile');
        console.log(res);
    };
    onLogout = async () => {
        await axios.post('/api/admin/logout');
        console.log('logout complete');
    }
    render() {
        return (
            <div>
                <label>Username: </label>
                <input
                    type="text"
                    onChange={(e) => {
                        this.setState({ username: e.target.value });
                    }}
                ></input>
                <label>Password: </label>
                <input
                    type="password"
                    onChange={(e) => {
                        this.setState({ password: e.target.value });
                    }}
                ></input>
                <button onClick={this.onSubmit}>Login</button>
                <button onClick={this.fetchAdmin}>Get Profile</button>
                <button onClick={this.onLogout}>Logout</button>
                <label>Room Number: </label>
                <input
                    type="text"
                    onChange={(e) => {
                        this.roomChange(e);
                    }}
                    value={this.state.room}
                ></input>
                <button>
                    <Link to={`/room/${this.state.room}`}>Join Room</Link>
                </button>
            </div>
        );
    }
}

export default Landing;
