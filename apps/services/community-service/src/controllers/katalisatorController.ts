import { Request, Response } from 'express';

// Types for Katalisator Perubahan Jabar
interface KatalisatorPartner {
  id: string;
  name: string;
  type: 'panti' | 'ngo' | 'corporate' | 'academic' | 'government';
  region: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  status: 'active' | 'inactive' | 'pending';
  joinedDate: Date;
  campaigns: string[];
  impact: {
    beneficiaries: number;
    fundsRaised: number;
    projectsCompleted: number;
  };
}

interface RegionalStats {
  region: string;
  partners: number;
  campaigns: number;
  funds: number;
  beneficiaries: number;
  digitalLiteracyGrowth: number;
}

interface KatalisatorInitiative {
  id: string;
  title: string;
  description: string;
  region: string;
  partner: {
    id: string;
    name: string;
    type: string;
  };
  status: 'planning' | 'active' | 'completed' | 'paused';
  progress: number;
  target: number;
  raised: number;
  startDate: Date;
  endDate?: Date;
  beneficiaries: number;
  category: 'education' | 'health' | 'environment' | 'economic' | 'social';
}

// Mock data - in real implementation, this would come from database
const mockPartners: KatalisatorPartner[] = [
  {
    id: '1',
    name: 'Panti Asuhan Ar-Rahman',
    type: 'panti',
    region: 'Bandung Raya',
    contactInfo: {
      email: 'info@pantiasuhan-arrahman.org',
      phone: '+62-22-1234567',
      address: 'Jl. Soekarno Hatta No. 123, Bandung'
    },
    status: 'active',
    joinedDate: new Date('2024-01-15'),
    campaigns: ['camp1', 'camp2'],
    impact: {
      beneficiaries: 150,
      fundsRaised: 845000000,
      projectsCompleted: 12
    }
  },
  {
    id: '2',
    name: 'Yayasan Pendidikan Cirebon',
    type: 'ngo',
    region: 'Cirebon',
    contactInfo: {
      email: 'contact@ypc.org',
      phone: '+62-231-987654',
      address: 'Jl. Siliwangi No. 45, Cirebon'
    },
    status: 'active',
    joinedDate: new Date('2024-02-01'),
    campaigns: ['camp3', 'camp4'],
    impact: {
      beneficiaries: 200,
      fundsRaised: 623000000,
      projectsCompleted: 8
    }
  }
];

const mockRegionalStats: RegionalStats[] = [
  {
    region: 'Bandung Raya',
    partners: 23,
    campaigns: 12,
    funds: 845000000,
    beneficiaries: 3247,
    digitalLiteracyGrowth: 72
  },
  {
    region: 'Cirebon',
    partners: 18,
    campaigns: 8,
    funds: 623000000,
    beneficiaries: 2156,
    digitalLiteracyGrowth: 65
  },
  {
    region: 'Bekasi',
    partners: 21,
    campaigns: 9,
    funds: 512000000,
    beneficiaries: 2891,
    digitalLiteracyGrowth: 70
  }
];

const mockInitiatives: KatalisatorInitiative[] = [
  {
    id: '1',
    title: 'Program Beasiswa Anak Yatim Bandung',
    description: 'Program pemberian beasiswa pendidikan untuk anak-anak yatim di wilayah Bandung',
    region: 'Bandung Raya',
    partner: {
      id: '1',
      name: 'Panti Asuhan Ar-Rahman',
      type: 'panti'
    },
    status: 'active',
    progress: 75,
    target: 50000000,
    raised: 37500000,
    startDate: new Date('2024-03-01'),
    beneficiaries: 50,
    category: 'education'
  },
  {
    id: '2',
    title: 'Renovasi Fasilitas Pendidikan',
    description: 'Renovasi dan peningkatan fasilitas pendidikan di Cirebon',
    region: 'Cirebon',
    partner: {
      id: '2',
      name: 'Yayasan Pendidikan Cirebon',
      type: 'ngo'
    },
    status: 'completed',
    progress: 100,
    target: 25000000,
    raised: 25000000,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-06-30'),
    beneficiaries: 300,
    category: 'education'
  }
];

// API Controllers

/**
 * Get regional statistics for Katalisator Perubahan Jabar
 */
export const getRegionalStats = async (req: Request, res: Response) => {
  try {
    const { region } = req.query;
    
    let stats = mockRegionalStats;
    
    if (region && typeof region === 'string') {
      stats = stats.filter(stat => 
        stat.region.toLowerCase().includes(region.toLowerCase())
      );
    }
    
    const totalStats = {
      totalPartners: stats.reduce((acc, stat) => acc + stat.partners, 0),
      totalCampaigns: stats.reduce((acc, stat) => acc + stat.campaigns, 0),
      totalFunds: stats.reduce((acc, stat) => acc + stat.funds, 0),
      totalBeneficiaries: stats.reduce((acc, stat) => acc + stat.beneficiaries, 0),
      avgDigitalLiteracy: stats.reduce((acc, stat) => acc + stat.digitalLiteracyGrowth, 0) / stats.length
    };
    
    res.json({
      success: true,
      data: {
        regions: stats,
        summary: totalStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch regional statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get Katalisator partners
 */
export const getKatalisatorPartners = async (req: Request, res: Response) => {
  try {
    const { region, type, status, page = 1, limit = 10 } = req.query;
    
    let partners = mockPartners;
    
    // Filter by region
    if (region && typeof region === 'string') {
      partners = partners.filter(partner => 
        partner.region.toLowerCase().includes(region.toLowerCase())
      );
    }
    
    // Filter by type
    if (type && typeof type === 'string') {
      partners = partners.filter(partner => partner.type === type);
    }
    
    // Filter by status
    if (status && typeof status === 'string') {
      partners = partners.filter(partner => partner.status === status);
    }
    
    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedPartners = partners.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        partners: paginatedPartners,
        pagination: {
          current: pageNum,
          total: Math.ceil(partners.length / limitNum),
          count: partners.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch partners',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get Katalisator initiatives
 */
export const getKatalisatorInitiatives = async (req: Request, res: Response) => {
  try {
    const { region, status, category, page = 1, limit = 10 } = req.query;
    
    let initiatives = mockInitiatives;
    
    // Filter by region
    if (region && typeof region === 'string') {
      initiatives = initiatives.filter(init => 
        init.region.toLowerCase().includes(region.toLowerCase())
      );
    }
    
    // Filter by status
    if (status && typeof status === 'string') {
      initiatives = initiatives.filter(init => init.status === status);
    }
    
    // Filter by category
    if (category && typeof category === 'string') {
      initiatives = initiatives.filter(init => init.category === category);
    }
    
    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedInitiatives = initiatives.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        initiatives: paginatedInitiatives,
        pagination: {
          current: pageNum,
          total: Math.ceil(initiatives.length / limitNum),
          count: initiatives.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch initiatives',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Create new partner registration
 */
export const createPartnerRegistration = async (req: Request, res: Response) => {
  try {
    const {
      name,
      type,
      region,
      contactInfo
      // description,
      // documents
    } = req.body;
    
    // Validation
    if (!name || !type || !region || !contactInfo) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // In real implementation, save to database
    const newPartner: Partial<KatalisatorPartner> = {
      id: Date.now().toString(),
      name,
      type,
      region,
      contactInfo,
      status: 'pending',
      joinedDate: new Date(),
      campaigns: [],
      impact: {
        beneficiaries: 0,
        fundsRaised: 0,
        projectsCompleted: 0
      }
    };
    
    res.status(201).json({
      success: true,
      message: 'Partner registration submitted successfully',
      data: newPartner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create partner registration',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get partner dashboard data
 */
export const getPartnerDashboard = async (req: Request, res: Response) => {
  try {
    const { partnerId } = req.params;
    
    const partner = mockPartners.find(p => p.id === partnerId);
    
    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }
    
    // Get partner's initiatives
    const partnerInitiatives = mockInitiatives.filter(init => 
      init.partner.id === partnerId
    );
    
    // Calculate metrics
    const metrics = {
      totalCampaigns: partnerInitiatives.length,
      activeCampaigns: partnerInitiatives.filter(init => init.status === 'active').length,
      completedCampaigns: partnerInitiatives.filter(init => init.status === 'completed').length,
      totalRaised: partnerInitiatives.reduce((acc, init) => acc + init.raised, 0),
      totalBeneficiaries: partnerInitiatives.reduce((acc, init) => acc + init.beneficiaries, 0)
    };
    
    res.json({
      success: true,
      data: {
        partner,
        initiatives: partnerInitiatives,
        metrics
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch partner dashboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Update partner information
 */
export const updatePartner = async (req: Request, res: Response) => {
  try {
    const { partnerId } = req.params;
    const updateData = req.body;
    
    const partnerIndex = mockPartners.findIndex(p => p.id === partnerId);
    
    if (partnerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }
    
    // In real implementation, update database
    mockPartners[partnerIndex] = {
      ...mockPartners[partnerIndex],
      ...updateData
    };
    
    res.json({
      success: true,
      message: 'Partner updated successfully',
      data: mockPartners[partnerIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update partner',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get impact analytics for specific region
 */
export const getRegionalImpactAnalytics = async (req: Request, res: Response) => {
  try {
    const { region } = req.params;
    // const { period = 'ytd' } = req.query; // Could be used for analytics filtering
    
    const regionStats = mockRegionalStats.find(stat => 
      stat.region.toLowerCase() === region.toLowerCase()
    );
    
    if (!regionStats) {
      return res.status(404).json({
        success: false,
        message: 'Region not found'
      });
    }
    
    // Get initiatives for this region
    const regionInitiatives = mockInitiatives.filter(init => 
      init.region.toLowerCase() === region.toLowerCase()
    );
    
    // Calculate time-series data (mock)
    const timeSeriesData = [
      { month: 'Jan', beneficiaries: 500, funds: 100000000 },
      { month: 'Feb', beneficiaries: 750, funds: 150000000 },
      { month: 'Mar', beneficiaries: 1200, funds: 250000000 },
      { month: 'Apr', beneficiaries: 1800, funds: 350000000 },
      { month: 'May', beneficiaries: 2400, funds: 450000000 },
      { month: 'Jun', beneficiaries: regionStats.beneficiaries, funds: regionStats.funds },
    ];
    
    res.json({
      success: true,
      data: {
        region: regionStats,
        initiatives: regionInitiatives,
        timeSeries: timeSeriesData,
        analytics: {
          growthRate: {
            beneficiaries: 23.5,
            funds: 31.2,
            partners: 18.7
          },
          categories: [
            { name: 'Education', percentage: 45 },
            { name: 'Health', percentage: 25 },
            { name: 'Social', percentage: 20 },
            { name: 'Economic', percentage: 10 }
          ]
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch regional analytics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
