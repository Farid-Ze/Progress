/**
 * Common types used across Merajut ASA platform
 * Provides type safety and consistency across all services
 */
// ============================================================================
// Constants
// ============================================================================
export const CURRENCIES = ['IDR', 'USD'];
export const LANGUAGES = ['id', 'en'];
export const TIMEZONES = [
    'Asia/Jakarta',
    'Asia/Makassar',
    'Asia/Jayapura'
];
// ============================================================================
// Validation Functions
// ============================================================================
export function validateCampaign(campaign) {
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
export function validateUser(user) {
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
export function validateDonation(donation) {
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
//# sourceMappingURL=types.js.map