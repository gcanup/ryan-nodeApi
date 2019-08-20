//framwwork for http browser
const express = require("express")
const app = express()
//for database connection
const mongoose = require("mongoose")
//to see paths and activities
const morgan = require("morgan")
//for url, passwords use in .env file
const dotenv = require("dotenv")
//receive and parse into string, json, text as demand during middleware request and response
const bodyParser = require("body-parser")
//to retrieve information from the logged in user as header tokens
var cookieParser = require('cookie-parser')
//to validate json data like min width, maxwidth, type: string or num and so on
const expressValidator = require("express-validator")
//for file systems access, images, pdf
const fs = require('fs')
//A web application executes a cross-origin HTTP request for safety when it requests a resource that has a different origin (domain, protocol, or port) than its own origin.
const cors = require('cors')


//reading .env file
dotenv.config()

//db
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
  console.log(`DB conenction error: ${err.message}`)
})

// const myOwnMiddleware = (req,res, next) => {
//   console.log(`Middleware applied!!`)
//   next()
// }

//bringing in routes
const postRoutes = require("./routes/post")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

//apiDocs
app.get('/', (req,res) => {
  fs.readFile('docs/apiDocs.json', (err,data) => {
    if(err) {
      res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })
})

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
//app.use(myOwnMiddleware)
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())
app.use("/",postRoutes); 
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function (err, req, res, next) { //for express-jwt errors especially, 
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: 'User not authorized'});
  }
});

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`A Node Js API is listening: ${port}`))