import React from 'react';
import { CheckUserID, CheckEmailAddress } from './actions/api'
import { SavePetitions } from './actions/api';
import { formatUTCDateforDisplay } from './functions';
import { saveAllPetitionsIcon } from './svg';

class Petition {
    getgocheck() {
        if (this.state.width > 1200) {
            return ({
                width: '69px',
                height: '69px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '59px',
                height: '59px'
            })
        } else {
            return ({
                width: '49px',
                height: '49px'
            })
        }

    }
    getRegularFont() {

        if (this.state.width > 800) {
            return ({ fontSize: '30px' })
        } else {
            return ({ fontSize: '24px' })
        }

    }

    getHeaderFont() {

        if (this.state.width > 800) {
            return ({ fontSize: '40px' })
        } else {
            return ({ fontSize: '30px' })
        }

    }
    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("userid")) {
                user = this.props.myusermodel;
            }

        }
        return user;
    }
    getloginicon() {
        if (this.state.width > 1200) {
            return ({
                width: '478px',
                height: '105px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '344px',
                height: '84px'
            })
        } else {
            return ({
                width: '170px',
                height: '62px'
            })
        }
    }
    getloginbuttonheight() {
        if (this.state.width > 1200) {
            return ({
                width: '279px',
                height: '63px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '210px',
                height: '51px'
            })
        } else {
            return ({
                width: '148px',
                height: '40px'
            })
        }

    }
    validatepetitions() {
        const petition = new Petition();
        const myuser = petition.getuser.call(this)
        let validate = {};
        validate.validate = true;
        validate.message = ''
        if (myuser.hasOwnProperty("petitions")) {
            // eslint-disable-next-line
            myuser.petitions.petition.map(petition => {
                if (petition.hasOwnProperty("invalid")) {
                    validate.validate = false;
                    validate.message = `Petition URL ${petition.url} is taken `;
                }
            })
        }
        return validate;
    }

    async saveallpetition() {
        const petition = new Petition();
        const myuser = petition.getuser.call(this)
        const validate = petition.validatepetitions.call(this)
        if (myuser && validate.validate) {
            try {

                let response = await SavePetitions({ myuser });
                console.log(response)
                if (response.hasOwnProperty("myuser")) {
                    this.props.reduxUser(response.myuser)
                }

                if (response.hasOwnProperty("allusers")) {
                    this.props.reduxAllUsers(response.allusers)
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
        } else {
            this.setState({ message: validate.message })
        }
    }
    async checkuserid(userid) {
        if (userid) {
            try {
                let response = await CheckUserID(userid);
                console.log(response)
                if (response.hasOwnProperty("invalid")) {
                    this.setState({ checkuserid: false, message: response.invalid })
                } else if (response.hasOwnProperty("valid")) {
                    this.setState({ checkuserid: true, message: '' })
                }


            } catch (err) {
                alert(err)
            }
        }

    }
    async checkemailaddress(emailaddress) {
        if (emailaddress) {
            try {
                let response = await CheckEmailAddress(emailaddress)
                console.log(response)
                if (response.hasOwnProperty("invalid")) {
                    this.setState({ checkemailaddress: false, message: response.invalid })
                } else if (response.hasOwnProperty("valid")) {
                    this.setState({ checkemailaddress: true, message: '' })
                }

            } catch (err) {
                alert(err)
            }

        }

    }
    getRegisterNow() {
        if (this.state.width > 1200) {
            return ({
                width: '389px',
                height: '89px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '258px',
                height: '73px'
            })
        } else {
            return ({
                width: '136px',
                height: '55px'
            })
        }
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

}


export default Petition;
