const utils = require("../utils/index");  
const upload = require("../middlewares/index");  
const multer = require("multer");  

exports.uploadImage = (req, res) => {  
  return new Promise((resolve, reject) => {  
    upload.singleImageMiddleware(req, res, async (err) => {  
      if (err) {  
        reject(err);  
      }  
      const ip = await utils.helper.getHost();  
      const filePath = process.env.FILE_PATH || "/uploads/";  
      const fileName = req.file.filename;  
      const fileString = `${ip}${filePath}${fileName}`;  
      resolve(fileString);  
    });  
  });  
};  