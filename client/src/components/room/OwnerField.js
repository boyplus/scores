import React from 'react';
import '../styles/room.css';

class OwnerField extends React.Component {
    renderRemove() {
        if (this.props.adminID !== this.props.owner._id) {
            return (
                <i
                    className="close icon"
                    style={{ padding: '0 10px', color: 'whitesmoke' }}
                ></i>
            );
        } else {
            return null;
        }
    }
    render() {
        return (
            <div key={this.props.owner._id}>
                <div className="ui teal large label">
                    <div className="ownerLabel">
                        <h4 style={{ margin: '0' }}>{this.props.owner.name}</h4>
                        {this.renderRemove()}
                    </div>
                </div>
            </div>
        );
    }
}

export default OwnerField;
