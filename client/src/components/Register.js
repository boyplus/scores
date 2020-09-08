import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './styles/login.css';
import axios from '../axios/axios';

class Register extends React.Component {
    state = {
        name: '',
        username: '',
        password: '',
        nameErr: '',
        usernameErr: '',
        passwordErr: '',
    };
    componentDidMount() {
        this.props.updateRoute(this.props.match.path);
        this.name.focus();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.name !== this.state.name) this.validateName();
        if (prevState.username !== this.state.username) this.validateUsername();
        if (prevState.password !== this.state.password) this.validatePassword();
    }
    validateName() {
        if (this.state.name.length === 0)
            this.setState({ nameErr: 'Name is required' });
        else this.setState({ nameErr: '' });
    }
    validateUsername() {
        if (this.state.username.length === 0)
            this.setState({ usernameErr: 'Username is required' });
        else this.setState({ usernameErr: '' });
    }
    validatePassword() {
        if (this.state.password.length === 0)
            this.setState({ passwordErr: 'Password is required' });
        else this.setState({ passwordErr: '' });
    }
    validation() {
        this.validateName();
        this.validateUsername();
        this.validatePassword();
    }
    canSubmit() {
        return (
            this.state.nameErr.length === 0 &&
            this.state.usernameErr.length === 0 &&
            this.state.passwordErr.length === 0
        );
    }
    async register(e) {
        e.preventDefault();
        this.validation();
        if (this.canSubmit()) {
            const body = {
                name: this.state.name,
                username: this.state.username,
                password: this.state.password,
            };
            try {
                await axios.post('/admin', body);
                await this.props.login(
                    this.state.username,
                    this.state.password,
                    this.props.history
                );
            } catch (err) {}
        } else {
        }
    }
    changeUsername(e) {
        this.setState({ username: e.target.value });
    }
    changePassword(e) {
        this.setState({ password: e.target.value });
    }
    changeName(e) {
        this.setState({ name: e.target.value });
    }
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="loginCard">
                    <h1 style={{ textAlign: 'center' }}>Registration Page</h1>
                    <form onSubmit={(e) => this.login(e)} className="loginForm">
                        <div className="ui input">
                            <input
                                type="text"
                                placeholder="Name"
                                ref={(input) => {
                                    this.name = input;
                                }}
                                onChange={(e) => this.changeName(e)}
                            />
                        </div>
                        <div className="errorText">{this.state.nameErr}</div>

                        <div className="ui input" style={{ marginTop: '15px' }}>
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={(e) => this.changeUsername(e)}
                            />
                        </div>
                        <div className="errorText">
                            {this.state.usernameErr}
                        </div>

                        <div className="ui input" style={{ marginTop: '15px' }}>
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => this.changePassword(e)}
                            />
                        </div>

                        <div className="errorText">
                            {this.state.passwordErr}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                marginTop: '15px',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <button
                                className="ui primary button"
                                type="submit"
                                onClick={(e) => this.register(e)}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Register);
