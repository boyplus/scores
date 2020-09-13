import React from 'react';

import axios from '../../axios/axios';
import OwnerField from './OwnerField';
import AddOwnerModal from './AddOwnerModal';
import '../styles/room.css';

class RoomConfig extends React.Component {
    state = { name: '', displayModal: false, loading: false };
    componentDidMount() {
        this.setState({ name: this.props.room.name });
    }
    changeName(e) {
        this.setState({ name: e.target.value });
    }
    closeModal = () => {
        this.setState({ displayModal: false });
    };
    openAddModal() {
        this.setState({ displayModal: true });
    }
    getDisabled() {
        return this.state.loading ? 'disabled' : '';
    }
    renderOwners() {
        const owners = this.props.room.detailedOwners;
        const ownerJsx = owners.map((owner) => {
            return (
                <OwnerField
                    roomID={this.props.room._id}
                    adminID={this.props.adminID}
                    owner={owner}
                    key={owner._id}
                    updateRoom={this.props.updateRoom}
                ></OwnerField>
            );
        });
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {ownerJsx}
                <div
                    style={{ padding: '0 7px 7px 0' }}
                    onClick={() => this.openAddModal()}
                >
                    <div className="ui blue large label addOnwerButton">
                        <div className="ownerLabel">
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
                    updateRoom={this.props.updateRoom}
                ></AddOwnerModal>
            );
        } else {
            return null;
        }
    }
    async delete() {
        this.setState({ loading: true });
        // await axios.delete(`/room/${this.props.room._id}`);

        this.setState({ loading: false });
    }
    async save() {
        this.setState({ loading: true });
        const body = { name: this.state.name };
        await axios.patch(`/room/${this.props.room._id}`, body);
        await this.props.updateRoom(this.props.room._id);
        this.setState({ loading: false });
        this.props.closeConfig();
    }
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
                            value={this.state.name}
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
                                className={`ui red button ${this.getDisabled()}`}
                                onClick={() => this.delete()}
                                style={{ margin: '0 5px' }}
                            >
                                <i className="trash alternate outline icon"></i>
                                Delete
                            </button>
                            <button
                                type="submit"
                                className={`ui positive button ${this.getDisabled()}`}
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
