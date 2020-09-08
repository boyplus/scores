import React from 'react';
import axios from '../../axios/axios';
import Loading from '../Loading';
import StudentCard from '../student/StudentCard';
import { Link } from 'react-router-dom';
import '../styles/room.css';

class Room extends React.Component {
    state = { room: null };
    async componentDidMount() {
        const id = this.props.match.params.id;
        const res = await axios.get(`/room/${id}`);
        this.setState({ room: res.data });
    }
    renderTitle() {
        if (this.state.room) {
            return (
                <di id="roomTitle">
                    <div>
                        <Link to="/">
                            <h2>Rooms&nbsp;>>&nbsp;</h2>
                        </Link>
                    </div>
                    <div>
                        <h1 style={{ fontWeight: 'bold' }}>
                            &nbsp;{this.state.room.name}
                        </h1>
                    </div>
                </di>
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

export default Room;
