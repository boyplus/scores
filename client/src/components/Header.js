import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../axios/axios';
import * as actions from '../actions';
import './styles/header.css';

import history from '../history';
class Header extends React.Component {
    async componentDidMount() {
        console.log('Fetch user in header');
        await this.props.fetchUser();
    }
    async logout() {
        await this.props.logout();
    }
    go() {
        console.log(this.props);
        history.push('/room');
        console.log(history);
    }
    renderProfile() {
        if (this.props.auth) {
            return (
                <div style={{ display: 'flex' }}>
                    <div style={{ padding: '8px' }}>
                        Hello, {this.props.auth.name}
                    </div>
                    <div className="link" onClick={() => this.go()}>
                        My Rooms
                    </div>
                    <div className="link" onClick={() => this.logout()}>
                        Logout <i className="sign-out icon"></i>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{ display: 'flex' }}>
                    <Link to="/login" className="link">
                        Login <i className="sign-in icon"></i>
                    </Link>
                    <div className="link">Register</div>
                </div>
            );
        }
    }
    render() {
        return (
            <div className="nav">
                <Link to="/" className="link">
                    Score Board
                </Link>
                <div>{this.renderProfile()}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, actions)(Header);
