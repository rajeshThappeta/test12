const exp=require("express")

// const checkUser = async(req, res, next) => {

//     console.log("check user",req.body)
//     //get userCollectionObj
//     let userCollectionObject = req.app.get("userCollectionObject");
//     //get new user obj and convert it into js ob
//     let userObj = JSON.parse(req.body.userObj)
//     //check for availabity of username
//     let userOfDB = await userCollectionObject.findOne({ username: userObj.username })
//     console.log(userOfDB)
//     //if user already existed
//     if (userOfDB !== null) {
//         res.status(200).send({ message: "Username has already taken. Please choose another username" })
//     }
//     //if user not existed, forward req to next middleware
//     else {
//         next()
//     }
// }



module.exports=checkUser