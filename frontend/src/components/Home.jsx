import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 text-center">
                    Welcome {this.props.user.name.toUpperCase()}! <br /> Your email address is {this.props.user.email}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

export default connect(mapStateToProps)(Home);