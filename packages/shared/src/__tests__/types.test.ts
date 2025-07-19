// Example test for API types and validation

import { validateCampaign, validateUser } from '../types';

describe('Type Validation', () => {
  describe('validateCampaign', () => {
    const validCampaign = {
      id: '1',
      title: 'Test Campaign',
      description: 'A test campaign',
      goal: 1000000,
      raised: 500000,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'active' as const,
      category: 'education' as const,
      images: ['image1.jpg'],
      creator: {
        id: '1',
        name: 'Test Creator',
        email: 'test@example.com'
      }
    };

    it('should validate a correct campaign', () => {
      expect(() => validateCampaign(validCampaign)).not.toThrow();
    });

    it('should throw error for missing required fields', () => {
      const invalidCampaign = { ...validCampaign };
      delete (invalidCampaign as any).title;
      
      expect(() => validateCampaign(invalidCampaign)).toThrow('Title is required');
    });

    it('should throw error for invalid goal amount', () => {
      const invalidCampaign = { ...validCampaign, goal: -1000 };
      
      expect(() => validateCampaign(invalidCampaign)).toThrow('Goal must be positive');
    });

    it('should throw error for invalid date range', () => {
      const invalidCampaign = {
        ...validCampaign,
        startDate: new Date('2024-12-31'),
        endDate: new Date('2024-01-01')
      };
      
      expect(() => validateCampaign(invalidCampaign)).toThrow('End date must be after start date');
    });
  });

  describe('validateUser', () => {
    const validUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      profile: {
        bio: 'Test bio',
        avatar: 'avatar.jpg',
        verified: false
      }
    };

    it('should validate a correct user', () => {
      expect(() => validateUser(validUser)).not.toThrow();
    });

    it('should throw error for invalid email format', () => {
      const invalidUser = { ...validUser, email: 'invalid-email' };
      
      expect(() => validateUser(invalidUser)).toThrow('Invalid email format');
    });

    it('should throw error for empty name', () => {
      const invalidUser = { ...validUser, name: '' };
      
      expect(() => validateUser(invalidUser)).toThrow('Name cannot be empty');
    });
  });
});
