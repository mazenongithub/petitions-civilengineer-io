import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { headerIcon } from './svg';
import Petition from './petition';
import { LogoutUser } from './actions/api'
import { MyStylesheet } from './styles';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);


    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    async logoutuser() {
        try {
            let response = await LogoutUser();
            if (response.hasOwnProperty("message")) {
                this.props.reduxUser(response)
            }
        } catch (err) {
            alert(err)
        }
    }
    handlerightheader() {
        const petition = new Petition();
        const myuser = petition.getuser.call(this);
        const regularFont = petition.getRegularFont.call(this);
        const styles = MyStylesheet();
        if (myuser) {
            return (<div className="hoverlink" style={{ ...regularFont, ...styles.generalFont }} onClick={() => { this.logoutuser() }}> logout </div>)
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