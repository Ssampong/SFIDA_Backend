const db = require('../models/db');

// POST /api/challenges/:challengeId/certifications - 특정 챌린지에 인증서 생성
exports.createCertification = (req, res) => {
    const challengeId = req.params.challengeId;
    const { content } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const query = 'INSERT INTO certifications (challenge_id, content, image_path) VALUES (?, ?, ?)';
    db.query(query, [challengeId, content, imagePath], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send({ message: 'Database error', error: err });
        } else {
            res.status(201).send({ message: 'Certification created successfully', certificationId: result.insertId });
        }
    });
};

// GET /api/challenges/:challengeId/certifications - 특정 챌린지의 모든 인증서 가져오기
exports.getCertificationsByChallengeId = (req, res) => {
    const challengeId = req.params.challengeId;

    const query = 'SELECT id, content, image_path FROM certifications WHERE challenge_id = ?';
    db.query(query, [challengeId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send({ message: 'Database error', error: err });
        } else {
            res.status(200).send(results);
        }
    });
};
