import React from 'react';

class Room extends React.Component {
    state = { room: null };
    componentDidMount() {
        this.setState({ room: this.props.match.params.id });
    }
    render() {
        return (
            <div>
                <h1>This is room number {this.state.room}</h1>
            </div>
        );
    }
}

export default Room;
