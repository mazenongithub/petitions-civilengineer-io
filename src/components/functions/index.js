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
export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}