import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios/axios';

class Landing extends React.Component {
    state = { room: '', username: '', password: '' };
    roomChange = (e) => {
        this.setState({ room: e.target.value });
    };
    onSubmit = async () => {
        const body = {
            username: this.state.username,
            password: this.state.password,
        };
        const res = await axios.post('/admin/login', body);
        console.log(res);
    };
    fetchAdmin = async () => {
        const res = await axios.get('/admin/profile');
        console.log(res);
    };
    onLogout = async () => {
        await axios.post('/admin/logout');
        console.log('logout complete');
    };
    render() {
        return <div></div>;
    }
}

export default Landing;
