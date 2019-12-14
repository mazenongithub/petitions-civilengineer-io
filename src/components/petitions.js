import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';
import { removeIconSmall, petitionidicon, redLeft, redRight, blueLeft, blueRight, saveAllPetitionsIcon } from './svg';
import { CreateConflict, CreatePetition, makeID, CreateArguement, formatUTCDateforDisplay } from './functions';
import { SavePetitions } from './actions/api';


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
            activeimageid: '',
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
        let myusermodel = {};
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
            console.log(petition)
            if (petition.hasOwnProperty("conflicts")) {
                conflictid = petition.conflicts.conflict[0].conflictid;
            }

        } else {
            console.log(activepetitionid)
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
            console.log(activeconflictid, activearguementid)
            this.setState({ activepetitionid, activeconflictid, activearguementid })
        } else {
            this.setState({ activepetitionid: false, activeconflictid: false, activearguementid: false })
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
                    <button className="general-button remove-icon-small">
                        {removeIconSmall()}
                    </button>
                    <div className="general-container titleFont">{petition.petitionid}</div>
                </div>

            </div>

        </div>)

    }
    showpetitionmedium(petition) {
        return (
            <div className="double-grid-container">
                <div className="general-flex">
                    <div className="flex-1 noBorder alignCenter">
                        <button className="general-button showpetitionicon" onClick={event => { this.makepetitionactive(petition.petitionid) }}>
                            {petitionidicon(petition.petitionid)}
                        </button>
                    </div>
                    <div className="flex-2 noBorder">
                        <button className="general-button remove-icon-small">
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
                            <button className="general-button remove-icon-small">
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
                        petitionslarge.push(<div className="double-grid-container noBorder">&nbsp;</div>)
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
                        myuser.petitions.petition[i].conflicts.conflict[i].arguements.arguement[k].arguement = arguement
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else {
                        this.setState({ arguement })
                        let conflict = this.getactiveconflict();
                        let arguementid = makeID(16);
                        let newarguement = CreateArguement(arguementid, arguement)
                        if (conflict.hasOwnProperty("arguements")) {
                            myuser.petitions.petition[i].conflicts.conflict[j].arguements.arguement.push(newarguement)

                        } else {
                            let arguements = { arguement: [{ newarguement }] }
                            myuser.petitions.petition[i].conflicts.conflict[j].arguments = arguements;

                        }
                        this.props.reduxUser(myuser)
                        this.setState({ activearguementid: newarguement.arguementid, render: 'render' })


                    }
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
                    this.setState({ render: 'render' })

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
            return
        }


    }
    showarguements() {
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
                                            <div className="flex-1 noBorder titleFont alignCenter">
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

                                <input type="text" value={this.getarguement()} onChange={event => { this.handleArguement(event.target.value) }} className="general-field regularFont" />
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
    handeactiveconflictposition() {
        if (this.state.activeconflictid) {
            return (this.getactiveconflictposition() + 1)

        } else {
            return "";
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
        let arguement = {};
        if (conflict.hasOwnProperty("arguements")) {
            arguement = conflict.arguements.arguement[0];
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

    showconflicts() {
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
                                            <div className="flex-1 noBorder titleFont alignCenter">
                                                {this.handeactiveconflictposition()}
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

                                <input type="text" value={this.getconflict()} onChange={event => { this.handleConflict(event.target.value) }} className="general-field regularFont" />
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
                                        {this.handeactiveconflictposition()}
                                    </div>
                                    <div className="regularFont flex-1 noBorder alignRight">
                                        <button className="general-button conflictarrow" onClick={() => { this.reorderconflictup() }}>
                                            {redRight()}
                                        </button> &nbsp;
                                    </div>
                                </div>
                            </div>

                        </div>



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
            this.setState({ activeconflictid: conflictid, activearguementid: '' })
        } else {
            this.setState({ activeconflictid: '', activearguementid: '' })
        }
    }

    showpetitionconflict(conflict, seq) {
        return (<div className="general-flex" onClick={event => { this.makeconflictactive(conflict.conflictid) }}>
            <div className="flex-1">
                <span className="titleFont">Conflict#{seq + 1}</span><span className="regularFont">{conflict.conflict}</span>
            </div>
        </div>)

    }
    makearguementactive(arguementid) {
        if (this.state.activearguementid !== arguementid) {
            this.setState({ activearguementid: arguementid })
        } else {
            this.setState({ activearguementid: false })
        }
    }
    showpetitionarguement(arguement, i) {

        return (<div className="general-flex" onClick={() => { this.makearguementactive(arguement.arguementid) }}>
            <div className="flex-1">
                <span className="titleFont">Arguement#{i + 1}</span> <span className="regularFont">{arguement.arguement}</span>
            </div>
        </div>)
    }

    showpetition() {
        let showpetition = [];
        let petition = this.getactivepetition();
        if (petition.hasOwnProperty("conflicts")) {
            // eslint-disable-next-line
            petition.conflicts.conflict.map((conflict, i) => {
                showpetition.push(this.showpetitionconflict(conflict, i));

                if (conflict.hasOwnProperty("arguements")) {
                    // eslint-disable-next-line
                    conflict.arguements.arguement.map((arguement, i) => {
                        showpetition.push(this.showpetitionarguement(arguement, i))
                    })
                }
            })



        }
        return showpetition;
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
                {this.showpetition()}
                {this.showarguements()}

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



            </div>
        </div>)
    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel
    }
}

export default connect(mapStateToProps, actions)(Petitions);