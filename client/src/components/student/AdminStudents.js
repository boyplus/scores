import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AdminStudents extends React.Component {
    componentDidMount() {
        this.props.updateRoute(this.props.match.path);
    }
    render() {
        return (
            <div>
                <h1>Your Students</h1>
            </div>
        );
    }
}

export default connect(null, actions)(AdminStudents);
