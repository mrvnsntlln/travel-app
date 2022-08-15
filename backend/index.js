const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const cors = require('cors')
const path = require('path')

dotenv.config();

app.use(express.json());
app.use(cors())

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

if (process.env.NODE_ENV === "production"){
  app.use(express.static("frontend/build"));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","build","App.js"))
  })
}

app.listen(process.env.PORT || 8000, () => {
  console.log("Backend server is running!");
});
