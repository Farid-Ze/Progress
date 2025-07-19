// Community Service - Express Server with Controllers
import cors from 'cors';
import express, { Request, Response, json } from 'express';

// Import controllers
import {
  getAllCourses,
  getCourseById,
  enrollInCourse,
  getUserEnrollments,
  updateLessonProgress,
  getCourseAnalytics,
  getPopularCourses,
  searchCourses
} from './controllers/academyController';
import {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedbackStatus,
  voteFeedback,
  addFeedbackResponse,
  getTrendingFeedback,
  getFeedbackAnalytics
} from './controllers/feedbackController';

const app = express();

// Middleware
app.use(cors());
app.use(json({ limit: '10mb' }));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    service: 'community-service',
    timestamp: new Date().toISOString()
  });
});

// Academy routes
app.get('/api/v1/academy/courses', getAllCourses);
app.get('/api/v1/academy/courses/popular', getPopularCourses);
app.get('/api/v1/academy/courses/search', searchCourses);
app.get('/api/v1/academy/courses/:courseId', getCourseById);
app.post('/api/v1/academy/courses/:courseId/enroll', enrollInCourse);
app.get('/api/v1/academy/enrollments', getUserEnrollments);
app.post('/api/v1/academy/courses/:courseId/modules/:moduleId/lessons/:lessonId/progress', updateLessonProgress);
app.get('/api/v1/academy/analytics', getCourseAnalytics);

// Feedback routes
app.get('/api/v1/feedback', getAllFeedback);
app.get('/api/v1/feedback/trending', getTrendingFeedback);
app.get('/api/v1/feedback/analytics', getFeedbackAnalytics);
app.get('/api/v1/feedback/:feedbackId', getFeedbackById);
app.post('/api/v1/feedback', createFeedback);
app.put('/api/v1/feedback/:feedbackId/status', updateFeedbackStatus);
app.post('/api/v1/feedback/:feedbackId/vote', voteFeedback);
app.post('/api/v1/feedback/:feedbackId/responses', addFeedbackResponse);

// Legacy community routes
app.get('/api/v1/communities', (_req: Request, res: Response) => {
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

export default app;
