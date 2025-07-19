import { Request, Response } from 'express';

// Types for Impact Measurement
interface ImpactMetric {
  id: string;
  name: string;
  description: string;
  category: 'social' | 'economic' | 'environmental' | 'educational' | 'health';
  unit: string;
  targetValue: number;
  currentValue: number;
  progress: number; // 0-100
  sdgAlignment: number[]; // SDG goals (1-17)
  region?: string;
  program?: string;
  lastUpdated: Date;
  trend: 'increasing' | 'decreasing' | 'stable';
  methodology: string;
  dataSource: string;
  isActive: boolean;
}

interface ImpactReport {
  id: string;
  title: string;
  description: string;
  period: {
    start: Date;
    end: Date;
  };
  regions: string[];
  programs: string[];
  metrics: {
    metricId: string;
    value: number;
    previousValue?: number;
    change: number;
    changePercent: number;
  }[];
  highlights: string[];
  challenges: string[];
  recommendations: string[];
  attachments: {
    name: string;
    url: string;
    type: 'pdf' | 'excel' | 'image';
    size: string;
  }[];
  status: 'draft' | 'published' | 'archived';
  author: {
    id: string;
    name: string;
    role: string;
  };
  createdAt: Date;
  publishedAt?: Date;
}

interface RegionalImpact {
  region: string;
  population: number;
  beneficiaries: number;
  beneficiaryRate: number; // percentage
  programs: {
    id: string;
    name: string;
    participants: number;
    completionRate: number;
    impact: number; // scale 1-10
  }[];
  metrics: {
    economic: {
      incomeIncrease: number; // percentage
      jobsCreated: number;
      businessesStarted: number;
      digitalAdoption: number; // percentage
    };
    social: {
      literacyImprovement: number; // percentage
      communityEngagement: number; // percentage
      genderEquality: number; // scale 1-10
      youthParticipation: number; // percentage
    };
    environmental: {
      carbonReduction: number; // kg CO2
      wasteReduction: number; // percentage
      energyEfficiency: number; // percentage
    };
  };
  testimonials: {
    id: string;
    name: string;
    role: string;
    quote: string;
    program: string;
    date: Date;
  }[];
}

interface SDGProgress {
  goal: number;
  title: string;
  description: string;
  targetDate: Date;
  progress: number; // 0-100
  indicators: {
    id: string;
    name: string;
    currentValue: number;
    targetValue: number;
    unit: string;
    progress: number;
    trend: 'on-track' | 'at-risk' | 'off-track';
  }[];
  relatedPrograms: string[];
  partnerships: string[];
}

interface TimeSeriesData {
  metric: string;
  data: {
    date: Date;
    value: number;
    target?: number;
  }[];
}

// Mock data
const mockImpactMetrics: ImpactMetric[] = [
  {
    id: '1',
    name: 'Digital Literacy Rate',
    description: 'Percentage of population with basic digital skills',
    category: 'educational',
    unit: 'percentage',
    targetValue: 80,
    currentValue: 67.5,
    progress: 84.4, // (67.5/80)*100
    sdgAlignment: [4, 8, 9], // Quality Education, Decent Work, Industry Innovation
    region: 'Jawa Barat',
    program: 'Akademi Penggerak Digital',
    lastUpdated: new Date('2024-07-15'),
    trend: 'increasing',
    methodology: 'Survey dan assessment digital skills kepada 10,000 responden',
    dataSource: 'BPS Jabar & Survey Internal',
    isActive: true
  },
  {
    id: '2',
    name: 'UMKM Digital Adoption',
    description: 'Number of SMEs using digital platforms for business',
    category: 'economic',
    unit: 'count',
    targetValue: 50000,
    currentValue: 34250,
    progress: 68.5,
    sdgAlignment: [1, 8, 9], // No Poverty, Decent Work, Industry Innovation
    region: 'Jawa Barat',
    program: 'Katalisator Perubahan Jabar',
    lastUpdated: new Date('2024-07-18'),
    trend: 'increasing',
    methodology: 'Registration dan tracking penggunaan platform digital',
    dataSource: 'Platform Tracking & Partnership Data',
    isActive: true
  },
  {
    id: '3',
    name: 'Youth Employment Rate',
    description: 'Employment rate among youth (18-35 years) in digital economy',
    category: 'economic',
    unit: 'percentage',
    targetValue: 45,
    currentValue: 38.2,
    progress: 84.9,
    sdgAlignment: [1, 8, 10], // No Poverty, Decent Work, Reduced Inequalities
    region: 'Jawa Barat',
    program: 'Mentorship Program',
    lastUpdated: new Date('2024-07-10'),
    trend: 'increasing',
    methodology: 'Survey kepada alumni program dan data ketenagakerjaan',
    dataSource: 'Disnaker Jabar & Alumni Survey',
    isActive: true
  },
  {
    id: '4',
    name: 'Community Engagement Index',
    description: 'Level of community participation in development programs',
    category: 'social',
    unit: 'score',
    targetValue: 8.5,
    currentValue: 7.2,
    progress: 84.7,
    sdgAlignment: [11, 16, 17], // Sustainable Communities, Peace & Justice, Partnerships
    region: 'Jawa Barat',
    program: 'Suara Komunitas',
    lastUpdated: new Date('2024-07-12'),
    trend: 'stable',
    methodology: 'Index berdasarkan partisipasi dalam feedback dan program',
    dataSource: 'Platform Suara Komunitas & Survey',
    isActive: true
  }
];

const mockRegionalImpact: RegionalImpact[] = [
  {
    region: 'Bandung Raya',
    population: 8500000,
    beneficiaries: 425000,
    beneficiaryRate: 5.0,
    programs: [
      {
        id: '1',
        name: 'Akademi Penggerak Digital',
        participants: 15000,
        completionRate: 78.5,
        impact: 8.2
      },
      {
        id: '2',
        name: 'UMKM Digital Hub',
        participants: 8500,
        completionRate: 85.2,
        impact: 8.7
      }
    ],
    metrics: {
      economic: {
        incomeIncrease: 25.3,
        jobsCreated: 3250,
        businessesStarted: 1850,
        digitalAdoption: 72.1
      },
      social: {
        literacyImprovement: 18.7,
        communityEngagement: 67.4,
        genderEquality: 7.8,
        youthParticipation: 45.2
      },
      environmental: {
        carbonReduction: 125000,
        wasteReduction: 15.8,
        energyEfficiency: 22.3
      }
    },
    testimonials: [
      {
        id: '1',
        name: 'Sari Wulandari',
        role: 'Pemilik UMKM',
        quote: 'Program ini mengubah bisnis saya. Sekarang penjualan online meningkat 200% dan saya bisa mempekerjakan 3 orang lagi.',
        program: 'UMKM Digital Hub',
        date: new Date('2024-07-05')
      }
    ]
  }
];

const mockSDGProgress: SDGProgress[] = [
  {
    goal: 4,
    title: 'Quality Education',
    description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all',
    targetDate: new Date('2030-12-31'),
    progress: 72.5,
    indicators: [
      {
        id: '4.4.1',
        name: 'Proportion of youth/adults with ICT skills',
        currentValue: 67.5,
        targetValue: 80,
        unit: 'percentage',
        progress: 84.4,
        trend: 'on-track'
      },
      {
        id: '4.7.1',
        name: 'Extent to which global citizenship education is mainstreamed',
        currentValue: 6.8,
        targetValue: 8.5,
        unit: 'score',
        progress: 80.0,
        trend: 'on-track'
      }
    ],
    relatedPrograms: ['Akademi Penggerak Digital', 'Mentorship Program'],
    partnerships: ['Kemendikbud', 'Universitas', 'Tech Companies']
  },
  {
    goal: 8,
    title: 'Decent Work and Economic Growth',
    description: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
    targetDate: new Date('2030-12-31'),
    progress: 68.3,
    indicators: [
      {
        id: '8.3.1',
        name: 'Proportion of informal employment',
        currentValue: 45.2,
        targetValue: 35,
        unit: 'percentage',
        progress: 67.8,
        trend: 'at-risk'
      },
      {
        id: '8.5.2',
        name: 'Unemployment rate by sex, age and persons with disabilities',
        currentValue: 8.1,
        targetValue: 5,
        unit: 'percentage',
        progress: 62.4,
        trend: 'at-risk'
      }
    ],
    relatedPrograms: ['Katalisator Perubahan Jabar', 'Mentorship Program'],
    partnerships: ['Disnaker', 'KADIN', 'Startup Ecosystem']
  }
];

const mockTimeSeriesData: TimeSeriesData[] = [
  {
    metric: 'Digital Literacy Rate',
    data: [
      { date: new Date('2024-01-01'), value: 52.3, target: 55 },
      { date: new Date('2024-02-01'), value: 54.1, target: 57 },
      { date: new Date('2024-03-01'), value: 56.8, target: 59 },
      { date: new Date('2024-04-01'), value: 59.2, target: 61 },
      { date: new Date('2024-05-01'), value: 62.1, target: 63 },
      { date: new Date('2024-06-01'), value: 64.7, target: 65 },
      { date: new Date('2024-07-01'), value: 67.5, target: 67 }
    ]
  },
  {
    metric: 'UMKM Digital Adoption',
    data: [
      { date: new Date('2024-01-01'), value: 18500, target: 20000 },
      { date: new Date('2024-02-01'), value: 21200, target: 23000 },
      { date: new Date('2024-03-01'), value: 24800, target: 26000 },
      { date: new Date('2024-04-01'), value: 27300, target: 29000 },
      { date: new Date('2024-05-01'), value: 30100, target: 32000 },
      { date: new Date('2024-06-01'), value: 32400, target: 35000 },
      { date: new Date('2024-07-01'), value: 34250, target: 38000 }
    ]
  }
];

const mockImpactReports: ImpactReport[] = [
  {
    id: '1',
    title: 'Laporan Dampak Kuartal 2 2024',
    description: 'Analisis komprehensif dampak program Merajut ASA pada periode April-Juni 2024',
    period: {
      start: new Date('2024-04-01'),
      end: new Date('2024-06-30')
    },
    regions: ['Bandung Raya', 'Bogor', 'Bekasi', 'Depok', 'Karawang'],
    programs: ['Akademi Penggerak Digital', 'Katalisator Perubahan Jabar', 'Mentorship Program', 'Suara Komunitas'],
    metrics: [
      {
        metricId: '1',
        value: 67.5,
        previousValue: 62.1,
        change: 5.4,
        changePercent: 8.7
      },
      {
        metricId: '2',
        value: 34250,
        previousValue: 30100,
        change: 4150,
        changePercent: 13.8
      }
    ],
    highlights: [
      'Digital literacy rate meningkat 8.7% melebihi target kuartalan',
      'UMKM digital adoption mencapai 34,250 businesses (+13.8%)',
      'Youth employment di sektor digital naik menjadi 38.2%',
      'Community engagement index stabil di 7.2/10'
    ],
    challenges: [
      'Kesenjangan digital antara daerah urban dan rural masih tinggi',
      'Keterbatasan infrastruktur internet di daerah terpencil',
      'Perlu peningkatan kualitas konten pembelajaran untuk advanced skills'
    ],
    recommendations: [
      'Fokus ekspansi program ke kabupaten dengan infrastruktur terbatas',
      'Partnership dengan telco untuk solusi konektivitas',
      'Pengembangan kurikulum advanced untuk sustainability program'
    ],
    attachments: [
      {
        name: 'Impact Report Q2 2024 - Full Version.pdf',
        url: '/reports/q2-2024-full.pdf',
        type: 'pdf',
        size: '5.2 MB'
      },
      {
        name: 'Data Dashboard Q2 2024.xlsx',
        url: '/reports/q2-2024-data.xlsx',
        type: 'excel',
        size: '2.8 MB'
      }
    ],
    status: 'published',
    author: {
      id: 'admin1',
      name: 'Tim Impact Measurement',
      role: 'Analytics Team'
    },
    createdAt: new Date('2024-07-01'),
    publishedAt: new Date('2024-07-05')
  }
];

// API Controllers

/**
 * Get all impact metrics with filtering
 */
export const getAllImpactMetrics = async (req: Request, res: Response) => {
  try {
    const {
      category,
      region,
      program,
      sdg,
      trend,
      search,
      sortBy = 'progress',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    let metrics = [...mockImpactMetrics].filter(metric => metric.isActive);

    // Filter by category
    if (category && typeof category === 'string') {
      metrics = metrics.filter(metric => metric.category === category);
    }

    // Filter by region
    if (region && typeof region === 'string') {
      metrics = metrics.filter(metric => metric.region === region);
    }

    // Filter by program
    if (program && typeof program === 'string') {
      metrics = metrics.filter(metric => metric.program === program);
    }

    // Filter by SDG
    if (sdg && typeof sdg === 'string') {
      const sdgNumber = parseInt(sdg);
      metrics = metrics.filter(metric => metric.sdgAlignment.includes(sdgNumber));
    }

    // Filter by trend
    if (trend && typeof trend === 'string') {
      metrics = metrics.filter(metric => metric.trend === trend);
    }

    // Search in name and description
    if (search && typeof search === 'string') {
      const searchTerm = search.toLowerCase();
      metrics = metrics.filter(metric =>
        metric.name.toLowerCase().includes(searchTerm) ||
        metric.description.toLowerCase().includes(searchTerm)
      );
    }

    // Sort
    metrics.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'currentValue':
          aValue = a.currentValue;
          bValue = b.currentValue;
          break;
        case 'targetValue':
          aValue = a.targetValue;
          bValue = b.targetValue;
          break;
        case 'lastUpdated':
          aValue = new Date(a.lastUpdated).getTime();
          bValue = new Date(b.lastUpdated).getTime();
          break;
        case 'progress':
        default:
          aValue = a.progress;
          bValue = b.progress;
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

    const paginatedMetrics = metrics.slice(startIndex, endIndex);

    // Calculate statistics
    const stats = {
      total: metrics.length,
      byCategory: {
        social: metrics.filter(m => m.category === 'social').length,
        economic: metrics.filter(m => m.category === 'economic').length,
        environmental: metrics.filter(m => m.category === 'environmental').length,
        educational: metrics.filter(m => m.category === 'educational').length,
        health: metrics.filter(m => m.category === 'health').length
      },
      avgProgress: metrics.reduce((acc, m) => acc + m.progress, 0) / metrics.length,
      onTrack: metrics.filter(m => m.progress >= 80).length,
      atRisk: metrics.filter(m => m.progress >= 60 && m.progress < 80).length,
      offTrack: metrics.filter(m => m.progress < 60).length
    };

    res.json({
      success: true,
      data: {
        metrics: paginatedMetrics,
        pagination: {
          current: pageNum,
          total: Math.ceil(metrics.length / limitNum),
          count: metrics.length
        },
        stats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch impact metrics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get impact metric by ID with time series data
 */
export const getImpactMetricById = async (req: Request, res: Response) => {
  try {
    const { metricId } = req.params;

    const metric = mockImpactMetrics.find(m => m.id === metricId && m.isActive);

    if (!metric) {
      return res.status(404).json({
        success: false,
        message: 'Impact metric not found'
      });
    }

    // Get time series data for this metric
    const timeSeries = mockTimeSeriesData.find(ts => ts.metric === metric.name);

    const metricWithTimeSeries = {
      ...metric,
      timeSeries: timeSeries?.data || []
    };

    res.json({
      success: true,
      data: metricWithTimeSeries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch impact metric',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get regional impact data
 */
export const getRegionalImpact = async (req: Request, res: Response) => {
  try {
    const { region } = req.query;

    let regionalData = [...mockRegionalImpact];

    // Filter by specific region if provided
    if (region && typeof region === 'string') {
      regionalData = regionalData.filter(data => 
        data.region.toLowerCase().includes(region.toLowerCase())
      );
    }

    // Calculate total impact across all regions
    const totalImpact = {
      totalPopulation: regionalData.reduce((acc, r) => acc + r.population, 0),
      totalBeneficiaries: regionalData.reduce((acc, r) => acc + r.beneficiaries, 0),
      avgBeneficiaryRate: regionalData.reduce((acc, r) => acc + r.beneficiaryRate, 0) / regionalData.length,
      totalJobsCreated: regionalData.reduce((acc, r) => acc + r.metrics.economic.jobsCreated, 0),
      totalBusinessesStarted: regionalData.reduce((acc, r) => acc + r.metrics.economic.businessesStarted, 0),
      avgIncomeIncrease: regionalData.reduce((acc, r) => acc + r.metrics.economic.incomeIncrease, 0) / regionalData.length,
      avgDigitalAdoption: regionalData.reduce((acc, r) => acc + r.metrics.economic.digitalAdoption, 0) / regionalData.length
    };

    res.json({
      success: true,
      data: {
        regions: regionalData,
        summary: totalImpact
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch regional impact',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get SDG progress
 */
export const getSDGProgress = async (req: Request, res: Response) => {
  try {
    const { goal } = req.query;

    let sdgData = [...mockSDGProgress];

    // Filter by specific SDG goal if provided
    if (goal && typeof goal === 'string') {
      const goalNumber = parseInt(goal);
      sdgData = sdgData.filter(sdg => sdg.goal === goalNumber);
    }

    // Calculate overall SDG progress
    const overallProgress = {
      totalGoals: sdgData.length,
      avgProgress: sdgData.reduce((acc, sdg) => acc + sdg.progress, 0) / sdgData.length,
      onTrack: sdgData.filter(sdg => sdg.progress >= 70).length,
      atRisk: sdgData.filter(sdg => sdg.progress >= 50 && sdg.progress < 70).length,
      offTrack: sdgData.filter(sdg => sdg.progress < 50).length
    };

    res.json({
      success: true,
      data: {
        goals: sdgData,
        summary: overallProgress
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SDG progress',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get impact reports
 */
export const getImpactReports = async (req: Request, res: Response) => {
  try {
    const {
      status,
      year,
      quarter,
      program,
      region,
      search,
      page = 1,
      limit = 10
    } = req.query;

    let reports = [...mockImpactReports];

    // Filter by status
    if (status && typeof status === 'string') {
      reports = reports.filter(report => report.status === status);
    }

    // Filter by year
    if (year && typeof year === 'string') {
      const yearNum = parseInt(year);
      reports = reports.filter(report => 
        new Date(report.period.start).getFullYear() === yearNum
      );
    }

    // Filter by quarter
    if (quarter && typeof quarter === 'string') {
      const quarterNum = parseInt(quarter);
      reports = reports.filter(report => {
        const month = new Date(report.period.start).getMonth();
        const reportQuarter = Math.floor(month / 3) + 1;
        return reportQuarter === quarterNum;
      });
    }

    // Filter by program
    if (program && typeof program === 'string') {
      reports = reports.filter(report => 
        report.programs.some(p => p.toLowerCase().includes(program.toLowerCase()))
      );
    }

    // Filter by region
    if (region && typeof region === 'string') {
      reports = reports.filter(report => 
        report.regions.some(r => r.toLowerCase().includes(region.toLowerCase()))
      );
    }

    // Search in title and description
    if (search && typeof search === 'string') {
      const searchTerm = search.toLowerCase();
      reports = reports.filter(report =>
        report.title.toLowerCase().includes(searchTerm) ||
        report.description.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by creation date (newest first)
    reports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedReports = reports.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        reports: paginatedReports,
        pagination: {
          current: pageNum,
          total: Math.ceil(reports.length / limitNum),
          count: reports.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch impact reports',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get dashboard overview
 */
export const getDashboardOverview = async (req: Request, res: Response) => {
  try {
    const { period = 'month' } = req.query;

    // Calculate key metrics for dashboard
    const totalMetrics = mockImpactMetrics.filter(m => m.isActive).length;
    const avgProgress = mockImpactMetrics.reduce((acc, m) => acc + m.progress, 0) / totalMetrics;
    
    const regionalSummary = {
      totalRegions: mockRegionalImpact.length,
      totalBeneficiaries: mockRegionalImpact.reduce((acc, r) => acc + r.beneficiaries, 0),
      totalPopulation: mockRegionalImpact.reduce((acc, r) => acc + r.population, 0)
    };

    const sdgSummary = {
      totalGoals: mockSDGProgress.length,
      avgProgress: mockSDGProgress.reduce((acc, s) => acc + s.progress, 0) / mockSDGProgress.length,
      onTrack: mockSDGProgress.filter(s => s.progress >= 70).length
    };

    // Recent updates (mock data)
    const recentUpdates = [
      {
        type: 'metric',
        title: 'Digital Literacy Rate Updated',
        description: 'Mencapai 67.5% (+5.4% dari bulan lalu)',
        date: new Date('2024-07-15'),
        impact: 'positive'
      },
      {
        type: 'report',
        title: 'Laporan Q2 2024 Published',
        description: 'Laporan dampak kuartal 2 telah dipublikasikan',
        date: new Date('2024-07-05'),
        impact: 'neutral'
      },
      {
        type: 'target',
        title: 'UMKM Digital Target Achieved',
        description: 'Target 30,000 UMKM digital tercapai lebih cepat',
        date: new Date('2024-06-28'),
        impact: 'positive'
      }
    ];

    // Key insights
    const insights = [
      {
        title: 'Percepatan Digital Adoption',
        description: 'UMKM digital adoption meningkat 38% lebih cepat dari proyeksi',
        type: 'success',
        actionRequired: false
      },
      {
        title: 'Kesenjangan Regional',
        description: 'Gap digital literacy antara urban-rural perlu perhatian khusus',
        type: 'warning',
        actionRequired: true
      },
      {
        title: 'Youth Engagement Strong',
        description: 'Partisipasi youth dalam program mencapai 45.2%',
        type: 'info',
        actionRequired: false
      }
    ];

    const overview = {
      summary: {
        totalMetrics,
        avgProgress: Number(avgProgress.toFixed(1)),
        metricsOnTrack: mockImpactMetrics.filter(m => m.progress >= 80).length,
        metricsAtRisk: mockImpactMetrics.filter(m => m.progress >= 60 && m.progress < 80).length
      },
      regional: regionalSummary,
      sdg: sdgSummary,
      recentUpdates,
      insights,
      performance: {
        lastMonth: {
          metricsImproved: 8,
          targetsMet: 5,
          newBeneficiaries: 12500
        },
        trends: {
          beneficiaryGrowth: 15.2, // percentage
          metricImprovement: 8.7, // percentage
          targetAchievement: 78.3 // percentage
        }
      }
    };

    res.json({
      success: true,
      data: overview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard overview',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Export impact data
 */
export const exportImpactData = async (req: Request, res: Response) => {
  try {
    const {
      format = 'json',
      metrics,
      regions,
      startDate,
      endDate,
      includeTimeSeries = false
    } = req.query;

    // Filter data based on parameters
    let exportData: any = {
      metadata: {
        exportDate: new Date(),
        format,
        parameters: {
          metrics,
          regions,
          startDate,
          endDate,
          includeTimeSeries
        }
      }
    };

    // Include metrics data
    let metricsData = [...mockImpactMetrics];
    if (metrics && typeof metrics === 'string') {
      const metricIds = metrics.split(',');
      metricsData = metricsData.filter(m => metricIds.includes(m.id));
    }

    // Include regional data
    let regionalData = [...mockRegionalImpact];
    if (regions && typeof regions === 'string') {
      const regionNames = regions.split(',');
      regionalData = regionalData.filter(r => 
        regionNames.some(name => r.region.toLowerCase().includes(name.toLowerCase()))
      );
    }

    exportData.metrics = metricsData;
    exportData.regionalImpact = regionalData;
    exportData.sdgProgress = mockSDGProgress;

    // Include time series if requested
    if (includeTimeSeries === 'true') {
      exportData.timeSeries = mockTimeSeriesData;
    }

    // Handle different export formats
    switch (format) {
      case 'csv':
        // In real implementation, convert to CSV format
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="impact_data.csv"');
        res.send('CSV format not implemented in mock API');
        break;
      
      case 'excel':
        // In real implementation, generate Excel file
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="impact_data.xlsx"');
        res.send('Excel format not implemented in mock API');
        break;
      
      case 'json':
      default:
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename="impact_data.json"');
        res.json({
          success: true,
          data: exportData
        });
        break;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to export impact data',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Update impact metric (admin only)
 */
export const updateImpactMetric = async (req: Request, res: Response) => {
  try {
    const { metricId } = req.params;
    const { currentValue, notes } = req.body;

    const metricIndex = mockImpactMetrics.findIndex(m => m.id === metricId);

    if (metricIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Impact metric not found'
      });
    }

    // Update metric
    const previousValue = mockImpactMetrics[metricIndex].currentValue;
    mockImpactMetrics[metricIndex].currentValue = currentValue;
    mockImpactMetrics[metricIndex].progress = (currentValue / mockImpactMetrics[metricIndex].targetValue) * 100;
    mockImpactMetrics[metricIndex].lastUpdated = new Date();

    // Determine trend
    if (currentValue > previousValue) {
      mockImpactMetrics[metricIndex].trend = 'increasing';
    } else if (currentValue < previousValue) {
      mockImpactMetrics[metricIndex].trend = 'decreasing';
    } else {
      mockImpactMetrics[metricIndex].trend = 'stable';
    }

    // Add to time series data
    const timeSeriesIndex = mockTimeSeriesData.findIndex(ts => 
      ts.metric === mockImpactMetrics[metricIndex].name
    );

    if (timeSeriesIndex !== -1) {
      mockTimeSeriesData[timeSeriesIndex].data.push({
        date: new Date(),
        value: currentValue
      });
    }

    res.json({
      success: true,
      message: 'Impact metric updated successfully',
      data: {
        metric: mockImpactMetrics[metricIndex],
        changes: {
          previousValue,
          newValue: currentValue,
          change: currentValue - previousValue,
          changePercent: ((currentValue - previousValue) / previousValue * 100).toFixed(2)
        },
        notes
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update impact metric',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
