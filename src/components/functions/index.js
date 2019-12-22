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
export function CreateImage(imageid, image) {
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
                        petition: "Grievance in Support of Employee Rights in the Workplace",
                        versus: "The Federal Bureau of Reclamation",
                        conflicts: {
                            conflict: [
                                {
                                    conflict: "I am owed representation, or compensation in having had received representation, for the grievance that I filed against the Federal Bureau of Reclamation.",
                                    conflictid: "xxxxyyyyzzzzwwww",
                                    arguements: {
                                        arguement: [
                                            {
                                                arguementid: "7S93E7MD21ECWPT7",
                                                arguement: "Language in the contract allows a grievance to continue after termination of employment because of continuous harassment in the workplace. Prior to this I was continuously harassed. I received permission from the Regional Office after removing myself. This grievance was accepted by the Regional Office on July 25, 2014",
                                                images: {
                                                    image: [
                                                        {
                                                            image: "https://civilengineer-io.s3.amazonaws.com/a1part2.jpg",
                                                            imageid: "qqqqwwwweeeedddd"
                                                        },
                                                        {
                                                            image: "https://civilengineer-io.s3.amazonaws.com/a1part1.jpg",
                                                            imageid: "ttttyyyyaaaabbbb"
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                arguementid: "9NTZN0MQLA9RYU71",
                                                arguement: "Previous to this I received an offer for arbitration from the Federal Agency. There is no way my representation can be denied since this is true."
                                            },
                                            {
                                                arguementid: "6OWKN20FZIWLQJR4",
                                                arguement: "Previous to this I received permission from the EEO Office to be able to file a grievance. Given this opportunity I elected to file a grievance because of Employee Rights in the workplace."
                                            },
                                            {
                                                arguementid: "9E2JZPOQC3IGOCUN",
                                                arguement: "Previous to this I was being treated like an animal in the work place after I refused to sign the Direct Order. I acquire charges for termination and it was the intent of the Agency to make the language effective when I refused to sign it."
                                            },
                                            {
                                                arguementid: "GQ6I66SUFZUBGYFD",
                                                arguement: "Previous to this I was continuously being forcing to sign my name under a threat of termination to receive work assignments. Language in the contract, fails to mention Direct Orders, but in fact they are illegal against Employee Rights in the Workplace. No Federal Employee should have to accept work assignments having to sign under a threat of termination. Compensation would allow them to ignore the adverse conditions they were continuously exposing me to while the contract fails to mention the term Direct Order anywhere. And especially while issuing work assignments."
                                            },
                                            {
                                                arguementid: "TKGLHSJDQ2H02H77",
                                                arguement: "Previous to this the Agency lies about my removal from the Yolo Bypass project in effort to change actual events. This involved my Supervisor taking me into the conference room and telling me the Project Manager wants me off of the project. The Agency is able to lie and say that is was the Branch Chief who removed me."
                                            },
                                            {
                                                arguementid: "NTNKRILPJ3Z4WFNO",
                                                arguement: "Previous to this the Agency had issued me a fraudulent set of work directions which lacked scope on the Central Valley Project (CVP) Cost Allocation team. They give me wrong instructions, ignoring the real purpose in having Engineers determine future replacement and maintenance costs for the CVP over the next 100 years."
                                            },
                                            {
                                                arguementid: "CXFE0RK8U8DTGH8Q",
                                                arguement: "Previous to this I had a reassignment request submitted by the Union because of continuous harassment in the workplace. I had been selected for a promotion at the same time but they were going to let my Branch Chief fire me. This concludes constructive termination. Since I was not going to go back, they were going to fire me, I was selected for a promotion, and they would not reassign me; it all concludes constructive termination under a loss of representation under any kind of review."
                                            }
                                        ]
                                    }
                                },
                                {
                                    conflict: "I am owed the compensation, in having had suffered in being the victim of the worst case of discrimination in the Federal Government.",
                                    conflictid: "3G8X5FJYN20TAQYD",
                                    arguements: {
                                        arguement: [
                                            {
                                                arguementid: "LG65Y4LUQZ0URG3U",
                                                arguement: "This was the case that had immediate and direct effect in Washington D.C. within the EEOC when it was first received on January 14, 2015."
                                            },
                                            {
                                                arguementid: "DA07X0O6WZWU03UF",
                                                arguement: "When the Union President denies my representation against an offer for arbitration from a Federal Agency, this is because he concedes this to be the worst case of discrimination in the Federal Government."
                                            },
                                            {
                                                arguementid: "DJY8FE4GYPPD2FKQ",
                                                arguement: "When the FLRA refuses to issue their final order on Unfair Labor Practices this becomes the worst case of discrimination in the Federal Government. They are impeding justice in not issuing their final in order. The Court of Appeals will not accept a petition until the FLRA issues their final order. They are refusing to respond to Unfair Labor Practices. This allows them to take my rights after I was treated like an animal in the workplace."
                                            },
                                            {
                                                arguementid: "F15WTXK1ICRRXLSH",
                                                arguement: "When the Agency replies to my grievance and tells me discrimination is an EEO matter and is excluded from the contract, while the Union blocks my representation, this becomes the worst case of discrimination in the Federal Government."
                                            }
                                        ]
                                    }
                                },
                                {
                                    conflict: "Language in the Contract allows an offer for Arbitration from an Agency to remain pending indefinitely until the FLRA has issued their final order. In my case there is no FLRA to offer me basic protection of employee rights.",
                                    conflictid: "ETNVLFGI7HU1BDDU",
                                    images: {
                                        image: [
                                            {
                                                image: "https://civilengineer-io.s3.amazonaws.com/a5part1.jpg",
                                                imageid: "ttttyyyyaaaatttt"
                                            },
                                            {
                                                image: "https://civilengineer-io.s3.amazonaws.com/a5part4.jpg",
                                                imageid: "ttttyyyyaaaagggg"
                                            }
                                        ]
                                    },
                                    arguements: {
                                        arguement: [
                                            {
                                                arguementid: "TLE1W17RTAMPMSGM",
                                                arguement: "Without the FLRA, the Agency can lie and let the Union President interfere with the entitlement that I have to receive representation."
                                            },
                                            {
                                                arguementid: "LKR91ZU31PS0QX6O",
                                                arguement: "The FLRA is in place to offer me protection of Employee Rights in the workplace. Since there is no FLRA, I am owed compensation for this loss of basic entitlements of Employee Rights, Representation, and Arbitration all together. This allows the Agency to treat me like an animal, target me out of the Government, and lie."
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
                                    petition: "Grievance in Support of Employee Rights in the Workplace",
                                    versus: "The Federal Bureau of Reclamation",
                                    conflicts: {
                                        conflict: [
                                            {
                                                conflict: "I am owed representation, or compensation in having had received representation, for the grievance that I filed against the Federal Bureau of Reclamation.",
                                                conflictid: "xxxxyyyyzzzzwwww",
                                                arguements: {
                                                    arguement: [
                                                        {
                                                            arguementid: "7S93E7MD21ECWPT7",
                                                            arguement: "Language in the contract allows a grievance to continue after termination of employment because of continuous harassment in the workplace. Prior to this I was continuously harassed. I received permission from the Regional Office after removing myself. This grievance was accepted by the Regional Office on July 25, 2014",
                                                            images: {
                                                                image: [
                                                                    {
                                                                        image: "https://civilengineer-io.s3.amazonaws.com/a1part2.jpg",
                                                                        imageid: "qqqqwwwweeeedddd"
                                                                    },
                                                                    {
                                                                        image: "https://civilengineer-io.s3.amazonaws.com/a1part1.jpg",
                                                                        imageid: "ttttyyyyaaaabbbb"
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            arguementid: "9NTZN0MQLA9RYU71",
                                                            arguement: "Previous to this I received an offer for arbitration from the Federal Agency. There is no way my representation can be denied since this is true."
                                                        },
                                                        {
                                                            arguementid: "6OWKN20FZIWLQJR4",
                                                            arguement: "Previous to this I received permission from the EEO Office to be able to file a grievance. Given this opportunity I elected to file a grievance because of Employee Rights in the workplace."
                                                        },
                                                        {
                                                            arguementid: "9E2JZPOQC3IGOCUN",
                                                            arguement: "Previous to this I was being treated like an animal in the work place after I refused to sign the Direct Order. I acquire charges for termination and it was the intent of the Agency to make the language effective when I refused to sign it."
                                                        },
                                                        {
                                                            arguementid: "GQ6I66SUFZUBGYFD",
                                                            arguement: "Previous to this I was continuously being forcing to sign my name under a threat of termination to receive work assignments. Language in the contract, fails to mention Direct Orders, but in fact they are illegal against Employee Rights in the Workplace. No Federal Employee should have to accept work assignments having to sign under a threat of termination. Compensation would allow them to ignore the adverse conditions they were continuously exposing me to while the contract fails to mention the term Direct Order anywhere. And especially while issuing work assignments."
                                                        },
                                                        {
                                                            arguementid: "TKGLHSJDQ2H02H77",
                                                            arguement: "Previous to this the Agency lies about my removal from the Yolo Bypass project in effort to change actual events. This involved my Supervisor taking me into the conference room and telling me the Project Manager wants me off of the project. The Agency is able to lie and say that is was the Branch Chief who removed me."
                                                        },
                                                        {
                                                            arguementid: "NTNKRILPJ3Z4WFNO",
                                                            arguement: "Previous to this the Agency had issued me a fraudulent set of work directions which lacked scope on the Central Valley Project (CVP) Cost Allocation team. They give me wrong instructions, ignoring the real purpose in having Engineers determine future replacement and maintenance costs for the CVP over the next 100 years."
                                                        },
                                                        {
                                                            arguementid: "CXFE0RK8U8DTGH8Q",
                                                            arguement: "Previous to this I had a reassignment request submitted by the Union because of continuous harassment in the workplace. I had been selected for a promotion at the same time but they were going to let my Branch Chief fire me. This concludes constructive termination. Since I was not going to go back, they were going to fire me, I was selected for a promotion, and they would not reassign me; it all concludes constructive termination under a loss of representation under any kind of review."
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                conflict: "I am owed the compensation, in having had suffered in being the victim of the worst case of discrimination in the Federal Government.",
                                                conflictid: "3G8X5FJYN20TAQYD",
                                                arguements: {
                                                    arguement: [
                                                        {
                                                            arguementid: "LG65Y4LUQZ0URG3U",
                                                            arguement: "This was the case that had immediate and direct effect in Washington D.C. within the EEOC when it was first received on January 14, 2015."
                                                        },
                                                        {
                                                            arguementid: "DA07X0O6WZWU03UF",
                                                            arguement: "When the Union President denies my representation against an offer for arbitration from a Federal Agency, this is because he concedes this to be the worst case of discrimination in the Federal Government."
                                                        },
                                                        {
                                                            arguementid: "DJY8FE4GYPPD2FKQ",
                                                            arguement: "When the FLRA refuses to issue their final order on Unfair Labor Practices this becomes the worst case of discrimination in the Federal Government. They are impeding justice in not issuing their final in order. The Court of Appeals will not accept a petition until the FLRA issues their final order. They are refusing to respond to Unfair Labor Practices. This allows them to take my rights after I was treated like an animal in the workplace."
                                                        },
                                                        {
                                                            arguementid: "F15WTXK1ICRRXLSH",
                                                            arguement: "When the Agency replies to my grievance and tells me discrimination is an EEO matter and is excluded from the contract, while the Union blocks my representation, this becomes the worst case of discrimination in the Federal Government."
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                conflict: "Language in the Contract allows an offer for Arbitration from an Agency to remain pending indefinitely until the FLRA has issued their final order. In my case there is no FLRA to offer me basic protection of employee rights.",
                                                conflictid: "ETNVLFGI7HU1BDDU",
                                                images: {
                                                    image: [
                                                        {
                                                            image: "https://civilengineer-io.s3.amazonaws.com/a5part1.jpg",
                                                            imageid: "ttttyyyyaaaatttt"
                                                        },
                                                        {
                                                            image: "https://civilengineer-io.s3.amazonaws.com/a5part4.jpg",
                                                            imageid: "ttttyyyyaaaagggg"
                                                        }
                                                    ]
                                                },
                                                arguements: {
                                                    arguement: [
                                                        {
                                                            arguementid: "TLE1W17RTAMPMSGM",
                                                            arguement: "Without the FLRA, the Agency can lie and let the Union President interfere with the entitlement that I have to receive representation."
                                                        },
                                                        {
                                                            arguementid: "LKR91ZU31PS0QX6O",
                                                            arguement: "The FLRA is in place to offer me protection of Employee Rights in the workplace. Since there is no FLRA, I am owed compensation for this loss of basic entitlements of Employee Rights, Representation, and Arbitration all together. This allows the Agency to treat me like an animal, target me out of the Government, and lie."
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