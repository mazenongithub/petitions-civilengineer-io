import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { headerIcon } from './svg'

class Header extends Component {


    handlerightheader() {
        if (this.props.myusermodel) {
            let userid = this.props.myusermodel.userid;
            if (this.props.myusermodel.hasOwnProperty("message")) {
                return (
                    <Link to={`/users/register`} className="general-link regularFont">/users/register</Link>)
            } else if (this.props.myusermodel.hasOwnProperty("userid")) {
                const url = `${process.env.REACT_APP_SERVER_API}/users/${userid}/logout`;
                return (<a href={url} className="general-link regularFont"> logout </a>)

            } else {
                return;
            }
        }


    }
    handleleftheader() {
        if (this.props.myusermodel) {
            let userid = this.props.myusermodel.userid;
            if (this.props.myusermodel.hasOwnProperty("message")) {
                return;
            } else if (this.props.myusermodel.hasOwnProperty("userid")) {

                return (<Link to={`/${userid}/profile`} className="general-link regularFont"> /{userid} </Link>)

            } else {
                return;
            }
        }


    }
    render() {

        return (
            <div className="general-flex">
                <div className="flex-1">



                    <div className="general-flex">
                        <div className="flex-1">
                            {headerIcon()}
                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 regularFont showBorder alignCenter">
                            {this.handleleftheader()}
                        </div>
                        <div className="flex-1 regularFont showBorder alignCenter">
                            <Link to={`/`} className="general-link regularFont">
                                /
                            </Link>

                        </div>
                        <div className="flex-1 regularFont showBorder alignCenter">
                            {this.handlerightheader()}
                        </div>
                    </div>


                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel
    }
}

export default connect(mapStateToProps, actions)(Header);