import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';

class ViewPetition extends Component {
    render() {
        return (<div>View Petition</div>)
    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel
    }
}

export default connect(mapStateToProps, actions)(ViewPetition);