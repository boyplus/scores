import React from 'react';

import axios from '../../axios/axios';
import '../styles/room.css';

class OwnerField extends React.Component {
    async delete() {
        const adminID = this.props.owner._id;
        const url = `/room/${this.props.roomID}/admin/${adminID}`;
        await axios.delete(url);
        await this.props.updateRoom(this.props.roomID);
    }
    renderRemove() {
        if (this.props.adminID !== this.props.owner._id) {
            return (
                <i
                    className="close icon"
                    style={{ padding: '0 10px', color: 'whitesmoke' }}
                    onClick={() => this.delete()}
                ></i>
            );
        } else {
            return null;
        }
    }
    render() {
        return (
            <div style={{ padding: '0 7px 7px 0' }} key={this.props.owner._id}>
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
