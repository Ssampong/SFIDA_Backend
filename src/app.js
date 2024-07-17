const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const challengeRoutes = require('./routes/challenges');
const certificationRoutes = require('./routes/certifications');
const noticeRoutes = require('./routes/notices');

const app = express();

// Middleware 설정
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Swagger 설정
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Challenge API',
            version: '1.0.0',
            description: 'API for managing challenges, certifications, and notices',
        },
        servers: [
            {
                url: 'http://192.168.0.46:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // 라우터 파일 경로 지정
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Challenge, Certification, Notice 라우터 설정
app.use('/api/challenges', challengeRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/notices', noticeRoutes);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
