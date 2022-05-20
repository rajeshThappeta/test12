
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs")
const jwt=require("jsonwebtoken")
require("dotenv").config()

//to get all users
const getUsers = expressAsyncHandler(async (req, res) => {
    console.log(req.headers)
    //get userCollection Obj from req
    let userCollectionObject = req.app.get("userCollectionObject")

    //get users data from usercollection and pack them into an array
    let users = await userCollectionObject.fnd().toArray()
    //send res
    res.status(200).send({ message: "List of users", payload: users })


})


//to get a user by username
const getUserByUsername = expressAsyncHandler(async (req, res) => {

    //get userCollection Obj from req
    let userCollectionObject = req.app.get("userCollectionObject");

    //get user id from url param id
    let usernameOfUrl = req.params.username;
    //get user by id from usercollection
    let user = await userCollectionObject.findOne({ username: usernameOfUrl })
    //send res
    res.send({ message: "User data", payload: user })

})


//to create new user
const createUser = expressAsyncHandler(async (req, res) => {
  

      //get new user obj and convert it into js ob
    let userObj=JSON.parse(req.body.userObj)
    //add image CDN link to userObj
    userObj.profilePic=req.file.path;

    //get userCollection Obj from req
    let userCollectionObject = req.app.get("userCollectionObject");
  
   
    // //check for availabity of username
    // let userOfDB = await userCollectionObject.findOne({ username: userObj.username })
    // console.log(userOfDB)
    // //if user already existed
    // if (userOfDB !== null) {
    //     res.status(200).send({ message: "Username has already taken. Please choose another username" })
    // }
    //if user not existed
     
    
        //hash the password
        let hashedPassword = await bcryptjs.hash(userObj.password, 5)
        //replace plain password woth hashed
        userObj.password = hashedPassword;
        //insert into user colelction
        let result = await userCollectionObject.insertOne(userObj)
        //send res
        res.status(201).send({ message: "User created" })
    
})





//to login user
const loginUser = expressAsyncHandler(async (req, res) => {
    //get userCollection Obj from req
    let userCollectionObject = req.app.get("userCollectionObject");
    //get user crederntials object
    let credObject=req.body;
   //search user by username
   let userOfDB=await userCollectionObject.findOne({username:credObject.username})
    //if user not found
    if(userOfDB===null){
        res.send({message:"Invalid username"})
    }
    //if user existed, compare passwords
    else {
       let status= await bcryptjs.compare(credObject.password,userOfDB.password);
       //if passwords not matched
       if(status==false){
           res.send({message:"Invalid password"})
       }
       //if passwords are matched
       else{
        //create JWT token and encrypt it with a secret key
        let signedToken=jwt.sign({username:userOfDB.username},process.env.SECRET,{expiresIn:20})
        //send encryptrd JWT token as res
        res.send({message:"success",token:signedToken,user:userOfDB})
       }
    }   
})






//to update a user
const updateUser = expressAsyncHandler(async (req, res) => {

    //get userCollection Obj from req
    let userCollectionObject = req.app.get("userCollectionObject");
    //get modifies user obj
    let modifiedUserObj = req.body;
    //update userobj in usercollection
    let result = await userCollectionObject.updateOne({ username: modifiedUserObj.username }, { $set: { ...modifiedUserObj } })
    //send res
    if (result.acknowledged == true) {
        res.send({ message: "User modified sucessfully" })
    }
    else {
        res.send({ message: "Error in user modification" })
    }
})


//to delete a user
const deleteUserByUsername = expressAsyncHandler(async (req, res) => {
    //get userCollection Obj from req
    let userCollectionObject = req.app.get("userCollectionObject");
    //get username from url
    let usernameFromUrl = req.params.username;
    //delete user from usercollection
    let result = await userCollectionObject.deleteOne({ username: usernameFromUrl })

    //send res
    if (result.deletedCount == 1) {
        res.status(204).send({ message: "User removed sucessfully" })
    }
    else {
        res.send({ message: "Error in user deletion" })
    }
})



const getProtectedInfo=(req,res)=>{
    res.send({message:"This is private information"})
}

//export all functions
module.exports = {
    getUsers,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUserByUsername,
    loginUser,
    getProtectedInfo
}