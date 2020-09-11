import React from 'react';
import OwnerField from './OwnerField';

import '../styles/room.css';

class RoomConfig extends React.Component {
    state = { name: '' };
    changeName(e) {
        this.setState({ name: e.target.value });
    }
    renderOwners() {
        const owners = this.props.room.detailedOwners;
        const ownerJsx = owners.map((owner) => {
            return (
                <OwnerField
                    owner={owner}
                    key={owner._id}
                    adminID={this.props.adminID}
                ></OwnerField>
            );
        });
        return (
            <div style={{ display: 'flex' }}>
                {ownerJsx}
                <div className="ui blue large label addOnwerButton">
                    <div className="ownerLabel">
                        <h4 style={{ margin: '0' }}>Add new Owner</h4>
                    </div>
                </div>
            </div>
        );
    }
    async delete() {}
    async save() {}
    async back() {
        await this.props.updateRoom(this.props.room._id);
        this.props.closeConfig();
        console.log('close complete');
    }
    render() {
        return (
            <div style={{ marginTop: '30px' }}>
                <form className="ui form" onSubmit={(e) => e.preventDefault()}>
                    <div className="field">
                        <label>Name</label>
                        <input
                            type="text"
                            value={this.props.room.name}
                            onChange={(e) => this.changeName(e)}
                        ></input>
                    </div>

                    <div className="field">
                        <label>Owners</label>
                        {this.renderOwners()}
                    </div>
                    <div className="roomConfigActions">
                        <div>
                            <button
                                className="ui button"
                                onClick={() => this.back()}
                            >
                                Back
                            </button>
                        </div>
                        <div>
                            <button
                                className="ui red button"
                                onClick={() => this.delete()}
                                style={{ margin: '0 5px' }}
                            >
                                <i className="trash alternate outline icon"></i>
                                Delete
                            </button>
                            <button
                                type="submit"
                                className="ui positive button"
                                onClick={(e) => this.save(e)}
                                style={{ margin: '0 5px' }}
                            >
                                <i className="save outline icon"></i>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default RoomConfig;
