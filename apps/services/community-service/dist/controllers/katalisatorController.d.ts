import { Request, Response } from 'express';
/**
 * Get regional statistics for Katalisator Perubahan Jabar
 */
export declare const getRegionalStats: (req: Request, res: Response) => Promise<void>;
/**
 * Get Katalisator partners
 */
export declare const getKatalisatorPartners: (req: Request, res: Response) => Promise<void>;
/**
 * Get Katalisator initiatives
 */
export declare const getKatalisatorInitiatives: (req: Request, res: Response) => Promise<void>;
/**
 * Create new partner registration
 */
export declare const createPartnerRegistration: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get partner dashboard data
 */
export declare const getPartnerDashboard: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Update partner information
 */
export declare const updatePartner: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Get impact analytics for specific region
 */
export declare const getRegionalImpactAnalytics: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=katalisatorController.d.ts.map