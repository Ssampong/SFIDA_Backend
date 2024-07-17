const express = require('express');
const router = express.Router();
const multer = require('multer');
const certificationController = require('../controllers/certificationController');

// Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/certifications/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// 인증서 생성 엔드포인트
router.post('/:challengeId', upload.single('image'), certificationController.createCertification);

module.exports = router;
