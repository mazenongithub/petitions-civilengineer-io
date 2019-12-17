import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { radioOpen, radioClosed, appleIDIcon, googleSignInIcon, RegisterNowIcon } from './svg';
import { LoginUser } from './actions/api';
//import { MyUserModel } from './functions';
import firebase from 'firebase/app';
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
            gender: '',
            emailaddress: '',
            organization: '',
            profileurl: ''

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
            //console.log(user)
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

            //var accessToken = result.credential.accessToken;
            //var idToken = result.credential.idToken;
            //console.log({ user, accessToken, idToken })
            let values = { client, clientid }
            //console.log(values)
            let myuser = await LoginUser(values);
            console.log(myuser)
            if (myuser.hasOwnProperty("myuser")) {
                this.props.reduxUser(myuser.myuser)
                if (myuser.myuser.hasOwnProperty("allusers")) {
                    this.props.reduxAllUsers(myuser.myuser.allusers)
                }
            } else {
                this.setState({ userid, client, clientid, profileurl, emailaddress, firstname, lastname, gender, organization })
            }



        } catch (error) {

            alert(error.message);

        }


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
                lastname = user.providerData[0].displayName.split(' ')[1];

            }

            //var accessToken = result.credential.accessToken;
            //var idToken = result.credential.idToken;
            let values = { client, clientid }
            //console.log(values)
            let myuser = await LoginUser(values);
            console.log(myuser)
            if (myuser.hasOwnProperty("myuser")) {
                this.props.reduxUser(myuser.myuser)
                if (myuser.myuser.hasOwnProperty("allusers")) {
                    this.props.reduxAllUsers(myuser.myuser.allusers)
                }
            } else {

                this.setState({ userid, client, clientid, profileurl, emailaddress, firstname, lastname, gender, organization })
            }

        } catch (error) {
            alert(error)
        }


    }

    handleradiofemale() {
        let user = this.getuser();
        if (user) {
            if (user.gender === "female") {
                return (radioClosed())
            } else {

                return (radioOpen())
            }
        } else {
            if (this.state.gender === "female") {
                return (radioClosed())
            } else {

                return (radioOpen())
            }
        }

    }

    handleradiomale() {
        let user = this.getuser();
        if (user) {
            if (user.gender === "male") {
                return (radioClosed())
            } else {

                return (radioOpen())
            }
        } else {
            if (this.state.gender === "male") {
                return (radioClosed())
            } else {

                return (radioOpen())
            }
        }

    }
    handlegooglebutton() {
        let myuser = this.getuser();
        if (this.state.client !== 'apple' && !myuser) {
            return (<button className="general-button login-button" onClick={() => { this.googleSignIn() }}>{googleSignInIcon()}</button>)
        }
    }
    handleapplebutton() {
        let myuser = this.getuser();
        if (this.state.client !== 'google' && !myuser) {
            return (<button className="general-button login-button" onClick={() => { this.appleSignIn() }}>{appleIDIcon()}</button>)
        }
    }

    loginuser(event) {
        event.preventDefault();
        // validate submit

        let myform = document.getElementById("register-form")
        myform.submit()


    }
    getuser() {
        let myuser = false;
        if (this.props.myusermodel.userid) {


            myuser = this.props.myusermodel;

        }


        return myuser;
    }
    getfirstname() {
        let myuser = this.getuser();

        if (myuser) {
            return (myuser.firstname)
        } else {
            return (this.state.firstname)
        }
    }
    handlefirstname(firstname) {
        let myuser = this.getuser();
        if (myuser) {
            myuser.firstname = firstname;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        } else {
            this.setState({ firstname })
        }
    }
    getlastname() {
        let myuser = this.getuser();
        if (myuser) {
            return (myuser.lastname)
        } else {
            return (this.state.lastname)
        }
    }
    handlelastname(lastname) {
        let myuser = this.getuser();
        if (myuser) {
            myuser.lastname = lastname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        } else {
            this.setState({ lastname })
        }
    }
    getemailaddress() {
        let myuser = this.getuser();
        if (myuser) {
            return (myuser.emailaddress)
        } else {
            return (this.state.emailaddress)
        }
    }
    handleemailaddress(emailaddress) {
        let myuser = this.getuser();
        if (myuser) {
            myuser.emailaddress = emailaddress;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        } else {
            this.setState({ emailaddress })
        }
    }
    getorganization() {
        let myuser = this.getuser();
        if (myuser) {
            return (myuser.organization)
        } else {
            return (this.state.prganization)
        }
    }
    handleorganization(organization) {
        let myuser = this.getuser();
        if (myuser) {
            myuser.organization = organization;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        } else {
            this.setState({ organization })
        }
    }
    getuserid() {
        let myuser = this.getuser();
        if (myuser) {
            return (myuser.userid)
        } else {
            return (this.state.userid)
        }
    }
    handleuserid(userid) {
        let myuser = this.getuser();
        if (!myuser) {
            this.setState({ userid })
        }
    }
    handlegendermale() {
        let myuser = this.getuser();
        if (myuser) {
            if (myuser.gender === 'female' || !myuser.gender) {
                myuser.gender = 'male'
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
            return (myuser.gender)
        } else {

            if (myuser.gender === 'female' || !myuser.gender) {
                this.setState({ gender: 'male' })
                this.setState({ render: 'render' })
            }
        }
    }

    handlegenderfemale() {
        let myuser = this.getuser();
        if (myuser) {
            if (myuser.gender === 'male' || !myuser.gender) {
                myuser.gender = 'female';
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
            return (myuser.gender)
        } else {

            if (myuser.gender === 'male' || !myuser.gender) {
                this.setState({ gender: 'female' })
            }
        }
    }
    handleregistermessage() {
        let myuser = this.getuser();
        if (myuser) {
            return (`You are Logged in /${myuser.userid}`)
        } else if (this.state.clientid && this.state.client) {
            return ('Register your new Account')
        } else {
            return ('Register or Login into your Account')
        }
    }
    handleuseridinput() {
        let myuser = this.getuser();
        if (!myuser) {

            return (<div className="general-container regularFont">User ID <br /><input type="text" className="general-field regularFont" value={this.state.userid} onChange={event => { this.handleuserid(event.target.value) }} /> </div>)
        } else {
            return;
        }
    }
    handleloginbuttons() {
        let myuser = this.getuser();
        if (!myuser) {
            if (this.state.width > 800) {
                return (<div className="general-flex">
                    <div className="flex-1  alignCenter">
                        {this.handlegooglebutton()}
                    </div>
                    <div className="flex-1  alignCenter">
                        {this.handleapplebutton()}
                    </div>
                </div>)
            } else {
                let buttons = [];
                buttons.push(<div className="general-container alignCenter" key={"google-login-button"}>
                    {this.handlegooglebutton()}
                </div>)
                buttons.push(<div className="general-container alignCenter" key={"apple-login-button"}>
                    {this.handleapplebutton()}
                </div>)
                return buttons;
            }

        } else {
            return
        }
    }
    handlenewaccountmessage() {
        if (this.state.client && this.state.clientid) {
            return (<div className="genaral-container titleFont alignCenter">Register Your New Account</div>)
        } else {
            return;
        }
    }
    handleregisterform() {
        let myuser = this.getuser();
        if (!myuser) {
            if (this.state.width > 800) {
                return (<div className="general-flex">
                    <div className="flex-1 alignCenter">

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

                </div>)
            } else {
                return (<div className="general-padding alignCenter">

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
                </div>)
            }
        }
    }
    handlebottomlinks() {
        let myuser = this.getuser();
        if (myuser) {
            return (
                <div className="general-flex">
                    <div className="flex-1">

                        <div className="general-flex">
                            <div className="flex-1">
                                <Link className="general-link titleFont" to={`/users/viewpetitions`}> Go To View Petitions </Link>
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1 titleFont"><Link className="general-link titleFont" to={`/${myuser.userid}/petitions`}>Go To Create A Petition</Link></div>
                        </div>

                    </div>
                </div>
            )
        } else {
            return;
        }
    }
    responsivelayout() {
        if (this.state.width > 800) {
            return (
                <div className="general-flex">
                    <div className="flex-1">

                        <div className="general-flex ">
                            <div className="flex-1">
                                <div className="general-container titleFont alignCenter">{this.handleregistermessage()}</div>

                                {this.handleuseridinput()}

                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1  regularFont">
                                First Name <br />
                                <input value={this.getfirstname()} onChange={event => { this.handlefirstname(event.target.value) }} className="general-field regularFont" />
                            </div>
                            <div className="flex-1  addLeftMargin regularFont">
                                Last Name <br />
                                <input value={this.getlastname()} onChange={event => { this.handlelastname(event.target.value) }} className="general-field regularFont" />
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1  regularFont">

                                Male
                                <button className="general-radio general-button " onClick={() => { this.handlegendermale() }}>
                                    {this.handleradiomale()}
                                </button>
                                <span className="addLeftMargin">
                                    Female
                                    <button className="general-radio general-button " onClick={() => { this.handlegenderfemale() }}>
                                        {this.handleradiofemale()}
                                    </button>
                                </span>

                            </div>
                            <div className="flex-1  regularFont">
                                Email Address <br />
                                <input type="text" value={this.getemailaddress()} onChange={event => { this.handleemailaddress(event.target.value) }} className="general-field regularFont" />
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1  regularFont">
                                Organization <br />
                                <input type="text" className="general-field regularFont" value={this.getorganization()} onChange={event => { this.handleorganization(event.target.value) }} />
                            </div>

                        </div>

                        {this.handleloginbuttons()}

                        {this.handleregisterform()}
                        {this.handlebottomlinks()}




                    </div>
                </div>
            )

        } else {
            return (
                <div className="general-flex">
                    <div className="flex-1">
                        <div className="general-flex ">
                            <div className="flex-1">
                                <div className="general-container general-font titleFont alignCenter">{this.handleregistermessage()}</div>
                                <div className="general-container general-font regularFont">{this.handleuseridinput()}
                                </div>
                            </div>
                        </div>
                        <div className="general-flex ">
                            <div className="flex-1  regularFont">
                                First Name <br />
                                <input className="general-field regularFont" value={this.getfirstname()} onChange={event => { this.handlefirstname(event.target.value) }} />
                            </div>
                            <div className="flex-1  regularFont addLeftMargin">
                                Last Name <br />
                                <input value={this.getlastname()} onChange={event => { this.handlelastname(event.target.value) }} className="general-field regularFont" />
                            </div>
                        </div>
                        <div className="general-flex ">
                            <div className="flex-1">
                                <div className="general-container regularFont">

                                    Male
                                <button className="general-radio general-button" onClick={() => { this.handlegendermale() }}>
                                        {this.handleradiomale()}
                                    </button>
                                    <span className="addLeftMargin">
                                        Female
                                    <button className="general-radio general-button" onClick={() => { this.handlegenderfemale() }}>
                                            {this.handleradiofemale()}
                                        </button>
                                    </span>
                                </div>
                                <div className="general-container regularFont">
                                    Email Address <br />
                                    <input type="text" value={this.getemailaddress()} onChange={event => { this.handleemailaddress(event.target.value) }} className="general-field regularFont" />
                                </div>
                                <div className="general-container  regularFont">
                                    Organization <br />
                                    <input type="text" value={this.getorganization()} onChange={event => { this.handleorganization(event.target.value) }} className="general-field regularFont" />
                                </div>
                                {this.handleloginbuttons()}
                                {this.handleregisterform()}
                                {this.handlebottomlinks()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    handleformbutton() {
        let myuser = this.getuser();
        if (this.state.client && this.state.clientid && !myuser) {
            return (
                <div className="general-container">
                    <button className="general-button login-button" onClick={event => { this.loginuser(event) }}>{RegisterNowIcon()}</button>
                </div>)
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