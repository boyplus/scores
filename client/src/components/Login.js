import React from 'react';
import './styles/login.css';

class Login extends React.Component {
    componentDidMount() {
        this.username.focus();
    }
    async login(e) {
        e.preventDefault();
        console.log('This is login');
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="loginCard">
                        <h1 style={{ textAlign: 'center' }}>
                            Mentor Login Page
                        </h1>
                        <form
                            onSubmit={(e) => this.login(e)}
                            className="loginForm"
                        >
                            <div className="ui input">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    ref={(input) => {
                                        this.username = input;
                                    }}
                                />
                            </div>
                            <div
                                className="ui input"
                                style={{ marginTop: '15px' }}
                            >
                                <input type="password" placeholder="Password" />
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
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
