const router = require('express').Router()
const UserConroller = require("../controller/product")
const multer = require("multer")
const storage = multer.diskStorage({destination : (req,file, cb)=>{
  cb(null , './client/src/assets/uploads')
} , filename :(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  
}})
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

    router.get('/', UserConroller.getProduct )
    router.get('/:id', UserConroller.getOneProduct )
    router.delete('/:id', UserConroller.deleteOneProduct )
    router.post('/', upload.single('fileImg') , UserConroller.create )


module.exports = router;