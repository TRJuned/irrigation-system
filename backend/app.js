const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookiParser = require("cookie-parser");
require("dotenv/config");
const port = 5000;


//middle ware
app.use(bodyParser.json());
app.use(cookiParser());
app.use(cors());

//Import the Routes
const npkRoute = require('./routes/npk-routes');
const userRoute = require('./routes/user-routes');
const tempRoute = require('./routes/temp-routes');
const humidRoute = require('./routes/humid-routes');
const phRoutes = require('./routes/ph-routes');
const ecRoute = require('./routes/EC-routes');
const gpsRoute = require('./routes/GPS-routs');

//Middle ware

app.use('/npk',npkRoute);
app.use('/npk/npk2',npkRoute);
app.use('/user',userRoute);
app.use('/temp',tempRoute);
app.use('/humid',humidRoute);
app.use('/ph',phRoutes);
app.use('/ec',ecRoute);
app.use('/gps',gpsRoute);






//Routes

app.get("/", (req,res) => {
    res.status(201).json("server created");
});



//connect the mongodb
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("connected");
});

//creating a listening port
app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
});
//app.listen(5000);

