const { json } = require('express')
const jwt = require('jsonwebtoken')
const db = require('./db')
users = {
    //    admin:"admin",
    //    password:"12345" ,
    //    user:[],
    //    product:[]
}
const register = (uname, email, password, phone, date) => {
    return db.User.findOne({ users }).then(user => {
        var mail = user.user.filter(d => d.email == email).map(d => d.email)
        console.log(mail);
        if (email == mail) {
            return {
                statusCode: 401,
                status: false,
                message: "account already exists..please login!!"
            }
        }
        else {
            user.user.push({
                uname: uname,
                email: email,
                password: password,
                phone: phone,
                date: date
            })
            user.save()
            // const newUser = new db.User["users"]({
            //     uname,
            //     email,
            //     password,
            //     phone,
            //     date
            // })
            // user["user"].save()
            console.log(user.user);
            // user.user.save()
            return {
                statusCode: 200,
                status: true,
                message: "account successfully created!!"
            }
        }
    })
}
// const register = (uname, email, password, phone, date) => {
//     return db.User.findOne({ users }).then(user => {
//         console.log(user.user, "hwwww");
//         var da = user.user.filter(d => d.email == email).map(d => d.email)
//         console.log(da, "dddd");

//         if (email == da) {
//             return {
//                 statusCode: 401,
//                 status: false,
//                 message: "Account already Exists...Please Login!!!"
//             }

//         } else {
//             user.user.push({
//                 uname: uname,
//                 email: email,
//                 password: password,
//                 phone: phone,
//                 date: date
//             })
//             // user.save()
//             // console.log(user.user, "daammmn");
//             return {
//                 statusCode: 200,
//                 status: true,
//                 message: "account successfully created!!"
//             }
//         }
//     })
// }
// const register = (uname, email, password, phone, date) => {
//     var result=users["user"].filter(res=>res.email==email).map(res=>res.email)
//         console.log(result);
//         if (result==email) {
//             return {
//                 statusCode: 401,
//                 status: false,
//                 message: "account already exists..please login!!"
//             }
//         }
//         else {
//             users.user.push(email={
//                 uname,
//                 email,
//                 password,
//                 phone,
//                 date
//             })
//             return {
//                 statusCode: 200,
//                 status: true,
//                 message: "account successfully created!!"
//             }
//         }

// }
const login = (email, password) => {
    return db.User.findOne({ users }).then(user => {
        var mail = user.user.filter(d => d.email == email).map(d => d.email)
        var pass = user.user.filter(d => d.password == password).map(d => d.password)

        if (mail == email && pass == password) {
            currentemail = email
            currentpassword = user.password

            // token generation
            const token = jwt.sign({
                currentIdd: password
            }, 'supersecretkey123')

            return {
                statusCode: 200,
                status: true,
                message: "Login success",
                currentemail,
                currentpassword,
                token
            }
        }
        return {
            statusCode: 401,
            status: false,
            message: "Invalid credentials"
        }
    })
}
const adminlogin = (username, password) => {
    return db.User.findOne({ users }).then(user => {
        if (user["admin"] == username) {
            if (user["password"] == password) {
                currentusername = user.username
                currentpassword = user.password

                // token generation
                const token = jwt.sign({
                    currentIdd: password
                }, 'supersecretkey123')

                return {
                    statusCode: 200,
                    status: true,
                    message: "Login success",

                }
            }
        }
        return {
            statusCode: 401,
            status: false,
            message: "Invalid credentials"
        }
    })
}
const sort = (username) => {
    return db.User.find({
        username
    }).then(user => {
        console.log(user);
        if (user) {

            return {
                statusCode: 200,
                status: true,
                message: "success",
                username,


            }
        }
        return {
            statusCode: 401,
            status: false,
            message: "Invalid credentials"
        }
    })
}
const userslist = (req) => {


    return db.User.findOne({ users }).then(user => {
username=req.currentiId
        if (username=user["admin"]) {
    

            return {
                statusCode: 200,
                status: true,
                list: user["user"].map(d=>d,uname),
                list: user["user"].map(d=>d,email),
            }
        }
        return {
            statusCode: 401,
            status: false,
            message: "Invalid credentials"
        }
    })
}

module.exports = {
    register,
    login,
    adminlogin,
    sort
}