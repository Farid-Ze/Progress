import { Request, Response } from 'express';
/**
 * Get all mentors with filtering and pagination
 */
export declare const getAllMentors: (req: Request, res: Response) => Promise<void>;
/**
 * Get single mentor by ID with detailed information
 */
export declare const getMentorById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Create mentorship request
 */
export declare const createMentorshipRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get user's mentorship requests (as mentee)
 */
export declare const getUserMentorshipRequests: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Respond to mentorship request (mentor only)
 */
export declare const respondToMentorshipRequest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Schedule mentorship session
 */
export declare const scheduleMentorshipSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get mentorship sessions
 */
export declare const getMentorshipSessions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Add session feedback
 */
export declare const addSessionFeedback: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get mentorship analytics
 */
export declare const getMentorshipAnalytics: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=mentorshipController.d.ts.map