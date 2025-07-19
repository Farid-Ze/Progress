import { Request, Response } from 'express';

// Types for Mentorship Program
interface Mentor {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  bio: string;
  expertise: string[];
  industries: string[];
  experience: number; // years
  rating: number;
  reviewCount: number;
  totalMentees: number;
  activeMentees: number;
  languages: string[];
  availability: {
    timezone: string;
    preferredTimes: string[];
    maxMenteesPerMonth: number;
  };
  pricing: {
    type: 'free' | 'paid';
    ratePerHour?: number;
    packageDeals?: {
      sessions: number;
      price: number;
      duration: string;
    }[];
  };
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  isActive: boolean;
  joinedAt: Date;
  lastActiveAt: Date;
}

interface MentorshipRequest {
  id: string;
  menteeId: string;
  mentorId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  topic: string;
  description: string;
  goals: string[];
  preferredDuration: number; // weeks
  preferredFrequency: string; // weekly, bi-weekly, monthly
  urgency: 'low' | 'medium' | 'high';
  createdAt: Date;
  respondedAt?: Date;
  startDate?: Date;
  endDate?: Date;
  mentorResponse?: string;
}

interface MentorshipSession {
  id: string;
  mentorshipRequestId: string;
  mentorId: string;
  menteeId: string;
  title: string;
  description: string;
  scheduledAt: Date;
  duration: number; // minutes
  type: 'video-call' | 'phone-call' | 'in-person' | 'text-chat';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  meetingLink?: string;
  location?: string;
  agenda: string[];
  notes?: string;
  feedback?: {
    mentorRating?: number;
    menteeRating?: number;
    mentorComment?: string;
    menteeComment?: string;
  };
  attachments: string[];
  createdAt: Date;
  completedAt?: Date;
}

interface MentorshipGoal {
  id: string;
  mentorshipRequestId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed';
  targetDate?: Date;
  progress: number; // 0-100
  milestones: {
    id: string;
    title: string;
    completed: boolean;
    completedAt?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

interface MentorReview {
  id: string;
  mentorId: string;
  reviewerId: string;
  mentorshipRequestId: string;
  rating: number; // 1-5
  comment: string;
  aspects: {
    communication: number;
    expertise: number;
    helpfulness: number;
    punctuality: number;
  };
  isAnonymous: boolean;
  createdAt: Date;
}

// Mock data
const mockMentors: Mentor[] = [
  {
    id: '1',
    userId: 'mentor1',
    name: 'Sarah Wijaya',
    avatar: '/mentors/sarah.jpg',
    title: 'Senior Product Manager',
    company: 'Gojek',
    bio: 'Berpengalaman 8+ tahun dalam product management dan startup ecosystem. Passionate dalam membantu entrepreneur muda mengembangkan produk digital.',
    expertise: ['Product Management', 'Digital Marketing', 'Startup Strategy', 'User Experience'],
    industries: ['Technology', 'E-commerce', 'Fintech'],
    experience: 8,
    rating: 4.9,
    reviewCount: 45,
    totalMentees: 120,
    activeMentees: 8,
    languages: ['Bahasa Indonesia', 'English'],
    availability: {
      timezone: 'Asia/Jakarta',
      preferredTimes: ['09:00-12:00', '19:00-21:00'],
      maxMenteesPerMonth: 10
    },
    pricing: {
      type: 'free'
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahwijaya',
      website: 'https://sarahwijaya.com'
    },
    isActive: true,
    joinedAt: new Date('2024-01-15'),
    lastActiveAt: new Date('2024-07-18')
  },
  {
    id: '2',
    userId: 'mentor2',
    name: 'Ahmad Hidayat',
    avatar: '/mentors/ahmad.jpg',
    title: 'CTO & Co-founder',
    company: 'TechStart Indonesia',
    bio: 'Technology leader dengan pengalaman membangun tim engineering dari 0 hingga 100+ developer. Fokus pada technical leadership dan career growth.',
    expertise: ['Technical Leadership', 'Software Architecture', 'Team Building', 'Career Development'],
    industries: ['Technology', 'Software', 'Startup'],
    experience: 12,
    rating: 4.8,
    reviewCount: 38,
    totalMentees: 85,
    activeMentees: 6,
    languages: ['Bahasa Indonesia', 'English'],
    availability: {
      timezone: 'Asia/Jakarta',
      preferredTimes: ['18:00-20:00'],
      maxMenteesPerMonth: 8
    },
    pricing: {
      type: 'paid',
      ratePerHour: 500000,
      packageDeals: [
        { sessions: 4, price: 1800000, duration: '1 month' },
        { sessions: 8, price: 3200000, duration: '2 months' }
      ]
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ahmadhidayat',
      twitter: 'https://twitter.com/ahmadhidayat'
    },
    isActive: true,
    joinedAt: new Date('2024-02-01'),
    lastActiveAt: new Date('2024-07-17')
  }
];

const mockMentorshipRequests: MentorshipRequest[] = [
  {
    id: '1',
    menteeId: 'user1',
    mentorId: '1',
    status: 'accepted',
    topic: 'Product Strategy untuk Startup Early Stage',
    description: 'Saya sedang mengembangkan aplikasi e-commerce untuk UMKM dan butuh guidance untuk product strategy dan go-to-market.',
    goals: [
      'Membuat product roadmap yang jelas',
      'Menentukan target market yang tepat',
      'Merancang strategi pricing yang kompetitif'
    ],
    preferredDuration: 8,
    preferredFrequency: 'weekly',
    urgency: 'medium',
    createdAt: new Date('2024-07-01'),
    respondedAt: new Date('2024-07-02'),
    startDate: new Date('2024-07-05'),
    endDate: new Date('2024-08-30'),
    mentorResponse: 'Saya tertarik membantu project Anda. Mari kita jadwalkan session pertama untuk deep dive ke business model Anda.'
  }
];

const mockSessions: MentorshipSession[] = [
  {
    id: '1',
    mentorshipRequestId: '1',
    mentorId: '1',
    menteeId: 'user1',
    title: 'Product Strategy Deep Dive',
    description: 'Diskusi mendalam tentang product strategy dan market positioning',
    scheduledAt: new Date('2024-07-20T10:00:00Z'),
    duration: 60,
    type: 'video-call',
    status: 'completed',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    agenda: [
      'Review current product features',
      'Analyze competitor landscape',
      'Define unique value proposition',
      'Set next steps'
    ],
    notes: 'Mentee sudah memiliki pemahaman yang baik tentang target market. Perlu fokus pada differentiation strategy.',
    feedback: {
      mentorRating: 5,
      menteeRating: 5,
      mentorComment: 'Mentee sangat engaged dan prepared. Diskusi yang produktif.',
      menteeComment: 'Insight yang sangat valuable. Saya jadi lebih jelas dengan direction produk.'
    },
    attachments: ['product-strategy-framework.pdf'],
    createdAt: new Date('2024-07-15'),
    completedAt: new Date('2024-07-20T11:00:00Z')
  }
];

const _mockGoals: MentorshipGoal[] = [
  {
    id: '1',
    mentorshipRequestId: '1',
    title: 'Membuat Product Roadmap',
    description: 'Menyusun roadmap produk untuk 6 bulan ke depan dengan prioritas yang jelas',
    priority: 'high',
    status: 'in-progress',
    targetDate: new Date('2024-08-15'),
    progress: 65,
    milestones: [
      { id: '1', title: 'Market research', completed: true, completedAt: new Date('2024-07-10') },
      { id: '2', title: 'Feature prioritization', completed: true, completedAt: new Date('2024-07-15') },
      { id: '3', title: 'Timeline planning', completed: false },
      { id: '4', title: 'Resource allocation', completed: false }
    ],
    createdAt: new Date('2024-07-05'),
    updatedAt: new Date('2024-07-18')
  }
];

const mockReviews: MentorReview[] = [
  {
    id: '1',
    mentorId: '1',
    reviewerId: 'user1',
    mentorshipRequestId: '1',
    rating: 5,
    comment: 'Sarah memberikan guidance yang sangat praktis dan actionable. Pengalaman mentoring yang luar biasa!',
    aspects: {
      communication: 5,
      expertise: 5,
      helpfulness: 5,
      punctuality: 5
    },
    isAnonymous: false,
    createdAt: new Date('2024-07-18')
  }
];

// API Controllers

/**
 * Get all mentors with filtering and pagination
 */
export const getAllMentors = async (req: Request, res: Response) => {
  try {
    const {
      expertise,
      industry,
      experience,
      pricing,
      rating,
      availability,
      search,
      sortBy = 'rating',
      sortOrder = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    let mentors = [...mockMentors].filter(mentor => mentor.isActive);

    // Filter by expertise
    if (expertise && typeof expertise === 'string') {
      mentors = mentors.filter(mentor =>
        mentor.expertise.some(exp => exp.toLowerCase().includes(expertise.toLowerCase()))
      );
    }

    // Filter by industry
    if (industry && typeof industry === 'string') {
      mentors = mentors.filter(mentor =>
        mentor.industries.some(ind => ind.toLowerCase().includes(industry.toLowerCase()))
      );
    }

    // Filter by experience
    if (experience && typeof experience === 'string') {
      const minExp = parseInt(experience);
      mentors = mentors.filter(mentor => mentor.experience >= minExp);
    }

    // Filter by pricing
    if (pricing && typeof pricing === 'string') {
      mentors = mentors.filter(mentor => mentor.pricing.type === pricing);
    }

    // Filter by rating
    if (rating && typeof rating === 'string') {
      const minRating = parseFloat(rating);
      mentors = mentors.filter(mentor => mentor.rating >= minRating);
    }

    // Filter by availability
    if (availability === 'available') {
      mentors = mentors.filter(mentor => 
        mentor.activeMentees < mentor.availability.maxMenteesPerMonth
      );
    }

    // Search in name, bio, expertise
    if (search && typeof search === 'string') {
      const searchTerm = search.toLowerCase();
      mentors = mentors.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm) ||
        mentor.bio.toLowerCase().includes(searchTerm) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm)) ||
        mentor.company.toLowerCase().includes(searchTerm)
      );
    }

    // Sort
    mentors.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'experience':
          aValue = a.experience;
          bValue = b.experience;
          break;
        case 'totalMentees':
          aValue = a.totalMentees;
          bValue = b.totalMentees;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'joinedAt':
          aValue = new Date(a.joinedAt).getTime();
          bValue = new Date(b.joinedAt).getTime();
          break;
        case 'rating':
        default:
          aValue = a.rating;
          bValue = b.rating;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedMentors = mentors.slice(startIndex, endIndex);

    // Get statistics
    const stats = {
      total: mentors.length,
      available: mentors.filter(m => m.activeMentees < m.availability.maxMenteesPerMonth).length,
      byPricing: {
        free: mentors.filter(m => m.pricing.type === 'free').length,
        paid: mentors.filter(m => m.pricing.type === 'paid').length
      },
      avgRating: mentors.reduce((acc, m) => acc + m.rating, 0) / mentors.length,
      totalMentees: mentors.reduce((acc, m) => acc + m.totalMentees, 0)
    };

    res.json({
      success: true,
      data: {
        mentors: paginatedMentors,
        pagination: {
          current: pageNum,
          total: Math.ceil(mentors.length / limitNum),
          count: mentors.length
        },
        stats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mentors',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get single mentor by ID with detailed information
 */
export const getMentorById = async (req: Request, res: Response) => {
  try {
    const { mentorId } = req.params;
    const userId = req.user?.id;

    const mentor = mockMentors.find(m => m.id === mentorId && m.isActive);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }

    // Get mentor's reviews
    const reviews = mockReviews.filter(r => r.mentorId === mentorId);

    // Check if user has active mentorship with this mentor
    let activeMentorship = null;
    if (userId) {
      activeMentorship = mockMentorshipRequests.find(r =>
        r.mentorId === mentorId && 
        r.menteeId === userId && 
        ['pending', 'accepted'].includes(r.status)
      );
    }

    const mentorWithDetails = {
      ...mentor,
      reviews: reviews.slice(0, 5), // Latest 5 reviews
      hasActiveMentorship: !!activeMentorship,
      activeMentorshipId: activeMentorship?.id
    };

    res.json({
      success: true,
      data: mentorWithDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mentor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Create mentorship request
 */
export const createMentorshipRequest = async (req: Request, res: Response) => {
  try {
    const { mentorId } = req.params;
    const {
      topic,
      _description,
      goals,
      preferredDuration,
      preferredFrequency,
      urgency = 'medium'
    } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const mentor = mockMentors.find(m => m.id === mentorId && m.isActive);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor not found'
      });
    }

    // Check if user already has active request with this mentor
    const existingRequest = mockMentorshipRequests.find(r =>
      r.mentorId === mentorId && 
      r.menteeId === userId && 
      ['pending', 'accepted'].includes(r.status)
    );

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active mentorship request with this mentor'
      });
    }

    // Validation
    if (!topic || !description || !goals || !Array.isArray(goals)) {
      return res.status(400).json({
        success: false,
        message: 'Topic, _description, and goals are required'
      });
    }

    const newRequest: MentorshipRequest = {
      id: Date.now().toString(),
      menteeId: userId,
      mentorId,
      status: 'pending',
      topic,
      _description,
      goals,
      preferredDuration: preferredDuration || 4,
      preferredFrequency: preferredFrequency || 'weekly',
      urgency,
      createdAt: new Date()
    };

    mockMentorshipRequests.push(newRequest);

    res.status(201).json({
      success: true,
      message: 'Mentorship request sent successfully',
      data: newRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create mentorship request',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get user's mentorship requests (as mentee)
 */
export const getUserMentorshipRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const { status, page = 1, limit = 10 } = req.query;

    let requests = mockMentorshipRequests.filter(r => r.menteeId === userId);

    // Filter by status
    if (status && typeof status === 'string') {
      requests = requests.filter(r => r.status === status);
    }

    // Get mentor details for each request
    const requestsWithMentors = requests.map(request => {
      const mentor = mockMentors.find(m => m.id === request.mentorId);
      return {
        ...request,
        mentor
      };
    }).filter(r => r.mentor);

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedRequests = requestsWithMentors.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        requests: paginatedRequests,
        pagination: {
          current: pageNum,
          total: Math.ceil(requestsWithMentors.length / limitNum),
          count: requestsWithMentors.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mentorship requests',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Respond to mentorship request (mentor only)
 */
export const respondToMentorshipRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const { status, response } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const requestIndex = mockMentorshipRequests.findIndex(r => r.id === requestId);

    if (requestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship request not found'
      });
    }

    const request = mockMentorshipRequests[requestIndex];

    // Check if user is the mentor for this request
    const mentor = mockMentors.find(m => m.id === request.mentorId && m.userId === userId);

    if (!mentor) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to respond to this request'
      });
    }

    // Validation
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either accepted or rejected'
      });
    }

    // Update request
    mockMentorshipRequests[requestIndex].status = status;
    mockMentorshipRequests[requestIndex].respondedAt = new Date();
    mockMentorshipRequests[requestIndex].mentorResponse = response;

    if (status === 'accepted') {
      mockMentorshipRequests[requestIndex].startDate = new Date();
      // Calculate end date based on preferred duration
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + (request.preferredDuration * 7));
      mockMentorshipRequests[requestIndex].endDate = endDate;

      // Update mentor's active mentees count
      const mentorIndex = mockMentors.findIndex(m => m.id === request.mentorId);
      if (mentorIndex !== -1) {
        mockMentors[mentorIndex].activeMentees++;
      }
    }

    res.json({
      success: true,
      message: `Mentorship request ${status} successfully`,
      data: mockMentorshipRequests[requestIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to respond to mentorship request',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Schedule mentorship session
 */
export const scheduleMentorshipSession = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const {
      title,
      _description,
      scheduledAt,
      duration = 60,
      type = 'video-call',
      agenda = []
    } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const request = mockMentorshipRequests.find(r => r.id === requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship request not found'
      });
    }

    if (request.status !== 'accepted') {
      return res.status(400).json({
        success: false,
        message: 'Mentorship must be accepted to schedule sessions'
      });
    }

    // Check if user is either mentor or mentee
    const mentor = mockMentors.find(m => m.id === request.mentorId);
    if (request.menteeId !== userId && mentor?.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to schedule session for this mentorship'
      });
    }

    // Validation
    if (!title || !scheduledAt) {
      return res.status(400).json({
        success: false,
        message: 'Title and scheduled time are required'
      });
    }

    const newSession: MentorshipSession = {
      id: Date.now().toString(),
      mentorshipRequestId: requestId,
      mentorId: request.mentorId,
      menteeId: request.menteeId,
      title,
      description: description || '',
      scheduledAt: new Date(scheduledAt),
      duration,
      type,
      status: 'scheduled',
      meetingLink: type === 'video-call' ? 'https://meet.google.com/generated-link' : undefined,
      agenda: Array.isArray(agenda) ? agenda : [],
      attachments: [],
      createdAt: new Date()
    };

    mockSessions.push(newSession);

    res.status(201).json({
      success: true,
      message: 'Session scheduled successfully',
      data: newSession
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to schedule session',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get mentorship sessions
 */
export const getMentorshipSessions = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const request = mockMentorshipRequests.find(r => r.id === requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Mentorship request not found'
      });
    }

    // Check if user is either mentor or mentee
    const mentor = mockMentors.find(m => m.id === request.mentorId);
    if (request.menteeId !== userId && mentor?.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to view sessions for this mentorship'
      });
    }

    const sessions = mockSessions.filter(s => s.mentorshipRequestId === requestId);

    res.json({
      success: true,
      data: sessions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sessions',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Add session feedback
 */
export const addSessionFeedback = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const sessionIndex = mockSessions.findIndex(s => s.id === sessionId);

    if (sessionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    const session = mockSessions[sessionIndex];

    // Check if user is either mentor or mentee
    const mentor = mockMentors.find(m => m.id === session.mentorId);
    const isMentor = mentor?.userId === userId;
    const isMentee = session.menteeId === userId;

    if (!isMentor && !isMentee) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to add feedback for this session'
      });
    }

    // Initialize feedback object if it doesn't exist
    if (!mockSessions[sessionIndex].feedback) {
      mockSessions[sessionIndex].feedback = {};
    }

    // Add feedback based on user role
    if (isMentor) {
      mockSessions[sessionIndex].feedback.mentorRating = rating;
      mockSessions[sessionIndex].feedback.mentorComment = comment;
    } else {
      mockSessions[sessionIndex].feedback.menteeRating = rating;
      mockSessions[sessionIndex].feedback.menteeComment = comment;
    }

    res.json({
      success: true,
      message: 'Feedback added successfully',
      data: mockSessions[sessionIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add feedback',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get mentorship analytics
 */
export const getMentorshipAnalytics = async (req: Request, res: Response) => {
  try {
    const { period = 'month' } = req.query;

    // Calculate analytics
    const totalRequests = mockMentorshipRequests.length;
    const acceptedRequests = mockMentorshipRequests.filter(r => r.status === 'accepted').length;
    const completedRequests = mockMentorshipRequests.filter(r => r.status === 'completed').length;
    const totalSessions = mockSessions.length;
    const completedSessions = mockSessions.filter(s => s.status === 'completed').length;

    const analytics = {
      overview: {
        totalMentors: mockMentors.filter(m => m.isActive).length,
        totalRequests,
        acceptanceRate: ((acceptedRequests / totalRequests) * 100).toFixed(1),
        completionRate: ((completedRequests / acceptedRequests) * 100).toFixed(1),
        totalSessions,
        sessionCompletionRate: ((completedSessions / totalSessions) * 100).toFixed(1)
      },
      requestsTrend: [
        { date: '2024-06-01', requests: 12, accepted: 8 },
        { date: '2024-06-15', requests: 18, accepted: 14 },
        { date: '2024-07-01', requests: 24, accepted: 19 },
        { date: '2024-07-15', requests: 31, accepted: 25 }
      ],
      topExpertise: [
        { expertise: 'Product Management', requests: 15 },
        { expertise: 'Digital Marketing', requests: 12 },
        { expertise: 'Technical Leadership', requests: 10 },
        { expertise: 'Startup Strategy', requests: 8 }
      ],
      avgSessionRating: 4.7,
      mentorSatisfaction: 4.6,
      menteeSatisfaction: 4.8
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
