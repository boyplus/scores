import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios/axios';
import * as actions from '../../actions';

class Landing extends React.Component {
    componentDidMount() {
        this.props.updateRoute(this.props.match.path);
    }
    render() {
        return (
            <div>
                <h1>This is Landing</h1>
            </div>
        );
    }
}

export default connect(null, actions)(Landing);
