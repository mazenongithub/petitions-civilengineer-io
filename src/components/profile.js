import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { radioOpen, radioClosed, saveAllPetitionsIcon } from './svg';
import { formatUTCDateforDisplay } from './functions';
import { Link } from 'react-router-dom';
import { SavePetitions } from './actions/api';
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

    getgender() {
        if (this.props.myusermodel) {

            return this.props.myusermodel.gender;
        }
    }
    async saveallpetition() {
        try {
            if (this.props.myusermodel) {
                let myuser = this.props.myusermodel;
                console.log(myuser)
                let response = await SavePetitions({ myuser });
                console.log(response)
                if (response.response.hasOwnProperty("myuser")) {
                    this.props.reduxUser(response.response.myuser)
                    this.setState({ message: `${response.response.message} Last Updated ${formatUTCDateforDisplay(response.response.lastupdated)}` })
                }
            }
        } catch (err) {
            alert(err)
        }
    }
    handleradioiconfemale() {
        let myuser = this.getmyuser();
        if (myuser.gender === "female") {
            return (radioClosed())
        } else {

            return (radioOpen())
        }
    }
    handleradioiconmale() {
        let myuser = this.getmyuser();
        if (myuser.gender === "male") {
            return (radioClosed())
        } else {

            return (radioOpen())
        }
    }
    responsivelayout() {
        let myuser = this.getmyuser();
        if (this.state.width > 400) {
            return (
                <div className="general-flex">
                    <div className="flex-1">

                        <div className="general-flex ">
                            <div className="flex-1">
                                <div className="general-container  titleFont alignCenter">Profile</div>
                                <div className="general-container  regularFont">UserID {this.getuserid()} </div>
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
                                <button className="general-radio general-button " onClick={() => { this.handleradiomale() }}>
                                    {this.handleradioiconmale()}
                                </button>
                                <span className="addLeftMargin">
                                    Female
                                    <button className="general-radio general-button " onClick={() => { this.handleradiofemale() }}>
                                        {this.handleradioiconfemale()}
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


                        <div className="general-flex">
                            <div className="flex-1">
                                <div className="general-container regularFont alignCenter">
                                    {this.state.message}
                                </div>
                                <div className="general-container alignCenter">
                                    <button className="login-button general-button" onClick={() => this.saveallpetition()}>
                                        {saveAllPetitionsIcon()}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="general-container titleFont">
                            Your are Signed as {myuser.firstname} {myuser.lastname}
                        </div>
                        <div className="general-container titleFont">
                            <Link className="general-link titleFont" to={`/${myuser.userid}/petitions`}>Go To Create A Petition</Link>
                        </div>
                        <div className="general-container titleFont">
                            <Link className="general-link titleFont" to={`/users/viewpetitions`}> Go To View Petitions </Link>
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
                                <div className="general-container  general-font titleFont alignCenter">Profile</div>
                                <div className="general-container  general-font regularFont">User ID {this.getuserid()} </div>
                            </div>
                        </div>
                        <div className="general-flex ">
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

                                    Male
                                <button className="general-radio general-button" onClick={() => { this.handleradiomale() }}>
                                        {this.handleradiomale()}
                                    </button>
                                    <span className="addLeftMargin">
                                        Female
                                    <button className="general-radio general-button" onClick={() => { this.handleradiofemale() }}>
                                            {this.handleradiofemale()}
                                        </button>
                                    </span>
                                </div>
                                <div className="general-container  regularFont">
                                    Email Address <br />
                                    <input type="text" value={this.getemailaddress()} onChange={event => { this.handleemailaddress(event.target.value) }} className="general-field regularFont" />
                                </div>
                                <div className="general-container  regularFont">
                                    Organization <br />
                                    <input type="text" value={this.getorganization()} onChange={event => { this.handleorganization(event.target.value) }} className="general-field regularFont" />
                                </div>



                                <div className="general-container regularFont alignCenter">
                                    {this.state.message}
                                </div>
                                <div className="general-container alignCenter">
                                    <button className="login-button general-button" onClick={() => this.saveallpetition()}>
                                        {saveAllPetitionsIcon()}
                                    </button>
                                </div>

                                <div className="general-container titleFont">
                                    Your are Signed as
                            </div>
                                <div className="general-container titleFont">
                                    Go To Create A Petition
                            </div>
                                <div className="general-container titleFont">
                                    Go To View Petitions
                            </div>



                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    getmyuser() {
        let myuser = {};
        if (this.props.myusermodel) {
            myuser = this.props.myusermodel;
        }
        return myuser;
    }
    getuserid() {
        let myuser = this.getmyuser();
        return myuser.userid;
    }
    getfirstname() {
        let myuser = this.getmyuser();
        return myuser.firstname
    }
    handlefirstname(firstname) {
        let myuser = this.getmyuser();
        myuser.firstname = firstname;
        this.props.reduxUser(myuser);
        this.setState({ render: 'render' })

    }
    getlastname() {
        let myuser = this.getmyuser();
        return myuser.lastname;
    }
    handlelastname(lastname) {
        let myuser = this.getmyuser();
        myuser.lastname = lastname;
        this.props.reduxUser(myuser);
        this.setState({ render: 'render' })
    }
    getorganization() {
        let myuser = this.getmyuser();
        return myuser.organization;
    }
    handleorganization(organization) {
        let myuser = this.getmyuser();
        myuser.organization = organization;
        this.props.reduxUser(myuser);
        this.setState({ render: 'render' })
    }
    getemailaddress() {
        let myuser = this.getmyuser();
        return myuser.emailaddress;
    }
    handleemailaddress(emailaddress) {
        let myuser = this.getmyuser();
        myuser.emailaddress = emailaddress;
        this.props.reduxUser(myuser);
        this.setState({ render: 'render' })
    }

    handleradiomale() {
        let myuser = this.getmyuser();
        if (myuser.gender === 'female') {

            myuser.gender = 'male';
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    handleradiofemale() {
        let myuser = this.getmyuser();
        if (myuser.gender === 'male') {

            myuser.gender = 'female';
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
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

export default connect(mapStateToProps, actions)(Profile);