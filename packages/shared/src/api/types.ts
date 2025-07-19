/**
 * Type-safe API client for Merajut ASA
 * Provides comprehensive type safety for all API endpoints
 */

import { 
  ApiResponse, 
  PaginationParams, 
  User, 
  Campaign, 
  Donation, 
  Course, 
  Feedback 
} from '../types';

// ============================================================================
// Base API Client Configuration
// ============================================================================

export interface ApiClientConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

// ============================================================================
// Authentication API Types
// ============================================================================

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  agreeToTerms: boolean;
}

export interface RegisterResponse {
  user: User;
  requiresVerification: boolean;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ============================================================================
// User API Types
// ============================================================================

export interface UpdateUserRequest {
  name?: string;
  bio?: string;
  phone?: string;
  avatar?: File;
  preferences?: {
    language?: string;
    timezone?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
  };
}

export interface GetUsersParams extends PaginationParams {
  search?: string;
  role?: string;
  status?: string;
}

// ============================================================================
// Campaign API Types
// ============================================================================

export interface CreateCampaignRequest {
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  target: number;
  endDate: string;
  image: File;
  documents?: File[];
  tags?: string[];
}

export interface UpdateCampaignRequest {
  title?: string;
  description?: string;
  shortDescription?: string;
  category?: string;
  target?: number;
  endDate?: string;
  image?: File;
  tags?: string[];
}

export interface GetCampaignsParams extends PaginationParams {
  category?: string;
  status?: string;
  search?: string;
  featured?: boolean;
  creatorId?: string;
}

export interface CampaignUpdateRequest {
  title: string;
  content: string;
  images?: File[];
}

// ============================================================================
// Donation API Types
// ============================================================================

export interface CreateDonationRequest {
  campaignId: string;
  amount: number;
  message?: string;
  anonymous?: boolean;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'e_wallet';
}

export interface GetDonationsParams extends PaginationParams {
  campaignId?: string;
  userId?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

// ============================================================================
// Academy API Types
// ============================================================================

export interface GetCoursesParams extends PaginationParams {
  category?: string;
  level?: string;
  search?: string;
  featured?: boolean;
  enrolled?: boolean;
}

export interface EnrollCourseRequest {
  courseId: string;
}

export interface UpdateProgressRequest {
  lessonId: string;
  completed: boolean;
  timeSpent?: number;
}

// ============================================================================
// Feedback API Types
// ============================================================================

export interface CreateFeedbackRequest {
  category: string;
  title: string;
  description: string;
  priority?: string;
  tags?: string[];
  attachments?: File[];
}

export interface GetFeedbackParams extends PaginationParams {
  category?: string;
  status?: string;
  priority?: string;
  search?: string;
  userId?: string;
}

export interface VoteFeedbackRequest {
  feedbackId: string;
  vote: 'up' | 'down';
}

// ============================================================================
// File Upload Types
// ============================================================================

export interface UploadFileRequest {
  file: File;
  type: 'avatar' | 'campaign' | 'document' | 'attachment';
  campaignId?: string;
}

export interface UploadFileResponse {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimetype: string;
}

// ============================================================================
// Analytics API Types
// ============================================================================

export interface AnalyticsParams {
  dateFrom: string;
  dateTo: string;
  granularity?: 'day' | 'week' | 'month';
}

export interface CampaignAnalytics {
  campaignId: string;
  views: number;
  donations: number;
  totalRaised: number;
  averageDonation: number;
  conversionRate: number;
  traffic: {
    organic: number;
    social: number;
    direct: number;
    referral: number;
  };
}

export interface UserAnalytics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  retention: {
    day1: number;
    day7: number;
    day30: number;
  };
}

// ============================================================================
// Search API Types
// ============================================================================

export interface SearchParams {
  query: string;
  type?: 'campaigns' | 'users' | 'courses' | 'all';
  limit?: number;
  filters?: Record<string, unknown>;
}

export interface SearchResult {
  type: 'campaign' | 'user' | 'course';
  id: string;
  title: string;
  description?: string;
  image?: string;
  relevance: number;
  highlight?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  took: number;
  suggestions?: string[];
}

// ============================================================================
// API Client Interface
// ============================================================================

export interface ApiClient {
  // Authentication
  auth: {
    login(data: LoginRequest): Promise<ApiResponse<LoginResponse>>;
    register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>>;
    logout(): Promise<ApiResponse<void>>;
    refresh(): Promise<ApiResponse<{ accessToken: string }>>;
    resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>>;
    changePassword(data: ChangePasswordRequest): Promise<ApiResponse<void>>;
    verifyEmail(token: string): Promise<ApiResponse<void>>;
  };

  // Users
  users: {
    getProfile(): Promise<ApiResponse<User>>;
    updateProfile(data: UpdateUserRequest): Promise<ApiResponse<User>>;
    getUsers(params?: GetUsersParams): Promise<ApiResponse<User[]>>;
    getUserById(id: string): Promise<ApiResponse<User>>;
    deleteUser(id: string): Promise<ApiResponse<void>>;
  };

  // Campaigns
  campaigns: {
    getCampaigns(params?: GetCampaignsParams): Promise<ApiResponse<Campaign[]>>;
    getCampaignById(id: string): Promise<ApiResponse<Campaign>>;
    createCampaign(data: CreateCampaignRequest): Promise<ApiResponse<Campaign>>;
    updateCampaign(id: string, data: UpdateCampaignRequest): Promise<ApiResponse<Campaign>>;
    deleteCampaign(id: string): Promise<ApiResponse<void>>;
    addUpdate(id: string, data: CampaignUpdateRequest): Promise<ApiResponse<void>>;
    getAnalytics(id: string, params: AnalyticsParams): Promise<ApiResponse<CampaignAnalytics>>;
  };

  // Donations
  donations: {
    getDonations(params?: GetDonationsParams): Promise<ApiResponse<Donation[]>>;
    createDonation(data: CreateDonationRequest): Promise<ApiResponse<Donation>>;
    getDonationById(id: string): Promise<ApiResponse<Donation>>;
    refundDonation(id: string): Promise<ApiResponse<void>>;
  };

  // Academy
  academy: {
    getCourses(params?: GetCoursesParams): Promise<ApiResponse<Course[]>>;
    getCourseById(id: string): Promise<ApiResponse<Course>>;
    enrollCourse(data: EnrollCourseRequest): Promise<ApiResponse<void>>;
    updateProgress(courseId: string, data: UpdateProgressRequest): Promise<ApiResponse<void>>;
    getEnrollments(): Promise<ApiResponse<Course[]>>;
  };

  // Feedback
  feedback: {
    getFeedback(params?: GetFeedbackParams): Promise<ApiResponse<Feedback[]>>;
    createFeedback(data: CreateFeedbackRequest): Promise<ApiResponse<Feedback>>;
    getFeedbackById(id: string): Promise<ApiResponse<Feedback>>;
    voteFeedback(data: VoteFeedbackRequest): Promise<ApiResponse<void>>;
    updateStatus(id: string, status: string): Promise<ApiResponse<void>>;
  };

  // Files
  files: {
    upload(data: UploadFileRequest): Promise<ApiResponse<UploadFileResponse>>;
    delete(id: string): Promise<ApiResponse<void>>;
  };

  // Search
  search: {
    search(params: SearchParams): Promise<ApiResponse<SearchResponse>>;
  };

  // Analytics
  analytics: {
    getOverview(params: AnalyticsParams): Promise<ApiResponse<{
      campaigns: CampaignAnalytics[];
      users: UserAnalytics;
    }>>;
  };
}

// ============================================================================
// HTTP Methods for Type Safety
// ============================================================================

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions extends RequestConfig {
  method?: HttpMethod;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

// ============================================================================
// Error Types
// ============================================================================

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode: number;
  timestamp: string;
}

export class ApiClientError extends Error {
  constructor(
    public error: ApiError,
    public response?: Response
  ) {
    super(error.message);
    this.name = 'ApiClientError';
  }
}

// ============================================================================
// Utility Types
// ============================================================================

export type ApiEndpoint<T = unknown> = (
  ...args: unknown[]
) => Promise<ApiResponse<T>>;

export type ApiParams<T> = T extends (...args: infer P) => unknown ? P : never;
export type ApiReturn<T> = T extends (...args: unknown[]) => Promise<infer R> ? R : never;
