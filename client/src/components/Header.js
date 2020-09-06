import React from 'react';
import axios from 'axios';
import './styles/header.css';

class Header extends React.Component {
    async componentDidMount() {
        // const token = localStorage.getItem('jwt');
        // axios.defaults.headers.common = {
        //     Authorization: `Bearer ${token}`,
        // };
        // try {
        //     const admin = await axios.get('/api/admin/profile');
        //     console.log(admin);
        // } catch (err) {
        //     console.log('You are not logged in');
        // }
    }
    renderProfile() {
        
    }
    render() {
        return (
            <div className="nav">
                {this.renderProfile()}
                <div>hello</div>
            </div>
        );
    }
}

export default Header;
