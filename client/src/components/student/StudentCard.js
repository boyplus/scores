import React from 'react';
import axios from '../../axios/axios';
import ModalStudent from './ModalStudent';
import '../styles/student.css';

class StudentCard extends React.Component {
    state = { displayModal: false };
    renderIcon() {
        if (this.props.isOwn) {
            return (
                <div style={{ fontSize: '23px' }}>
                    <i
                        className="plus square outline icon myIcon"
                        onClick={() => this.inc()}
                    ></i>
                    <i
                        className="minus square outline icon myIcon"
                        onClick={() => this.dec()}
                    ></i>
                </div>
            );
        } else {
            return null;
        }
    }
    closeModal() {
        this.setState({ displayModal: false });
    }
    showModal() {
        this.setState({ displayModal: true });
    }
    renderEdit() {
        if (this.props.isOwn) {
            return (
                <div className="editIcon" onClick={() => this.showModal()}>
                    <i className="edit icon"></i>
                </div>
            );
        } else {
            return null;
        }
    }
    async inc() {
        const body = { score: this.props.student.score + 1 };
        const id = this.props.student._id;
        await axios.patch(`/student/${id}`, body);
        this.props.updateRoom(this.props.roomID);
    }
    async dec() {
        const body = { score: this.props.student.score - 1 };
        const id = this.props.student._id;
        await axios.patch(`/student/${id}`, body);
        this.props.updateRoom(this.props.roomID);
    }
    renderModal() {
        if (this.state.displayModal) {
            return (
                <ModalStudent
                    student={this.props.student}
                    roomID={this.props.roomID}
                    onDisMiss={() => this.closeModal()}
                    updateRoom={this.props.updateRoom}
                ></ModalStudent>
            );
        } else {
            return null;
        }
    }
    render() {
        return (
            <div className="col-lg-3 col-sm-6" style={{ padding: '20px' }}>
                <div className="studentCard">
                    <div className="studentTitle">
                        <h1 style={{ margin: '0' }}>
                            {this.props.student.name}
                        </h1>
                        {this.renderEdit()}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h3 className="studentScore">
                            Score: {this.props.student.score}
                        </h3>
                        {this.renderIcon()}
                    </div>
                </div>
                {this.renderModal()}
            </div>
        );
    }
}

export default StudentCard;
