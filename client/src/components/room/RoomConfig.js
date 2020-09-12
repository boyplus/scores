import React from 'react';
import OwnerField from './OwnerField';

import '../styles/room.css';
import AddOwnerModal from './AddOwnerModal';

class RoomConfig extends React.Component {
    state = { name: '', displayModal: false };
    changeName(e) {
        this.setState({ name: e.target.value });
    }
    closeModal = () => {
        this.setState({ displayModal: false });
    };
    openAddModal() {
        this.setState({ displayModal: true });
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
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {ownerJsx}
                <div style={{ padding: '0 7px 7px 0' }}>
                    <div className="ui blue large label addOnwerButton">
                        <div
                            className="ownerLabel"
                            onClick={() => this.openAddModal()}
                        >
                            <h4 style={{ margin: '0' }}>Add new Owner</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    renderModal() {
        if (this.state.displayModal) {
            return (
                <AddOwnerModal
                    onDisMiss={() => this.closeModal()}
                    owners={this.props.room.detailedOwners}
                    roomID={this.props.room._id}
                ></AddOwnerModal>
            );
        } else {
            return null;
        }
    }
    async delete() {}
    async save() {}
    async back() {
        this.props.closeConfig();
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
                {this.renderModal()}
            </div>
        );
    }
}

export default RoomConfig;
