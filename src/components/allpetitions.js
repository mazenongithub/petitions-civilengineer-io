import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';

class AllPetitions extends Component {
    render() {
        return (<div>All Petitions</div>)
    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel
    }
}

export default connect(mapStateToProps, actions)(AllPetitions);