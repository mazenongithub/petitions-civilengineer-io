import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { radioOpen, radioClosed, appleIDIcon, googleSignInIcon, RegisterNowIcon } from './svg';
//import { MyUserModel } from './functions';
import firebase from 'firebase'
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            userid: '',
            client: '',
            clientid: '',
            firstname: '',
            lastname: '',
            gender: '',
            emailaddress: '',
            organization: '',

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
    async appleSignIn() {
        let provider = new firebase.auth.OAuthProvider('apple.com');
        let userid = this.state.userid;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let gender = this.state.gender;
        let emailaddress = this.state.emailaddress;
        let organization = this.state.organization;
        let profileurl = this.state.profileurl;
        let client = this.state.client;
        let clientid = this.state.clientid;
        provider.addScope('email');
        provider.addScope('name');
        try {
            let result = await firebase.auth().signInWithPopup(provider)

            // The signed-in user info.

            var user = result.user;
            console.log(user)
            profileurl = user.providerData[0].photoURL;
            client = 'apple';
            clientid = user.providerData[0].uid;
            if (!emailaddress) {
                emailaddress = user.providerData[0].email;
            }
            if (!firstname && user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
            }
            if (!lastname && user.providerData[0].displayName) {
                lastname = user.providerData[0].displayName.split(' ')[1]
            }

            var accessToken = result.credential.accessToken;
            var idToken = result.credential.idToken;
            console.log({ user, accessToken, idToken })

            this.setState({ userid, client, clientid, profileurl, emailaddress, firstname, lastname, gender, organization })

        } catch (error) {
            // Handle Errors here.
            var errorCode = error.code;
            console.log(errorCode)
            var errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            var email = error.email;
            console.log(email)
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(credential)

            // ...
        };


    }
    async googleSignIn() {
        let userid = this.state.userid;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let gender = this.state.gender;
        let emailaddress = this.state.emailaddress;
        let organization = this.state.organization;
        let profileurl = this.state.profileurl;
        let client = this.state.client;
        let clientid = this.state.clientid;
        //let myusermodel = MyUserModel(userid, client, clientid, firstname, lastname, gender, emailaddress, organization,profileurl)


        try {


            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            let result = await firebase.auth().signInWithPopup(provider)

            var user = result.user;
            console.log(user)
            profileurl = user.providerData[0].photoURL;
            client = 'google';
            clientid = user.providerData[0].uid;

            if (!emailaddress) {
                emailaddress = user.providerData[0].email;

            }
            if (!firstname && user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
            }
            if (!lastname && user.providerData[0].displayName) {
                lastname = user.providerData[0].displayName.split(' ')[1]
            }

            //var accessToken = result.credential.accessToken;
            //var idToken = result.credential.idToken;


            this.setState({ userid, client, clientid, profileurl, emailaddress, firstname, lastname, gender, organization })


        } catch (err) {
            alert(err)
        }


    }
    handleradiofemale() {
        if (this.state.gender === "female") {
            return (radioClosed())
        } else {

            return (radioOpen())
        }
    }
    handleradiomale() {
        if (this.state.gender === "male") {
            return (radioClosed())
        } else {

            return (radioOpen())
        }
    }
    responsivelayout() {
        if (this.state.width > 400) {
            return (
                <div className="general-flex">
                    <div className="flex-1">

                        <div className="general-flex ">
                            <div className="flex-1">
                                <div className="general-padding  titleFont alignCenter">Register for Petitions</div>
                                <div className="general-padding  regularFont">Create A Profile ID <br />
                                    <input type="text" className="general-field regularFont" value={this.state.userid} onChange={event => { this.setState({ userid: event.target.value }) }} /></div>
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1  regularFont">
                                First Name <br />
                                <input value={this.state.firstname} onChange={event => { this.setState({ firstname: event.target.value }) }} className="general-field regularFont" />
                            </div>
                            <div className="flex-1  addLeftMargin regularFont">
                                Last Name <br />
                                <input value={this.state.lastname} onChange={event => { this.setState({ lastname: event.target.value }) }} className="general-field regularFont" />
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1  regularFont">

                                Male
                                <button className="general-radio general-button " onClick={() => { this.setState({ gender: 'male' }) }}>
                                    {this.handleradiomale()}
                                </button>
                                <span className="addLeftMargin">
                                    Female
                                    <button className="general-radio general-button " onClick={() => { this.setState({ gender: 'female' }) }}>
                                        {this.handleradiofemale()}
                                    </button>
                                </span>

                            </div>
                            <div className="flex-1  regularFont">
                                Email Address <br />
                                <input type="text" value={this.state.emailaddress} onChange={event => { this.setState({ emailaddress: event.target.value }) }} className="general-field regularFont" />
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1  regularFont">
                                Organization <br />
                                <input type="text" className="general-field regularFont" value={this.state.organization} onChange={event => { this.setState({ organization: event.target.value }) }} />
                            </div>

                        </div>

                        <div className="general-flex">
                            <div className="flex-1  alignCenter">
                                <button className="general-button login-button" onClick={() => { this.googleSignIn() }}>{googleSignInIcon()}</button>
                            </div>
                            <div className="flex-1  alignCenter">
                                <button className="general-button login-button" onClick={() => { this.appleSignIn() }}>{appleIDIcon()}</button>
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1  alignCenter">
                                <form id="register-form" method="post" action={`${process.env.REACT_APP_SERVER_API}/newusers/register`}>
                                    {this.handleformbutton()}
                                    <input type="hidden" name="firstname" value={this.state.firstname} />
                                    <input type="hidden" name="lastname" value={this.state.lastname} />
                                    <input type="hidden" name="clientid" value={this.state.clientid} />
                                    <input type="hidden" name="client" value={this.state.client} />
                                    <input type="hidden" name="emailaddress" value={this.state.emailaddress} />
                                    <input type="hidden" name="organization" value={this.state.organization} />
                                    <input type="hidden" name="profileurl" value={this.state.profileurl} />
                                    <input type="hidden" name="userid" value={this.state.userid} />
                                    <input type="hidden" name="gender" value={this.state.gender} />
                                </form>
                            </div>

                        </div>




                    </div>
                </div>
            )

        } else {
            return (
                <div className="general-flex">
                    <div className="flex-1">
                        <div className="general-flex ">
                            <div className="flex-1">
                                <div className="general-padding  general-font titleFont alignCenter">Register Your Account</div>
                                <div className="general-padding  general-font regularFont">Create A Profile ID<br /><input type="text" value={this.state.userid} onChange={event => { this.setState({ userid: event.target.value }) }} className="general-field regularFont" />
                                </div>
                            </div>
                        </div>
                        <div className="general-flex ">
                            <div className="flex-1  regularFont">
                                First Name <br />
                                <input className="general-field regularFont" value={this.state.firstname} onChange={event => { this.setState({ firstname: event.target.value }) }} />
                            </div>
                            <div className="flex-1  regularFont addLeftMargin">
                                Last Name <br />
                                <input value={this.state.lastname} onChange={event => { this.setState({ lastname: event.target.value }) }} className="general-field regularFont" />
                            </div>
                        </div>
                        <div className="general-flex ">
                            <div className="flex-1">
                                <div className="general-padding  regularFont">

                                    Male
                                <button className="general-radio general-button" onClick={() => { this.setState({ gender: 'male' }) }}>
                                        {this.handleradiomale()}
                                    </button>
                                    <span className="addLeftMargin">
                                        Female
                                    <button className="general-radio general-button" onClick={() => { this.setState({ gender: 'female' }) }}>
                                            {this.handleradiofemale()}
                                        </button>
                                    </span>
                                </div>
                                <div className="general-padding  regularFont">
                                    Email Address <br />
                                    <input type="text" value={this.state.emailaddress} onChange={event => { this.setState({ emailaddress: event.target.value }) }} className="general-field regularFont" />
                                </div>
                                <div className="general-padding  regularFont">
                                    Organization <br />
                                    <input type="text" value={this.state.organization} onChange={event => { this.setState({ organization: event.target.value }) }} className="general-field regularFont" />
                                </div>
                                <div className="general-padding  alignCenter">
                                    <button className="general-button login-button" onClick={() => { this.googleSignIn() }}>{googleSignInIcon()}</button>
                                </div>
                                <div className="general-padding  alignCenter">
                                    <button className="general-button login-button" onClick={() => { this.appleSignIn() }}>{appleIDIcon()}</button>
                                </div>
                                <div className="general-padding alignCenter">

                                    <form id="register-form" method="post" action={`${process.env.REACT_APP_SERVER_API}/newusers/register`}>
                                        <button className="general-button login-button">{this.handleformbutton()}</button>
                                        <input type="hidden" name="firstname" value={this.state.firstname} />
                                        <input type="hidden" name="lastname" value={this.state.lastname} />
                                        <input type="hidden" name="clientid" value={this.state.clientid} />
                                        <input type="hidden" name="client" value={this.state.client} />
                                        <input type="hidden" name="emailaddress" value={this.state.emailaddress} />
                                        <input type="hidden" name="organization" value={this.state.organization} />
                                        <input type="hidden" name="profileurl" value={this.state.profileurl} />
                                        <input type="hidden" name="userid" value={this.state.userid} />
                                        <input type="hidden" name="gender" value={this.state.gender} />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    handleformbutton() {
        if (this.state.client && this.state.clientid) {
            return (<button className="general-button login-button">{RegisterNowIcon()}</button>)
        } else {
            return;
        }
    }
    render() {
        return (this.responsivelayout())
    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel
    }
}

export default connect(mapStateToProps, actions)(Register);