import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { radioOpen, radioClosed, saveAllPetitionsIcon, cameraIcon } from './svg';
import { formatUTCDateforDisplay, } from './functions';
import { Link } from 'react-router-dom';
import { UploadProfileImage } from './actions/api';
import Petition from './petition';
class Profile extends Component {
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
            phonenumber: '',

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

    getgender() {
        if (this.props.myusermodel) {

            return this.props.myusermodel.gender;
        }
    }

    handleradioiconfemale() {
        let myuser = this.getuser();
        if (myuser.gender === "female") {
            return (radioClosed())
        } else {

            return (radioOpen())
        }
    }
    handleradioiconmale() {
        let myuser = this.getuser();
        if (myuser.gender === "male") {
            return (radioClosed())
        } else {

            return (radioOpen())
        }
    }
    handlebottomlinks() {
        let myuser = this.getuser()
        let bottomlinks = []
        bottomlinks.push(<div className="general-container titleFont" key="bottom-link-1">
            <Link className="general-link titleFont" to={`/${myuser.userid}/petitions`}>Go To Create A Petition</Link>
        </div>)
        bottomlinks.push(<div className="general-container titleFont" key="bottom-link-2">
            <Link className="general-link titleFont" to={`/users/viewpetitions`}> Go To View Petitions </Link>
        </div>)
        return bottomlinks;


    }
    showtitle() {

        return (<div className="general-flex">
            <div className="flex-1">
                <div className="general-container titleFont alignCenter">{this.getprofilemessage()}</div>
            </div>
        </div>)
    }
    async uploadprofileimage() {
        let myuser = this.getuser();

        if (myuser) {
            let formData = new FormData();

            let myfile = document.getElementById("uploadprofileimage");
            // HTML file input, chosen by user

            formData.append("profilephoto", myfile.files[0]);
            formData.append("myuser", JSON.stringify(myuser));

            let response = await UploadProfileImage(formData);
            console.log(response)
            if (response.hasOwnProperty("myuser")) {

                this.props.reduxUser(response.myuser);
                this.setState({ render: 'render' })

            }
            if (response.hasOwnProperty("message")) {
                let message = response.message;
                if (response.hasOwnProperty("lastupdated")) {
                    message += `Last Updated ${formatUTCDateforDisplay(response.lastupdated)}`

                }
                this.setState({ message })
            }

        }


    }
    responsivelayout() {
        const petition = new Petition();
        if (this.state.width > 800) {
            return (
                <div className="general-flex">
                    <div className="flex-1">

                        {this.showtitle()}

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
                                Phone Number <br />
                                <input type="text" className="general-field regularFont" value={this.getphonenumber()} onChange={event => { this.handlephonenumber(event.target.value) }} />
                            </div>
                            <div className="flex-1  regularFont addLeftMargin">
                                Email Address <br />
                                <input type="text" value={this.getemailaddress()} onChange={event => { this.handleemailaddress(event.target.value) }} className="general-field regularFont" />
                            </div>
                        </div>

                        <div className="general-flex">

                            <div className="flex-1  regularFont">


                                <div className="general-flex">
                                    <div className="flex-2  regularFont showBorder">
                                        Profile URL  <input type="file" name="profileimage" id="uploadprofileimage" /> <br />
                                    </div>
                                    <div className="flex-1 regularFont showBorder">
                                        <button className="profilepicture-icon general-button" onClick={() => { this.uploadprofileimage() }}>{cameraIcon()}</button>

                                    </div>
                                </div>
                                <div className="general-container regularFont">
                                    <input type="text" value={this.getprofileurl()} onChange={event => this.handleprofileurl(event.target.value)} className="general-field regularFont" />
                                </div>


                            </div>


                        </div>


                        <div className="general-flex">
                            <div className="flex-1">
                                <div className="general-container regularFont alignCenter">
                                    {this.state.message}
                                </div>
                                <div className="general-container alignCenter">
                                    <button className="login-button general-button" onClick={() => petition.saveallpetition.call(this)}>
                                        {saveAllPetitionsIcon()}
                                    </button>
                                </div>
                            </div>
                        </div>


                        {this.handlebottomlinks()}







                    </div>
                </div>
            )

        } else {
            return (
                <div className="general-flex">
                    <div className="flex-1">

                        {this.showtitle()}

                        <div className="general-flex">
                            <div className="flex-1  regularFont">
                                First Name <br />
                                <input className="general-field regularFont" value={this.getfirstname()} onChange={event => { this.setState({ firstname: event.target.value }) }} />
                            </div>
                            <div className="flex-1  regularFont addLeftMargin">
                                Last Name <br />
                                <input value={this.getlastname()} onChange={event => { this.setState({ lastname: event.target.value }) }} className="general-field regularFont" />
                            </div>
                        </div>
                        <div className="general-flex ">
                            <div className="flex-1">
                                <div className="general-container  regularFont">
                                    Phone Number <br />
                                    <input type="text" value={this.getphonenumber()} onChange={event => { this.handlephonenumber(event.target.value) }} className="general-field regularFont" />
                                </div>

                                <div className="general-container addLeftMargin regularFont">
                                    Email Address <br />
                                    <input type="text" value={this.getemailaddress()} onChange={event => { this.handleemailaddress(event.target.value) }} className="general-field regularFont" />
                                </div>

                                <div className="general-container showBorder regularFont">
                                    Profile URL <br />

                                    <button className="profilepicture-icon general-button" onClick={() => { this.uploadprofileimage() }}>{cameraIcon()}</button>
                                    <input type="file" id="uploadprofileimage" />
                                </div>

                                <div className="general-container regularFont">
                                    <input type="text" onChange={event => this.handleprofileurl(event.target.value)} value={this.getprofileurl()} className="general-field regularFont" />
                                </div>



                                <div className="general-container regularFont alignCenter">
                                    {this.state.message}
                                </div>
                                <div className="general-container alignCenter">
                                    <button className="login-button general-button" onClick={() => petition.saveallpetition.call(this)}>
                                        {saveAllPetitionsIcon()}
                                    </button>
                                </div>

                                {this.handlebottomlinks()}



                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    getuser() {
        let myuser = false;
        if (this.props.myusermodel.userid) {


            myuser = this.props.myusermodel;

        }


        return myuser;
    }
    getuserid() {
        let myuser = this.getuser();
        return myuser.userid;
    }
    getfirstname() {
        let myuser = this.getuser();
        return myuser.firstname
    }
    handlefirstname(firstname) {
        let myuser = this.getuser();
        myuser.firstname = firstname;
        this.props.reduxUser(myuser);
        this.setState({ render: 'render' })

    }
    getlastname() {
        let myuser = this.getuser();
        return myuser.lastname;
    }
    handlelastname(lastname) {
        let myuser = this.getuser();
        myuser.lastname = lastname;
        this.props.reduxUser(myuser);
        this.setState({ render: 'render' })
    }
    getphonenumber() {
        let myuser = this.getuser();
        return myuser.phonenumber;
    }
    handlephonenumber(phonenumber) {
        let myuser = this.getuser();
        myuser.phonenumber = phonenumber;
        this.props.reduxUser(myuser);
        this.setState({ render: 'render' })
    }
    getemailaddress() {
        let myuser = this.getuser();
        return myuser.emailaddress;
    }
    handleemailaddress(emailaddress) {
        let myuser = this.getuser();
        myuser.emailaddress = emailaddress;
        this.props.reduxUser(myuser);
        this.setState({ render: 'render' })
    }
    getprofileurl() {
        let myuser = this.getuser();
        return myuser.profileurl
    }
    handleprofileurl(profileurl) {
        let myuser = this.getuser();
        myuser.profileurl = profileurl;
        this.props.reduxUser(myuser);
        this.setState({ render: 'render' })

    }

    handleradiomale() {
        let myuser = this.getuser();
        if (myuser.gender === 'female') {

            myuser.gender = 'male';
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    handleradiofemale() {
        let myuser = this.getuser();
        if (myuser.gender === 'male') {

            myuser.gender = 'female';
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }
    }
    getprofilemessage() {
        let myuser = this.getuser();
        if (myuser) {
            return (`Your are logged in /${myuser.userid}`)
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
        myusermodel: state.myusermodel,
        allusers: state.allusers
    }
}

export default connect(mapStateToProps, actions)(Profile);