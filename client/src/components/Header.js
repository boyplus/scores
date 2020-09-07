import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './styles/header.css';

class Header extends React.Component {
    async componentDidMount() {
        await this.props.fetchUser();
    }
    async logout() {
        await this.props.logout();
    }
    getClass(e) {
        return e === this.props.route.route ? 'link active' : 'link';
    }
    renderProfile() {
        if (this.props.auth) {
            return (
                <div style={{ display: 'flex' }}>
                    <div style={{ padding: '8px' }}>
                        Hello, {this.props.auth.name}
                    </div>

                    <Link
                        to="/admin/rooms"
                        className={this.getClass('/admin/rooms')}
                    >
                        <i className="bookmark icon"></i> Rooms
                    </Link>

                    <Link
                        to="/admin/students"
                        className={this.getClass('/admin/students')}
                    >
                        <i className="users icon"></i> Students
                    </Link>

                    <div className="link" onClick={() => this.logout()}>
                        <i className="sign-out icon"></i> Logout
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{ display: 'flex' }}>
                    <Link to="/login" className={this.getClass('/login')}>
                        <i className="sign-in icon"></i> <span>Login</span>
                    </Link>
                    <div className="link">
                        <span>Register</span>
                    </div>
                </div>
            );
        }
    }
    render() {
        return (
            <div className="nav">
                <Link to="/" className={this.getClass('/')}>
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
        route: state.route,
    };
}

export default connect(mapStateToProps, actions)(Header);
