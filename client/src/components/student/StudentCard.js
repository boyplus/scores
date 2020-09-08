import React from 'react';
import '../styles/student.css';

class StudentCard extends React.Component {
    render() {
        return (
            <div className="col-lg-3 col-sm-6" style={{ padding: '20px' }}>
                <div className="studentCard">
                    <h1 className="studentName">{this.props.student.name}</h1>
                    <h3 className="studentScore">
                        Score: {this.props.student.score}
                    </h3>
                </div>
            </div>
        );
    }
}

export default StudentCard;
