const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors')
const passport = require('passport');
const mongoose = require('mongoose');

const fileRouter = require("./src/route/file.route")
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));    
app.set('views', path.join(__dirname, 'views'));
app.use("/api", fileRouter);
app.use(passport.initialize());
// require('./config/passport')(passport);

mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("DB Connected Successfully!");
    })
    .catch((err) => {
        console.log(`-------Error: ${err.message}`);
    });

app.listen(port);
console.log(`Server Running on http://localhost:${port}`);