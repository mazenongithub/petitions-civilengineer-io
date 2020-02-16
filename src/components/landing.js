import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { headerIcon, spinngingIcon } from './svg';
import Petition from './petition';
import Profile from './profile';

class Landing extends Component {

    showlanding() {
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

        return (<div className="general-flex" key={petition.petitionid}>
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

        const petition = new Petition();
        const myuser = petition.getuser.call(this);
        const landing = () => {
            if (myuser) {
                return (<Profile />)
            } else {
                return (this.showlanding())
            }
        }





        return (landing())
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers
    }
}

export default connect(mapStateToProps, actions)(Landing);