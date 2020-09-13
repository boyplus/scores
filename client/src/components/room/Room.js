import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../axios/axios';
import Loading from '../Loading';
import StudentCard from '../student/StudentCard';
import RoomConfig from './RoomConfig';
import * as actions from '../../actions';
import '../styles/room.css';

class Room extends React.Component {
    state = { room: null, isOwn: false, check: false, config: false };
    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.fetchRoom(id);
    }
    fetchRoom = async (id) => {
        const res = await axios.get(`/room/${id}`);
        this.setState({ room: res.data });
    };
    async componentDidUpdate() {
        if (this.state.check === false) {
            if (this.props.auth) {
                const id = this.props.match.params.id;
                const res = await axios.get(`/isOwnRoom/${id}`);
                this.setState({ isOwn: res.data.isOwn, check: true });
            }
        }
    }
    config() {
        if (this.state.isOwn) {
            this.setState({ config: true });
        }
    }
    closeConfig = () => {
        this.setState({ config: false });
    };
    renderTitle() {
        if (!this.state.room) {
            return <Loading></Loading>;
        }
        let editing = null;
        if (this.state.isOwn) {
            editing = (
                <div style={{ marginLeft: '10px' }}>
                    <i className="edit icon"></i>
                </div>
            );
        }
        return (
            <div id="roomTitle">
                <div>
                    <Link to="/">
                        <h2>Rooms&nbsp;>>&nbsp;</h2>
                    </Link>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    className="roomEdit"
                    onClick={() => this.config()}
                >
                    <h1 style={{ fontWeight: 'bold', margin: '0' }}>
                        &nbsp;{this.state.room.name}
                    </h1>
                    {editing}
                </div>
            </div>
        );
    }
    renderComponent() {
        if (this.state.config && this.state.isOwn) {
            return (
                <RoomConfig
                    room={this.state.room}
                    adminID={this.props.auth._id}
                    updateRoom={this.fetchRoom}
                    closeConfig={this.closeConfig}
                ></RoomConfig>
            );
        } else {
            const students = this.renderStudent();
            return students;
        }
    }
    renderStudent() {
        if (this.state.room) {
            const students = this.state.room.students.map((student) => {
                return (
                    <StudentCard
                        roomID={this.props.match.params.id}
                        student={student}
                        isOwn={this.state.isOwn}
                        updateRoom={this.fetchRoom}
                        key={student._id}
                    ></StudentCard>
                );
            });
            const addStudent = this.renderAddStudent();
            return (
                <div>
                    <div className="row">{students}</div>
                    {addStudent}
                </div>
            );
        }
    }
    renderAddStudent() {
        if (this.state.isOwn) {
            const id = this.props.match.params.id;
            const path = `/new/student/${id}`;
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        margin: '50px 0',
                    }}
                >
                    <Link to={path}>
                        <button className="ui primary button">
                            Add New Student
                        </button>
                    </Link>
                </div>
            );
        } else {
            return null;
        }
    }
    render() {
        return (
            <div>
                {this.renderTitle()}
                {this.renderComponent()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, actions)(Room);
