const express = require('express');
const fileRouter = express.Router(); 
const uploadFile = require("../middleware/upload.js")
const authenticate = require("../middleware/Authenticate");
const {addFile, getFile, editFile, deleteFile, Login} = require("../controller/file.controller");
const passport = require('passport') ;
require('../middleware/Jwt')(passport) 

fileRouter.post("/login", Login);
fileRouter.post("/addFile",passport.authenticate('jwt', { session: false}),uploadFile.single("files"), addFile);
fileRouter.get("/getFile",passport.authenticate('jwt', { session: false}), getFile );
fileRouter.put("/editFile",passport.authenticate('jwt', { session: false}),uploadFile.single("files"), editFile);
fileRouter.delete("/deleteFile", passport.authenticate('jwt', { session: false}),deleteFile);

module.exports = fileRouter;

