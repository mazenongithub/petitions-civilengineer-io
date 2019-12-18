import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { headerIcon, spinngingIcon } from './svg';


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
                <div className="flex-1 regularFont">

                    <div className="general-flex">
                        <div className="flex-1 regularFont constrain-landing">
                            The Petitions App was created to defend your rights.
                            Easily Create a Petition. View Petitions. Support Petitions.
                            Comments to Support a petition.
                        </div>
                    </div>

                    <div className="general-flex">
                        <div className="flex-1 regularFont constrain-landing">
                            Here is A List of the Most Recent Petitions. We need your support
                        </div>
                    </div>


                    {this.searchresults()}

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
                    {this.showsearchresults()}


                </div>
            </div>)
    }
    getallpetiions() {
        let petitions = [];
        if (this.props.allusers) {
            let allusers = this.props.allusers;
            if (allusers.hasOwnProperty("myuser")) {
                let myusers = allusers.myuser;
                // eslint-disable-next-line
                myusers.map(myuser => {

                    if (myuser.hasOwnProperty("petitions")) {

                        // eslint-disable-next-line
                        myuser.petitions.petition.map(petition => {
                            petitions.push(petition)
                        })
                    }
                })
            }

        }
        return petitions;
    }

    getuserbypetitionid(petitionid) {
        let user = "";
        if (this.props.allusers) {

            if (this.props.allusers.hasOwnProperty("myuser")) {
                // eslint-disable-next-line
                let myusers = this.props.allusers.myuser;
                // eslint-disable-next-line
                myusers.map(myuser => {
                    if (myuser.hasOwnProperty("petitions")) {
                        // eslint-disable-next-line
                        myuser.petitions.petition.map(petition => {
                            if (petition.petitionid === petitionid) {
                                user = `${myuser.firstname} ${myuser.lastname}`
                            }
                        })
                    }
                })
            }
        }
        return user;
    }
    formatpetition(petition) {

        return (<div className="general-flex">
            <div className="flex-1 constrain-landing">
                <Link to={`/petitions/${petition.petitionid}`} className="general-link">
                    <div className="regularFont alignCenter">
                        {`${process.env.REACT_APP_CLIENT_API}/petitions/${petition.petitionid}`}
                    </div>
                    <div className="regularFont alignCenter constrain-landing">
                        {petition.petition}
                    </div>
                    <div className="regularFont alignCenter constrain-landing">
                        by {this.getuserbypetitionid(petition.petitionid)}
                    </div>
                </Link>
            </div>
        </div>)


    }
    searchresults() {
        let allpetitions = this.getallpetiions();
        let searchresults = [];
        if (allpetitions.length > 0) {
            // eslint-disable-next-line
            allpetitions.map(petition => {
                searchresults.push(this.formatpetition(petition))
            })
        }
        return searchresults;

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