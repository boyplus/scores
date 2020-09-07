import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios/axios';
import Room from './Room';
import * as actions from '../../actions';

class Landing extends React.Component {
    state = { rooms: [] };
    async componentDidMount() {
        this.props.updateRoute(this.props.match.path);
        const res = await axios.get('/allRooms');
        this.setState({ rooms: res.data });
        console.log(res.data);
    }
    
    renderRooms() {
        const rooms = this.state.rooms.map((room) => {
            return <Room room={room}></Room>;
        });
        return <div className="row">{rooms}</div>;
    }
    render() {
        return (
            <div>
                <h1>Rooms</h1>
                {this.renderRooms()}
            </div>
        );
    }
}

export default connect(null, actions)(Landing);
