export function formatUTCDateforDisplay(timein) {
    //let timein = '2019-05-22 19:33:22'
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
    let hours = datein.getHours();
    let ampm = "";
    if (hours > 12) {
        hours = hours - 12;
        ampm = 'pm'
    } else {
        ampm = 'am'
    }

    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    let day = datein.getDate();
    let month = datein.getMonth() + 1;
    let year = datein.getFullYear();
    return (`${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`)
}
export function MyUserModel(userid, client, clientid, firstname, lastname, gender, emailaddress, organization, profileurl) {
    return { userid, client, clientid, firstname, lastname, gender, emailaddress, organization, profileurl }
}
export function CreateConflict(conflictid, petitionid, conflict) {
    return ({ conflictid, petitionid, conflict })

}
export function CreatePetition(petitionid, petition, versus) {
    return ({ petitionid, petition, versus })
}
export function CreateArguement(arguementid, arguement) {
    return ({ arguementid, arguement })
}
export function CreateLike(likeid, like, userid) {
    return ({ likeid, like, userid })
}
export function CreateComment(commentid, comment, userid) {
    return ({ commentid, comment, userid })
}
export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function MyUser() {
    let myuser = {
        myuser: {
            userid: "mazen",
            firstname: "Mazen",
            lastname: "Khenaisser",
            gender: "male",
            organization: "petitions.civilengineer.io",
            emailaddress: "mazen@civilengineer.io",
            profileurl: "https://goandhireme.s3-us-west-1.amazonaws.com/7AFWYmazen.jpg",
            client: "apple",
            clientid: "000353.66d2a1610de24944b898df602ab5e7a7.0305",
            petitions: {
                petition: [
                    {
                        petitionid: "updated id it doesnt matter",
                        petition: "Arbitrationnnn",
                        versus: "The Federal Bureau of Reclamationnn",
                        conflicts: {
                            conflict: [
                                {
                                    conflict: "My First Conflict Updated with Response and message",
                                    conflictid: "xxxxyyyyzzzzwwww",
                                    arguements: {
                                        arguement: [
                                            {
                                                arguementid: "ppppiiiieeeessss",
                                                arguement: "They did this so they can lie and be left unaccoutable for how I was treated in the work place."
                                            },
                                            {
                                                arguementid: "H35ZQXAUR4IZPDA5",
                                                arguement: "Arguement 2 is now updated"
                                            }
                                        ]
                                    }
                                },
                                {
                                    conflict: "Conflict 2",
                                    conflictid: "K5YDV4ZL6UF5OH9B"
                                }
                            ]
                        },
                        likes: {
                            like: [
                                {
                                    likeid: "V29PS2AB6K3SNUJ4",
                                    like: "support",
                                    userid: "mazen"
                                }
                            ]
                        },
                        comments: {
                            comment: [
                                {
                                    commentid: "K4JCUBCZCIQRA19L",
                                    comment: "Go and Get it",
                                    userid: "mazen"
                                }
                            ]
                        }
                    }
                ]
            },
            allusers: {
                myuser: [
                    {
                        userid: "mazen",
                        firstname: "Mazen",
                        lastname: "Khenaisser",
                        gender: "male",
                        organization: "petitions.civilengineer.io",
                        emailaddress: "mazen@civilengineer.io",
                        profileurl: "https://goandhireme.s3-us-west-1.amazonaws.com/7AFWYmazen.jpg",
                        client: "apple",
                        clientid: "000353.66d2a1610de24944b898df602ab5e7a7.0305",
                        petitions: {
                            petition: [
                                {
                                    petitionid: "updated id it doesnt matter",
                                    petition: "Arbitrationnnn",
                                    versus: "The Federal Bureau of Reclamationnn",
                                    conflicts: {
                                        conflict: [
                                            {
                                                conflict: "My First Conflict Updated with Response and message",
                                                conflictid: "xxxxyyyyzzzzwwww",
                                                arguements: {
                                                    arguement: [
                                                        {
                                                            arguementid: "ppppiiiieeeessss",
                                                            arguement: "They did this so they can lie and be left unaccoutable for how I was treated in the work place."
                                                        },
                                                        {
                                                            arguementid: "H35ZQXAUR4IZPDA5",
                                                            arguement: "Arguement 2 is now updated"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                conflict: "Conflict 2",
                                                conflictid: "K5YDV4ZL6UF5OH9B"
                                            }
                                        ]
                                    },
                                    likes: {
                                        like: [
                                            {
                                                likeid: "V29PS2AB6K3SNUJ4",
                                                like: "support",
                                                userid: "mazen"
                                            }
                                        ]
                                    },
                                    comments: {
                                        comment: [
                                            {
                                                commentid: "K4JCUBCZCIQRA19L",
                                                comment: "Go and Get it",
                                                userid: "mazen"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
    return myuser.myuser
}