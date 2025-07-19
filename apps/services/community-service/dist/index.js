"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Community Service - Express Server with Controllers
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
// Import controllers
const academyController_1 = require("./controllers/academyController");
const feedbackController_1 = require("./controllers/feedbackController");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
// Health check
app.get('/health', (_req, res) => {
    res.json({
        status: 'OK',
        service: 'community-service',
        timestamp: new Date().toISOString()
    });
});
// Academy routes
app.get('/api/v1/academy/courses', academyController_1.getAllCourses);
app.get('/api/v1/academy/courses/popular', academyController_1.getPopularCourses);
app.get('/api/v1/academy/courses/search', academyController_1.searchCourses);
app.get('/api/v1/academy/courses/:courseId', academyController_1.getCourseById);
app.post('/api/v1/academy/courses/:courseId/enroll', academyController_1.enrollInCourse);
app.get('/api/v1/academy/enrollments', academyController_1.getUserEnrollments);
app.post('/api/v1/academy/courses/:courseId/modules/:moduleId/lessons/:lessonId/progress', academyController_1.updateLessonProgress);
app.get('/api/v1/academy/analytics', academyController_1.getCourseAnalytics);
// Feedback routes
app.get('/api/v1/feedback', feedbackController_1.getAllFeedback);
app.get('/api/v1/feedback/trending', feedbackController_1.getTrendingFeedback);
app.get('/api/v1/feedback/analytics', feedbackController_1.getFeedbackAnalytics);
app.get('/api/v1/feedback/:feedbackId', feedbackController_1.getFeedbackById);
app.post('/api/v1/feedback', feedbackController_1.createFeedback);
app.put('/api/v1/feedback/:feedbackId/status', feedbackController_1.updateFeedbackStatus);
app.post('/api/v1/feedback/:feedbackId/vote', feedbackController_1.voteFeedback);
app.post('/api/v1/feedback/:feedbackId/responses', feedbackController_1.addFeedbackResponse);
// Legacy community routes
app.get('/api/v1/communities', (_req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: '1',
                name: 'Komunitas ASA Jakarta',
                description: 'Komunitas peduli sosial di Jakarta',
                memberCount: 150,
                status: 'active'
            }
        ]
    });
});
const PORT = process.env['PORT'] || 3004;
app.listen(PORT, () => {
    console.log(`Community Service running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Academy API: http://localhost:${PORT}/api/v1/academy/courses`);
    console.log(`Feedback API: http://localhost:${PORT}/api/v1/feedback`);
});
exports.default = app;
//# sourceMappingURL=index.js.map