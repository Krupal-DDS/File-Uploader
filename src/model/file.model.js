const mongoose = require('mongoose')
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const collectionName = "File_Details";
const fileSchema = Schema(
  {    
    fileObject: Object,
    file:String
  },
  {
    timestamps: true,
  }
);

exports.FileInfo = mongoose.model(
  "FileInfo",
  fileSchema,
  collectionName
);

