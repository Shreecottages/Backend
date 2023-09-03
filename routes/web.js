const express = require("express");
const { body } = require('express-validator');

const { contact, image, uploadVideo, getImage, deleteImage, getContact, getVideo, deleteVideo, deleteContact } = require("../controllers/ResortController.js");
const authController = require('../controllers/AuthController.js');

const router = express.Router();

const multer = require('multer');
// To reach Login Page
router.post('/login', authController.login);

router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
], authController.signup);

// For Login
// router.post('/login',
//     [check('email')
//         .isEmail()
//         .withMessage('Invalid email or password')
//         .normalizeEmail(),
//     body('password', 'Invalid email or password.')
//         .isLength({ min: 8, max: 16 })
//         .isAlphanumeric()
//         .trim()
//     ],
//     authController.postLogin);

// For Logout
// router.post('/logout', authController.postLogout);



router.get("/api/v1/getcontact", getContact);
router.post("/api/v1/contact", contact);
router.delete("/api/v1/deleteContact/:id", deleteContact);

// const upload = multer({ dest: 'uploads/' })
const imageStorage = multer.diskStorage({
    destination: 'images', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        // if (!file.originalname.match(/\/.(png|jpg|JPG|JPEG|jpeg)$/)) {     // upload only png and jpg format
        //     return cb(new Error('Please upload a Image'))
        // }
        cb(undefined, true)
    }
});

router.get('/api/v1/getImage', getImage);
router.delete('/api/v1/deleteImage/:id', deleteImage);
router.post('/api/v1/uploadImage', imageUpload.single('avatar'), image);

router.get('/api/v1/getvideo', getVideo);
router.post('/api/v1/video', uploadVideo);
router.delete('/api/v1/deletevideo/:id', deleteVideo);

module.exports = router; 