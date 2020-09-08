import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../axios/axios';
import Loading from '../Loading';
import RoomCard from './RoomCard';
import * as actions from '../../actions';

class Landing extends React.Component {
    state = { rooms: [] };
    async componentDidMount() {
        this.props.updateRoute(this.props.match.path);
        const res = await axios.get('/allRooms');
        this.setState({ rooms: res.data });
    }

    renderRooms() {
        if (this.state.rooms.length === 0) {
            return <Loading></Loading>;
        }
        const rooms = this.state.rooms.map((room) => {
            return (
                <RoomCard
                    room={room}
                    key={room._id}
                    history={this.props.history}
                ></RoomCard>
            );
        });
        return <div className="row">{rooms}</div>;
    }
    renderAddRoom() {
        if (this.props.auth) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '50px',
                    }}
                >
                    <Link to="/new/room">
                        <button className="ui primary button">
                            Add New Room
                        </button>
                    </Link>
                </div>
            );
        }
        return null;
    }
    render() {
        return (
            <div>
                <h1 style={{ paddingTop: '10px', fontWeight: 'bold' }}>
                    Rooms
                </h1>
                {this.renderRooms()}
                {this.renderAddRoom()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(Landing);
