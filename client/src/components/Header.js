import React from 'react';
import axios from 'axios';
class Header extends React.Component {
    async componentDidMount() {
        const token = localStorage.getItem('jwt');
        axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const admin = await axios.get('/api/admin/profile');
            console.log(admin);
        } catch (err) {
            console.log('You are not logged in');
        }
        
    }
    render() {
        return (
            <div>
                <h1>This is a header</h1>
            </div>
        );
    }
}

export default Header;
