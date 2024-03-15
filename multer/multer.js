const util = require("util");
const multer = require("multer");
var path = require('path');
const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images')
  }, 
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let filePath=file.fieldname + '-'+uniqueSuffix + path.extname(file.originalname);
    if (!req.filePath) {
      req.filePath = [];
    }
    req.filePath.push(`"http://localhost:2000/uploads/${filePath}"`)

    cb(null, filePath)

  // req.filePath = req.filePath || [];
    // req.filePath.push(filePath);
    // or
    // (req.filePath = req.filePath || []).push(filePath)
  }

})

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).fields([{ name: 'img1', maxCount: 1 },{ name: 'img2', maxCount: 1 },{ name: 'img3', maxCount: 1 }])

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;