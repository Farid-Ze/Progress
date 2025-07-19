import { 
  Box, 
  Heading, 
  Text, 
  SimpleGrid, 
  Flex, 
  Button, 
  VStack,
  HStack,
  Select,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Layout, Search, Alert } from '@merajut-asa/ui';
import Head from 'next/head';
import React, { useState } from 'react';

import CampaignCard from '../components/campaign/CampaignCard';

// This would come from your API in a real implementation
const MOCK_CAMPAIGNS = [
  {
    id: '1',
    slug: 'community-library-project',
    title: 'Community Library Project',
    description: 'Help us build a library for underprivileged children in East Jakarta to promote literacy and education.',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1625764198/samples/landscapes/nature-mountains.jpg',
    category: 'EDUCATION',
    currentAmount: 15000000,
    goalAmount: 25000000,
    daysLeft: 12,
    contributorCount: 48,
    creatorName: 'Pendidikan Untuk Semua',
    creatorAvatarUrl: 'https://res.cloudinary.com/demo/image/upload/v1625764198/samples/people/kitchen-bar.jpg',
  },
  {
    id: '2',
    slug: 'coral-reef-restoration',
    title: 'Coral Reef Restoration in Raja Ampat',
    description: 'Join our efforts to restore damaged coral reefs in Raja Ampat and protect marine biodiversity for future generations.',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1625764198/samples/landscapes/beach-boat.jpg',
    category: 'ENVIRONMENT',
    currentAmount: 45000000,
    goalAmount: 60000000,
    daysLeft: 5,
    contributorCount: 120,
    creatorName: 'Marine Conservation Initiative',
    creatorAvatarUrl: 'https://res.cloudinary.com/demo/image/upload/v1625764198/samples/people/bicycle.jpg',
  },
  {
    id: '3',
    slug: 'traditional-batik-workshop',
    title: 'Traditional Batik Workshop for Youth',
    description: 'Preserving Indonesian cultural heritage by teaching traditional batik techniques to young artisans.',
    thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1625764198/samples/food/spices.jpg',
    category: 'CREATIVE',
    currentAmount: 8500000,
    goalAmount: 12000000,
    daysLeft: 20,
    contributorCount: 32,
    creatorName: 'Batik Preservation Society',
    creatorAvatarUrl: 'https://res.cloudinary.com/demo/image/upload/v1625764198/samples/people/boy-snow-hoodie.jpg',
  },
];

const HomePage: React.FC = () => {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  
  // This would be replaced with a real API call
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      if (!query) {
        setCampaigns(MOCK_CAMPAIGNS);
      } else {
        const filtered = MOCK_CAMPAIGNS.filter(
          campaign => campaign.title.toLowerCase().includes(query.toLowerCase())
        );
        setCampaigns(filtered);
      }
      setIsLoading(false);
    }, 500);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      if (!category) {
        setCampaigns(MOCK_CAMPAIGNS);
      } else {
        const filtered = MOCK_CAMPAIGNS.filter(
          campaign => campaign.category === category
        );
        setCampaigns(filtered);
      }
      setIsLoading(false);
    }, 500);
  };
  
  // Navigation items
  const navigationItems = [
    { label: 'Home', href: '/', isActive: true },
    { label: 'Explore', href: '/explore' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About Us', href: '/about' },
  ];
  
  // Navigation actions
  const navigationActions = (
    <HStack spacing="4">
      <Button variant="ghost" colorScheme="blue">
        Log In
      </Button>
      <Button colorScheme="blue">
        Sign Up
      </Button>
    </HStack>
  );

  return (
    <>
      <Head>
        <title>Merajut ASA - Weaving Hope Together</title>
        <meta name="description" content="Merajut ASA is a crowdfunding platform that connects changemakers with supporters to create positive impact across Indonesia." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout
        navigationProps={{
          logoSrc: "/logo.svg",
          logoAlt: "Merajut ASA logo",
          items: navigationItems,
          actions: navigationActions,
          isFixed: true,
        }}
      >
        {/* Hero Section */}
        <Box
          as="section"
          py={{ base: "12", md: "20" }}
          textAlign="center"
        >
          <VStack spacing="6" maxW="container.md" mx="auto" px="4">
            <Heading as="h1" size="display" color="neutral.deepSpace">
              Weaving Hope Together
            </Heading>
            <Text fontSize="xl" color="neutral.stormCloud">
              Connect with communities across Indonesia to support and fund 
              meaningful initiatives that create lasting positive impact.
            </Text>
            <Button 
              colorScheme="blue" 
              size="lg"
              height="60px"
              px="8"
              fontSize="lg"
            >
              Start a Campaign
            </Button>
          </VStack>
        </Box>
        
        {/* Campaign Listing Section */}
        <Box as="section" py="8">
          <Heading as="h2" size="lg" mb="6">
            Featured Campaigns
          </Heading>
          
          {/* Filters */}
          <Flex 
            direction={{ base: "column", md: "row" }} 
            justify="space-between"
            align={{ base: "stretch", md: "center" }}
            mb="8"
            gap="4"
          >
            <Box w={{ base: "100%", md: "60%" }}>
              <Search
                placeholder="Search campaigns..."
                fullWidth
                isLoading={isLoading}
                onSearch={handleSearch}
                onResultSelect={() => {}}
                ariaLabel="Search campaigns"
              />
            </Box>
            
            <Select
              placeholder="All Categories"
              onChange={handleCategoryChange}
              value={selectedCategory}
              maxW={{ base: "100%", md: "200px" }}
            >
              <option value="EDUCATION">Education</option>
              <option value="ENVIRONMENT">Environment</option>
              <option value="CREATIVE">Creative</option>
              <option value="MEDICAL">Medical</option>
              <option value="COMMUNITY">Community</option>
            </Select>
          </Flex>
          
          {/* Results */}
          {campaigns.length === 0 ? (
            <Alert 
              status="info" 
              title="No campaigns found"
              fullWidth
            >
              Try adjusting your search or filters to find campaigns.
            </Alert>
          ) : (
            <SimpleGrid columns={columns} spacing="6">
              {isLoading ? (
                // Skeleton loading state
                Array.from({ length: 3 }).map((_, index) => (
                  <CampaignCard
                    key={`skeleton-${index}`}
                    id={`skeleton-${index}`}
                    slug=""
                    title=""
                    description=""
                    thumbnailUrl=""
                    category=""
                    currentAmount={0}
                    goalAmount={0}
                    daysLeft={0}
                    contributorCount={0}
                    creatorName=""
                    isLoading={true}
                  />
                ))
              ) : (
                // Actual campaign cards
                campaigns.map(campaign => (
                  <CampaignCard
                    key={campaign.id}
                    id={campaign.id}
                    slug={campaign.slug}
                    title={campaign.title}
                    description={campaign.description}
                    thumbnailUrl={campaign.thumbnailUrl}
                    category={campaign.category}
                    currentAmount={campaign.currentAmount}
                    goalAmount={campaign.goalAmount}
                    daysLeft={campaign.daysLeft}
                    contributorCount={campaign.contributorCount}
                    creatorName={campaign.creatorName}
                    creatorAvatarUrl={campaign.creatorAvatarUrl}
                  />
                ))
              )}
            </SimpleGrid>
          )}
          
          {campaigns.length > 0 && (
            <Flex justify="center" mt="12">
              <Button 
                variant="outline" 
                colorScheme="blue"
                size="lg"
              >
                View All Campaigns
              </Button>
            </Flex>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default HomePage;
