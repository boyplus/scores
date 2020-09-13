import React from 'react';
import { createPortal } from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { Dropdown } from 'semantic-ui-react';
import Loading from '../Loading';

import axios from '../../axios/axios';

import '../styles/ownerModal.css';

class AddOwnerModal extends React.Component {
    state = { selected: null, admins: [], loading: false };
    async componentDidMount() {
        document.getElementById('root').style.filter = 'blur(8px)';
        document.getElementById('root').style.transition = '0.25s';
        const res = await axios.get(`/room/${this.props.roomID}/otherAdmin`);
        const admins = res.data.map(({ _id, name }) => {
            return { key: _id, value: _id, text: name };
        });
        this.setState({ admins });
    }

    componentWillUnmount() {
        document.getElementById('root').style.filter = 'blur(0px)';
        document.getElementById('root').style.transition = '0.25s';
    }
    getAdmin(e, value) {
        this.setState({ selected: value });
    }
    async save() {
        const body = { owner: this.state.selected };
        this.setState({ loading: true });
        await axios.patch(`/room/${this.props.roomID}`, body);
        await this.props.updateRoom(this.props.roomID);
        this.setState({ loading: false });
        this.props.onDisMiss();
    }
    renderSelect() {
        if (this.state.admins.length === 0) return <Loading></Loading>;
        return (
            <Dropdown
                placeholder="Select gender"
                fluid
                selection
                options={this.state.admins}
                onChange={(e, { value }) => this.getAdmin(e, value)}
            ></Dropdown>
        );
    }
    getSaveClass() {
        if (this.state.selected === null || this.state.loading)
            return 'disabled';
        return '';
    }
    renderAction() {
        if (this.state.admins.length === 0) return null;
        return (
            <div
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <button
                    className={`ui positive button ${this.getSaveClass()}`}
                    style={{ margin: '0 5px' }}
                    onClick={(e) => this.save(e)}
                >
                    <i className="save outline icon"></i>
                    Save
                </button>
            </div>
        );
    }
    render() {
        return createPortal(
            <OutsideClickHandler onOutsideClick={() => this.props.onDisMiss()}>
                <div className="ownerModal">
                    <div className="closeIcon">
                        <i
                            className="close icon"
                            onClick={() => this.props.onDisMiss()}
                        ></i>
                    </div>
                    <h1 style={{ textAlign: 'center', margin: '0' }}>
                        Add new Owner
                    </h1>

                    <div style={{ marginTop: '20px' }}>
                        {this.renderSelect()}
                    </div>

                    {this.renderAction()}
                </div>
            </OutsideClickHandler>,

            document.querySelector('#addOwnerModal')
        );
    }
}

export default AddOwnerModal;
