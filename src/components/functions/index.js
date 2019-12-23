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
export function CreateImage(imageid, image, display) {
    return ({ imageid, image })
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
            profileurl: "https://civilengineer-io.s3.amazonaws.com/RB8fnmazen.jpg",
            client: "apple",
            clientid: "000353.66d2a1610de24944b898df602ab5e7a7.0305",
            petitions: {
                petition: [
                    {
                        petitionid: "arbitrationow",
                        petition: "Grievance to Protect Employee Rights in the Workplace",
                        versus: "The Federal Bureau of Reclamation",
                        conflicts: {
                            conflict: [
                                {
                                    conflict: "Employees may remove themselves from a hostile work environment when discrimination is occurring and file a grievance without the penalty of loss of entitlement for no longer being an employee.",
                                    conflictid: "8E87OZHGNXR4DJET",
                                    arguements: {
                                        arguement: [
                                            {
                                                arguementid: "PBCN3FLZ6Q2MDY04",
                                                arguement: "Language in the contract allows a grievance to continue under these circumstances."
                                            }
                                        ]
                                    }
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
                        profileurl: "https://civilengineer-io.s3.amazonaws.com/RB8fnmazen.jpg",
                        client: "apple",
                        clientid: "000353.66d2a1610de24944b898df602ab5e7a7.0305",
                        petitions: {
                            petition: [
                                {
                                    petitionid: "arbitrationow",
                                    petition: "Grievance to Protect Employee Rights in the Workplace",
                                    versus: "The Federal Bureau of Reclamation",
                                    conflicts: {
                                        conflict: [
                                            {
                                                conflict: "Employees may remove themselves from a hostile work environment when discrimination is occurring and file a grievance without the penalty of loss of entitlement for no longer being an employee.",
                                                conflictid: "8E87OZHGNXR4DJET",
                                                arguements: {
                                                    arguement: [
                                                        {
                                                            arguementid: "PBCN3FLZ6Q2MDY04",
                                                            arguement: "Language in the contract allows a grievance to continue under these circumstances."
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
                ]
            }
        }
    }
    return myuser.myuser
}