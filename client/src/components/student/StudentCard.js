import React from 'react';
import axios from '../../axios/axios';
import '../styles/student.css';

class StudentCard extends React.Component {
    renderIcon() {
        if (this.props.isOwn) {
            return (
                <div style={{ fontSize: '23px' }}>
                    <i
                        className="plus square icon myIcon"
                        onClick={() => this.inc()}
                    ></i>
                    <i
                        className="minus square icon myIcon"
                        onClick={() => this.dec()}
                    ></i>
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
    render() {
        return (
            <div className="col-lg-3 col-sm-6" style={{ padding: '20px' }}>
                <div className="studentCard">
                    <div>
                        <h1 className="studentName">
                            {this.props.student.name}
                        </h1>
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
            </div>
        );
    }
}

export default StudentCard;
