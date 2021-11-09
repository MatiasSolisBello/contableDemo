const util = require("util");
const multer = require("multer");

//usar el motor de almacenamiento en disco.
let storage = multer.diskStorage({

  //determina la carpeta para almacenar los archivos cargados.  
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },

  //nombre del archivo dentro de la carpeta.
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

//Acepte un solo archivo con el nombre fieldname. 
//El archivo único se almacenará en archivo req.
let uploadFile = multer({
  storage: storage
}).single("uploadfile"); 

//util.promisify()
//objeto de middleware exportado se pueda utilizar async-await.
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;