import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';

class ViewPetitions extends Component {
    render() {
        return (<div>View Petitions</div>)
    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel
    }
}

export default connect(mapStateToProps, actions)(ViewPetitions);