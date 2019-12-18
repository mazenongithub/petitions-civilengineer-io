export async function LoginUser(values) {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/users/login`;
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })

}
export async function SaveComments(values) {
    let userid = values.myuser.userid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/${userid}/comments`;
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })

}
export async function SavePetitions(values) {
    let userid = values.myuser.userid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/${userid}/userendpoint`;


    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function LoadAllUsers() {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/users/getallusers`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err;
                })
            }
            else {
                let err = { errorMessage: 'Please try again later, server is not responding' };
                throw err;
            }
        }

        return resp.json();
    })
}

export async function UploadProfileImage(formdata, userid) {


    var APIURL = `${process.env.REACT_APP_SERVER_API}/${userid}/uploadprofileimage`

    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        body: formdata
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function CheckUserLogin() {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/users/checkuser`
    console.log(APIURL)

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err;
                })
            }
            else {
                let err = { errorMessage: 'Please try again later, server is not responding' };
                throw err;
            }
        }

        return resp.json();
    })
}