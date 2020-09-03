import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
    state = { room: '' };
    roomChange = (e) => {
        this.setState({ room: e.target.value });
    };
    render() {
        return (
            <div>
                <label>Room Number: </label>
                <input
                    type="text"
                    onChange={(e) => { this.roomChange(e) }}
                    value={this.state.room}
                ></input>
                <button>
                    <Link to={`/room/${this.state.room}`}>Join Room</Link>
                </button>
            </div>
        );
    }
}

export default Landing;
