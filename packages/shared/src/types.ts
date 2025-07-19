/**
 * Common types used across Merajut ASA platform
 * Provides type safety and consistency across all services
 */

// ============================================================================
// Base Types
// ============================================================================

export type ID = string;
export type Timestamp = Date | string;
export type Email = string;
export type URL = string;

// ============================================================================
// Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// User Types
// ============================================================================

export interface User {
  readonly id: ID;
  email: Email;
  name: string;
  avatar?: URL;
  role: UserRole;
  status: UserStatus;
  verified: boolean;
  profile?: UserProfile;
  preferences?: UserPreferences;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

export type UserRole = 'user' | 'creator' | 'admin' | 'moderator';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface UserProfile {
  bio?: string;
  phone?: string;
  address?: Address;
  dateOfBirth?: Timestamp;
  occupation?: string;
  interests: string[];
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  accessibility: AccessibilityPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface AccessibilityPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'x-large';
}

// ============================================================================
// Campaign Types
// ============================================================================

export interface Campaign {
  readonly id: ID;
  title: string;
  description: string;
  shortDescription: string;
  image: URL;
  images: URL[];
  category: CampaignCategory;
  target: number;
  raised: number;
  currency: string;
  status: CampaignStatus;
  creator: CampaignCreator;
  beneficiary?: CampaignBeneficiary;
  timeline: CampaignTimeline;
  location?: Address;
  tags: string[];
  documents: CampaignDocument[];
  updates: CampaignUpdate[];
  metrics: CampaignMetrics;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

export type CampaignCategory = 
  | 'health' 
  | 'education' 
  | 'environment' 
  | 'social' 
  | 'emergency' 
  | 'community'
  | 'technology';

export type CampaignStatus = 
  | 'draft' 
  | 'review' 
  | 'active' 
  | 'paused' 
  | 'completed' 
  | 'cancelled'
  | 'expired';

export interface CampaignCreator {
  id: ID;
  name: string;
  avatar?: URL;
  verified: boolean;
  organization?: string;
  totalCampaigns: number;
  totalRaised: number;
}

export interface CampaignBeneficiary {
  name: string;
  relationship: string;
  contact?: string;
  verified: boolean;
}

export interface CampaignTimeline {
  startDate: Timestamp;
  endDate: Timestamp;
  duration: number; // days
}

export interface CampaignDocument {
  id: ID;
  type: 'identity' | 'medical' | 'legal' | 'financial' | 'other';
  name: string;
  url: URL;
  verified: boolean;
  uploadedAt: Timestamp;
}

export interface CampaignUpdate {
  id: ID;
  title: string;
  content: string;
  images?: URL[];
  author: ID;
  publishedAt: Timestamp;
}

export interface CampaignMetrics {
  views: number;
  shares: number;
  likes: number;
  donations: number;
  averageDonation: number;
  donorCount: number;
  commentCount: number;
}

// ============================================================================
// Donation Types
// ============================================================================

export interface Donation {
  readonly id: ID;
  campaignId: ID;
  donorId?: ID; // Anonymous donations have no donorId
  amount: number;
  currency: string;
  message?: string;
  anonymous: boolean;
  paymentMethod: PaymentMethod;
  paymentId: string;
  status: DonationStatus;
  processedAt?: Timestamp;
  refundedAt?: Timestamp;
  readonly createdAt: Timestamp;
}

export type PaymentMethod = 
  | 'credit_card' 
  | 'bank_transfer' 
  | 'e_wallet' 
  | 'crypto';

export type DonationStatus = 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'failed' 
  | 'refunded'
  | 'cancelled';

// ============================================================================
// Community Types
// ============================================================================

export interface Community {
  readonly id: ID;
  name: string;
  description: string;
  avatar?: URL;
  banner?: URL;
  type: CommunityType;
  category: string;
  memberCount: number;
  isPublic: boolean;
  tags: string[];
  rules: string[];
  moderators: ID[];
  readonly createdAt: Timestamp;
}

export type CommunityType = 'open' | 'private' | 'invite_only';

export interface CommunityMember {
  userId: ID;
  communityId: ID;
  role: CommunityRole;
  joinedAt: Timestamp;
  isActive: boolean;
}

export type CommunityRole = 'member' | 'moderator' | 'admin';

// ============================================================================
// Academy Types (Akademi Penggerak Digital)
// ============================================================================

export interface Course {
  readonly id: ID;
  title: string;
  description: string;
  thumbnail: URL;
  level: CourseLevel;
  category: CourseCategory;
  instructor: Instructor;
  duration: number; // minutes
  modules: CourseModule[];
  price: number;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  language: string;
  tags: string[];
  requirements: string[];
  learningOutcomes: string[];
  certificate: boolean;
  isActive: boolean;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseCategory = 
  | 'digital-literacy' 
  | 'entrepreneurship' 
  | 'technology' 
  | 'leadership' 
  | 'creative';

export interface Instructor {
  id: ID;
  name: string;
  avatar: URL;
  title: string;
  expertise: string[];
}

export interface CourseModule {
  id: ID;
  courseId: ID;
  title: string;
  description: string;
  order: number;
  duration: number;
  lessons: Lesson[];
  isLocked: boolean;
}

export interface Lesson {
  id: ID;
  moduleId: ID;
  title: string;
  description: string;
  type: LessonType;
  content: string;
  videoUrl?: URL;
  duration?: number;
  order: number;
  isCompleted?: boolean;
  resources: LessonResource[];
}

export type LessonType = 'video' | 'text' | 'quiz' | 'assignment' | 'discussion';

export interface LessonResource {
  id: ID;
  title: string;
  type: ResourceType;
  url: URL;
  size?: string;
}

export type ResourceType = 'pdf' | 'link' | 'document' | 'video';

// ============================================================================
// Feedback Types (Suara Komunitas)
// ============================================================================

export interface Feedback {
  readonly id: ID;
  userId: ID;
  category: FeedbackCategory;
  title: string;
  description: string;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  votes: number;
  comments: FeedbackComment[];
  tags: string[];
  attachments: URL[];
  assignedTo?: ID;
  resolution?: string;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
  resolvedAt?: Timestamp;
}

export type FeedbackCategory = 
  | 'bug' 
  | 'feature_request' 
  | 'improvement' 
  | 'content' 
  | 'other';

export type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';
export type FeedbackStatus = 
  | 'open' 
  | 'in_progress' 
  | 'resolved' 
  | 'closed' 
  | 'duplicate';

export interface FeedbackComment {
  id: ID;
  feedbackId: ID;
  userId: ID;
  content: string;
  isStaff: boolean;
  readonly createdAt: Timestamp;
}

// ============================================================================
// Address & Location Types
// ============================================================================

export interface Address {
  street?: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// ============================================================================
// File & Media Types
// ============================================================================

export interface FileUpload {
  id: ID;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: URL;
  uploadedBy: ID;
  readonly uploadedAt: Timestamp;
}

export interface ImageVariants {
  thumbnail: URL;
  small: URL;
  medium: URL;
  large: URL;
  original: URL;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, unknown>;
  userId?: ID;
  sessionId: string;
  timestamp: Timestamp;
}

export interface PerformanceMetrics {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  url: string;
  timestamp: number;
}

// ============================================================================
// Error Types
// ============================================================================

export interface AppErrorInterface {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

export type ValidationErrorType = {
  field: string;
  message: string;
  value?: unknown;
};

// ============================================================================
// Utility Types
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ============================================================================
// Constants
// ============================================================================

export const CURRENCIES = ['IDR', 'USD'] as const;
export type Currency = typeof CURRENCIES[number];

export const LANGUAGES = ['id', 'en'] as const;
export type Language = typeof LANGUAGES[number];

export const TIMEZONES = [
  'Asia/Jakarta',
  'Asia/Makassar', 
  'Asia/Jayapura'
] as const;
export type Timezone = typeof TIMEZONES[number];

// ============================================================================
// Validation Functions
// ============================================================================

export function validateCampaign(campaign: any): asserts campaign is Campaign {
  if (!campaign.title || typeof campaign.title !== 'string') {
    throw new Error('Title is required');
  }
  
  if (!campaign.description || typeof campaign.description !== 'string') {
    throw new Error('Description is required');
  }
  
  if (!campaign.goal || typeof campaign.goal !== 'number' || campaign.goal <= 0) {
    throw new Error('Goal must be positive');
  }
  
  if (campaign.startDate && campaign.endDate) {
    const start = new Date(campaign.startDate);
    const end = new Date(campaign.endDate);
    if (start >= end) {
      throw new Error('End date must be after start date');
    }
  }
}

export function validateUser(user: any): asserts user is User {
  if (!user.name || typeof user.name !== 'string' || user.name.trim() === '') {
    throw new Error('Name cannot be empty');
  }
  
  if (!user.email || typeof user.email !== 'string') {
    throw new Error('Email is required');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    throw new Error('Invalid email format');
  }
}

export function validateDonation(donation: any): asserts donation is Donation {
  if (!donation.amount || typeof donation.amount !== 'number' || donation.amount <= 0) {
    throw new Error('Donation amount must be positive');
  }
  
  if (!donation.campaignId || typeof donation.campaignId !== 'string') {
    throw new Error('Campaign ID is required');
  }
  
  if (!donation.donorId || typeof donation.donorId !== 'string') {
    throw new Error('Donor ID is required');
  }
}
