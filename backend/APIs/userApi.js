//create mini express app(user app)
const exp = require("express");
const userApp = exp.Router()
const { getUsers,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUserByUsername,
    loginUser,
    getProtectedInfo
} = require("../controllers/userController");

require("dotenv").config()
const verifyToken = require("../middlewares/verifyToken")
//const checkUser=require("../middlewares/checkUser")

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

//configure cloudianry
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

//configure multer-storage-cloudinary
const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cdb22dx009',
        // format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
    },
});

//configure multer
const upload = multer({ storage: cloudStorage })

//CREATE USER API


//get users
userApp.get('/get-users', getUsers)

//get user by username
userApp.get('/get-user/:username', getUserByUsername)

//middleare
const checkUser = (req, res, next) => {

    console.log("check user", req.body)
    // //get userCollectionObj
    // let userCollectionObject = req.app.get("userCollectionObject");
    // //get new user obj and convert it into js ob
    // let userObj = JSON.parse(req.body.userObj)
    // //check for availabity of username
    // let userOfDB = await userCollectionObject.findOne({ username: userObj.username })
    // console.log(userOfDB)
    // //if user already existed
    // if (userOfDB !== null) {
    //     res.status(200).send({ message: "Username has already taken. Please choose another username" })
    // }
    // //if user not existed, forward req to next middleware
    // else {
    //     next()
    // }
    //next()
}


//create user
userApp.post('/create-user',  upload.single('profilePic'), createUser)

//login user
userApp.post('/login-user', loginUser)

//update user
userApp.put("/update-user", updateUser)


//delete user by username
userApp.delete("/remove-user/:username", deleteUserByUsername)

//protected route
userApp.get("/get-protected-data", verifyToken, getProtectedInfo);


//export userApp
module.exports = userApp;