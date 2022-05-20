//create express app
const exp = require("express");
const app = exp();
const path=require("path")
require("dotenv").config()



//connecting with Angular app
app.use(exp.static(path.join(__dirname,'./dist/mean-app')))

//Connecting to MONGODB SERVER
//import MongoClient
const mongoClient = require("mongodb").MongoClient;
const dbUrl = process.env.DBURL;

//connect to DB
mongoClient.connect(dbUrl)
    .then((client) => {
        //get database object
        let databaseObject = client.db("CDB22DX009DB");
        //get collection objects
        let userCollectionObject = databaseObject.collection("usercollection");
        let productCollectionObject = databaseObject.collection("productcollection");
        //share collection objects to APIs
        app.set("userCollectionObject", userCollectionObject)
        app.set("productCollectionObject", productCollectionObject)

        console.log("Connected to DB successfully")
    })
    .catch(err => console.log("err in connecting to Database", err))





//import apis
const userApp = require("./backend/APIs/userApi")
const productApp = require("./backend/APIs/productAPi");
const adminApp = require("./backend/APIs/adminApi");


//add body parser middleware
app.use(exp.json())
//app.use(exp.multipart())
app.use(exp.urlencoded())

//if path is user, then execute userApi
app.use('/user', userApp)
//if path is product, then execute product api
app.use('/product', productApp)
//if path is admin, then execute product api
app.use('/admin', adminApp)



app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/mean-app/index.html'), err=> {
        if (err) {
           next(err)
        }
    })
})

//handling invalid paths
app.use((req, res, next) => {
    res.status(404).send({ message: `The path ${req.url} does not exist` })
})

//handling errors
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})
//assign port number
const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => console.log(`HTTTP Server listening on port ${PORT}..`))
