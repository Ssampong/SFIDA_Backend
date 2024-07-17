// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const challengeController = require('../controllers/challengeController');
// const noticeController = require('../controllers/noticeController');

// // Multer 설정
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/challenges/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// /**
//  * @swagger
//  * tags:
//  *   name: Challenges
//  *   description: The challenges managing API
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Challenge:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: integer
//  *           description: The unique identifier for the challenge
//  *         title:
//  *           type: string
//  *           description: The title of the challenge
//  *         content:
//  *           type: string
//  *           description: The content or description of the challenge
//  *         image_path:
//  *           type: string
//  *           description: The path to the image associated with the challenge
//  *         certifications:
//  *           type: array
//  *           items:
//  *             $ref: '#/components/schemas/Certification'
//  *           description: List of certifications associated with the challenge
//  *         notices:
//  *           type: array
//  *           items:
//  *             $ref: '#/components/schemas/Notice'
//  *           description: List of notices associated with the challenge
//  *         imagePath:
//  *           type: string
//  *           description: The full URL to access the image
//  *     Certification:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: integer
//  *           description: The unique identifier for the certification
//  *         challenge_id:
//  *           type: integer
//  *           description: The ID of the challenge associated with this certification
//  *         content:
//  *           type: string
//  *           description: The content or description of the certification
//  *         image_path:
//  *           type: string
//  *           description: The path to the image associated with the certification
//  *         imagePath:
//  *           type: string
//  *           description: The full URL to access the image
//  *     Notice:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: integer
//  *           description: The unique identifier for the notice
//  *         challenge_id:
//  *           type: integer
//  *           description: The ID of the challenge associated with this notice
//  *         content:
//  *           type: string
//  *           description: The content or description of the notice
//  *         image_path:
//  *           type: string
//  *           description: The path to the image associated with the notice
//  *         imagePath:
//  *           type: string
//  *           description: The full URL to access the image
//  */

// /**
//  * @swagger
//  * /api/challenges:
//  *   get:
//  *     summary: Returns the list of all the challenges
//  *     tags: [Challenges]
//  *     responses:
//  *       200:
//  *         description: The list of the challenges
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Challenge'
//  */
// router.get('/', challengeController.getChallenges);

// /**
//  * @swagger
//  * /api/challenges:
//  *   post:
//  *     summary: Create a new challenge
//  *     tags: [Challenges]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - title
//  *               - content
//  *             properties:
//  *               title:
//  *                 type: string
//  *               content:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       201:
//  *         description: The challenge was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Challenge'
//  *       500:
//  *         description: Some server error
//  */
// router.post('/', upload.single('image'), challengeController.createChallenge);

// /**
//  * @swagger
//  * /api/challenges/{id}:
//  *   get:
//  *     summary: Get the challenge by id
//  *     tags: [Challenges]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: The challenge id
//  *     responses:
//  *       200:
//  *         description: The challenge description by id
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Challenge'
//  *       404:
//  *         description: The challenge was not found
//  *       500:
//  *         description: Some error happened
//  */
// router.get('/:id', challengeController.getChallengeById);

// /**
//  * @swagger
//  * /api/challenges/{challengeId}/notices:
//  *   post:
//  *     summary: Create a notice for a specific challenge
//  *     tags: [Challenges]
//  *     parameters:
//  *       - in: path
//  *         name: challengeId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: The challenge id
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               content:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       201:
//  *         description: The notice was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Notice'
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Some server error
//  */
// router.post('/:challengeId/notices', upload.single('image'), noticeController.createNotice);

// /**
//  * @swagger
//  * /api/challenges/{challengeId}/notices:
//  *   get:
//  *     summary: Get all notices for a specific challenge
//  *     tags: [Challenges]
//  *     parameters:
//  *       - in: path
//  *         name: challengeId
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: The challenge id
//  *     responses:
//  *       200:
//  *         description: List of notices for the challenge
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Notice'
//  *       500:
//  *         description: Some server error
//  */
// router.get('/:challengeId/notices', noticeController.getNoticesByChallengeId);

// // Middleware to add imagePath field to each challenge object in response
// router.use((req, res, next) => {
//     if (res.locals.challenges) {
//         res.locals.challenges.forEach(challenge => {
//             if (challenge.image_path) {
//                 challenge.imagePath = `http://localhost:3000/${challenge.image_path}`;
//             }
//             if (challenge.certifications) {
//                 challenge.certifications.forEach(certification => {
//                     if (certification.image_path) {
//                         certification.imagePath = `http://localhost:3000/${certification.image_path}`;
//                     }
//                 });
//             }
//             if (challenge.notices) {
//                 challenge.notices.forEach(notice => {
//                     if (notice.image_path) {
//                         notice.imagePath = `http://localhost:3000/${notice.image_path}`;
//                     }
//                 });
//             }
//         });
//     }
//     next();
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const challengeController = require('../controllers/challengeController');
const noticeController = require('../controllers/noticeController');

// Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/challenges/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Challenges
 *   description: The challenges managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Challenge:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the challenge
 *         title:
 *           type: string
 *           description: The title of the challenge
 *         content:
 *           type: string
 *           description: The content or description of the challenge
 *         image_path:
 *           type: string
 *           description: The path to the image associated with the challenge
 *         certifications:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Certification'
 *           description: List of certifications associated with the challenge
 *         notices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Notice'
 *           description: List of notices associated with the challenge
 *         imagePath:
 *           type: string
 *           description: The full URL to access the image
 *     Certification:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the certification
 *         challenge_id:
 *           type: integer
 *           description: The ID of the challenge associated with this certification
 *         content:
 *           type: string
 *           description: The content or description of the certification
 *         image_path:
 *           type: string
 *           description: The path to the image associated with the certification
 *         imagePath:
 *           type: string
 *           description: The full URL to access the image
 *     Notice:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the notice
 *         challenge_id:
 *           type: integer
 *           description: The ID of the challenge associated with this notice
 *         content:
 *           type: string
 *           description: The content or description of the notice
 *         image_path:
 *           type: string
 *           description: The path to the image associated with the notice
 *         imagePath:
 *           type: string
 *           description: The full URL to access the image
 */

/**
 * @swagger
 * /api/challenges:
 *   get:
 *     summary: Returns the list of all the challenges
 *     tags: [Challenges]
 *     responses:
 *       200:
 *         description: The list of the challenges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Challenge'
 */
router.get('/', challengeController.getChallenges);

/**
 * @swagger
 * /api/challenges:
 *   post:
 *     summary: Create a new challenge
 *     tags: [Challenges]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The challenge was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Challenge'
 *       500:
 *         description: Some server error
 */
router.post('/', upload.single('image'), challengeController.createChallenge);

/**
 * @swagger
 * /api/challenges/{id}:
 *   get:
 *     summary: Get the challenge by id
 *     tags: [Challenges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The challenge id
 *     responses:
 *       200:
 *         description: The challenge description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Challenge'
 *       404:
 *         description: The challenge was not found
 *       500:
 *         description: Some error happened
 */
router.get('/:id', challengeController.getChallengeById);

/**
 * @swagger
 * /api/challenges/{challengeId}/notices:
 *   post:
 *     summary: Create a notice for a specific challenge
 *     tags: [Challenges]
 *     parameters:
 *       - in: path
 *         name: challengeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The challenge id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The notice was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post('/:challengeId/notices', upload.single('image'), noticeController.createNotice);

/**
 * @swagger
 * /api/challenges/{challengeId}/notices:
 *   get:
 *     summary: Get all notices for a specific challenge
 *     tags: [Challenges]
 *     parameters:
 *       - in: path
 *         name: challengeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The challenge id
 *     responses:
 *       200:
 *         description: List of notices for the challenge
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notice'
 *       500:
 *         description: Some server error
 */
router.get('/:challengeId/notices', noticeController.getNoticesByChallengeId);

// Middleware to add imagePath field to each challenge object in response
function addImagePath(req, res, next) {
    if (res.locals.challenges) {
        res.locals.challenges.forEach(challenge => {
            if (challenge.image_path) {
                challenge.imagePath = `http://192.168.0.46:3000/${challenge.image_path}`;
            }
            if (challenge.certifications) {
                challenge.certifications.forEach(certification => {
                    if (certification.image_path) {
                        certification.imagePath = `http://192.168.0.46:3000/${certification.image_path}`;
                    }
                });
            }
            if (challenge.notices) {
                challenge.notices.forEach(notice => {
                    if (notice.image_path) {
                        notice.imagePath = `http://192.168.0.46:3000/${notice.image_path}`;
                    }
                });
            }
        });
    }
    if (res.locals.challenge) {
        let challenge = res.locals.challenge;
        if (challenge.image_path) {
            challenge.imagePath = `http://192.168.0.46:3000/${challenge.image_path}`;
        }
        if (challenge.certifications) {
            challenge.certifications.forEach(certification => {
                if (certification.image_path) {
                    certification.imagePath = `http://192.168.0.46:3000/${certification.image_path}`;
                }
            });
        }
        if (challenge.notices) {
            challenge.notices.forEach(notice => {
                if (notice.image_path) {
                    notice.imagePath = `http://192.168.0.46:3000/${notice.image_path}`;
                }
            });
        }
    }
    next();
}

router.use(addImagePath);

module.exports = router;
