import React, { Component } from 'react';
import * as actions from './actions'
import { connect } from 'react-redux';
import { LoadAllUsers } from './actions/api';
import { yesIcon, noIcon, emptyBox, submitIcon, removeIconSmall } from './svg';
import { CreateLike, CreateComment, makeID } from './functions';
class ShowPetition extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0, message: 'Click Submit to Save Likes and Comments', comment: '', activecommentid: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions)
        if (!this.props.allusers.hasOwnProperty("myuser")) {
            this.loadallmyusers()
        }

    }
    getuserbypetitionid() {
        let user = {};
        let petitionid = this.props.match.params.petitionid;
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
                                user = myuser;
                            }
                        })
                    }
                })
            }
        }
        return user;
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
    getpetition() {
        let petitions = {};
        let petitionid = this.props.match.params.petitionid;

        if (this.props.allusers) {
            if (this.props.allusers.hasOwnProperty("myuser")) {
                let myusers = this.props.allusers.myuser;
                console.log("myusers", myusers)
                // eslint-disable-next-line
                myusers.map(myuser => {
                    if (myuser.hasOwnProperty("petitions")) {
                        // eslint-disable-next-line
                        myuser.petitions.petition.map(petition => {
                            if (petition.petitionid === petitionid) {
                                petitions = petition;
                            }
                        })
                    }
                })
            }
        }
        return petitions;
    }
    showpetitionconflict(conflict, seq) {
        return (<div className="general-flex">
            <div className={`flex-1`}>
                <span className="titleFont">Conflict#{seq + 1}</span><span className={`regularFont`}>{conflict.conflict}</span>
            </div>
        </div>)

    }
    showpetitionarguement(arguement, i) {

        return (<div className="general-flex">
            <div className="flex-1">
                <span className="titleFont">Arguement#{i + 1}</span> <span className={`regularFont`}>{arguement.arguement}</span>
            </div>
        </div>)
    }
    showpetition() {
        let showpetition = [];
        let petition = this.getpetition();
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
    getuserkeysfrompetition() {
        let userkey = [];
        let petitionid = this.props.match.params.petitionid;
        if (this.props.allusers) {
            if (this.props.allusers.hasOwnProperty("myuser")) {

                let myusers = this.props.allusers.myuser;
                // eslint-disable-next-line
                myusers.map((myuser, i) => {
                    if (myuser.hasOwnProperty("petitions")) {
                        // eslint-disable-next-line
                        myuser.petitions.petition.map((petition, j) => {
                            if (petition.petitionid === petitionid) {
                                userkey[0] = i;
                                userkey[1] = j;
                            }
                        })
                    }

                })
            }
        }
        return userkey;
    }


    getlikekeyfromuserid() {
        let likekey = false;
        if (this.props.myusermodel) {
            let userid = this.props.myusermodel.userid;
            let petition = this.getpetition();
            if (petition.hasOwnProperty("likes")) {
                // eslint-disable-next-line
                petition.likes.like.map((like, i) => {
                    if (like.userid === userid) {
                        likekey = i + 1;
                    }
                })
            }
        }
        return likekey;
    }
    getuserlike() {
        let k = this.getlikekeyfromuserid() - 1;
        let petition = this.getpetition();
        let like = petition.likes.like[k];
        return like;
    }

    handleyes() {

        let userkeys = this.getuserkeysfrompetition();
        let i = userkeys[0];
        let j = userkeys[1];
        let k = this.getlikekeyfromuserid();
        let allusers = this.props.allusers;
        let value = ''

        if (k) {
            k = k - 1;
            // if you already like it then switch it to ''
            let like = this.getuserlike();
            console.log(like)
            if (like.like === 'supported') {
                value = ''

            } else {
                value = 'supported'
            }
            allusers.myuser[i].petitions.petition[j].likes.like[k].like = value;
            this.props.reduxAllUsers(allusers);
            this.setState({ render: 'render' })



        } else {
            // if you dont like it add it
            let likeid = makeID(16)
            value = 'supported';
            let userid = this.props.myusermodel.userid;

            let petitions = this.getpetition()
            let newlike = CreateLike(likeid, value, userid)
            if (petitions.hasOwnProperty("likes")) {
                allusers.myuser[i].petitions.petition[j].likes.like = newlike;
                this.props.reduxAllUsers(allusers);
                this.setState({ render: 'render' })

            } else {
                let likes = { like: [newlike] }
                allusers.myuser[i].petitions.petition[j].likes = likes;
                this.props.reduxAllUsers(allusers);
                this.setState({ render: 'render' })
            }


        }




        // if there are no likes than create one



    }

    checkyesicon() {
        let checkyesicon = false;
        if (this.props.myusermodel) {
            let userid = this.props.myusermodel.userid;
            let petition = this.getpetition();
            console.log(petition)
            if (petition.hasOwnProperty("likes")) {

                if (petition.likes.hasOwnProperty("like") && petition.likes.like.hasOwnProperty("length")) {
                    // eslint-disable-next-line
                    petition.likes.like.map(like => {
                        if (like.userid === userid) {
                            if (like.like === 'supported') {
                                checkyesicon = true;
                            }
                        }
                    })
                }
            }
        }
        return checkyesicon;
    }


    handleyesicon() {

        if (this.checkyesicon()) {
            return (yesIcon())
        } else {
            return (emptyBox())

        }
    }
    handleno() {
        let userkeys = this.getuserkeysfrompetition();
        let i = userkeys[0];
        let j = userkeys[1];
        let k = this.getlikekeyfromuserid();
        let allusers = this.props.allusers;
        let value = ''

        if (k) {
            k = k - 1;
            // if you already like it then switch it to ''
            let like = this.getuserlike();

            if (like.like === 'against') {
                value = ''

            } else {
                value = 'against'
            }
            allusers.myuser[i].petitions.petition[j].likes.like[k].like = value;
            this.props.reduxAllUsers(allusers);
            this.setState({ render: 'render' })



        } else {
            // if you dont like it add it
            let likeid = makeID(16)
            value = 'against';
            let userid = this.props.myusermodel.userid;
            let petitionid = this.props.match.params.petitionid;
            let conflictid = "";
            let arguementid = "";
            let petitions = this.getpetition()
            let newlike = CreateLike(likeid, value, userid, petitionid, conflictid, arguementid)
            if (petitions.hasOwnProperty("likes")) {
                allusers.myuser[i].petitions.petition[j].likes.like = newlike;
                this.props.reduxAllUsers(allusers);
                this.setState({ render: 'render' })

            } else {
                let likes = { like: [newlike] }
                allusers.myuser[i].petitions.petition[j].likes = likes;
                this.props.reduxAllUsers(allusers);
                this.setState({ render: 'render' })
            }


        }




        // if there are no likes than create one

    }
    checknoicon() {
        let checknoicon = false;
        if (this.props.myusermodel) {
            let userid = this.props.myusermodel.userid;
            let petition = this.getpetition();
            console.log(petition)
            if (petition.hasOwnProperty("likes")) {

                if (petition.likes.hasOwnProperty("like") && petition.likes.like.hasOwnProperty("length")) {
                    // eslint-disable-next-line
                    petition.likes.like.map(like => {
                        if (like.userid === userid) {
                            if (like.like === 'against') {
                                checknoicon = true;
                            }
                        }
                    })
                }
            }
        }
        return checknoicon;
    }
    handlenoicon() {
        if (this.checknoicon()) {
            return (noIcon())
        } else {
            return (emptyBox())

        }

    }

    getactivecommentposition() {
        let position = false;
        if (this.state.activecommentid) {
            let commentid = this.state.activecommentid;
            let petition = this.getpetition();
            if (petition.hasOwnProperty("comments")) {
                // eslint-disable-next-line
                petition.comments.comment.map((comment, i) => {
                    if (comment.commentid === commentid) {
                        position = i;
                    }
                })
            }
        }
        return position;
    }

    handleComment(comment) {
        this.setState({ comment });
        if (this.props.allusers.hasOwnProperty("myuser")) {
            let allusers = this.props.allusers;
            let userkeys = this.getuserkeysfrompetition();
            let i = userkeys[0];
            let j = userkeys[1];
            if (this.state.activecommentid) {

                let k = this.getactivecommentposition();
                allusers.myuser[i].petitions.petition[j].comments.comment[k].comment = comment;
                this.props.reduxAllUsers(allusers);
                this.setState({ comment: '' })

            } else {
                this.setState({ comment });
                let commentid = makeID(16);
                let userid = this.getuserbypetitionid().userid;
                let newcomment = CreateComment(commentid, comment, userid);
                let petition = this.getpetition();
                if (petition.hasOwnProperty("comments")) {
                    allusers.myuser[i].petitions.petition[j].comments.comment.push(newcomment)
                } else {
                    let comments = { comment: [newcomment] }
                    allusers.myuser[i].petitions.petition[j].comments = comments;

                }
                this.props.reduxAllUsers(allusers);
                this.setState({ activecommentid: commentid, comment: '' })


            }

        }
        // check to see if user is logged in

        // check to see if user already commented

        // if so update his comment

        // otherwise check to see if petions have any comments
        // if they do push if not create new one



    }
    getactivecomment() {
        let petition = this.getpetition();
        let commentid = this.state.activecommentid;
        let comments = {};
        if (petition.hasOwnProperty("comments")) {
            // eslint-disable-next-line
            petition.comments.comment.map(comment => {
                if (comment.commentid === commentid) {
                    comments = comment;
                }
            })
        }
        return comments;
    }

    getcomment() {
        console.log("Getcomment")
        if (this.state.activecommentid) {
            let comment = this.getactivecomment();
            return comment.comment;
        } else {
            return this.state.comment;

        }



    }
    petitioncommentbox() {
        if (this.state.width > 1200) {
            return (
                <div className="general-flex">
                    <div className="flex-1 regularFont">

                        <div className="general-flex">
                            <div className="flex-1 regularFont">
                                Comments
                </div>
                            <div className="flex-6 regularFont">
                                <textarea className="general-field regularFont general-text"
                                    onChange={event => { this.handleComment(event.target.value) }}
                                    value={this.getcomment()}>
                                </textarea>
                            </div>
                        </div>

                        <div className="general-flex">
                            <div className="flex-3 regularFont">
                                {this.state.message}
                            </div>
                            <div className="flex-1 showBorder alignRight">

                                <button className="submit-button general-button">{submitIcon()}</button>
                            </div>
                        </div>

                    </div>
                </div>)
        } else {
            return (
                <div className="general-flex">
                    <div className='flex-1'>

                        <div className="general-flex">
                            <div className='flex-1'>
                                <div className='general-container regularFont'> Comments</div>
                                <div className='general-container regularFont'>
                                    <textarea className="general-field regularFont general-text"
                                        onChange={event => { this.handleComment(event.target.value) }}
                                        value={this.getcomment()}>
                                        <div className="general-container">{this.getcomment()}</div>
                                    </textarea>
                                </div>

                                <div className="general-flex">
                                    <div className="flex-2 regularFont">
                                        {this.state.message}
                                    </div>
                                    <div className="flex-1 showBorder alignRight">

                                        <button className="submit-button general-button">{submitIcon()}</button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            )


        }
    }
    removeComment() {

    }
    getuserbyuserid(userid) {
        let user = {};
        if (this.props.allusers) {
            if (this.props.allusers.hasOwnProperty('myuser')) {

                let allusers = this.props.allusers;
                // eslint-disable-next-line
                allusers.myuser.map(myuser => {
                    if (myuser.userid === userid) {
                        user = myuser;
                    }
                })
            }
        }
        return user;
    }
    getuserbycommentid(commentid) {
        let user = {};
        let userid = "";
        let petition = this.getpetition();
        if (petition.hasOwnProperty("comments")) {
            // eslint-disable-next-line
            petition.comments.comment.map(comment => {
                if (comment.commentid === commentid) {
                    userid = comment.userid;
                    user = this.getuserbyuserid(userid)
                }
            })
        }
        return user;
    }
    showpetitioncomment(comment) {
        const user = this.getuserbycommentid(comment.commentid);
        const username = `${user.firstname} ${user.lastname}`
        if (this.state.width > 1200) {
            return (<div className="general-flex">
                <div className="flex-1">
                    <div className="picture-icon-container showBorder">&nbsp;</div>
                </div>
                <div className="flex-4 regularFont">

                    {comment.comment}  <span className="alignLeft">by {username}</span>
                </div>
                <div className="flex-1">
                    <button className="general-button remove-icon-small" onClick={() => this.removeComment(comment.commentid)}>
                        {removeIconSmall()}
                    </button>
                </div>
            </div>)

        } else if (this.state.width > 800) {
            return (<div className="general-flex">
                <div className="flex-1">
                    <div className="picture-icon-container showBorder">&nbsp;</div>
                </div>
                <div className="flex-5 regularFont">

                    {comment.comment}  <span className="alignLeft">by {username}</span>
                </div>
                <div className="flex-1">
                    <button className="general-button remove-icon-small" onClick={() => this.removeComment(comment.commentid)}>
                        {removeIconSmall()}
                    </button>
                </div>
            </div>)

        } else {
            return (<div className="general-flex">
                <div className="flex-1">
                    <div className="picture-icon-container showBorder">&nbsp;</div>
                </div>
                <div className="flex-3 regularFont">
                    {comment.comment}  <span className="alignLeft">by {username} </span>
                    <button className="general-button remove-icon-small addMarginLeft" onClick={() => this.removeComment(comment.commentid)}>
                        {removeIconSmall()}
                    </button>
                </div>

            </div>)
        }
    }
    loadpetitioncomments() {
        let petition = this.getpetition();
        let comments = [];
        if (petition.hasOwnProperty("comments")) {
            // eslint-disable-next-line
            petition.comments.comment.map(comment => {
                comments.push(this.showpetitioncomment(comment))
            })
        }
        return comments;
    }
    render() {

        const petition = this.getpetition();
        const user = this.getuserbypetitionid();
        const username = `${user.firstname} ${user.lastname}`
        console.log(petition)
        return (
            <div className="general-flex">
                <div className="flex-1">
                    <div className="general-flex">
                        <div className="flex-1">
                            <div className="general-container titleFont alignCenter">
                                Petition/{petition.petitionid}
                            </div>
                            <div className="general-container titleFont alignCenter">
                                {petition.petition}
                            </div>
                            <div className="general-container titleFont alignCenter">
                                Versus <br />
                                {petition.versus}
                            </div>
                            <div className="general-container titleFont alignCenter">
                                by {username}
                            </div>
                        </div>
                    </div>

                    {this.showpetition()}
                    <div className="general-flex">
                        <div className="flex-1 regularFont">
                            <button onClick={event => { this.handleyes() }} className="general-button selection-box">
                                {this.handleyesicon()}
                            </button>
                            <span className='addLeftMargin'>Support</span>
                        </div>
                        <div className="flex-1 regularFont">

                            <button onClick={event => { this.handleno() }} className="general-button selection-box">
                                {this.handlenoicon()}
                            </button>
                            <span className='addLeftMargin'> Against</span>
                        </div>
                    </div>

                    {this.petitioncommentbox()}
                    {this.loadpetitioncomments()}

                </div>
            </div>
        )
    }


}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        allusers: state.allusers
    }
}

export default connect(mapStateToProps, actions)(ShowPetition);