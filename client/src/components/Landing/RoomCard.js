import React from 'react';
import '../styles/room.css';

class RoomCard extends React.Component {
    state = { hover: false };
    toggleHover() {
        this.setState({ hover: !this.state.hover });
    }
    enterRoom(id) {
        this.props.history.push('/room/' + id);
    }
    render() {
        let viewTextStyle = {
            color: 'white',
            transition: '0.25s',
            marginRight: '10px',
        };
        if (this.state.hover) {
            viewTextStyle.color = 'whitesmoke';
        }
        return (
            <div
                className="col-lg-3 col-sm-6"
                style={{ padding: '20px' }}
                onMouseEnter={() => this.toggleHover()}
                onMouseLeave={() => this.toggleHover()}
                onClick={() => this.enterRoom(this.props.room._id)}
            >
                <div className="roomCard">
                    <h1 style={{ padding: '15px', color: 'white' }}>
                        {this.props.room.name}
                    </h1>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <h4 style={viewTextStyle}>View Score Board</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomCard;
