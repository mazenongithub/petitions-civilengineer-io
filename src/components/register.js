import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';

class Register extends Component {
    render() {
        return (<div>Register </div>)
    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel
    }
}

export default connect(mapStateToProps, actions)(Register);