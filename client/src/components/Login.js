import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './styles/login.css';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        usernameErr: '',
        passwordErr: '',
        loading: false,
    };
    componentDidMount() {
        this.props.updateRoute(this.props.match.path);
        this.username.focus();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.password !== this.state.password) {
            this.validatePassword();
        }
        if (prevState.username !== this.state.username) {
            this.validateUsername();
        }
    }
    validateUsername() {
        if (this.state.username.length === 0) {
            this.setState({ usernameErr: 'Username is required' });
        } else {
            this.setState({ usernameErr: '' });
        }
    }
    validatePassword() {
        if (this.state.password.length === 0) {
            this.setState({ passwordErr: 'Password is required' });
        } else {
            this.setState({ passwordErr: '' });
        }
    }
    validation() {
        this.validateUsername();
        this.validatePassword();
    }
    canSubmit() {
        return (
            this.state.usernameErr.length === 0 &&
            this.state.passwordErr.length === 0 &&
            this.state.username.length > 0 &&
            this.state.password.length > 0
        );
    }
    async login(e) {
        e.preventDefault();
        this.validation();
        if (this.canSubmit()) {
            this.setState({ loading: true });
            await this.props.login(
                this.state.username,
                this.state.password,
                this.props.history
            );
            this.setState({ loading: false });
        }
    }

    renderLoginFailed() {
        if (this.props.auth === 'failed') {
            return (
                <div className="errorText">
                    Your username or password is wrong.
                </div>
            );
        } else {
            return null;
        }
    }

    getDisabled() {
        if (this.state.loading) return 'disabled';
        return '';
    }

    changeUsername(e) {
        this.setState({ username: e.target.value });
    }
    changePassword(e) {
        this.setState({ password: e.target.value });
    }
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="loginCard">
                    <h1 style={{ textAlign: 'center' }}>Mentor Login Page</h1>
                    <form onSubmit={(e) => this.login(e)} className="loginForm">
                        <div className="ui input">
                            <input
                                type="text"
                                placeholder="Username"
                                ref={(input) => {
                                    this.username = input;
                                }}
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

                        {this.renderLoginFailed()}

                        <div
                            style={{
                                display: 'flex',
                                marginTop: '15px',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <button
                                className={`ui primary button ${this.getDisabled()}`}
                                type="submit"
                                onClick={(e) => this.login(e)}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, actions)(Login);
