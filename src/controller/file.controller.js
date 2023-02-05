const {FileInfo} = require ("../model/file.model")
const User = require ("../model/user.model")
const fs = require('fs')
const path = require('path')
exports.Login = async (req,res)=>{    
    try {        
        const {username,password,id} = req.body;
        const user = await User.findOne({username:username,password:password});
        if(!user){
            return res.status(404).json({code:404,message: "Invalid Credentials"})
        }
        else{   
            user.loginToken = user.generateJWT();
            return res.status(200).json({code:200,message: "Login Successful",data:user})
        }
    } catch (error) {
        return res.status(500).json({code:500,message: error.message})
    }
}
exports.addFile = async (req,res)=>{    
    try {
        await fs.stat(`${req.file.path}`, (err, fileObject) => {
            if (err) {
                return res.status(400).json({code:200,message:err.message})
            } else {
                let file = `${process.env.BASE_URL}/src/public/files/` + req.file.filename.replace(/\s/g, "")                
                new FileInfo({
                    fileObject:fileObject,
                    file:file
                }).save().then((result)=>{
                    return res.status(200).json({code:200,message:"File added successfully",result})
                }).catch((err)=>{
                   return res.status(400).json({code:200,message:err.message})
               })
            }
        })
    } catch (error) {
        return res.status(500).json({code:500,message: error.message})
    }
}
exports.getFile = async (req,res)=>{    
    try {
        FileInfo.find().then((result)=>{
            return res.status(200).json({code:200,message:"File response",result})
        }).catch((err)=>{
           return res.status(400).json({code:200,message:err.message})
       })
    } catch (error) {
        return res.status(500).json({code:500,message: error.message})
    }
}
console.log(process.cwd());
exports.editFile = async (req,res)=>{
    try {  
        const {id} = req.body      
        const oldFile = await FileInfo.findById({_id:id})
        if(!oldFile){
            return res.status(400).json({code:400,message:"File not found"})
        }
        let oldFileName = oldFile.file.split(`${process.env.BASE_FILE_PATH}`)[1]        
        const filePath = `${process.cwd()}/src/public/files/${oldFileName}`        
        fs.unlink(filePath, (err, done) => {
            if (err) {
                return res.status(400).json({ code: 400, message: err.message })
            }
        })
        await fs.stat(`${req.file.path}`, (err, fileObject) => {
            if (err) {
                return res.status(400).json({code:200,message:err.message})
            } else {
                let file = `${process.env.BASE_URL}/src/public/files/` + req.file.filename.replace(/\s/g, "")                
                FileInfo.findByIdAndUpdate({_id:id},{$set:{fileObject:fileObject,file:file}},{new:true})
                .then((result)=>{
                    return res.status(200).json({code:200,message:"File updated successfully",result})
                }).catch((err)=>{
                   return res.status(400).json({code:200,message:err.message})
               })
            }
        })        
    } catch (error) {
        return res.status(500).json({code:500,message: error.message})
    }
}
exports.deleteFile = async (req,res)=>{    
    try {
        const {id} = req.body      
        const oldFile = await FileInfo.findById({_id:id})
        if(!oldFile){
            return res.status(400).json({code:400,message:"File not found"})
        }
        let oldFileName = oldFile.file.split(`${process.env.BASE_FILE_PATH}`)[1]        
        const filePath = `${process.cwd()}/src/public/files/${oldFileName}`        
        fs.unlink(filePath, (err, done) => {
            if (err) {
                return res.status(400).json({ code: 400, message: err.message })
            }
        })
        FileInfo.findByIdAndDelete({_id:id},{new:true})
                .then((result)=>{
                    return res.status(200).json({code:200,message:"File deleted successfully",result})
                }).catch((err)=>{
                   return res.status(400).json({code:200,message:err.message})
               })
    } catch (error) {
        return res.status(500).json({code:500,message: error.message})
    }
}