import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../axios/axios';
import Loading from '../Loading';
import StudentCard from '../student/StudentCard';
import * as actions from '../../actions';
import '../styles/room.css';

class Room extends React.Component {
    state = { room: null, isOwn: false };
    async componentDidMount() {
        const id = this.props.match.params.id;
        const res = await axios.get(`/room/${id}`);
        const res2 = await axios.get(`/isOwnRoom/${id}`);
        this.setState({ room: res.data, isOwn: res2.data.isOwn });
    }
    renderTitle() {
        if (this.state.room) {
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
                    >
                        <h1 style={{ fontWeight: 'bold', margin: '0' }}>
                            &nbsp;{this.state.room.name}
                        </h1>
                        {editing}
                    </div>
                </div>
            );
        } else {
            return <Loading></Loading>;
        }
    }
    renderStudent() {
        if (this.state.room) {
            const students = this.state.room.students.map((student) => {
                return (
                    <StudentCard
                        student={student}
                        key={student._id}
                    ></StudentCard>
                );
            });
            return <div className="row">{students}</div>;
        }
    }
    render() {
        return (
            <div>
                {this.renderTitle()}
                {this.renderStudent()}
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
