const multer = require("multer");
const fs = require("fs");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (file.fieldname == "files") {
      const fileDir = path.join("src","public", "files");
      if (fs.existsSync(fileDir)) {
        cb(null, fileDir);
      } else {
        fs.mkdirSync(fileDir, { recursive: true });
        cb(null, fileDir);
      }
    }
  },

  filename: async function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadFile = multer({
  storage: imageStorage,  
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);       
        callback(null, true)
    }
});

module.exports = uploadFile;
