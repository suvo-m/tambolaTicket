const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose")

//app
const app = express();


dotenv.config({ path: "config/.env" });


// applying the middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//routes for users
const  {userRoutes}  = require("./routes/userRouter");
app.use("/api/users", userRoutes);

//routes for tickets
const { ticketRoutes } = require("./routes/ticketRouter");
app.use("/api/tickets", ticketRoutes);

// middleware for error
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);




const port = process.env.PORT || 6399;
const dbDriver = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pedaesj.mongodb.net/tambola`
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    app.listen(port,()=>{
        console.log("database connected")
        console.log(`the server is running on http://localhost:${port}`)
    })
}).catch(err=>{
    console.log("db not connected")
    console.log(err)
})




