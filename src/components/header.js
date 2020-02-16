import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { headerIcon } from './svg';
import Petition from './petition';

class Header extends Component {


    handlerightheader() {
        const petition = new Petition();
        const myuser = petition.getuser.call(this);
        if (myuser) {
            const url = `${process.env.REACT_APP_SERVER_API}/users/${myuser.userid}/logout`;
            return (<a href={url} className="general-link regularFont"> logout </a>)
        } else {
            return (
                <Link to={`/users/register`} className="general-link regularFont">/register</Link>)
        }


    }
    handleleftheader() {
        const petition = new Petition();
        const myuser = petition.getuser.call(this)

        if (myuser) {

            return (<Link to={`/${myuser.userid}/profile`} className="general-link regularFont"> /{myuser.userid} </Link>)

        } else {
            return (<Link to={`/users/login`} className="general-link regularFont"> /login </Link>)
        }



    }
    render() {

        return (
            <div className="general-flex">
                <div className="flex-1">



                    <div className="header-flex">
                        <div className="flex-1">
                            {headerIcon()}
                        </div>
                    </div>

                    <div className="header-flex header-background">
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