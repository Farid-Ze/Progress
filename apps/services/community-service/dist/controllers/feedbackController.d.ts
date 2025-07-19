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
 * Get all feedback items
 */
export declare const getAllFeedback: (req: Request, res: Response) => Promise<void>;
/**
 * Get single feedback item by ID
 */
export declare const getFeedbackById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Create new feedback
 */
export declare const createFeedback: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Update feedback status (admin only)
 */
export declare const updateFeedbackStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Vote on feedback
 */
export declare const voteFeedback: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Add response/comment to feedback
 */
export declare const addFeedbackResponse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get trending feedback
 */
export declare const getTrendingFeedback: (req: Request, res: Response) => Promise<void>;
/**
 * Get feedback analytics
 */
export declare const getFeedbackAnalytics: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=feedbackController.d.ts.map