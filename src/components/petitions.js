import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';
import { removeIconSmall, petitionidicon, redLeft, redRight, blueLeft, blueRight, saveAllPetitionsIcon, hideImageIcon, showImageIcon, addImageIcon, scrollImageUp, scrollImageDown, scrollImageLeft, scrollImageRight } from './svg';
import { CreateConflict, CreatePetition, makeID, CreateArguement, formatUTCDateforDisplay, CreateImage } from './functions';
import { UploadConflictImage, UploadArguementImage } from './actions/api';
import Petition from './petition';


class Petitions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            petitionid: '',
            petition: '',
            versus: '',
            activepetitionid: '',
            activearguementid: '',
            activearguementimageid: '',
            conflict: '',
            arguement: '',
            render: ''

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

    getmyuser() {
        let myusermodel = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("userid")) {
                myusermodel = this.props.myusermodel;
            }
        }
        return myusermodel;
    }
    getpetitionid() {
        if (this.state.activepetitionid) {
            return (this.getactivepetition().petitionid)

        } else {
            return this.state.petitionid
        }

    }

    handlepetitionid(petitionid) {
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activepetitionid) {

                let i = this.getactivepetitionposition();
                myuser.petitions.petition[i].petitionid = petitionid;
                this.props.reduxUser(myuser);
                this.setState({ activepetitionid: petitionid })

            } else {
                this.setState({ petitionid })
                let petition = this.state.petition;
                let versus = this.state.versus;
                let newpetition = CreatePetition(petitionid, petition, versus);
                if (myuser.hasOwnProperty("petitions")) {

                    myuser.petitions.petition.push(newpetition);

                } else {
                    let petitions = { petition: [newpetition] }
                    myuser.petitions = petitions;

                }
                this.props.reduxUser(myuser);
                this.setState({ activepetitionid: newpetition.petitionid })


            }
        }
    }
    showpetitionid() {


        if (this.state.width > 400) {
            return (<div className="regularFont general-container">Petition ID <input type="text" value={this.getpetitionid()} onChange={event => { this.handlepetitionid(event.target.value) }} className="general-field regularFont addLeftMargin petitionid-field" /></div>)
        } else {

            return (<div className="regularFont general-container"> Petition ID <br /> <input type="text" value={this.getpetitionid()} onChange={event => { this.handlepetitionid(event.target.value) }} className="general-field regularFont addLeftMargin" /></div >)

        }
    }
    handlepetition(petition) {
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activepetitionid) {
                let i = this.getactivepetitionposition();
                myuser.petitions.petition[i].petition = petition;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            } else {
                this.setState({ petition })
            }
        }
    }
    getpetition() {
        if (this.state.activepetitionid) {
            return (this.getactivepetition().petition)

        } else {
            return (this.state.petition)
        }

    }

    handleversus(versus) {
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activepetitionid) {
                let i = this.getactivepetitionposition();
                myuser.petitions.petition[i].versus = versus;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            } else {
                this.setState({ versus })
            }
        }
    }
    getversus() {
        if (this.state.activepetitionid) {
            return (this.getactivepetition().versus)
        } else {
            return (this.state.versus)
        }

    }
    getuserpetitions() {
        let petitions = {};
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("petitions")) {
                petitions = this.props.myusermodel.petitions;
            }
        }
        return petitions;
    }
    getpetitionbyid(petitionid) {
        let petitionbyid = {};
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (myuser.hasOwnProperty("petitions")) {
                // eslint-disable-next-line
                myuser.petitions.petition.map(petition => {
                    if (petition.petitionid === petitionid) {
                        petitionbyid = petition;
                    }
                })
            }

        }
        return petitionbyid;
    }
    initialconflictid(activepetitionid) {
        let conflictid = false;

        if (activepetitionid) {

            let petition = this.getpetitionbyid(activepetitionid)

            if (petition.hasOwnProperty("conflicts")) {
                conflictid = petition.conflicts.conflict[0].conflictid;
            }

        }
        return conflictid;
    }
    initialarguementid(activepetitionid) {
        let arguementid = false;
        if (activepetitionid) {

            let petition = this.getpetitionbyid(activepetitionid)

            if (petition.hasOwnProperty("conflicts")) {
                if (petition.conflicts.conflict[0].hasOwnProperty("arguements")) {
                    arguementid = petition.conflicts.conflict[0].arguements.arguement[0].arguementid;
                }
            }
        }
        return arguementid;
    }
    makepetitionactive(activepetitionid) {
        if (this.state.activepetitionid !== activepetitionid) {

            let activeconflictid = this.initialconflictid(activepetitionid);
            let activearguementid = this.initialarguementid(activepetitionid)

            this.setState({ activepetitionid, activeconflictid, activearguementid })
        } else {
            this.setState({ activepetitionid: false, activeconflictid: false, activearguementid: false })
        }

    }
    getpetitionpositionbyid(petitionid) {
        let position = 0;
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (myuser.hasOwnProperty("petitions")) {
                // eslint-disable-next-line
                myuser.petitions.petition.map((petition, i) => {
                    if (petition.petitionid === petitionid) {
                        position = i;
                    }
                })
            }
        }
        return position;
    }
    removePetition(petitionid) {
        if (window.confirm('Deleting Petition will delete All Conflicts and Arguements') === true) {
            if (this.props.myusermodel) {
                let myuser = this.props.myusermodel;
                let i = this.getpetitionpositionbyid(petitionid)

                myuser.petitions.petition.splice(i, 1);
                this.props.reduxUser(myuser);
                this.setState({ activepetitionid: false, activeconflictid: false, activearguementid: false })

            }
        }
    }
    showpetitionlarge(petition) {
        return (<div className="double-grid-container">
            <div className="general-flex">
                <div className="flex-1 noBorder alignCenter">
                    <button className="general-button showpetitionicon" onClick={event => { this.makepetitionactive(petition.petitionid) }}>
                        {petitionidicon(petition.petitionid)}
                    </button>
                </div>
                <div className="flex-2 noBorder">
                    <button className="general-button remove-icon-small" onClick={() => this.removePetition(petition.petitionid)}>
                        {removeIconSmall()}
                    </button>
                    <div className="general-container titleFont">{petition.petitionid}</div>
                </div>

            </div>

        </div>)

    }
    showpetitionmedium(petition) {
        return (
            <div className="double-grid-container" key={petition.petitionid}>
                <div className="general-flex">
                    <div className="flex-1 noBorder alignCenter">
                        <button className="general-button showpetitionicon" onClick={event => { this.makepetitionactive(petition.petitionid) }}>
                            {petitionidicon(petition.petitionid)}
                        </button>
                    </div>
                    <div className="flex-2 noBorder">
                        <button className="general-button remove-icon-small" onClick={() => this.removePetition(petition.petitionid)}>
                            {removeIconSmall()}
                        </button>
                    </div>
                </div>
                <div className="general-flex">
                    <div className="flex-1 titleFont alignCenter noBorder">{petition.petitionid}</div>
                </div>
            </div>
        )

    }
    showpetitionssmall(petition) {
        return (
            <div className="general-flex">
                <div className="flex-1 noBorder">

                    <div className="general-flex">
                        <div className="flex-1 noBorder alignCenter">
                            <button className="general-button showpetitionicon" onClick={event => { this.makepetitionactive(petition.petitionid) }}>
                                {petitionidicon(petition.petitionid)}
                            </button>
                        </div>
                        <div className="flex-2 noBorder">
                            <button className="general-button remove-icon-small" onClick={() => this.removePetition(petition.petitionid)}>
                                {removeIconSmall()}
                            </button>
                        </div>

                    </div>

                    <div className="general-flex">
                        <div className="flex-1 titleFont alignCenter">
                            {petition.petitionid}
                        </div>
                    </div>

                </div>
            </div>
        )

    }
    showpetitionids() {

        let petitionslarge = [];
        let petitionssmall = [];
        if (this.props.myusermodel) {
            let myusermodel = this.props.myusermodel;
            if (myusermodel.hasOwnProperty("petitions")) {
                let petitions = myusermodel.petitions;
                // eslint-disable-next-line
                petitions.petition.map(petition => {
                    if (this.state.width > 800) {

                        petitionslarge.push(this.showpetitionlarge(petition))
                    } else if (this.state.width > 400) {
                        petitionslarge.push(this.showpetitionmedium(petition))
                    } else {
                        petitionssmall.push(this.showpetitionssmall(petition))
                    }

                })

                if (this.state.width > 400) {

                    if (petitions.petition.length % 2 !== 0) {
                        petitionslarge.push(<div className="double-grid-container noBorder" key={'petitions-blank'}>&nbsp;</div>)
                    }

                    return (<div className="double-grid general-container">
                        {petitionslarge}
                    </div>)
                } else {
                    return (petitionssmall)

                }

            }
        }

    }

    getactivearguement() {
        let activearguement = {};
        if (this.state.activearguementid) {
            let arguementid = this.state.activearguementid;
            let conflict = this.getactiveconflict();

            if (conflict.hasOwnProperty("arguements")) {
                // eslint-disable-next-line
                conflict.arguements.arguement.map(arguement => {
                    if (arguement.arguementid === arguementid) {
                        activearguement = arguement;
                    }
                })
            }
        }
        return activearguement
    }
    getactivearguementposition() {
        let position = 0
        if (this.state.activearguementid) {
            let arguementid = this.state.activearguementid;
            let conflict = this.getactiveconflict();

            if (conflict.hasOwnProperty("arguements")) {
                // eslint-disable-next-line
                conflict.arguements.arguement.map((arguement, i) => {
                    if (arguement.arguementid === arguementid) {
                        position = i;
                    }
                })
            }
        }
        return position
    }
    getarguement() {
        if (this.state.activearguementid) {
            let arguement = this.getactivearguement();
            return (arguement.arguement)
        } else {
            return (this.state.arguement)
        }
    }
    handleArguement(arguement) {
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activepetitionid) {
                let i = this.getactivepetitionposition();
                if (this.state.activeconflictid) {
                    let j = this.getactiveconflictposition();
                    if (this.state.activearguementid) {


                        let k = this.getactivearguementposition();

                        myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].arguement = arguement
                        this.props.reduxUser(myuser);
                        this.setState({ arguement: '' })

                    } else {
                        this.setState({ arguement })
                        let conflict = this.getactiveconflict();
                        let arguementid = makeID(16);
                        let newarguement = CreateArguement(arguementid, arguement)
                        if (conflict.hasOwnProperty("arguements")) {
                            myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement.push(newarguement)

                        } else {
                            let arguements = { arguement: [newarguement] }
                            myuser.petitions.petition[i].conflicts.conflict[j].arguements = arguements;

                        }
                        this.props.reduxUser(myuser)
                        this.setState({ activearguementid: newarguement.arguementid, render: 'render' })


                    }
                } else {
                    alert('You need an Active Conflict to make an arguement ')
                }
            }
        }
    }
    getactiveconflict() {
        let petition = this.getactivepetition();
        let activeconflict = {};
        if (this.state.activeconflictid) {
            let conflictid = this.state.activeconflictid;
            if (petition.hasOwnProperty("conflicts")) {
                // eslint-disable-next-line
                petition.conflicts.conflict.map((conflict, i) => {
                    if (conflict.conflictid === conflictid) {
                        activeconflict = conflict;
                    }
                })
            }
        }
        return activeconflict;
    }
    getconflict() {
        if (this.state.activeconflictid) {
            let conflict = this.getactiveconflict();
            return (conflict.conflict);
        } else {
            return (this.state.conflict)
        }
    }
    getactivepetitionposition() {
        let position = 0;
        if (this.state.activepetitionid) {
            let petitionid = this.state.activepetitionid;
            let myuser = this.props.myusermodel;
            if (myuser.hasOwnProperty("petitions")) {
                // eslint-disable-next-line
                myuser.petitions.petition.map((petition, i) => {
                    if (petition.petitionid === petitionid) {
                        position = i;
                    }
                })
            }
        }
        return position;
    }
    handleConflict(conflict) {
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activepetitionid) {
                let i = this.getactivepetitionposition();
                if (this.state.activeconflictid) {

                    let j = this.getactiveconflictposition();
                    myuser.petitions.petition[i].conflicts.conflict[j].conflict = conflict;
                    this.props.reduxUser(myuser);
                    this.setState({ conflict: '' })

                } else {

                    let petition = this.getactivepetition();
                    let conflictid = makeID(16)
                    let petitionid = this.state.activepetitionid;
                    let newconflict = CreateConflict(conflictid, petitionid, conflict)
                    if (petition.hasOwnProperty("conflicts")) {
                        myuser.petitions.petition[i].conflicts.conflict.push(newconflict);
                        this.props.reduxUser(myuser);
                        this.setState({ activeconflictid: newconflict.conflictid })
                    } else {
                        let conflicts = { conflict: [newconflict] }
                        myuser.petitions.petition[i].conflicts = conflicts
                        this.setState({ activeconflictid: newconflict.conflictid })
                    }

                }
            }
        }
    }
    handleactivearguementposition() {

        if (this.state.activearguementid) {
            return (this.getactivearguementposition() + 1)
        } else {
            if (this.state.activeconflictid) {
                let conflict = this.getactiveconflict();
                if (conflict.hasOwnProperty("arguements")) {
                    return (conflict.arguements.arguement.length + 1)
                } else {
                    return (1)
                }
            } else {
                return (1)
            }

        }


    }
    cleararguementid() {
        if (this.state.activearguementid) {
            this.setState({ activearguementid: false })
        }
    }
    showarguements() {
        const petition = new Petition();
        if (this.state.activepetitionid) {


            return (
                <div className="general-flex">
                    <div className="flex-1 noBorder">

                        <div className="general-flex">
                            <div className="flex-1 noBorder">
                                <div className="general-flex">

                                    <div className="flex-1 noBorder alignCenter"><span className="titleFont">Arguement</span>
                                        <div className="generalContainer regularFont noBorder alignRight">
                                            Scroll List
                                    </div>
                                    </div>
                                    <div className="flex-3 noBorder">
                                        <div className="general-flex">
                                            <div className="flex-1 noBorder">
                                                <button className="general-button conflictarrow" onClick={() => { this.scrollarguementdown() }}>
                                                    {blueLeft()}
                                                </button>
                                            </div>
                                            <div className="flex-1 noBorder titleFont alignCenter" onClick={() => { this.cleararguementid() }}>
                                                {this.handleactivearguementposition()}
                                            </div>
                                            <div className="flex-1 noBorder alignRight">
                                                <button className="general-button conflictarrow" onClick={() => { this.scrollarguementup() }}>
                                                    {blueRight()}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1 noBorder">

                                <textarea className="conflict-text general-text general-field regularFont" value={this.getarguement()} onChange={event => { this.handleArguement(event.target.value) }}></textarea>
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1 noBorder">
                                <div className="generalContainer regularFont noBorder alignRight">
                                    Reorder List
                                </div>
                            </div>
                            <div className="flex-3 noBorder">
                                <div className="general-flex">
                                    <div className="regularFont flex-1 noBorder">
                                        <button className="general-button conflictarrow" onClick={() => { this.reorderarguementdown() }}>
                                            {redLeft()}
                                        </button>
                                    </div>
                                    <div className="flex-1 noBorder titleFont alignCenter">
                                        {this.handleactivearguementposition()}
                                    </div>
                                    <div className="regularFont flex-1 noBorder alignRight">
                                        <button className="general-button conflictarrow" onClick={() => { this.reorderarguementup() }}>
                                            {redRight()}
                                        </button> &nbsp;
                                    </div>
                                </div>
                            </div>

                        </div>

                        {petition.showsavebutton.call(this)}

                    </div>
                </div>
            )
        } else {
            return;
        }
    }
    activeconflictposition() {
        let position = 0;
        if (this.state.activeconflictid) {
            let conflictid = this.state.activeconflictid;
            let petition = this.getactivepetition();
            if (petition.hasOwnProperty("conflicts")) {
                // eslint-disable-next-line
                petition.conflicts.conflict.map((conflict, i) => {
                    if (conflict.conflictid === conflictid) {
                        position = i;
                    }
                })
            }

        }
        return position;
    }
    getactiveconflictposition() {
        let position = 0;
        if (this.state.activeconflictid) {
            position = this.activeconflictposition();
        }
        return position;
    }
    handleactiveconflictposition() {
        if (this.state.activeconflictid) {
            return (this.getactiveconflictposition() + 1)

        } else {

            if (this.state.activepetitionid) {

                let petition = this.getactivepetition();
                if (petition.hasOwnProperty("conflicts")) {
                    return (petition.conflicts.conflict.length + 1)
                }
            } else {
                return (1);
            }

        }

    }



    getconflictidbyposition(i) {
        let conflictid = "";
        if (this.state.activepetitionid) {
            let petition = this.getactivepetition();
            conflictid = petition.conflicts.conflict[i].conflictid;
        }
        return conflictid;

    }
    getconflictbyposition(i) {
        let conflict = {}
        if (this.state.activepetitionid) {
            let petition = this.getactivepetition();
            conflict = petition.conflicts.conflict[i]
        }
        return conflict;

    }
    getconflictfromid(conflictid) {
        let petition = this.getactivepetition();
        let conflicts = {};
        if (petition.hasOwnProperty("conflicts")) {
            // eslint-disable-next-line
            petition.conflicts.conflict.map(conflict => {
                if (conflict.conflictid === conflictid) {
                    conflicts = conflict;
                }
            })
        }
        return (conflicts)
    }
    firstarguementfromconflictid(conflictid) {
        let conflict = this.getconflictfromid(conflictid);
        let arguement = false;
        if (conflict.hasOwnProperty("arguements")) {
            if (conflict.arguements.hasOwnProperty('arguement')) {
                if (conflict.arguements.arguement.length > 0) {
                    arguement = conflict.arguements.arguement[0];
                }


            }

        }
        return arguement;
    }
    scrollconflictup() {
        if (this.state.activeconflictid) {
            let i = this.getactiveconflictposition();
            let petition = this.getactivepetition();
            if (petition.hasOwnProperty("conflicts")) {
                // eslint-disable-next-line
                if (petition.conflicts.conflict.length > 1) {
                    if (i !== petition.conflicts.conflict.length - 1) {

                        i = i + 1;
                        let activeconflictid = this.getconflictidbyposition(i);
                        let activearguement = this.firstarguementfromconflictid(activeconflictid);
                        let activearguementid = false;
                        if (activearguement) {
                            activearguementid = activearguement.activearguementid;
                        }
                        this.setState({ activeconflictid, activearguementid })
                    }

                }


            }
        } else {
            let activeconflictid = this.getconflictidbyposition(0);
            this.setState({ activeconflictid })
        }

    }
    scrollarguementup() {
        let activearguementid = "";
        if (this.state.activearguementid) {
            let i = this.getactivearguementposition();
            let conflict = this.getactiveconflict();
            if (conflict.hasOwnProperty("arguements")) {
                let length = conflict.arguements.arguement.length;
                if (i !== length - 1) {
                    let position = i + 1;
                    activearguementid = conflict.arguements.arguement[position].arguementid;
                    this.setState({ activearguementid })
                }
            }

        } else {
            let conflict = this.getactiveconflict();
            if (conflict.hasOwnProperty("arguements")) {
                activearguementid = conflict.arguements.arguement[0].arguementid;
                this.setState({ activearguementid })
            }
        }

    }
    scrollarguementdown() {
        let activearguementid = "";
        if (this.state.activearguementid) {
            let i = this.getactivearguementposition();
            let conflict = this.getactiveconflict();
            if (conflict.hasOwnProperty("arguements")) {

                if (i !== 0) {
                    let position = i - 1;
                    activearguementid = conflict.arguements.arguement[position].arguementid;
                    this.setState({ activearguementid })
                }
            }

        } else {
            let conflict = this.getactiveconflict();
            if (conflict.hasOwnProperty("arguements")) {
                activearguementid = conflict.arguements.arguement[0].arguementid;
                this.setState({ activearguementid })
            }
        }

    }
    scrollconflictdown() {
        if (this.state.activeconflictid) {
            let i = this.getactiveconflictposition();
            let petition = this.getactivepetition();
            if (petition.hasOwnProperty("conflicts")) {
                // eslint-disable-next-line
                if (petition.conflicts.conflict.length > 1) {
                    if (i !== 0) {

                        i = i - 1;
                        let activeconflictid = this.getconflictidbyposition(i);
                        let activearguementid = this.firstarguementfromconflictid(activeconflictid).arguementid;
                        this.setState({ activeconflictid, activearguementid })

                    }

                }


            }
        } else {
            let activeconflictid = this.getconflictidbyposition(0);
            this.setState({ activeconflictid })
        }

    }
    reorderconflictdown() {
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activeconflictid) {
                let i = this.getactiveconflictposition();
                let x = this.getactivepetitionposition();

                if (i !== 0) {
                    let conflict = this.getconflictbyposition(i);
                    let conflict_1 = this.getconflictbyposition(i - 1)
                    myuser.petitions.petition[x].conflicts.conflict[i] = conflict_1;
                    myuser.petitions.petition[x].conflicts.conflict[i - 1] = conflict;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }
            }
        }
    }
    getarguementbyposition(k) {
        let arguement = {};
        if (this.state.activeconflictid) {

            let conflict = this.getactiveconflict();

            if (conflict.hasOwnProperty("arguements")) {
                // eslint-disable-next-line
                arguement = conflict.arguements.arguement[k]
            }
        }
        return arguement;
    }
    reorderarguementdown() {
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activearguementid) {
                let j = this.getactiveconflictposition();
                let i = this.getactivepetitionposition();
                let k = this.getactivearguementposition();
                if (k !== 0) {
                    let arguement = this.getarguementbyposition(k);
                    let arguement_1 = this.getarguementbyposition(k - 1)
                    myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k] = arguement_1;
                    myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k - 1] = arguement
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }
            }
        }
    }

    reorderconflictup() {
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activeconflictid) {
                let i = this.getactiveconflictposition();
                let x = this.getactivepetitionposition();
                let petition = this.getactivepetition();
                let length = 0;
                if (petition.hasOwnProperty("conflicts")) {
                    length = petition.conflicts.conflict.length;

                }
                if (i !== length - 1) {
                    let conflict = this.getconflictbyposition(i);
                    let conflict_1 = this.getconflictbyposition(i + 1)
                    myuser.petitions.petition[x].conflicts.conflict[i] = conflict_1;
                    myuser.petitions.petition[x].conflicts.conflict[i + 1] = conflict;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }
            }
        }
    }

    reorderarguementup() {
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activearguementid) {
                let j = this.getactiveconflictposition();
                let i = this.getactivepetitionposition();
                let k = this.getactivearguementposition();
                let conflict = this.getactiveconflict();
                if (conflict.hasOwnProperty("arguements")) {
                    let length = conflict.arguements.arguement.length;

                    if (k !== length - 1) {
                        let arguement = this.getarguementbyposition(k);
                        let arguement_1 = this.getarguementbyposition(k + 1)
                        myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k] = arguement_1;
                        myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k + 1] = arguement
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }
                }


            }
        }
    }
    clearconflictid() {
        if (this.state.activeconflictid) {
            this.setState({ activeconflictid: false })
        }
    }
    showconflicts() {
        const petition = new Petitions();
        if (this.state.activepetitionid) {


            return (
                <div className="general-flex">
                    <div className="flex-1 noBorder">

                        <div className="general-flex">
                            <div className="flex-1 noBorder">
                                <div className="general-flex">

                                    <div className="flex-1 noBorder alignCenter"><span className="titleFont">Conflicts</span>
                                        <div className="generalContainer regularFont noBorder alignRight">
                                            Scroll List
                                    </div>
                                    </div>
                                    <div className="flex-3 noBorder">
                                        <div className="general-flex">
                                            <div className="flex-1 noBorder">
                                                <button className="general-button conflictarrow" onClick={() => { this.scrollconflictdown() }}>
                                                    {blueLeft()}
                                                </button>
                                            </div>
                                            <div className="flex-1 noBorder titleFont alignCenter" onClick={() => this.clearconflictid()}>
                                                {this.handleactiveconflictposition()}
                                            </div>
                                            <div className="flex-1 noBorder alignRight">
                                                <button className="general-button conflictarrow" onClick={() => { this.scrollconflictup() }}>
                                                    {blueRight()}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1 noBorder">

                                <textarea className="conflict-text general-text general-field regularFont" value={this.getconflict()} onChange={event => { this.handleConflict(event.target.value) }} ></textarea>
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-1 noBorder">
                                <div className="generalContainer regularFont noBorder alignRight">
                                    Reorder List
                                </div>
                            </div>
                            <div className="flex-3 noBorder">
                                <div className="general-flex">
                                    <div className="regularFont flex-1 noBorder">
                                        <button className="general-button conflictarrow" onClick={() => { this.reorderconflictdown() }}>
                                            {redLeft()}
                                        </button>
                                    </div>
                                    <div className="flex-1 noBorder titleFont alignCenter">
                                        {this.handleactiveconflictposition()}
                                    </div>
                                    <div className="regularFont flex-1 noBorder alignRight">
                                        <button className="general-button conflictarrow" onClick={() => { this.reorderconflictup() }}>
                                            {redRight()}
                                        </button> &nbsp;
                                    </div>
                                </div>
                            </div>

                        </div>

                        {petition.showsavebutton.call(this)}

                    </div>
                </div>
            )
        } else {
            return;
        }
    }
    getactivepetition() {
        let activepetition = {};
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activepetitionid) {
                let petitionid = this.state.activepetitionid;

                // eslint-disable-next-line
                myuser.petitions.petition.map(petition => {
                    if (petition.petitionid === petitionid) {
                        activepetition = petition;

                    }


                })
            }
            return activepetition;
        }
    }

    getpetitionconflicts() {
        let petition = this.getactivepetition();
        if (petition.hasOwnProperty("conflicts")) {
            return petition.conflicts;
        } else {
            return;
        }
    }
    makeconflictactive(conflictid) {
        if (this.state.activeconflictid !== conflictid) {
            let activearguementid = this.firstarguementfromconflictid(conflictid).arguementid;
            this.setState({ activeconflictid: conflictid, activearguementid })
        } else {
            this.setState({ activeconflictid: '', activearguementid: '' })
        }
    }
    getactiveconflictdisplay(conflictid) {
        let activeconflictdisplay = "";
        if (this.state.activeconflictid) {
            if (this.state.activeconflictid === conflictid) {
                activeconflictdisplay = 'activeconflictdisplay'
            }
        }
        return activeconflictdisplay;
    }
    getactivearguementdisplay(arguementid) {
        let activearguementdisplay = "";
        if (this.state.activearguementid) {
            if (this.state.activearguementid === arguementid) {
                activearguementdisplay = 'activearguementdisplay'
            }
        }
        return activearguementdisplay;
    }
    getconflictpositionbyid(conflictid) {
        let position = 0;
        if (this.state.activepetitionid) {
            let petition = this.getactivepetition();
            if (petition.hasOwnProperty("conflicts")) {
                // eslint-disable-next-line
                petition.conflicts.conflict.map((conflict, i) => {
                    if (conflict.conflictid === conflictid) {

                        position = i;
                    }
                })
            }
        }
        return position;
    }
    validateremoveconflict(conflictid) {
        let validate = true;
        let conflict = this.getconflictfromid(conflictid);
        if (conflict.hasOwnProperty("images")) {
            validate = false;
        }
        if (conflict.hasOwnProperty("arguements")) {
            // eslint-disable-next-line
            conflict.arguements.arguement.map(arguement => {
                if (arguement.hasOwnProperty("images")) {
                    validate = false;
                }
            })
        }
        return validate;
    }
    removeConflict(conflictid) {

        if (window.confirm('Removing Conflict will remove arguements')) {
            if (this.validateremoveconflict(conflictid)) {
                if (this.props.myusermodel) {
                    let myuser = this.props.myusermodel;

                    let i = this.getactivepetitionposition();
                    let j = this.getconflictpositionbyid(conflictid);

                    myuser.petitions.petition[i].conflicts.conflict.splice(j, 1);
                    if (myuser.petitions.petition[i].conflicts.conflict.length === 0) {
                        delete myuser.petitions.petition[i].conflicts.conflict;
                        delete myuser.petitions.petition[i].conflicts;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activearguementid: "", activeconflictid: "" })

                }
            } else {
                alert('Please remove nested images underneath the conflict prior to removing')
            }
        }

    }
    getconflictimagekeys(imageid) {
        let keys = [];
        if (this.props.myusermodel) {

            let petition = this.getactivepetition();
            if (petition.hasOwnProperty("conflicts")) {
                // eslint-disable-next-line
                petition.conflicts.conflict.map((conflict, i) => {
                    if (conflict.hasOwnProperty("images")) {
                        // eslint-disable-next-line
                        conflict.images.image.map((image, j) => {
                            if (image.imageid === imageid) {
                                keys[0] = i;
                                keys[1] = j;

                            }
                        })
                    }
                })
            }
        }
        return keys;
    }
    checkconflictdisplay(imageid) {
        let checkconflictdisplay = true;
        if (this.props.myusermodel) {
            let imagekeys = this.getconflictimagekeys(imageid)
            let petition = this.getactivepetition();
            let i = imagekeys[0];
            let j = imagekeys[1]
            let image = petition.conflicts.conflict[i].images.image[j];
            if (image.hasOwnProperty("display")) {
                checkconflictdisplay = petition.conflicts.conflict[i].images.image[j].display;

            }
        }
        return checkconflictdisplay;

    }
    hideconflictimage(imageid) {
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel
            let imagekeys = this.getconflictimagekeys(imageid)
            let i = this.getactivepetitionposition();
            let j = imagekeys[0];
            let k = imagekeys[1];
            let checkconflicdisplay = this.checkconflictdisplay(imageid);
            if (checkconflicdisplay) {
                myuser.petitions.petition[i].conflicts.conflict[j].images.image[k].display = false;
            } else {
                myuser.petitions.petition[i].conflicts.conflict[j].images.image[k].display = true;
            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }
    }
    handleshowconflicticon(imageid) {
        let checkimage = this.checkconflictdisplay(imageid);
        if (checkimage) {
            return (
                <button className="general-button hide-image" onClick={() => { this.hideconflictimage(imageid) }}>
                    {hideImageIcon()}
                </button>
            )
        } else {
            return (
                <button className="general-button hide-image" onClick={() => { this.hideconflictimage(imageid) }}>
                    {showImageIcon()}
                </button>)
        }

    }
    handleshowconflictimage(image) {
        let checkconflictdisplay = this.checkconflictdisplay(image.imageid);

        if (checkconflictdisplay) {
            return (<div className="general-container alignCenter">
                <img src={image.image} alt="conflict" className="conflict-image" />
            </div>)
        } else {
            return;
        }

    }

    showconflictimage(image) {
        return (<div className="general-flex" key={image.imageid}>
            <div className={`flex-1`}>
                <div className="general-container alignRight">
                    {this.handleshowconflicticon(image.imageid)}
                </div>
                {this.handleshowconflictimage(image)}
            </div>
        </div>)
    }

    conflictimagedropdown(conflict) {
        let conflictimages = [];
        if (conflict.hasOwnProperty("images")) {
            // eslint-disable-next-line
            conflict.images.image.map(image => {
                conflictimages.push(this.showconflictimage(image))

            })
        }
        return conflictimages;

    }
    showarguementsbyconflict(conflict) {
        let arguements = [];
        if (conflict.hasOwnProperty("arguements")) {
            // eslint-disable-next-line
            conflict.arguements.arguement.map((arguement, i) => {
                arguements.push(this.showpetitionarguement(arguement, i))
            })

        }
        return arguements;
    }
    makeconflictimageactive(imageid) {
        if (this.state.activeconflictimageid === imageid) {
            this.setState({ activeconflictimageid: false })
        } else {
            this.setState({ activeconflictimageid: imageid })
        }
    }
    checkactiveconflictimage(imageid) {
        if (this.state.activeconflictimageid === imageid) {
            return (`activeconflictdisplay`)
        } else {
            return;
        }
    }
    getactiveconflictimageposition() {
        let position = false;
        if (this.state.activeconflictimageid && this.state.activeconflictid) {
            let activeimageid = this.state.activeconflictimageid;
            let conflict = this.getactiveconflict();
            if (conflict.hasOwnProperty("images")) {
                // eslint-disable-next-line
                conflict.images.image.map((image, i) => {
                    if (image.imageid === activeimageid) {
                        position = i;
                    }

                })
            }
        }
        return position;
    }
    getconflictactiveimage() {
        let images = false;
        if (this.state.activeconflictimageid) {
            let imageid = this.state.activeconflictimageid;
            if (this.state.activeconflictid) {
                let conflict = this.getactiveconflict();
                if (conflict.hasOwnProperty("images")) {
                    // eslint-disable-next-line
                    conflict.images.image.map(image => {
                        if (image.imageid === imageid) {
                            images = image;
                        }
                    })
                }
            }
        }
        return images;
    }
    getconflictimagebyposition(i) {
        let image = false;
        if (this.state.activeconflictid) {
            let conflict = this.getactiveconflict();
            if (conflict.hasOwnProperty("images")) {
                image = conflict.images.image[i];
            }
        }
        return image;

    }
    moveconflictlistdown() {

        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;

            if (this.state.activepetitionid) {
                let i = this.getactivepetitionposition();
                let j = this.getactiveconflictposition();
                let k = this.getactiveconflictimageposition();
                let image = this.getconflictactiveimage();


                let conflict = this.getactiveconflict();
                if (conflict.hasOwnProperty("images")) {
                    let length = conflict.images.image.length;

                    if (k < length - 1) {
                        k += 1;
                        let image_1 = this.getconflictimagebyposition(k)
                        myuser.petitions.petition[i].conflicts.conflict[j].images.image[k] = image;;
                        myuser.petitions.petition[i].conflicts.conflict[j].images.image[k - 1] = image_1;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })



                    }

                }




            }// active petiton

        }

    }
    moveconflictlistup() {

        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;

            if (this.state.activepetitionid) {
                let i = this.getactivepetitionposition();
                let j = this.getactiveconflictposition();
                let k = this.getactiveconflictimageposition();
                let image = this.getconflictactiveimage();
                let conflict = this.getactiveconflict();
                if (conflict.hasOwnProperty("images")) {


                    if (k !== 0) {
                        k = k - 1;
                        let image_1 = this.getconflictimagebyposition(k)
                        myuser.petitions.petition[i].conflicts.conflict[j].images.image[k] = image;
                        myuser.petitions.petition[i].conflicts.conflict[j].images.image[k + 1] = image_1;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })



                    }

                }




            }// active petiton

        }

    }


    imageslistfromconflict() {
        let imagelist = [];
        if (this.state.activeconflictid) {
            let conflict = this.getactiveconflict();
            if (conflict.hasOwnProperty("images")) {
                // eslint-disable-next-line
                conflict.images.image.map((image, i) => {
                    imagelist.push(<div className={`general-container regularFont ${this.checkactiveconflictimage(image.imageid)}`}
                        key={`${makeID(4)}${image.imageid}`}>
                        <span onClick={() => { this.makeconflictimageactive(image.imageid) }} >Image {i + 1} {image.image} </span>
                        <span><button className="remove-icon-small general-button addLeftMargin" onClick={() => { this.removeconflictimage(image.imageid) }}>{removeIconSmall()}</button></span></div>)
                })
            }
        }

        return imagelist;
    }
    showconflictimagemenu(conflict) {
        let conflictid = this.state.activeconflictid;
        if (conflictid === conflict.conflictid) {
            if (this.state.width > 1200) {
                return (
                    <div className="general-flex">
                        <div className="flex-3 showBorder">
                            <span><input type="file" id="image-conflict" /></span><span><button className="addImageIcon general-button" onClick={() => { this.uploadconflictimage() }}>{addImageIcon()}</button></span>
                        </div>
                        <div className="flex-4 showBorder">{this.imageslistfromconflict(conflict)}</div>

                        <div className="flex-1 showBorder">
                            <div className="general-container">
                                <button className="general-button image-scroll" onClick={() => { this.moveconflictlistup(conflict.conflictid) }}>{scrollImageUp()}</button>
                            </div>
                            <div className="general-container">
                                <button className="general-button image-scroll" onClick={() => { this.moveconflictlistdown(conflict.conflictid) }}>{scrollImageDown()}</button>
                            </div>
                        </div>
                        <div className="flex-4 showBorder">&nbsp;</div>
                    </div>)

            } else if (this.state.width > 800) {
                return (
                    <div className="general-flex">
                        <div className="flex-3 showBorder">  <span><input type="file" id="image-conflict" /></span><span><button className="addImageIcon general-button" onClick={() => { this.uploadconflictimage() }}>{addImageIcon()}</button></span></div>
                        <div className="flex-4 showBorder">{this.imageslistfromconflict(conflict)}</div>
                        <div className="flex-1 showBorder">

                            <div className="general-container">
                                <button className="general-button image-scroll" onClick={() => { this.moveconflictlistup(conflict.conflictid) }}>{scrollImageUp()}</button>
                            </div>
                            <div className="general-container">
                                <button className="general-button image-scroll" onClick={() => { this.moveconflictlistdown(conflict.conflictid) }}>{scrollImageDown()}</button>
                            </div>

                        </div>
                    </div>)
            } else {
                return (
                    <div className="general-flex">
                        <div className="flex-1">

                            <div className="general-flex">
                                <div className="flex-1 showBorder"> <span><input type="file" id="image-conflict" /></span><span><button className="addImageIcon general-button" onClick={() => { this.uploadconflictimage() }}>{addImageIcon()}</button></span></div>
                                <div className="flex-2 showBorder">{this.imageslistfromconflict(conflict)}</div>
                            </div>

                            <div className="general-flex">
                                <div className="flex-1 showBorder alignCenter"><button className="general-button image-scroll" onClick={() => { this.moveconflictlistup(conflict.conflictid) }}>{scrollImageLeft()}</button></div>
                                <div className="flex-1 showBorder alignCenter"><button className="general-button image-scroll" onClick={() => { this.moveconflictlistdown(conflict.conflictid) }}>{scrollImageRight()}</button></div>
                            </div>

                        </div>

                    </div>)
            }
        } else {
            return;
        }
    }
    makeimageactive(imageid) {

        if (this.state.activearguementimageid === imageid) {

            this.setState({ activearguementimageid: false })
        } else {

            this.setState({ activearguementimageid: imageid })
        }
    }
    getactiveimageclass(imageid) {
        if (imageid === this.state.activearguementimageid) {
            return (`activearguementdisplay`)
        } else {
            return;
        }


    }
    getconflictimagefromid(imageid) {
        let conflict = this.getactiveconflict();
        let key = false;
        if (conflict.hasOwnProperty("images")) {
            // eslint-disable-next-line
            conflict.images.image.map((image, i) => {
                if (image.imageid === imageid) {
                    key = i;
                }
            })
        }
        return key;
    }
    async removeconflictimage(imageid) {
        if (window.confirm(`Are you sure you want to delete image ?`)) {
            if (this.props.myusermodel) {
                let myuser = this.props.myusermodel;
                let i = this.getactivepetitionposition();
                let j = this.getactiveconflictposition();
                let k = this.getconflictimagefromid(imageid);
                myuser.petitions.petition[i].conflicts.conflict[j].images.image.splice(k, 1)
                this.props.reduxUser(myuser);
                this.setState({ activeconflictimageid: false })

            }
        }
    }
    getarguementimagekeybyid(imageid) {
        let arguement = this.getactivearguement();
        let key = false;
        if (arguement.hasOwnProperty("images")) {
            // eslint-disable-next-line
            arguement.images.image.map((image, i) => {
                if (image.imageid === imageid) {
                    key = i;
                }
            })
        }
        return key;
    }
    async removearguementimage(imageid) {
        if (window.confirm(`Are you sure you want to delete image ?`)) {
            if (this.props.myusermodel) {
                let myuser = this.props.myusermodel;

                let i = this.getactivepetitionposition();
                let j = this.getactiveconflictposition();
                let k = this.getactivearguementposition();
                let l = this.getarguementimagekeybyid(imageid)
                myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].images.image.splice(l, 1);
                this.props.reduxUser(myuser);
                this.setState({ activearguementimageid: false })

            }
        }
    }
    imageslistfromarguement(arguement) {
        let arguementlist = [];

        if (arguement.hasOwnProperty("images")) {
            // eslint-disable-next-line
            arguement.images.image.map((image, i) => {
                arguementlist.push(<div className={`general-container regularFont ${this.getactiveimageclass(image.imageid)}`}
                    key={`${makeID(4)}${image.imageid}`}>
                    <span onClick={() => { this.makeimageactive(image.imageid) }} >Image {i + 1}{image.image}</span>
                    <span>
                        <button className="remove-icon-small general-button addLeftMargin"
                            onClick={() => { this.removearguementimage(image.imageid) }}>{removeIconSmall()}</button></span>
                </div>)
            })

        }
        return arguementlist;

    }

    getactivearguementimage() {
        let activeimage = false;
        if (this.state.activearguementid) {
            let arguement = this.getactivearguement();
            if (this.state.activearguementimageid) {
                let imageid = this.state.activearguementimageid;

                if (arguement.hasOwnProperty("images")) {
                    // eslint-disable-next-line
                    arguement.images.image.map(image => {
                        if (image.imageid === imageid) {
                            activeimage = image;
                        }
                    })
                }

            }
        }
        return activeimage;
    }

    getactivearguementimageposition(imageid) {
        let position = false;
        if (this.state.activearguementid) {
            let arguement = this.getactivearguement();

            if (arguement.hasOwnProperty("images")) {
                // eslint-disable-next-line
                arguement.images.image.map((image, i) => {
                    if (image.imageid === imageid) {
                        position = i;

                    }
                })
            }
        }
        return position;
    }

    getactivearguementimagebyposition(i) {
        let image = false;

        if (this.state.activearguementid) {
            let arguement = this.getactivearguement();
            if (arguement.hasOwnProperty("images")) {
                // eslint-disable-next-line
                image = arguement.images.image[i]
            }
        }
        return image;

    }
    movearguementimageup() {

        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activearguementid) {
                let arguement = this.getactivearguement();
                if (arguement.hasOwnProperty("images")) {

                    if (this.state.activepetitionid) {

                        let i = this.getactivepetitionposition();
                        if (this.state.activeconflictid) {
                            let j = this.getactiveconflictposition();
                            let k = this.getactivearguementposition();



                            if (this.state.activearguementimageid) {
                                let imageid = this.state.activearguementimageid;
                                let l = this.getactivearguementimageposition(imageid);

                                let image = this.getactivearguementimage()
                                if (l > 0) {

                                    let image_1 = this.getactivearguementimagebyposition(l - 1);

                                    myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].images.image[l - 1] = image;
                                    myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].images.image[l] = image_1;
                                    this.props.reduxUser(myuser);
                                    this.setState({ render: 'render' })

                                }




                            }



                        } // active arguement



                    }// active conflict




                }// active petition



            }
        }
    }
    movearguementimagedown() {

        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (this.state.activearguementid) {
                let arguement = this.getactivearguement();
                if (arguement.hasOwnProperty("images")) {

                    if (this.state.activepetitionid) {

                        let i = this.getactivepetitionposition();
                        if (this.state.activeconflictid) {
                            let j = this.getactiveconflictposition();
                            let k = this.getactivearguementposition();



                            if (this.state.activearguementimageid) {
                                let imageid = this.state.activearguementimageid;
                                let l = this.getactivearguementimageposition(imageid);

                                let image = this.getactivearguementimage();
                                let length = arguement.images.image.length
                                if (l < length - 1) {

                                    let image_1 = this.getactivearguementimagebyposition(l + 1);

                                    myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].images.image[l + 1] = image;
                                    myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].images.image[l] = image_1;
                                    this.props.reduxUser(myuser);
                                    this.setState({ render: 'render' })

                                }




                            }



                        } // active arguement



                    }// active conflict




                }// active petition



            }
        }
    }
    getactiveconflictimagefromresponse(myuser, imageid) {
        let activeimageid = false;
        if (myuser.hasOwnProperty("petitions")) {
            // eslint-disable-next-line
            myuser.petitions.petition.map(petition => {
                if (petition.hasOwnProperty("conflicts")) {
                    // eslint-disable-next-line
                    petition.conflicts.conflict.map(conflict => {
                        if (conflict.hasOwnProperty("images")) {
                            // eslint-disable-next-line
                            conflict.images.image.map(image => {
                                if (image.imageid === imageid) {
                                    activeimageid = imageid;
                                }
                            })

                        }
                    })

                }

            })
        }
        return activeimageid;

    }
    getactivearguementimagefromresponse(myuser, imageid) {
        let activeimageid = false;
        if (myuser.hasOwnProperty("petitions")) {
            // eslint-disable-next-line
            myuser.petitions.petition.map(petition => {
                if (petition.hasOwnProperty("conflicts")) {
                    // eslint-disable-next-line
                    petition.conflicts.conflict.map(conflict => {
                        if (conflict.hasOwnProperty("arguements")) {
                            // eslint-disable-next-line
                            conflict.arguements.arguement.map(arguement => {
                                if (arguement.hasOwnProperty("images")) {
                                    // eslint-disable-next-line
                                    arguement.images.image.map(image => {
                                        if (image.imageid === imageid) {
                                            activeimageid = imageid;
                                        }
                                    })
                                }
                            })
                        }
                    })

                }

            })
        }
        return activeimageid;

    }
    async uploadconflictimage() {

        let myuser = this.getmyuser()
        if (myuser) {

            if (this.state.activeconflictid) {
                try {
                    let imageid = makeID(16);
                    let image = '';
                    let newImage = CreateImage(imageid, image);
                    let i = this.getactivepetitionposition();
                    let j = this.getactiveconflictposition();
                    let myconflict = this.getactiveconflict();
                    if (myconflict.hasOwnProperty("images")) {
                        myuser.petitions.petition[i].conflicts.conflict[j].images.image.push(newImage)
                    } else {
                        myuser.petitions.petition[i].conflicts.conflict[j].images = { image: [newImage] }
                    }
                    let conflictid = myconflict.conflictid;
                    let formData = new FormData();
                    let petition = this.getactivepetition();
                    let petitionid = petition.petitionid;
                    let myfile = document.getElementById("image-conflict");
                    formData.append("conflictimage", myfile.files[0]);
                    formData.append("myuser", JSON.stringify(myuser))
                    formData.append("conflictid", conflictid);
                    formData.append("imageid", imageid);
                    formData.append("petitionid", petitionid);
                    let response = await UploadConflictImage(formData);
                    console.log(response)
                    if (response.hasOwnProperty("myuser")) {

                        this.props.reduxUser(response.myuser)

                    }

                    if (response.hasOwnProperty("message")) {
                        let message = response.message;
                        if (response.hasOwnProperty("lastupdated")) {
                            message += `Last Updated ${formatUTCDateforDisplay(response.lastupdated)}`

                        }
                        this.setState({ message })
                    }
                } catch (err) {
                    alert(err)
                }

            }


        }



    }
    async uploadarguementimage() {
        console.log("uploadarguementimage");
        let myuser = this.getmyuser()
        if (myuser) {

            if (this.state.activeconflictid) {
                try {
                    let imageid = makeID(16);
                    let image = '';
                    let newImage = CreateImage(imageid, image);
                    let i = this.getactivepetitionposition();
                    let j = this.getactiveconflictposition();
                    let k = this.getactivearguementposition();
                    let myarguement = this.getactivearguement();
                    if (myarguement.hasOwnProperty("images")) {
                        myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].images.image.push(newImage)
                    } else {
                        myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].images = { image: [newImage] }
                    }

                    let arguementid = myarguement.arguementid;
                    let myconflict = this.getactiveconflict();
                    let conflictid = myconflict.conflictid;
                    let formData = new FormData();
                    let petition = this.getactivepetition();
                    let petitionid = petition.petitionid;
                    let myfile = document.getElementById("image-arguement");
                    formData.append("arguementimage", myfile.files[0]);
                    formData.append("myuser", JSON.stringify(myuser));
                    formData.append("arguementid", arguementid);
                    formData.append("conflictid", conflictid);
                    formData.append("imageid", imageid);
                    formData.append("petitionid", petitionid);
                    let response = await UploadArguementImage(formData);
                    console.log(response)
                    if (response.hasOwnProperty("myuser")) {

                        this.props.reduxUser(response.myuser)

                    }

                    if (response.hasOwnProperty("message")) {
                        let message = response.message;
                        if (response.hasOwnProperty("lastupdated")) {
                            message += `Last Updated ${formatUTCDateforDisplay(response.lastupdated)}`

                        }
                        this.setState({ message })
                    }
                } catch (err) {
                    alert(err)
                }

            }


        }


    }
    showarguementimagemenu(arguement) {
        let arguementid = this.state.activearguementid;
        if (arguement.arguementid === arguementid) {
            if (this.state.width > 1200) {
                return (
                    <div className="general-flex">
                        <div className="flex-3 showBorder">
                            <span><input type="file" id="image-arguement" /></span><span><button className="addImageIcon general-button" onClick={() => { this.uploadarguementimage() }}>{addImageIcon()}</button></span>
                        </div>
                        <div className="flex-4 showBorder">{this.imageslistfromarguement(arguement)}</div>

                        <div className="flex-1 showBorder">
                            <div className="general-container alignCenter">
                                <button className="general-button image-scroll" onClick={() => { this.movearguementimageup(arguement) }}>{scrollImageUp()}</button>
                            </div>
                            <div className="general-container">
                                <button className="general-button image-scroll" onClick={() => { this.movearguementimagedown(arguement) }}>{scrollImageDown()}</button>
                            </div>
                        </div>
                        <div className="flex-4 showBorder">&nbsp;</div>
                    </div>)

            } else if (this.state.width > 800) {
                return (
                    <div className="general-flex">
                        <div className="flex-3 showBorder">  <span><input type="file" id="image-arguement" /></span><span><button className="addImageIcon general-button" onClick={() => { this.uploadarguementimage() }}>{addImageIcon()}</button></span></div>
                        <div className="flex-4 showBorder">{this.imageslistfromarguement(arguement)}</div>
                        <div className="flex-1 showBorder">

                            <div className="general-container">
                                <button className="general-button image-scroll" onClick={() => { this.movearguementimageup(arguement) }}>{scrollImageUp()}</button>
                            </div>
                            <div className="general-container">
                                <button className="general-button image-scroll" onClick={() => { this.movearguementimagedown(arguement) }}>{scrollImageDown()}</button>
                            </div>

                        </div>
                    </div>)
            } else {
                return (
                    <div className="general-flex">
                        <div className="flex-1">

                            <div className="general-flex">
                                <div className="flex-1 showBorder"> <span><input type="file" id="image-arguement" /></span><span><button className="addImageIcon general-button" onClick={() => { this.uploadarguementimage() }}>{addImageIcon()}</button></span></div>
                                <div className="flex-2 showBorder">{this.imageslistfromarguement(arguement)}</div>
                            </div>

                            <div className="general-flex">
                                <div className="flex-1 showBorder alignCenter"><button className="general-button image-scroll"
                                    onClick={() => { this.movearguementimageup(arguement) }}

                                >{scrollImageLeft()}</button></div>
                                <div className="flex-1 showBorder alignCenter"><button className="general-button image-scroll"
                                    onClick={() => { this.movearguementimagedown(arguement) }}
                                >{scrollImageRight()}</button></div>
                            </div>

                        </div>

                    </div>)
            }
        } else {
            return;
        }
    }
    handleshowconflictmenu(conflictid) {
        if (this.state.activeconflictid === conflictid) {
            return (this.showconflicts());
        } else {
            return;
        }
    }
    showpetitionconflict(conflict, seq) {
        return (<div className="general-flex" key={conflict.conflictid}>
            <div className={`flex-1`}>

                <div className="general-flex">
                    <div className={`flex-1`} >
                        <span className="titleFont">Conflict#{seq + 1}</span><span onClick={event => { this.makeconflictactive(conflict.conflictid) }} className={`regularFont ${this.getactiveconflictdisplay(conflict.conflictid)}`}>{conflict.conflict}</span><span><button className="general-button remove-icon-small addLeftMargin" onClick={() => this.removeConflict(conflict.conflictid)}>{removeIconSmall()}</button></span>
                    </div>
                </div>
                {this.handleshowconflictmenu(conflict.conflictid)}
                {this.showconflictimagemenu(conflict)}
                {this.conflictimagedropdown(conflict)}

                {this.showarguementsbyconflict(conflict)}


            </div>
        </div>)

    }
    makearguementactive(arguementid) {



        if (this.state.activearguementid !== arguementid) {
            let petition = this.getactivepetition()
            let arguementkeys = this.getarguementkeysbyid(arguementid)

            let j = arguementkeys[0];

            let activeconflictid = false;

            if (petition.hasOwnProperty("conflicts")) {

                activeconflictid = petition.conflicts.conflict[j].conflictid;
                this.setState({ activearguementid: arguementid, activeconflictid })
            }


        } else {
            this.setState({ activearguementid: false })
        }

    }
    getarguementbyid(arguementid) {
        let arguements = false;

        if (this.state.activepetitionid) {
            let petition = this.getactivepetition();
            if (petition.hasOwnProperty("conflicts")) {
                // eslint-disable-next-line
                petition.conflicts.conflict.map((conflict, i) => {
                    if (conflict.hasOwnProperty("arguements")) {
                        // eslint-disable-next-line
                        conflict.arguements.arguement.map((arguement) => {
                            if (arguement.arguementid === arguementid) {
                                arguements = arguement;

                            }
                        })
                    }
                })
            }
        }

        return arguements;
    }
    getarguementkeysbyid(arguementid) {
        let key = [];
        console.log("getkeys", arguementid)
        if (this.state.activepetitionid) {
            let petition = this.getactivepetition();
            if (petition.hasOwnProperty("conflicts")) {
                // eslint-disable-next-line
                petition.conflicts.conflict.map((conflict, i) => {
                    if (conflict.hasOwnProperty("arguements")) {
                        // eslint-disable-next-line
                        conflict.arguements.arguement.map((arguement, j) => {
                            if (arguement.arguementid === arguementid) {
                                key[1] = j;
                                key[0] = i;

                            }
                        })
                    }
                })
            }
        }

        return key;
    }

    validateremovearguement(arguementid) {
        let validate = true;
        let arguement = this.getarguementbyid(arguementid)
        if (arguement.hasOwnProperty("images")) {
            validate = false;
        }
        return validate;
    }
    removeArguement(arguementid) {
        if (window.confirm('Press ok then Save to permenantly erase arguement')) {
            if (this.validateremovearguement(arguementid)) {
                if (this.props.myusermodel) {
                    let myuser = this.props.myusermodel;
                    if (this.state.activepetitionid) {

                        let i = this.getactivepetitionposition();
                        let arguementkeys = this.getarguementkeysbyid(arguementid)
                        let j = arguementkeys[0];
                        let k = arguementkeys[1];

                        myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement.splice(k, 1);
                        if (myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement.length === 0) {
                            delete myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement;
                            delete myuser.petitions.petition[i].conflicts.conflict[j].arguements;
                        }
                        this.props.reduxUser(myuser);

                        this.setState({ activearguementid: false })

                    }
                }
            } else {
                alert(`Please remove nested images prior to removing arguement`)

            }
        }

    }
    hidearguementimage(imageid) {

        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            let userkeys = this.getarguementimagekeys(imageid)
            let i = userkeys[0];
            let j = userkeys[1];
            let k = userkeys[2];
            let l = userkeys[3];


            let checkhideimage = this.checkhideimage(imageid);

            if (checkhideimage) {

                myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].images.image[l].display = false;
            } else {

                myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].images.image[l].display = true;
            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }


    }
    getarguementimagekeys(imageid) {
        let keys = [];
        let petition = this.getactivepetition();
        keys[0] = this.getactivepetitionposition();

        if (petition.hasOwnProperty("conflicts")) {
            // eslint-disable-next-line
            petition.conflicts.conflict.map((conflict, i) => {
                if (conflict.hasOwnProperty("arguements")) {
                    // eslint-disable-next-line
                    conflict.arguements.arguement.map((arguement, j) => {

                        if (arguement.hasOwnProperty("images")) {
                            // eslint-disable-next-line
                            arguement.images.image.map((image, k) => {
                                if (image.imageid === imageid) {
                                    keys[1] = i
                                    keys[2] = j
                                    keys[3] = k
                                }
                            })
                        }
                    })
                }
            })
        }
        return keys;

    }
    checkhideimage(imageid) {
        let checkhideimage = true;
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            let imagekeys = this.getarguementimagekeys(imageid)
            let i = imagekeys[0];
            let j = imagekeys[1];
            let k = imagekeys[2];
            let l = imagekeys[3];
            let image = myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement[k].images.image[l];
            if (image.hasOwnProperty("display")) {

                checkhideimage = image.display;
            }


        }
        return checkhideimage;
    }
    handlearguementimagebutton(imageid) {
        if (this.checkhideimage(imageid)) {
            return (
                <button className="general-button hide-image" onClick={() => this.hidearguementimage(imageid)}>
                    {hideImageIcon()}
                </button>)
        } else {
            return (<button className="general-button hide-image" onClick={() => this.hidearguementimage(imageid)}>
                {showImageIcon()}
            </button>)
        }

    }
    showarguementimage(image) {
        const showimage = [];
        const checkhideimage = this.checkhideimage(image.imageid);

        if (checkhideimage) {
            showimage.push(<div className="general-container alignCenter" key={image.imageid}>
                <img src={image.image} alt="conflict" className="conflict-image" />
            </div>)

        }

        return (<div className="general-flex" key={image.imageid}>
            <div className={`flex-1`}>
                <div className="general-container alignRight">
                    {this.handlearguementimagebutton(image.imageid)}
                </div>
                {showimage}
            </div>
        </div>)

    }
    showarguementimages(arguement) {
        let arguementimages = [];
        if (arguement.hasOwnProperty("images")) {
            // eslint-disable-next-line
            arguement.images.image.map(image => {

                arguementimages.push(this.showarguementimage(image))
            })
        }
        return arguementimages;

    }
    handleshowarguements(arguementid) {
        if (this.state.activearguementid === arguementid) {
            return (this.showarguements())
        }
    }
    showpetitionarguement(arguement, i) {

        return (
            <div className="general-flex" key={arguement.arguementid}>
                <div className="flex-1">


                    <div className="general-flex addLeftMargin">
                        <div className="flex-1">
                            <span className="titleFont">Arguement#{i + 1}</span> <span onClick={() => { this.makearguementactive(arguement.arguementid) }} className={`regularFont ${this.getactivearguementdisplay(arguement.arguementid)}`}>{arguement.arguement}</span><span><button className="general-button remove-icon-small addLeftMargin" onClick={() => { this.removeArguement(arguement.arguementid) }}>{removeIconSmall()}</button></span>
                        </div>
                    </div>
                    {this.handleshowarguements(arguement.arguementid)}
                    {this.showarguementimagemenu(arguement)}
                    {this.showarguementimages(arguement)}
                </div>
            </div>

        )
    }

    showpetition() {
        let showpetition = [];
        let petition = this.getactivepetition();
        if (petition.hasOwnProperty("conflicts")) {
            // eslint-disable-next-line
            petition.conflicts.conflict.map((conflict, i) => {
                showpetition.push(this.showpetitionconflict(conflict, i));


            })



        }
        return showpetition;
    }

    showsavebutton() {
        const petition = new Petition();
        return (<div className="general-flex">
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
        </div>)
    }
    render() {
        return (<div className="general-flex">
            <div className="flex-1">

                <div className="general-flex">
                    <div className="flex-1 noBorder">

                        <div className="general-container titleFont alignCenter">
                            {this.getmyuser().userid}/ petitions
                        </div>
                        {this.showpetitionid()}
                        <div className="regularFont general-container">Petition <br /> <input type="text" value={this.getpetition()} onChange={event => { this.handlepetition(event.target.value) }} className="general-field regularFont addLeftMargin" /></div>
                        <div className="regularFont general-container">Versus <br /> <input type="text" value={this.getversus()} onChange={event => { this.handleversus(event.target.value) }} className="general-field regularFont addLeftMargin" /></div>
                    </div>
                </div>
                <div className="general-flex">
                    <div className="flex-1 noBorder">
                        {this.showpetitionids()}
                    </div>
                </div>
                {this.showconflicts()}

                {this.showarguements()}

                {this.showpetition()}



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

export default connect(mapStateToProps, actions)(Petitions);