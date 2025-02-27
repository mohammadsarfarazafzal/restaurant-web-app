import multer from "multer";

const storage = multer.diskStorage({
    // destination is the location where the file will be stored
    destination: function (req, file, cb) {
      // cb is callback function, it takes two arguments, first is error and second is the location where the file will be stored
      cb(null, "./public/temp") // null means no error has occured for respective operation, null is the argument in the callback function
    },
    // filename is the name of the file
    filename: function (req, file, cb) {
      // cb is callback function, it takes two arguments, first is error and second is the name of the file
      cb(null, `${Date.now()}${file.originalname}`) // null means no error has occured for respective operation, null is the argument in the callback function
    }
  })

  // upload is the multer object, it has a method called storage which takes the storage object as argument
export const upload = multer({ storage })