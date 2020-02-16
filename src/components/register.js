import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { appleIDIcon, googleSignInIcon, RegisterNowIcon, goCheckIcon } from './svg';
import { MyStylesheet } from './styles';
import { validateEmail, validateUserID } from './functions'
import Petition from './petition'
import { RegisterUser } from './actions/api'
import firebase from 'firebase/app';
import Profile from './profile';
import 'firebase/auth';
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
            emailaddress: '',
            profileurl: '',
            phonenumber: '',
            checkuserid: false,
            checkemailaddress: true

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

    handleemailaddress(emailaddress) {
        this.setState({ emailaddress })
        let errmsg = validateEmail(emailaddress)
        if (errmsg) {
            this.setState({ checkemailaddress: false, message: errmsg })
        }
    }
    handleuserid(userid) {
        this.setState({ userid })
        const errmsg = validateUserID(userid);
        if (errmsg) {
            this.setState({ checkuserid: false, message: errmsg })
        }
    }

    async appleSignIn() {
        let provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        try {
            let result = await firebase.auth().signInWithPopup(provider)

            // The signed-in user info.

            var user = result.user;
            //console.log(user)
            let client = 'apple';
            let clientid = user.providerData[0].uid;
            let emailaddress = "";
            if (user.providerData[0].email) {
                emailaddress = user.providerData[0].email;
            };
            let firstname = '';
            let lastname = '';
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
                lastname = user.providerData[0].displayName.split(' ')[1];
            }
            let profileurl = "";
            if (user.providerData[0].photoURL) {
                profileurl = user.providerData[0].photoURL;
            }
            let phonenumber = "";
            if (user.phoneNumber) {
                phonenumber = user.phoneNumber;
            }

            this.setState({ client, clientid, profileurl, emailaddress, firstname, lastname, phonenumber })

        } catch (err) {
            alert(err)
        }


    }

    async googleSignIn() {

        try {

            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            let result = await firebase.auth().signInWithPopup(provider)
            var user = result.user;
            let client = 'google';
            let clientid = user.providerData[0].uid;
            let emailaddress = "";
            if (user.providerData[0].email) {
                emailaddress = user.providerData[0].email;
            };
            let firstname = '';
            let lastname = '';
            if (user.providerData[0]) {
                firstname = user.providerData[0].displayName.split(' ')[0]
                lastname = user.providerData[0].displayName.split(' ')[1];
            }
            let profileurl = "";
            if (user.providerData[0].photoURL) {
                profileurl = user.providerData[0].photoURL;
            }
            let phonenumber = "";
            if (user.phoneNumber) {
                phonenumber = user.phoneNumber;
            }
            this.setState({ client, clientid, profileurl, emailaddress, firstname, lastname, phonenumber })

        } catch (error) {
            alert(error)
        }

    }
    async registeruser() {
        let { userid, client, clientid, profileurl, emailaddress, firstname, lastname, phonenumber } = this.state;
        const values = { userid, client, clientid, profileurl, emailaddress, firstname, lastname, phonenumber };
        try {
            let response = await RegisterUser(values)
            console.log(response)
            if (response.hasOwnProperty("myuser")) {

                this.props.reduxUser(response.myuser)

            }

            if (response.hasOwnProperty("allusers")) {
                this.props.reduxAllUsers(response.allusers)
            }

        } catch (err) {
            alert(err)
        }

    }
    handleregistericon() {
        const petition = new Petition();
        const styles = MyStylesheet();
        const registerNow = petition.getRegisterNow.call(this)

        const validate = () => {

            let validate = {};
            validate.validate = true;
            if (!this.state.emailaddress || !this.state.checkemailaddress) {
                validate.validate = false;
                if (!this.state.emailaddress) {
                    validate.message += `Email Address is missing`;
                }
                validate.message += this.state.message;
            }
            if (!this.state.userid || !this.state.checkuserid) {

                validate.validate = false;
                if (!this.state.userid) {
                    validate.message += `User ID is missing`
                }
                validate.message += this.state.message;
            }
            if (!this.state.client || !this.state.clientid) {
                validate.validate = false;
                validate.message += ` Client ID is missing `
            }
            return validate;
        }

        if (validate().validate) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>



                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <button style={{ ...styles.generalButton, ...registerNow }} onClick={() => { this.registeruser() }}>{RegisterNowIcon()}</button>
                            </div>
                        </div>

                    </div>
                </div>)

        }
    }

    render() {
        const styles = MyStylesheet();
        const petition = new Petition();
        const regularFont = petition.getRegularFont.call(this);
        const goCheck = petition.getgocheck.call(this)
        const headerFont = petition.getHeaderFont.call(this);
        const loginButtonHeight = petition.getloginbuttonheight.call(this);
        const handlesignin = () => {
            if (!this.state.client || !this.state.clientid) {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        <button style={{ ...styles.generalButton, ...loginButtonHeight }}
                            onClick={() => { this.googleSignIn() }}>{googleSignInIcon()}</button>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        <button style={{ ...styles.generalButton, ...loginButtonHeight }}
                            onClick={() => { this.appleSignIn() }}>{appleIDIcon()}</button>

                    </div>
                </div>)
            } else {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                            Your Sign In is Secure With {this.state.client}
                        </div>
                    </div>
                )
            }
        }

        const Emailcheck = () => {
            if (this.state.checkemailaddress && this.state.emailaddress) {
                return (<button style={{ ...styles.generalButton, ...goCheck }}>{goCheckIcon()}</button>)
            } else {
                return;
            }
        }
        const Providercheck = () => {
            if (this.state.checkuserid) {
                return (<button style={{ ...styles.generalButton, ...goCheck }}>{goCheckIcon()}</button>)
            } else {
                return;
            }

        }
        const Register = () => {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont, ...styles.generalFont, ...styles.fontBold, ...styles.headerFont, ...styles.bottomMargin15 }}>
                                Register to Make or Support Petitions

                        </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
                                Create A Profile ID:
                            <input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                    onChange={event => { this.handleuserid(event.target.value) }}
                                    onBlur={event => { petition.checkuserid.call(this, event.target.value) }}
                                    value={this.state.userid} />
                            </div>
                            <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
                                {Providercheck()}

                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
                                Email Address
                            <input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                    value={this.state.emailaddress}
                                    onChange={event => { this.handleemailaddress(event.target.value) }}
                                    onBlur={event => { petition.checkemailaddress.call(this, event.target.value) }}
                                />
                            </div>
                            <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }}>
                                {Emailcheck()}

                            </div>
                        </div>


                        {handlesignin()}

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.generalFont }}>
                                {this.state.message}
                            </div>
                        </div>

                        {this.handleregistericon()}

                    </div>
                </div>
            )

        }

        const myuser = petition.getuser.call(this)
        if (myuser) {
            return (<Profile />)
        } else {
            return (Register())
        }
    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers
    }
}

export default connect(mapStateToProps, actions)(Register);