"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbackAnalytics = exports.getTrendingFeedback = exports.addFeedbackResponse = exports.voteFeedback = exports.updateFeedbackStatus = exports.createFeedback = exports.getFeedbackById = exports.getAllFeedback = void 0;
// Mock data
const mockFeedback = [
    {
        id: '1',
        title: 'Fitur notifikasi untuk update kampanye',
        description: 'Saya ingin mendapat notifikasi ketika ada update dari kampanye yang saya dukung',
        category: 'feature',
        priority: 'medium',
        status: 'in-progress',
        votes: 42,
        author: {
            id: 'user1',
            name: 'Andi Pratama',
            avatar: '/avatars/user1.jpg'
        },
        assignee: {
            id: 'dev1',
            name: 'Development Team'
        },
        createdAt: new Date('2024-07-15'),
        updatedAt: new Date('2024-07-18'),
        responses: [
            {
                id: 'resp1',
                feedbackId: '1',
                author: {
                    id: 'admin1',
                    name: 'Product Manager',
                    role: 'admin'
                },
                content: 'Terima kasih atas feedback ini. Kami sedang mengembangkan sistem notifikasi yang komprehensif.',
                type: 'status_update',
                createdAt: new Date('2024-07-16')
            }
        ],
        tags: ['notification', 'user-experience', 'campaign'],
        attachments: []
    },
    {
        id: '2',
        title: 'Perbaikan tampilan mobile untuk dashboard',
        description: 'Dashboard terlihat terpotong di layar HP kecil',
        category: 'bug',
        priority: 'high',
        status: 'reviewing',
        votes: 28,
        author: {
            id: 'user2',
            name: 'Sari Wulandari'
        },
        createdAt: new Date('2024-07-14'),
        updatedAt: new Date('2024-07-17'),
        responses: [
            {
                id: 'resp2',
                feedbackId: '2',
                author: {
                    id: 'dev1',
                    name: 'UI/UX Team',
                    role: 'developer'
                },
                content: 'Kami akan memperbaiki responsive design untuk device mobile.',
                type: 'comment',
                createdAt: new Date('2024-07-15')
            }
        ],
        tags: ['mobile', 'responsive', 'dashboard', 'ui'],
        attachments: ['screenshot1.png']
    }
];
const mockVotes = [
    {
        id: 'vote1',
        feedbackId: '1',
        userId: 'user3',
        type: 'upvote',
        createdAt: new Date('2024-07-16')
    }
];
// API Controllers
/**
 * Get all feedback items
 */
const getAllFeedback = async (req, res) => {
    try {
        const { category, status, priority, search, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 } = req.query;
        let feedback = [...mockFeedback];
        // Filter by category
        if (category && typeof category === 'string') {
            feedback = feedback.filter(item => item.category === category);
        }
        // Filter by status
        if (status && typeof status === 'string') {
            feedback = feedback.filter(item => item.status === status);
        }
        // Filter by priority
        if (priority && typeof priority === 'string') {
            feedback = feedback.filter(item => item.priority === priority);
        }
        // Search in title and description
        if (search && typeof search === 'string') {
            const searchTerm = search.toLowerCase();
            feedback = feedback.filter(item => item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
        }
        // Sort
        feedback.sort((a, b) => {
            let aValue, bValue;
            switch (sortBy) {
                case 'votes':
                    aValue = a.votes;
                    bValue = b.votes;
                    break;
                case 'priority':
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    aValue = priorityOrder[a.priority];
                    bValue = priorityOrder[b.priority];
                    break;
                case 'createdAt':
                default:
                    aValue = new Date(a.createdAt).getTime();
                    bValue = new Date(b.createdAt).getTime();
                    break;
            }
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            }
            return aValue < bValue ? 1 : -1;
        });
        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        const paginatedFeedback = feedback.slice(startIndex, endIndex);
        // Get statistics
        const stats = {
            total: feedback.length,
            byCategory: {
                feature: feedback.filter(f => f.category === 'feature').length,
                bug: feedback.filter(f => f.category === 'bug').length,
                improvement: feedback.filter(f => f.category === 'improvement').length,
                general: feedback.filter(f => f.category === 'general').length
            },
            byStatus: {
                submitted: feedback.filter(f => f.status === 'submitted').length,
                reviewing: feedback.filter(f => f.status === 'reviewing').length,
                'in-progress': feedback.filter(f => f.status === 'in-progress').length,
                completed: feedback.filter(f => f.status === 'completed').length,
                rejected: feedback.filter(f => f.status === 'rejected').length
            },
            avgVotes: feedback.reduce((acc, f) => acc + f.votes, 0) / feedback.length
        };
        res.json({
            success: true,
            data: {
                feedback: paginatedFeedback,
                pagination: {
                    current: pageNum,
                    total: Math.ceil(feedback.length / limitNum),
                    count: feedback.length
                },
                stats
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch feedback',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getAllFeedback = getAllFeedback;
/**
 * Get single feedback item by ID
 */
const getFeedbackById = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const feedback = mockFeedback.find(item => item.id === feedbackId);
        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }
        res.json({
            success: true,
            data: feedback
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch feedback',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getFeedbackById = getFeedbackById;
/**
 * Create new feedback
 */
const createFeedback = async (req, res) => {
    try {
        const { title, description, category, priority = 'medium', tags = [], attachments = [] } = req.body;
        // Get user from request (assuming auth middleware adds user)
        const userId = req.user?.id || 'anonymous';
        const userName = req.user?.name || 'Anonymous User';
        // Validation
        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: 'Title, description, and category are required'
            });
        }
        const newFeedback = {
            id: Date.now().toString(),
            title,
            description,
            category,
            priority,
            status: 'submitted',
            votes: 0,
            author: {
                id: userId,
                name: userName
            },
            createdAt: new Date(),
            updatedAt: new Date(),
            responses: [],
            tags: Array.isArray(tags) ? tags : [],
            attachments: Array.isArray(attachments) ? attachments : []
        };
        // In real implementation, save to database
        mockFeedback.push(newFeedback);
        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            data: newFeedback
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create feedback',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.createFeedback = createFeedback;
/**
 * Update feedback status (admin only)
 */
const updateFeedbackStatus = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const { status, assigneeId, comment } = req.body;
        const feedbackIndex = mockFeedback.findIndex(item => item.id === feedbackId);
        if (feedbackIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }
        // Update feedback
        mockFeedback[feedbackIndex].status = status;
        mockFeedback[feedbackIndex].updatedAt = new Date();
        if (assigneeId) {
            mockFeedback[feedbackIndex].assignee = {
                id: assigneeId,
                name: 'Team Member' // In real implementation, get from user service
            };
        }
        // Add status update response
        if (comment) {
            const response = {
                id: Date.now().toString(),
                feedbackId,
                author: {
                    id: req.user?.id || 'admin',
                    name: req.user?.name || 'Admin',
                    role: 'admin'
                },
                content: comment,
                type: 'status_update',
                createdAt: new Date()
            };
            mockFeedback[feedbackIndex].responses.push(response);
        }
        res.json({
            success: true,
            message: 'Feedback status updated successfully',
            data: mockFeedback[feedbackIndex]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update feedback status',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.updateFeedbackStatus = updateFeedbackStatus;
/**
 * Vote on feedback
 */
const voteFeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const { type } = req.body; // 'upvote' or 'downvote'
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }
        const feedbackIndex = mockFeedback.findIndex(item => item.id === feedbackId);
        if (feedbackIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }
        // Check if user already voted
        const existingVote = mockVotes.find(vote => vote.feedbackId === feedbackId && vote.userId === userId);
        if (existingVote) {
            if (existingVote.type === type) {
                // Remove vote if same type
                const voteIndex = mockVotes.findIndex(v => v.id === existingVote.id);
                mockVotes.splice(voteIndex, 1);
                if (type === 'upvote') {
                    mockFeedback[feedbackIndex].votes--;
                }
                else {
                    mockFeedback[feedbackIndex].votes++;
                }
            }
            else {
                // Change vote type
                existingVote.type = type;
                existingVote.createdAt = new Date();
                if (type === 'upvote') {
                    mockFeedback[feedbackIndex].votes += 2; // Remove downvote, add upvote
                }
                else {
                    mockFeedback[feedbackIndex].votes -= 2; // Remove upvote, add downvote
                }
            }
        }
        else {
            // Create new vote
            const newVote = {
                id: Date.now().toString(),
                feedbackId,
                userId,
                type,
                createdAt: new Date()
            };
            mockVotes.push(newVote);
            if (type === 'upvote') {
                mockFeedback[feedbackIndex].votes++;
            }
            else {
                mockFeedback[feedbackIndex].votes--;
            }
        }
        res.json({
            success: true,
            message: 'Vote recorded successfully',
            data: {
                feedbackId,
                votes: mockFeedback[feedbackIndex].votes
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to record vote',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.voteFeedback = voteFeedback;
/**
 * Add response/comment to feedback
 */
const addFeedbackResponse = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const { content, type = 'comment' } = req.body;
        const userId = req.user?.id;
        const userName = req.user?.name || 'Anonymous';
        const userRole = req.user?.role || 'user';
        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'Content is required'
            });
        }
        const feedbackIndex = mockFeedback.findIndex(item => item.id === feedbackId);
        if (feedbackIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Feedback not found'
            });
        }
        const response = {
            id: Date.now().toString(),
            feedbackId,
            author: {
                id: userId || 'anonymous',
                name: userName,
                role: userRole || 'user'
            },
            content,
            type,
            createdAt: new Date()
        };
        mockFeedback[feedbackIndex].responses.push(response);
        mockFeedback[feedbackIndex].updatedAt = new Date();
        res.status(201).json({
            success: true,
            message: 'Response added successfully',
            data: response
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add response',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.addFeedbackResponse = addFeedbackResponse;
/**
 * Get trending feedback
 */
const getTrendingFeedback = async (req, res) => {
    try {
        const { limit = 10, period = 'week' } = req.query;
        // Calculate trending based on votes and recent activity
        const trending = mockFeedback
            .map(feedback => {
            const recentResponses = feedback.responses.filter(response => {
                const daysDiff = (new Date().getTime() - new Date(response.createdAt).getTime()) / (1000 * 3600 * 24);
                return daysDiff <= (period === 'week' ? 7 : period === 'month' ? 30 : 1);
            }).length;
            const trendingScore = feedback.votes + (recentResponses * 2);
            return {
                ...feedback,
                trendingScore
            };
        })
            .sort((a, b) => b.trendingScore - a.trendingScore)
            .slice(0, parseInt(limit));
        res.json({
            success: true,
            data: trending
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch trending feedback',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getTrendingFeedback = getTrendingFeedback;
/**
 * Get feedback analytics
 */
const getFeedbackAnalytics = async (req, res) => {
    try {
        const { period = 'month' } = req.query;
        // Calculate analytics
        const total = mockFeedback.length;
        const byCategory = {
            feature: mockFeedback.filter(f => f.category === 'feature').length,
            bug: mockFeedback.filter(f => f.category === 'bug').length,
            improvement: mockFeedback.filter(f => f.category === 'improvement').length,
            general: mockFeedback.filter(f => f.category === 'general').length
        };
        const byStatus = {
            submitted: mockFeedback.filter(f => f.status === 'submitted').length,
            reviewing: mockFeedback.filter(f => f.status === 'reviewing').length,
            'in-progress': mockFeedback.filter(f => f.status === 'in-progress').length,
            completed: mockFeedback.filter(f => f.status === 'completed').length,
            rejected: mockFeedback.filter(f => f.status === 'rejected').length
        };
        const implementationRate = (byStatus.completed / total) * 100;
        const avgResponseTime = 2.3; // Mock data - days
        const userSatisfaction = 4.2; // Mock data - out of 5
        // Time series data (mock)
        const timeSeries = [
            { date: '2024-06-01', submissions: 15, implementations: 8 },
            { date: '2024-06-15', submissions: 23, implementations: 12 },
            { date: '2024-07-01', submissions: 31, implementations: 18 },
            { date: '2024-07-15', submissions: 42, implementations: 25 }
        ];
        res.json({
            success: true,
            data: {
                overview: {
                    total,
                    implementationRate: implementationRate.toFixed(1),
                    avgResponseTime,
                    userSatisfaction
                },
                byCategory,
                byStatus,
                timeSeries,
                topContributors: [
                    { name: 'Andi Pratama', contributions: 5 },
                    { name: 'Sari Wulandari', contributions: 4 },
                    { name: 'Budi Santoso', contributions: 3 }
                ]
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch analytics',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getFeedbackAnalytics = getFeedbackAnalytics;
//# sourceMappingURL=feedbackController.js.map