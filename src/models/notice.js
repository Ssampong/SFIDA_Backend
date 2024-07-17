
const db = require('./db');

exports.createNotice = (challengeId, content, imagePath, callback) => {
    const query = 'INSERT INTO notices (challenge_id, content, image_path) VALUES (?, ?, ?)';
    db.query(query, [challengeId, content, imagePath], callback);
};

exports.getNoticesByChallengeId = (challengeId, callback) => {
    const query = 'SELECT * FROM notices WHERE challenge_id = ?';
    db.query(query, [challengeId], callback);
};
