import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import '../styles/login.css';
import axios from '../../axios/axios';

class NewRoom extends React.Component {
    state = { name: '', nameErr: '' };
    componentDidMount() {
        this.name.focus();
    }
    componentDidUpdate(prevProps, prevState) {
        if (!this.props.auth) this.props.history.push('/');
        if (prevState.name !== this.state.name) {
            this.validateName();
        }
    }
    validateName() {
        if (this.state.name.length === 0) {
            this.setState({ nameErr: 'Name is required' });
        } else {
            this.setState({ nameErr: '' });
        }
    }
    validation() {
        this.validateName();
    }
    canSubmit() {
        return this.state.nameErr.length === 0;
    }
    async newRoom(e) {
        e.preventDefault();
        this.validation();
        if (this.canSubmit()) {
            const id = this.props.match.params.id;
            const body = { name: this.state.name, room: id };
            const res = await axios.post('/student', body);
            if (res.status === 201) {
                this.props.history.push(`/room/${id}`);
            }
        }
    }
    changeName(e) {
        this.setState({ name: e.target.value });
    }
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '30px',
                }}
            >
                <div className="loginCard">
                    <h1 style={{ textAlign: 'center' }}>Add New Student</h1>
                    <form onSubmit={(e) => this.login(e)} className="loginForm">
                        <div className="ui input">
                            <input
                                type="text"
                                placeholder="Student name"
                                ref={(input) => {
                                    this.name = input;
                                }}
                                onChange={(e) => this.changeName(e)}
                            />
                        </div>

                        <div className="errorText">{this.state.nameErr}</div>

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
                                onClick={(e) => this.newRoom(e)}
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(NewRoom);
