import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';
import { LoadAllUsers } from './actions/api';
import { Link } from 'react-router-dom';
class ViewPetitions extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions)

        if (!this.props.allusers.hasOwnProperty("myuser")) {
            this.loadallmyusers()
        }

    }
    async loadallmyusers() {
        let response = await LoadAllUsers();
        console.log(response)
        if (response.hasOwnProperty("allusers")) {
            this.props.reduxAllUsers(response.allusers)
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    showsearchmenu() {
        if (this.state.width > 800) {
            return (<div className="general-flex">
                <div className="flex-1">
                    <select className="regularFont general-field">
                        <option value='name'>Search by Name</option>
                        <option value='id'>Search by ID</option>
                        <option value='user'>Search by User</option>
                    </select>
                </div>
                <div className="flex-3 regularFont">
                    <input type="text" className="general-field regularFont"
                        value={this.state.search}
                        onChange={event => { this.setState({ search: event.target.value }) }} />
                </div>
            </div>)
        } else if (this.state.width > 400) {

            return (<div className="general-flex">
                <div className="flex-1">
                    <select className="regularFont general-field">
                        <option value='name'>Search by Name</option>
                        <option value='id'>Search by ID</option>
                        <option value='user'>Search by User</option>
                    </select>
                </div>
                <div className="flex-1 regularFont">
                    <input type="text" className="general-field regularFont"
                        value={this.state.search}
                        onChange={event => { this.setState({ search: event.target.value }) }} />
                </div>
            </div>)

        } else {
            return (
                <div className="general-flex">
                    <div className="flex-1">
                        <div className="regularFont">
                            <select className="regularFont general-field">
                                <option value='name'>Search by Name</option>
                                <option value='id'>Search by ID</option>
                                <option value='user'>Search by User</option>
                            </select>
                        </div>
                        <div className="general-container regularFont">
                            <input type="text" className="general-field regularFont"
                                value={this.state.search}
                                onChange={event => { this.setState({ search: event.target.value }) }} />
                        </div>
                    </div>
                </div>
            )

        }
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
            <div className="flex-1">
                <Link to={`/petitions/${petition.petitionid}`} className="general-link">
                    <div className="regularFont alignCenter">
                        {`${process.env.REACT_APP_CLIENT_API}/petitions/${petition.petitionid}`}
                    </div>
                    <div className="regularFont alignCenter">
                        {petition.petition}
                    </div>
                    <div className="regularFont alignCenter">
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
    showsearchresults() {
        if (this.state.width > 400) {
            return (
                <div className="general-flex">
                    <div className="flex-1 regularFont">
                        Results:
            </div>
                    <div className="flex-3 regularFont showBorder">
                        {this.searchresults()}
                    </div>
                </div>)
        } else {
            return (
                <div className="general-flex">
                    <div className="flex-1 regularFont">

                        <div className="general-flex">
                            <div className="flex-1 regularFont">
                                Results
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1 regularFont showBorder">
                                {this.searchresults()}
                            </div>
                        </div>

                    </div>
                </div>
            )

        }
    }
    render() {
        return (
            <div className="general-flex">
                <div className="flex-1 showBorder">

                    <div className="general-flex">
                        <div className="flex-1 showBorder alignCenter titleFont">
                            View Petitions
                         </div>
                    </div>

                    {this.showsearchmenu()}
                    {this.showsearchresults()}


                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers
    }
}

export default connect(mapStateToProps, actions)(ViewPetitions);