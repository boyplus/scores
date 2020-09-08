import React from 'react';
import { connect } from 'react-redux';
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
    render() {
        return (
            <div>
                <h1 style={{ paddingTop: '10px', fontWeight: 'bold' }}>
                    Rooms
                </h1>
                {this.renderRooms()}
            </div>
        );
    }
}

export default connect(null, actions)(Landing);
