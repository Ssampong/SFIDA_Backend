const db = require('../models/db');

exports.createNotice = (req, res) => {
    const { challengeId } = req.params;
    const { content } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const query = 'INSERT INTO notices (challenge_id, content, image_path) VALUES (?, ?, ?)';
    db.query(query, [challengeId, content, imagePath], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Database error', error: err });
        } else {
            res.status(201).send({ message: 'Notice created successfully', noticeId: result.insertId });
        }
    });
};

exports.getNoticesByChallengeId = (req, res) => {
    const { challengeId } = req.params;

    const query = 'SELECT * FROM notices WHERE challenge_id = ?';
    db.query(query, [challengeId], (err, results) => {
        if (err) {
            res.status(500).send({ message: 'Database error', error: err });
        } else {
            res.status(200).send(results);
        }
    });
};
