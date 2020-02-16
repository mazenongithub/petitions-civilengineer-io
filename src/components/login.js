import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { appleIDIcon, googleSignInIcon, loginIcon } from './svg';
import { MyStylesheet } from './styles';
import Petition from './petition';
import { LoginUser } from './actions/api';
import { validateEmail } from './functions';
import firebase from 'firebase/app';
import Profile from './profile';
import 'firebase/auth';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            userid: '',
            client: '',
            clientid: '',
            emailaddress: '',

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

    async loginuser() {
        const { client, clientid, emailaddress } = this.state;
        let values = { client, clientid, emailaddress };
        try {

            let myuser = await LoginUser(values);
            console.log(myuser)
            if (myuser.hasOwnProperty("userid")) {

                if (myuser.hasOwnProperty("allusers")) {
                    this.props.reduxAllUsers(myuser.allusers)
                    delete myuser.allusers
                }
                this.props.reduxUser(myuser)

            } else {
                this.setState({ message: myuser.message })
            }
        } catch (err) {
            alert(err)
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



            this.setState({ client, clientid, emailaddress })
            if (clientid && emailaddress) {
                this.loginuser();
            }


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

            this.setState({ client, clientid, emailaddress })
            if (clientid && emailaddress) {
                this.loginuser();
            }

        } catch (error) {
            alert(error)
        }

    }

    render() {
        const styles = MyStylesheet();
        const petition = new Petition();
        const regularFont = petition.getRegularFont.call(this);
        const headerFont = petition.getHeaderFont.call(this);
        const loginicon = petition.getloginicon.call(this)
        const responsiveMargin = () => {
            if (this.state.width > 800) {
                return ({ marginLeft: '20%' })
            } else {
                return ({ margin: 'auto' })
            }

        }
        const alignButton = () => {
            if (this.state.width < 800) {
                return ({ textAlign: 'center' })
            } else {
                return;
            }
        }
        const maxFieldWidth = () => {

            return ({
                width: `${Math.round(this.state.width / 2)}px`
            })

        }
        const validateLogin = () => {
            let validate = {};
            validate.validate = true;
            validate.message = "";
            if (!this.state.client || !this.state.clientid) {
                validate.validate = false;
                validate.message += ` Missing Client ID`
            }
            if (!this.state.emailaddress) {
                validate.validate = false;
                validate.message += ` Missing Email Address `
            }
            if (validateEmail(this.state.emailaddress)) {
                validate.validate = false;
                validate.message += validateEmail(this.state.emailaddress);
            }
            return validate;
        }

        const loginButton = () => {
            const validate = validateLogin();
            if (validate.validate) {
                return (<div style={{ ...styles.generalContainer, ...responsiveMargin, ...styles.bottomMargin15, ...alignButton() }}>
                    <button style={{ ...styles.generalButton, ...loginicon }} onClick={() => { this.loginuser() }}>{loginIcon()}</button>

                </div>)
            }
        }
        const message = () => {
            const validate = validateLogin();
            if (!validate.validate) {
                return (<div style={{ ...styles.generalContainer, ...responsiveMargin, ...styles.bottomMargin15, ...styles.alignCenter, ...regularFont, ...styles.generalFont }}>
                    {validate.message}
                </div>)
            } else {
                return;
            }
        }

        const Login = () => {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.headerFont, ...styles.generalFont, ...headerFont, ...styles.alignCenter }}>Login to Create or Support Petitions</div>
                        </div>

                        <div style={{ ...styles.generalContainer, ...responsiveMargin() }}>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...alignButton() }}>
                                <button style={{ ...styles.generalButton, ...loginicon }}
                                    onClick={() => { this.googleSignIn() }}>{googleSignInIcon()}</button>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...alignButton() }}>
                                <button style={{ ...styles.generalButton, ...loginicon }}
                                    onClick={() => { this.appleSignIn() }}>{appleIDIcon()}</button>
                            </div>




                            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                                Email Address
                            <input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...maxFieldWidth(), ...styles.addLeftMargin }}
                                    value={this.state.emailaddress}
                                    onChange={event => { this.setState({ emailaddress: event.target.value }) }}
                                />
                            </div>



                            {loginButton()}


                            {message()}



                        </div>



                    </div>
                </div>
            )

        }
        const myuser = petition.getuser.call(this);
        if (myuser) {
            return (<Profile />)
        } else {
            return (Login())
        }
    }

}
function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers
    }
}

export default connect(mapStateToProps, actions)(Login);