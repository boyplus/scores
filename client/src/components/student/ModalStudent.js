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
        console.log('save')
        const { name, score, _id } = this.state;
        const body = { name, score };
        const res = await axios.patch(`/student/${_id}`, body);
        if (res.status === 200) {
            await this.props.updateRoom(this.props.roomID);
            this.props.onDisMiss();
        }
    }

    async delete() {
        console.log('delete');
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
                        <h1 style={{ textAlign: 'center' }}>
                            Student Settings
                        </h1>
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
                            Delete
                        </button>
                        <button
                            type="submit"
                            className="ui positive button"
                            onClick={(e) => this.save(e)}
                            style={{ margin: '0 5px' }}
                        >
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
