const multer = require("multer");  
const mimeTypes = require("../consts/index"); 
const fs = require("fs");

// uploads klasörü var mı kontrol et, yoksa oluştur
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//multer storage (depolama) ayarları
const storage = multer.diskStorage({  
  destination: (req, file, cb) => {  
    cb(null, "./uploads");  
  },  
  filename: (req, file, cb) => {  
    const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).slice(2)}`;  
    const randomName = `${uniqueSuffix}_${file.fieldname}_${file.originalname}`;  
    cb(null, randomName);  
  },  
});

// Dosya türü filtresi (sadece resim dosyaları)
const fileFilter = (req, file, cb) => {  
  if (mimeTypes.general.IMAGE_MIME_TYPES.includes(file.mimetype)) {  
    cb(null, true);  
  } else {  
    cb(new Error("Desteklenmeyen dosya biçimi!"), false);  
  }  
};

// Multer middleware'inin ayarları
const upload = multer({  
  storage,  
  fileFilter,  
  limits: {  
    fileSize: 5 * 1024 * 1024,  // 5 MB dosya sınırı
  },  
}).single("image");  

module.exports = upload;
