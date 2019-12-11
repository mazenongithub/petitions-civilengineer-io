import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';

class ViewProfile extends Component {
    render() {
        return (<div>My Petitions</div>)
    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel
    }
}

export default connect(mapStateToProps, actions)(ViewProfile);