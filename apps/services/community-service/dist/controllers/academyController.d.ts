import { Request, Response } from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name?: string;
                role: string;
            };
        }
    }
}
/**
 * Get all courses with filtering and pagination
 */
export declare const getAllCourses: (req: Request, res: Response) => Promise<void>;
/**
 * Get single course by ID with detailed information
 */
export declare const getCourseById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Enroll user in a course
 */
export declare const enrollInCourse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get user's enrolled courses
 */
export declare const getUserEnrollments: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Update lesson progress
 */
export declare const updateLessonProgress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get course analytics for instructors/admins
 */
export declare const getCourseAnalytics: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get popular/trending courses
 */
export declare const getPopularCourses: (req: Request, res: Response) => Promise<void>;
/**
 * Search courses with advanced filters
 */
export declare const searchCourses: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=academyController.d.ts.map