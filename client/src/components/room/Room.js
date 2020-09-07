import React from 'react';
import axios from '../../axios/axios';

class Room extends React.Component {
    state = { room: null };
    async componentDidMount() {
        const id = this.props.match.params.id;
        const res = await axios.get(`/room/${id}`);
        console.log(res.data);
        this.setState({ room: res.data });
    }
    renderTitle() {
        if (this.state.room) {
            return <h1>{this.state.room.name}</h1>;
        } else {
            return null;
        }
    }
    render() {
        return <div>{this.renderTitle()}</div>;
    }
}

export default Room;
