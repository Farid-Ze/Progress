import { Request, Response } from 'express';
/**
 * Get all impact metrics with filtering
 */
export declare const getAllImpactMetrics: (req: Request, res: Response) => Promise<void>;
/**
 * Get impact metric by ID with time series data
 */
export declare const getImpactMetricById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get regional impact data
 */
export declare const getRegionalImpact: (req: Request, res: Response) => Promise<void>;
/**
 * Get SDG progress
 */
export declare const getSDGProgress: (req: Request, res: Response) => Promise<void>;
/**
 * Get impact reports
 */
export declare const getImpactReports: (req: Request, res: Response) => Promise<void>;
/**
 * Get dashboard overview
 */
export declare const getDashboardOverview: (req: Request, res: Response) => Promise<void>;
/**
 * Export impact data
 */
export declare const exportImpactData: (req: Request, res: Response) => Promise<void>;
/**
 * Update impact metric (admin only)
 */
export declare const updateImpactMetric: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=impactController.d.ts.map