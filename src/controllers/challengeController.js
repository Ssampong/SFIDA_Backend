const db = require('../models/db');

// 도전 과제 목록 가져오기
exports.getChallenges = (req, res) => {
    const query = `
        SELECT challenges.id, challenges.title, challenges.content, challenges.image_path,
               certifications.id AS certification_id, certifications.content AS certification_content, certifications.image_path AS certification_image_path,
               notices.id AS notice_id, notices.content AS notice_content, notices.image_path AS notice_image_path
        FROM challenges
        LEFT JOIN certifications ON challenges.id = certifications.challenge_id
        LEFT JOIN notices ON challenges.id = notices.challenge_id;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send({ message: 'Database error', error: err });
        } else {
            const challengesMap = new Map();

            results.forEach(row => {
                if (!challengesMap.has(row.id)) {
                    challengesMap.set(row.id, {
                        id: row.id,
                        title: row.title,
                        content: row.content,
                        image_path: row.image_path,
                        imagePath: row.image_path ? `http://192.168.0.46:3000/${row.image_path}` : null,
                        certifications: [],
                        notices: []
                    });
                }

                if (row.certification_id) {
                    challengesMap.get(row.id).certifications.push({
                        id: row.certification_id,
                        content: row.certification_content,
                        image_path: row.certification_image_path,
                        imagePath: row.certification_image_path ? `http://192.168.0.46:3000/${row.certification_image_path}` : null
                    });
                }

                if (row.notice_id) {
                    challengesMap.get(row.id).notices.push({
                        id: row.notice_id,
                        content: row.notice_content,
                        image_path: row.notice_image_path,
                        imagePath: row.notice_image_path ? `http://192.168.0.46:3000/${row.notice_image_path}` : null
                    });
                }
            });

            res.status(200).send(Array.from(challengesMap.values()));
        }
    });
};

// ID로 특정 도전 과제 가져오기
exports.getChallengeById = (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT challenges.id, challenges.title, challenges.content, challenges.image_path,
               certifications.id AS certification_id, certifications.content AS certification_content, certifications.image_path AS certification_image_path,
               notices.id AS notice_id, notices.content AS notice_content, notices.image_path AS notice_image_path
        FROM challenges
        LEFT JOIN certifications ON challenges.id = certifications.challenge_id
        LEFT JOIN notices ON challenges.id = notices.challenge_id
        WHERE challenges.id = ?;
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send({ message: 'Database error', error: err });
        } else {
            if (results.length === 0) {
                return res.status(404).send({ message: 'Challenge not found' });
            }

            const challenge = {
                id: results[0].id,
                title: results[0].title,
                content: results[0].content,
                image_path: results[0].image_path,
                imagePath: results[0].image_path ? `http://192.168.0.46:3000/${results[0].image_path}` : null,
                certifications: [],
                notices: []
            };

            results.forEach(row => {
                if (row.certification_id) {
                    challenge.certifications.push({
                        id: row.certification_id,
                        content: row.certification_content,
                        image_path: row.certification_image_path,
                        imagePath: row.certification_image_path ? `http://192.168.0.46:3000/${row.certification_image_path}` : null
                    });
                }

                if (row.notice_id) {
                    challenge.notices.push({
                        id: row.notice_id,
                        content: row.notice_content,
                        image_path: row.notice_image_path,
                        imagePath: row.notice_image_path ? `http://192.168.0.46:3000/${row.notice_image_path}` : null
                    });
                }
            });

            res.status(200).send(challenge);
        }
    });
};

// 도전 과제 생성
exports.createChallenge = (req, res) => {
    const { title, content } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const query = 'INSERT INTO challenges (title, content, image_path) VALUES (?, ?, ?)';
    db.query(query, [title, content, imagePath], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Database error', error: err });
        } else {
            res.status(201).send({ message: 'Challenge created successfully', challengeId: result.insertId });
        }
    });
};
