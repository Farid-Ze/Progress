import { Request, Response } from 'express';

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name?: string;
        role: string;
      };
    }
  }
}

// Types for Akademi Penggerak Digital
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'digital-literacy' | 'entrepreneurship' | 'technology' | 'leadership' | 'creative';
  instructor: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    expertise: string[];
  };
  duration: number; // in minutes
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
  createdAt: Date;
  updatedAt: Date;
}

interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  lessons: Lesson[];
  isLocked: boolean;
}

interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'discussion';
  content: string;
  videoUrl?: string;
  duration?: number; // in minutes
  order: number;
  isCompleted?: boolean;
  resources: LessonResource[];
}

interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'document' | 'video';
  url: string;
  size?: string;
}

interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  enrolledAt: Date;
  completedAt?: Date;
  progress: number; // 0-100
  currentModuleId?: string;
  currentLessonId?: string;
  certificateUrl?: string;
  lastAccessedAt: Date;
}

// Temporarily commented out unused interfaces - keeping for future use
/*
interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in minutes
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'essay';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
}

interface Assignment {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  instructions: string;
  dueDate?: Date;
  maxPoints: number;
  submissionFormat: 'file' | 'text' | 'link';
  allowedFileTypes?: string[];
  maxFileSize?: number; // in MB
}
*/

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Digital Marketing untuk UMKM',
    description: 'Pelajari strategi digital marketing yang efektif untuk mengembangkan usaha kecil dan menengah di era digital.',
    thumbnail: '/courses/digital-marketing.jpg',
    level: 'beginner',
    category: 'entrepreneurship',
    instructor: {
      id: 'inst1',
      name: 'Dr. Sarah Wijaya',
      avatar: '/instructors/sarah.jpg',
      title: 'Digital Marketing Expert',
      expertise: ['Digital Marketing', 'E-commerce', 'Social Media Strategy']
    },
    duration: 480, // 8 hours
    modules: [
      {
        id: 'mod1',
        courseId: '1',
        title: 'Pengenalan Digital Marketing',
        description: 'Dasar-dasar digital marketing dan mengapa penting untuk UMKM',
        order: 1,
        duration: 120,
        lessons: [
          {
            id: 'lesson1',
            moduleId: 'mod1',
            title: 'Apa itu Digital Marketing?',
            description: 'Pengenalan konsep digital marketing',
            type: 'video',
            content: 'Video pembelajaran tentang digital marketing',
            videoUrl: '/videos/intro-digital-marketing.mp4',
            duration: 30,
            order: 1,
            resources: [
              {
                id: 'res1',
                title: 'Digital Marketing Guide',
                type: 'pdf',
                url: '/resources/digital-marketing-guide.pdf',
                size: '2.5 MB'
              }
            ]
          }
        ],
        isLocked: false
      }
    ],
    price: 0, // Free course
    rating: 4.8,
    reviewCount: 245,
    enrollmentCount: 1250,
    language: 'Bahasa Indonesia',
    tags: ['digital marketing', 'umkm', 'e-commerce', 'social media'],
    requirements: ['Akses internet', 'Smartphone atau komputer'],
    learningOutcomes: [
      'Memahami konsep dasar digital marketing',
      'Membuat strategi pemasaran digital',
      'Menggunakan media sosial untuk bisnis',
      'Menganalisis performa kampanye digital'
    ],
    certificate: true,
    isActive: true,
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-07-15')
  },
  {
    id: '2',
    title: 'Literasi Digital untuk Semua',
    description: 'Kursus komprehensif untuk meningkatkan kemampuan digital dasar setiap orang.',
    thumbnail: '/courses/digital-literacy.jpg',
    level: 'beginner',
    category: 'digital-literacy',
    instructor: {
      id: 'inst2',
      name: 'Prof. Ahmad Hidayat',
      avatar: '/instructors/ahmad.jpg',
      title: 'Computer Science Professor',
      expertise: ['Digital Literacy', 'Computer Education', 'Technology for Society']
    },
    duration: 360, // 6 hours
    modules: [],
    price: 0,
    rating: 4.6,
    reviewCount: 189,
    enrollmentCount: 980,
    language: 'Bahasa Indonesia',
    tags: ['literasi digital', 'komputer', 'internet', 'keamanan'],
    requirements: ['Tidak ada'],
    learningOutcomes: [
      'Menggunakan perangkat digital dengan aman',
      'Memahami etika digital',
      'Mencari informasi secara efektif',
      'Berkomunikasi digital dengan baik'
    ],
    certificate: true,
    isActive: true,
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-07-10')
  }
];

const mockEnrollments: Enrollment[] = [
  {
    id: 'enroll1',
    courseId: '1',
    userId: 'user1',
    enrolledAt: new Date('2024-07-01'),
    progress: 65,
    currentModuleId: 'mod1',
    currentLessonId: 'lesson1',
    lastAccessedAt: new Date('2024-07-18')
  }
];

// API Controllers

/**
 * Get all courses with filtering and pagination
 */
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const {
      category,
      level,
      search,
      instructor,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    let courses = [...mockCourses].filter(course => course.isActive);

    // Filter by category
    if (category && typeof category === 'string') {
      courses = courses.filter(course => course.category === category);
    }

    // Filter by level
    if (level && typeof level === 'string') {
      courses = courses.filter(course => course.level === level);
    }

    // Filter by instructor
    if (instructor && typeof instructor === 'string') {
      courses = courses.filter(course => 
        course.instructor.name.toLowerCase().includes(instructor.toLowerCase())
      );
    }

    // Search in title, _description, and tags
    if (search && typeof search === 'string') {
      const searchTerm = search.toLowerCase();
      courses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort
    courses.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'enrollmentCount':
          aValue = a.enrollmentCount;
          bValue = b.enrollmentCount;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
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
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedCourses = courses.slice(startIndex, endIndex);

    // Get statistics
    const stats = {
      total: courses.length,
      byCategory: {
        'digital-literacy': courses.filter(c => c.category === 'digital-literacy').length,
        'entrepreneurship': courses.filter(c => c.category === 'entrepreneurship').length,
        'technology': courses.filter(c => c.category === 'technology').length,
        'leadership': courses.filter(c => c.category === 'leadership').length,
        'creative': courses.filter(c => c.category === 'creative').length
      },
      byLevel: {
        beginner: courses.filter(c => c.level === 'beginner').length,
        intermediate: courses.filter(c => c.level === 'intermediate').length,
        advanced: courses.filter(c => c.level === 'advanced').length
      },
      totalEnrollments: courses.reduce((acc, c) => acc + c.enrollmentCount, 0),
      avgRating: courses.reduce((acc, c) => acc + c.rating, 0) / courses.length
    };

    res.json({
      success: true,
      data: {
        courses: paginatedCourses,
        pagination: {
          current: pageNum,
          total: Math.ceil(courses.length / limitNum),
          count: courses.length
        },
        stats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get single course by ID with detailed information
 */
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;

    const course = mockCourses.find(c => c.id === courseId && c.isActive);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is enrolled
    let enrollment = null;
    if (userId) {
      enrollment = mockEnrollments.find(e => 
        e.courseId === courseId && e.userId === userId
      );
    }

    // Include enrollment status in response
    const courseWithEnrollment = {
      ...course,
      isEnrolled: !!enrollment,
      userProgress: enrollment?.progress || 0,
      currentModule: enrollment?.currentModuleId,
      currentLesson: enrollment?.currentLessonId
    };

    res.json({
      success: true,
      data: courseWithEnrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Enroll user in a course
 */
export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const course = mockCourses.find(c => c.id === courseId && c.isActive);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = mockEnrollments.find(e =>
      e.courseId === courseId && e.userId === userId
    );

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Create new enrollment
    const newEnrollment: Enrollment = {
      id: Date.now().toString(),
      courseId,
      userId,
      enrolledAt: new Date(),
      progress: 0,
      lastAccessedAt: new Date()
    };

    mockEnrollments.push(newEnrollment);

    // Update course enrollment count
    const courseIndex = mockCourses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
      mockCourses[courseIndex].enrollmentCount++;
    }

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: newEnrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to enroll in course',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get user's enrolled courses
 */
export const getUserEnrollments = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const { status, page = 1, limit = 10 } = req.query;

    let enrollments = mockEnrollments.filter(e => e.userId === userId);

    // Filter by status
    if (status === 'completed') {
      enrollments = enrollments.filter(e => e.completedAt);
    } else if (status === 'in-progress') {
      enrollments = enrollments.filter(e => !e.completedAt && e.progress > 0);
    } else if (status === 'not-started') {
      enrollments = enrollments.filter(e => e.progress === 0);
    }

    // Get course details for each enrollment
    const enrollmentsWithCourses = enrollments.map(enrollment => {
      const course = mockCourses.find(c => c.id === enrollment.courseId);
      return {
        ...enrollment,
        course
      };
    }).filter(e => e.course); // Remove enrollments for deleted courses

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedEnrollments = enrollmentsWithCourses.slice(startIndex, endIndex);

    // Calculate statistics
    const stats = {
      total: enrollmentsWithCourses.length,
      completed: enrollmentsWithCourses.filter(e => e.completedAt).length,
      inProgress: enrollmentsWithCourses.filter(e => !e.completedAt && e.progress > 0).length,
      notStarted: enrollmentsWithCourses.filter(e => e.progress === 0).length,
      avgProgress: enrollmentsWithCourses.reduce((acc, e) => acc + e.progress, 0) / enrollmentsWithCourses.length || 0
    };

    res.json({
      success: true,
      data: {
        enrollments: paginatedEnrollments,
        pagination: {
          current: pageNum,
          total: Math.ceil(enrollmentsWithCourses.length / limitNum),
          count: enrollmentsWithCourses.length
        },
        stats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user enrollments',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Update lesson progress
 */
export const updateLessonProgress = async (req: Request, res: Response) => {
  try {
    const { courseId, lessonId: _lessonId } = req.params;
    const { completed } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const enrollment = mockEnrollments.find(e =>
      e.courseId === courseId && e.userId === userId
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    const course = mockCourses.find(c => c.id === courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Calculate new progress
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    let completedLessons = 0;

    // In real implementation, track completed lessons in database
    if (completed) {
      completedLessons = Math.floor(enrollment.progress * totalLessons / 100) + 1;
    }

    const newProgress = Math.min((completedLessons / totalLessons) * 100, 100);

    // Update enrollment
    const enrollmentIndex = mockEnrollments.findIndex(e => e.id === enrollment.id);
    if (enrollmentIndex !== -1) {
      mockEnrollments[enrollmentIndex].progress = newProgress;
      mockEnrollments[enrollmentIndex].lastAccessedAt = new Date();

      if (newProgress === 100 && !mockEnrollments[enrollmentIndex].completedAt) {
        mockEnrollments[enrollmentIndex].completedAt = new Date();
        mockEnrollments[enrollmentIndex].certificateUrl = `/certificates/${courseId}-${userId}.pdf`;
      }
    }

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        progress: newProgress,
        completed: newProgress === 100,
        certificateUrl: mockEnrollments[enrollmentIndex].certificateUrl
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update progress',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get course analytics for instructors/admins
 */
export const getCourseAnalytics = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    const course = mockCourses.find(c => c.id === courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const courseEnrollments = mockEnrollments.filter(e => e.courseId === courseId);

    // Calculate analytics
    const analytics = {
      overview: {
        totalEnrollments: courseEnrollments.length,
        completionRate: (courseEnrollments.filter(e => e.completedAt).length / courseEnrollments.length * 100).toFixed(1),
        avgProgress: (courseEnrollments.reduce((acc, e) => acc + e.progress, 0) / courseEnrollments.length).toFixed(1),
        rating: course.rating,
        reviewCount: course.reviewCount
      },
      enrollmentTrend: [
        { date: '2024-06-01', enrollments: 45 },
        { date: '2024-06-15', enrollments: 78 },
        { date: '2024-07-01', enrollments: 123 },
        { date: '2024-07-15', enrollments: 156 }
      ],
      progressDistribution: {
        '0-25%': courseEnrollments.filter(e => e.progress <= 25).length,
        '26-50%': courseEnrollments.filter(e => e.progress > 25 && e.progress <= 50).length,
        '51-75%': courseEnrollments.filter(e => e.progress > 50 && e.progress <= 75).length,
        '76-100%': courseEnrollments.filter(e => e.progress > 75).length
      },
      popularModules: course.modules.map((module, _index) => ({
        title: module.title,
        completionRate: Math.random() * 100, // Mock data
        avgTimeSpent: Math.random() * 60 // Mock data in minutes
      }))
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course analytics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get popular/trending courses
 */
export const getPopularCourses = async (req: Request, res: Response) => {
  try {
    const { limit = 10, period = 'month' } = req.query;

    // Calculate popularity based on recent enrollments and ratings
    const popularCourses = mockCourses
      .filter(course => course.isActive)
      .map(course => {
        const recentEnrollments = mockEnrollments.filter(enrollment => {
          const daysDiff = (new Date().getTime() - new Date(enrollment.enrolledAt).getTime()) / (1000 * 3600 * 24);
          return enrollment.courseId === course.id && 
                 daysDiff <= (period === 'week' ? 7 : period === 'month' ? 30 : 1);
        }).length;

        const popularityScore = (course.rating * 20) + (recentEnrollments * 5) + (course.reviewCount * 0.1);

        return {
          ...course,
          recentEnrollments,
          popularityScore
        };
      })
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, parseInt(limit as string));

    res.json({
      success: true,
      data: popularCourses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch popular courses',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Search courses with advanced filters
 */
export const searchCourses = async (req: Request, res: Response) => {
  try {
    const {
      q, // search query
      category,
      level,
      instructor,
      minRating,
      maxPrice,
      minDuration,
      maxDuration,
      hascertificate,
      language,
      sortBy = 'relevance',
      page = 1,
      limit = 12
    } = req.query;

    let courses = [...mockCourses].filter(course => course.isActive);

    // Search in multiple fields
    if (q && typeof q === 'string') {
      const searchTerm = q.toLowerCase();
      courses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.instructor.name.toLowerCase().includes(searchTerm) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        course.learningOutcomes.some(outcome => outcome.toLowerCase().includes(searchTerm))
      );
    }

    // Apply filters
    if (category) courses = courses.filter(c => c.category === category);
    if (level) courses = courses.filter(c => c.level === level);
    if (instructor && typeof instructor === 'string') {
      courses = courses.filter(c => c.instructor.name.toLowerCase().includes(instructor.toLowerCase()));
    }
    if (minRating) courses = courses.filter(c => c.rating >= parseFloat(minRating as string));
    if (maxPrice) courses = courses.filter(c => c.price <= parseFloat(maxPrice as string));
    if (minDuration) courses = courses.filter(c => c.duration >= parseInt(minDuration as string));
    if (maxDuration) courses = courses.filter(c => c.duration <= parseInt(maxDuration as string));
    if (hascertificate === 'true') courses = courses.filter(c => c.certificate);
    if (language) courses = courses.filter(c => c.language === language);

    // Sort results
    courses.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
          return b.enrollmentCount - a.enrollmentCount;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'duration-short':
          return a.duration - b.duration;
        case 'duration-long':
          return b.duration - a.duration;
        case 'relevance':
        default:
          // For relevance, prioritize courses with search term in title
          if (q && typeof q === 'string') {
            const aInTitle = a.title.toLowerCase().includes(q.toLowerCase()) ? 1 : 0;
            const bInTitle = b.title.toLowerCase().includes(q.toLowerCase()) ? 1 : 0;
            return bInTitle - aInTitle;
          }
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedCourses = courses.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        courses: paginatedCourses,
        pagination: {
          current: pageNum,
          total: Math.ceil(courses.length / limitNum),
          count: courses.length
        },
        searchSummary: {
          query: q,
          totalResults: courses.length,
          appliedFilters: {
            category,
            level,
            instructor,
            minRating,
            maxPrice,
            hascertificate
          }
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search courses',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
