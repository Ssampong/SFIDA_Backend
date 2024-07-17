const express = require('express');
const router = express.Router();
const multer = require('multer');
const noticeController = require('../controllers/noticeController');

// Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/notices/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// 공지사항 생성 엔드포인트
router.post('/:challengeId', upload.single('image'), noticeController.createNotice);

// 특정 챌린지의 공지사항 조회 엔드포인트
router.get('/:challengeId', noticeController.getNoticesByChallengeId);

module.exports = router;
