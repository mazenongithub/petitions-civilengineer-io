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