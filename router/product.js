const router = require("express").Router()
const { addProduct, getAllProduct, deleteProduct, updateProduct } = require("../controller/ProductController");
const multer = require('multer');
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    var ext = path.extname(file.originalname);
    if (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.jpeg') {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            //cb(null, false);
            return cb(new Error('Only .gif, .png, .jpg and .jpeg format allowed!'));
        }
    } else if (ext === '.mp4' || ext === '.m1v' || ext === '.m4v' || ext === '.avi' || ext === '.mov') {
        if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mpeg' || file.mimetype === 'video/x-m4v' || file.mimetype === 'video/x-msvideo' || file.mimetype === 'video/quicktime') {
            cb(null, true);
        } else {
            //cb(null, false);
            return cb(new Error('Only .mp4, .m1v, .m4v, .avi, .mov format allowed!'));
        }
    }
}

const upload = multer({ fileFilter: fileFilter, storage: storage });

router.post("/add", upload.single('image'), addProduct)
router.get("/all", getAllProduct)
router.delete("/delete/:id", deleteProduct)
router.put("/update/:id", upload.single('image'), updateProduct)


module.exports = router

