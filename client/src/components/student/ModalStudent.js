import React from 'react';
import { createPortal } from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import axios from '../../axios/axios';

import '../styles/modal.css';

class ModalStudent extends React.Component {
    state = { name: '', score: 0, _id: '' };
    componentDidMount() {
        this.name.focus();
        const { name, score, _id } = this.props.student;
        this.setState({ name, score, _id });
        document.getElementById('root').style.filter = 'blur(8px)';
        document.getElementById('root').style.transition = '0.25s';
    }

    componentWillUnmount() {
        document.getElementById('root').style.filter = 'blur(0px)';
        document.getElementById('root').style.transition = '0.25s';
    }

    async save() {
        const { name, score, _id } = this.state;
        const body = { name, score };
        try {
            await axios.patch(`/student/${_id}`, body);
            await this.props.updateRoom(this.props.roomID);
            this.props.onDisMiss();
        } catch (err) {}
    }

    async delete() {
        const { _id } = this.state;
        try {
            await axios.delete(`/student/${_id}`);
            await this.props.updateRoom(this.props.roomID);
            this.props.onDisMiss();
        } catch (err) {}
    }

    changeName(e) {
        this.setState({ name: e.target.value });
    }
    changeScore(e) {
        this.setState({ score: e.target.value });
    }
    render() {
        return createPortal(
            <OutsideClickHandler onOutsideClick={() => this.props.onDisMiss()}>
                <div className="studentModal">
                    <div>
                        <div className="closeIcon">
                            <i
                                className="close icon"
                                onClick={() => this.props.onDisMiss()}
                            ></i>
                        </div>
                        <h1 className="settingHeader">Student Settings</h1>
                    </div>
                    <form
                        className="ui form"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div className="field">
                            <label>Name</label>
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={(e) => this.changeName(e)}
                                ref={(input) => {
                                    this.name = input;
                                }}
                            ></input>
                        </div>

                        <div className="field">
                            <label>Score</label>
                            <input
                                type="text"
                                value={this.state.score}
                                onChange={(e) => this.changeScore(e)}
                            ></input>
                        </div>
                    </form>

                    <div className="studentActions">
                        <button
                            className="ui red button"
                            onClick={() => this.delete()}
                            style={{ margin: '0 5px' }}
                        >
                            <i className="trash alternate outline icon"></i>
                            Delete
                        </button>
                        <button
                            type="submit"
                            className="ui positive button"
                            onClick={(e) => this.save(e)}
                            style={{ margin: '0 5px' }}
                        >
                            <i className="save outline icon"></i>
                            Save
                        </button>
                    </div>
                </div>
            </OutsideClickHandler>,
            document.querySelector('#modalStudent')
        );
    }
}

export default ModalStudent;
