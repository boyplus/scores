import React from 'react';
import '../styles/room.css';

class Room extends React.Component {
    state = { hover: false };
    toggleHover() {
        this.setState({ hover: !this.state.hover });
    }
    render() {
        let viewTextStyle = {
            color: 'white',
            transition: '0.25s',
            marginRight: '10px',
        };
        if (this.state.hover) {
            viewTextStyle.color = 'black';
        }
        return (
            <div
                className="col-lg-3 col-sm-6"
                style={{ padding: '20px' }}
                key={this.props.room._id}
                onMouseEnter={() => this.toggleHover()}
                onMouseLeave={() => this.toggleHover()}
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
                        <h4 style={viewTextStyle}>View Scorebard</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Room;
