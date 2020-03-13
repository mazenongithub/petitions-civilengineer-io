export function validateEmail(value) {
    var reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    var test = reg_ex.test(value)
    let errmsg = "";
    if (!value) {
        errmsg += `Email Address is required `

    }


    else if (!test) {

        errmsg += ` Email Address ${value} format is invalid `;

    }
    return errmsg;
}
export function validateUserID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = false;
    if (!value) {
        errmsg = " ProviderID is required ";

    }
    else if (value.length > 36) {
        errmsg = " ProviderID should be less than 36 characters";
    }
    else if (!test) {
        errmsg = ` Invalid Provider ID format ${value} `;
    }

    return errmsg;
}
export function formatUTCDateforDisplay(timein) {
    //let timein = '2019-05-22 19:33:22'
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
    let hours = datein.getHours();
    let ampm = "";
    if (hours > 12) {
        hours = hours - 12;
        ampm = 'pm'
    } else if (hours === 12) {
        ampm = 'pm';
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
export function CreatePetition(petitionid, petition, versus, openingstatement, url) {
    return ({ petitionid, petition, versus, openingstatement, url })
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
    const myuser = {
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
                    petition: "Petition for Arbitration and for Employee Rights in the Workplace",
                    versus: "The National Federal of Federal Employees",
                    conflicts: {
                        conflict: [
                            {
                                conflict: "I am represented by the Federal Agency, the Bureau of Reclamation, for the grievance that I filed, now to be taken against the National Federation of Federal Employees (NFFE) since they denied it and not the Agency. The Agency had accepted the grievance, and were going to allow it go through to arbitration for review until the Union President took it upon himself to take away my rights, while ignoring language in this own contract which allows a grievance to continue under circumstances of harassment and discrimination in the workplace.",
                                conflictid: "FHXFOKZ1HYU4J6AL",
                                arguements: {
                                    arguement: [
                                        {
                                            arguementid: "LTU3ZJW7UGVWJ644",
                                            arguement: "Language in the contract allows will allow my grievance to continue because of continuous harassment in the workplace. This language supports my grievance and holds strength against anyone else telling me I should stay and suffer in a hostile work environment in order to keep my basic entitlements in the workplace.",
                                            images: {
                                                image: [
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/C84WRVIZ5U9E7NCWRMOQB.jpg",
                                                        imageid: "VIZ5U9E7NCWRMOQB"
                                                    },
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/ZNKQA930TWIL449RHWIU3.jpg",
                                                        imageid: "930TWIL449RHWIU3"
                                                    },
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/75F83E15B1VH0PBVNL8NZ.jpg",
                                                        imageid: "E15B1VH0PBVNL8NZ"
                                                    },
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/TBCYK8764B76QQFHB2H12.jpg",
                                                        imageid: "8764B76QQFHB2H12"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                conflict: "This is the worst case of discrimination in the Federal Government.",
                                conflictid: "JMROTA9Q6IXSVATF",
                                arguements: {
                                    arguement: [
                                        {
                                            arguementid: "TJQT7XZITRU9D9KK",
                                            arguement: "The worst case of discrimination in the Federal Government was proven on January 14, 2015 in Washington D.C. within the Equal Employment Opportunity Commission in which this case had made headlines. The amount of harassment I had to endure along with the stripping my rights, and other crimes, had lead them to form the task force with the objectives in preventing this type of harassment. The answer to their question is to allow employees to remove themselves from a hostile work environment and to remove employees from hostile work environments sooner. This is the news that they won't tell you. That they will allow the Union President to block and offer for arbitration against me so they can use harassment to force me out.",
                                            images: {
                                                image: [
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/CIMJPGO69QEWJF547DAL2.jpg",
                                                        imageid: "GO69QEWJF547DAL2"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            arguementid: "4SZO4G37HWYNNZOM",
                                            arguement: "Prior to being suspending for fidgeting and squirming too much in my chair during a meeting, I was being forced to accept my work assignments having to sign under a threat of removal from Federal Service. This was because of retaliation in the workplace.",
                                            images: {
                                                image: [
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/28VTRPPN81U97DYQIQ9WF.jpg",
                                                        imageid: "PPN81U97DYQIQ9WF"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            arguementid: "9YUS56N60BNR1XFV",
                                            arguement: "Prior to be forced to accept my work assignments under a continual threat of termination, I was removed from the Yolo Bypass project when my Supervisor told me the Project Manager wanted me off of the project. This was a result of the bullying we were receiving from the Branch Chief. Then to make it worse against me, he tells this story to the Branch Chief, and which he liked so much to retell it to me in slanderous fashion in which I had used curse words towards her. This lead me to speak to the Project Manager to find out this was not true. The end result of this was to retaliate against me with Direct Orders, and then to lie and say the Branch Chief removed me. This allows the Agency to never admit to what the Supervisor did was wrong, that was to tell me the Project Manager wanted me off of the project and not allow the Branch Chief to lie and say he is the one who removed me.",
                                            images: {
                                                image: [
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/00V558LNPWORKOWMHYV5G.jpg",
                                                        imageid: "8LNPWORKOWMHYV5G"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            arguementid: "EDA1FLPCAACENW4L",
                                            arguement: "Previous to being removed from the Yolo Bypass project because of bullying and slander in the workplace, they were giving me work instructions showing lack of qualifications, knowledge, and missing critical Agency objectives in their scope of work. In my position I was responsible to offer constructive feedback upon other when given false sets of work instructions. These are the false work directions I was given to show they lacked in meeting critical objectives involving repayment of costs in maintaining critical water infrastructure in the future.",
                                            images: {
                                                image: [
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/RS8EL0SOP8JQY45RX34QA.jpg",
                                                        imageid: "0SOP8JQY45RX34QA"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            arguementid: "HKEKI8T0804UUE94",
                                            arguement: "These are the critical Agency objectives I showed them in which they were missing. Based on this in addition, the Agency began to target me out of the Government with Direct Orders for my refusal to accept contending perspectives while they were failing to meet critical Agency objectives as listed 1 - 10.",
                                            images: {
                                                image: [
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/G5IAQXA06U3FNKMRKEL4U.jpg",
                                                        imageid: "XA06U3FNKMRKEL4U"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                conflict: "In addition to being the victim of the worst case of discrimination in the Federal Government, the Agency is able to respond to me and tell me that discrimination is an EEO matter and was excluded from the contract.",
                                conflictid: "QQXE4C3JEPBD4AAX",
                                arguements: {
                                    arguement: [
                                        {
                                            arguementid: "0UHZCNNG6J4CH935",
                                            arguement: "They Agency violated Article 4.3 titled Nondiscrimination, the EEOC Rights and Responsibilities, and Federal Labor law when they responded the grievance to tell me that discrimination was an EEO matter and is excluded from the contract. Then the EEOC responds by saying that they do not have jurisdiction to review the case either. This would leave the Agency unaccountable for discrimination in any form after I became the victim of the worst case of discrimination in the Federal Government.",
                                            images: {
                                                image: [
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/8UUDMA8TYX2RF5OG1HWTL.jpg",
                                                        imageid: "A8TYX2RF5OG1HWTL"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                conflict: "The Federal Labor Relations Authority is withholding an offer for arbitration from a Federal Agency by saying that the Agency denied the grievance which is not true. Previous to this they allow multiple Agencies to violate Federal Labor Law in their attempts to block my arbitration which has yet to occur. In addition to allowing numerous Agency to break code, they are refusing to issue their final order on my Appeal to allow for discrimination to occur in the Federal Government Against me. Their best effort to impede justice against me is to never issue their final order. This will prevent me from ever filing a petition in the Court of Appeals and would leave my arbitration pending indefinitely.",
                                conflictid: "OSZ7FOACV3R386VW",
                                arguements: {
                                    arguement: [
                                        {
                                            arguementid: "L00WTOT7OJCXJ794",
                                            arguement: "Language in the Contract allows a grievance to continue, while in delay waiting for the FLRA to now withhold crimes that have been committed in the Federal Government. When crimes have been committed in the Federal Government they will cover for it using their authority to never issue a final order and have my case dismissed while they lie and make the Judge believe they are going to respond to me and that they never will. This will leave my grievance pending indefinitely in written per language in the contract and the FLRA's failure to respond to Unfair Labor Practice charges in a timely manner.",
                                            images: {
                                                image: [
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/16GR7AW6UQR67YR57X2TL.jpg",
                                                        imageid: "AW6UQR67YR57X2TL"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                conflict: "This case has been career damaging. The net loss was a loss in the career in the Federal Government. I had held a position in the Government, and had been selected for a promotion at the time of the proposed termination.",
                                conflictid: "JLDZXYI2VIFWQ3MY",
                                arguements: {
                                    arguement: [
                                        {
                                            arguementid: "TSEYPDVPQVNXA8IN",
                                            arguement: "The termination proposal the Agency gives me ends up being wrongful when they lied, stripped my rights, and I was selected for a promotion at the time. I have an entitlement to this position based on the language in the contract they are taking from me so they can use harassment to cancel positions I was selected for in order to force me out after being the victim of the worst case of discrimination in the Federal Government.",
                                            images: {
                                                image: [
                                                    {
                                                        image: "https://civilengineer-io.s3.amazonaws.com/F0XRPZXM3FRHS7W8SAIRY.jpg",
                                                        imageid: "ZXM3FRHS7W8SAIRY"
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
                                petition: "Petition for Arbitration and for Employee Rights in the Workplace",
                                versus: "The National Federal of Federal Employees",
                                conflicts: {
                                    conflict: [
                                        {
                                            conflict: "I am represented by the Federal Agency, the Bureau of Reclamation, for the grievance that I filed, now to be taken against the National Federation of Federal Employees (NFFE) since they denied it and not the Agency. The Agency had accepted the grievance, and were going to allow it go through to arbitration for review until the Union President took it upon himself to take away my rights, while ignoring language in this own contract which allows a grievance to continue under circumstances of harassment and discrimination in the workplace.",
                                            conflictid: "FHXFOKZ1HYU4J6AL",
                                            arguements: {
                                                arguement: [
                                                    {
                                                        arguementid: "LTU3ZJW7UGVWJ644",
                                                        arguement: "Language in the contract allows will allow my grievance to continue because of continuous harassment in the workplace. This language supports my grievance and holds strength against anyone else telling me I should stay and suffer in a hostile work environment in order to keep my basic entitlements in the workplace.",
                                                        images: {
                                                            image: [
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/C84WRVIZ5U9E7NCWRMOQB.jpg",
                                                                    imageid: "VIZ5U9E7NCWRMOQB"
                                                                },
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/ZNKQA930TWIL449RHWIU3.jpg",
                                                                    imageid: "930TWIL449RHWIU3"
                                                                },
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/75F83E15B1VH0PBVNL8NZ.jpg",
                                                                    imageid: "E15B1VH0PBVNL8NZ"
                                                                },
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/TBCYK8764B76QQFHB2H12.jpg",
                                                                    imageid: "8764B76QQFHB2H12"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            conflict: "This is the worst case of discrimination in the Federal Government.",
                                            conflictid: "JMROTA9Q6IXSVATF",
                                            arguements: {
                                                arguement: [
                                                    {
                                                        arguementid: "TJQT7XZITRU9D9KK",
                                                        arguement: "The worst case of discrimination in the Federal Government was proven on January 14, 2015 in Washington D.C. within the Equal Employment Opportunity Commission in which this case had made headlines. The amount of harassment I had to endure along with the stripping my rights, and other crimes, had lead them to form the task force with the objectives in preventing this type of harassment. The answer to their question is to allow employees to remove themselves from a hostile work environment and to remove employees from hostile work environments sooner. This is the news that they won't tell you. That they will allow the Union President to block and offer for arbitration against me so they can use harassment to force me out.",
                                                        images: {
                                                            image: [
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/CIMJPGO69QEWJF547DAL2.jpg",
                                                                    imageid: "GO69QEWJF547DAL2"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        arguementid: "4SZO4G37HWYNNZOM",
                                                        arguement: "Prior to being suspending for fidgeting and squirming too much in my chair during a meeting, I was being forced to accept my work assignments having to sign under a threat of removal from Federal Service. This was because of retaliation in the workplace.",
                                                        images: {
                                                            image: [
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/28VTRPPN81U97DYQIQ9WF.jpg",
                                                                    imageid: "PPN81U97DYQIQ9WF"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        arguementid: "9YUS56N60BNR1XFV",
                                                        arguement: "Prior to be forced to accept my work assignments under a continual threat of termination, I was removed from the Yolo Bypass project when my Supervisor told me the Project Manager wanted me off of the project. This was a result of the bullying we were receiving from the Branch Chief. Then to make it worse against me, he tells this story to the Branch Chief, and which he liked so much to retell it to me in slanderous fashion in which I had used curse words towards her. This lead me to speak to the Project Manager to find out this was not true. The end result of this was to retaliate against me with Direct Orders, and then to lie and say the Branch Chief removed me. This allows the Agency to never admit to what the Supervisor did was wrong, that was to tell me the Project Manager wanted me off of the project and not allow the Branch Chief to lie and say he is the one who removed me.",
                                                        images: {
                                                            image: [
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/00V558LNPWORKOWMHYV5G.jpg",
                                                                    imageid: "8LNPWORKOWMHYV5G"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        arguementid: "EDA1FLPCAACENW4L",
                                                        arguement: "Previous to being removed from the Yolo Bypass project because of bullying and slander in the workplace, they were giving me work instructions showing lack of qualifications, knowledge, and missing critical Agency objectives in their scope of work. In my position I was responsible to offer constructive feedback upon other when given false sets of work instructions. These are the false work directions I was given to show they lacked in meeting critical objectives involving repayment of costs in maintaining critical water infrastructure in the future.",
                                                        images: {
                                                            image: [
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/RS8EL0SOP8JQY45RX34QA.jpg",
                                                                    imageid: "0SOP8JQY45RX34QA"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        arguementid: "HKEKI8T0804UUE94",
                                                        arguement: "These are the critical Agency objectives I showed them in which they were missing. Based on this in addition, the Agency began to target me out of the Government with Direct Orders for my refusal to accept contending perspectives while they were failing to meet critical Agency objectives as listed 1 - 10.",
                                                        images: {
                                                            image: [
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/G5IAQXA06U3FNKMRKEL4U.jpg",
                                                                    imageid: "XA06U3FNKMRKEL4U"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            conflict: "In addition to being the victim of the worst case of discrimination in the Federal Government, the Agency is able to respond to me and tell me that discrimination is an EEO matter and was excluded from the contract.",
                                            conflictid: "QQXE4C3JEPBD4AAX",
                                            arguements: {
                                                arguement: [
                                                    {
                                                        arguementid: "0UHZCNNG6J4CH935",
                                                        arguement: "They Agency violated Article 4.3 titled Nondiscrimination, the EEOC Rights and Responsibilities, and Federal Labor law when they responded the grievance to tell me that discrimination was an EEO matter and is excluded from the contract. Then the EEOC responds by saying that they do not have jurisdiction to review the case either. This would leave the Agency unaccountable for discrimination in any form after I became the victim of the worst case of discrimination in the Federal Government.",
                                                        images: {
                                                            image: [
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/8UUDMA8TYX2RF5OG1HWTL.jpg",
                                                                    imageid: "A8TYX2RF5OG1HWTL"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            conflict: "The Federal Labor Relations Authority is withholding an offer for arbitration from a Federal Agency by saying that the Agency denied the grievance which is not true. Previous to this they allow multiple Agencies to violate Federal Labor Law in their attempts to block my arbitration which has yet to occur. In addition to allowing numerous Agency to break code, they are refusing to issue their final order on my Appeal to allow for discrimination to occur in the Federal Government Against me. Their best effort to impede justice against me is to never issue their final order. This will prevent me from ever filing a petition in the Court of Appeals and would leave my arbitration pending indefinitely.",
                                            conflictid: "OSZ7FOACV3R386VW",
                                            arguements: {
                                                arguement: [
                                                    {
                                                        arguementid: "L00WTOT7OJCXJ794",
                                                        arguement: "Language in the Contract allows a grievance to continue, while in delay waiting for the FLRA to now withhold crimes that have been committed in the Federal Government. When crimes have been committed in the Federal Government they will cover for it using their authority to never issue a final order and have my case dismissed while they lie and make the Judge believe they are going to respond to me and that they never will. This will leave my grievance pending indefinitely in written per language in the contract and the FLRA's failure to respond to Unfair Labor Practice charges in a timely manner.",
                                                        images: {
                                                            image: [
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/16GR7AW6UQR67YR57X2TL.jpg",
                                                                    imageid: "AW6UQR67YR57X2TL"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            conflict: "This case has been career damaging. The net loss was a loss in the career in the Federal Government. I had held a position in the Government, and had been selected for a promotion at the time of the proposed termination.",
                                            conflictid: "JLDZXYI2VIFWQ3MY",
                                            arguements: {
                                                arguement: [
                                                    {
                                                        arguementid: "TSEYPDVPQVNXA8IN",
                                                        arguement: "The termination proposal the Agency gives me ends up being wrongful when they lied, stripped my rights, and I was selected for a promotion at the time. I have an entitlement to this position based on the language in the contract they are taking from me so they can use harassment to cancel positions I was selected for in order to force me out after being the victim of the worst case of discrimination in the Federal Government.",
                                                        images: {
                                                            image: [
                                                                {
                                                                    image: "https://civilengineer-io.s3.amazonaws.com/F0XRPZXM3FRHS7W8SAIRY.jpg",
                                                                    imageid: "ZXM3FRHS7W8SAIRY"
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
            ]
        }
    }
    return myuser;
}