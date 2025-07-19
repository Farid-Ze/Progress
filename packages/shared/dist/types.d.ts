/**
 * Common types used across Merajut ASA platform
 * Provides type safety and consistency across all services
 */
export type ID = string;
export type Timestamp = Date | string;
export type Email = string;
export type URL = string;
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
export type CampaignCategory = 'health' | 'education' | 'environment' | 'social' | 'emergency' | 'community' | 'technology';
export type CampaignStatus = 'draft' | 'review' | 'active' | 'paused' | 'completed' | 'cancelled' | 'expired';
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
    duration: number;
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
export interface Donation {
    readonly id: ID;
    campaignId: ID;
    donorId?: ID;
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
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'e_wallet' | 'crypto';
export type DonationStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
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
export interface Course {
    readonly id: ID;
    title: string;
    description: string;
    thumbnail: URL;
    level: CourseLevel;
    category: CourseCategory;
    instructor: Instructor;
    duration: number;
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
export type CourseCategory = 'digital-literacy' | 'entrepreneurship' | 'technology' | 'leadership' | 'creative';
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
export type FeedbackCategory = 'bug' | 'feature_request' | 'improvement' | 'content' | 'other';
export type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';
export type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'duplicate';
export interface FeedbackComment {
    id: ID;
    feedbackId: ID;
    userId: ID;
    content: string;
    isStaff: boolean;
    readonly createdAt: Timestamp;
}
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
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export declare const CURRENCIES: readonly ["IDR", "USD"];
export type Currency = typeof CURRENCIES[number];
export declare const LANGUAGES: readonly ["id", "en"];
export type Language = typeof LANGUAGES[number];
export declare const TIMEZONES: readonly ["Asia/Jakarta", "Asia/Makassar", "Asia/Jayapura"];
export type Timezone = typeof TIMEZONES[number];
export declare function validateCampaign(campaign: any): asserts campaign is Campaign;
export declare function validateUser(user: any): asserts user is User;
export declare function validateDonation(donation: any): asserts donation is Donation;
//# sourceMappingURL=types.d.ts.map