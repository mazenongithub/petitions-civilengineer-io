import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { headerIcon, spinngingIcon } from './svg'

class Landing extends Component {
    splash() {
        return (
            <div className="general-container alignCenter">
                <button className="general-button spinning-button" alt="spinning button">{spinngingIcon()} </button>
            </div>
        )
    }
    viewmenu() {
        let userid = this.props.myusermodel.userid;
        return (<div className="general-flex">
            <div className="flex-1">

                <div className="general-container alignCenter regularFont landing-menu">
                    <Link to={`/${userid}/petitions`} className="general-link regularFont">/{userid}/petitions</Link>
                </div>

                <div className="general-container alignCenter regularFont landing-menu">
                    <Link to={`/users/viewpetitions`} className="general-link regularFont">/users/viewpetitions</Link>
                </div>

            </div>
        </div>)
    }

    landing() {
        return (
            <div className="general-flex">
                <div className="flex-1 regularFont alignCenter">
                    Join to Create a Petition, View and Support Other Petitions
            </div>
            </div>
        )
    }
    handleLanding() {
        if (this.props.myusermodel) {

            if (this.props.myusermodel.hasOwnProperty("userid")) {
                return (this.viewmenu())
            } else if (this.props.myusermodel.hasOwnProperty("message")) {
                return (this.landing())
            } else {
                return (this.splash())
            }
        }
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
    render() {

        return (this.handleLanding())
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers
    }
}

export default connect(mapStateToProps, actions)(Landing);