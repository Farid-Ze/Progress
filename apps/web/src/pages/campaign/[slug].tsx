import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Flex, 
  Progress, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Grid,
  GridItem,
  Divider,
  VStack,
  HStack,
  useBreakpointValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { Layout, Avatar, Tag, Alert } from '@merajut-asa/ui';

// This would come from your API in a real implementation
const MOCK_CAMPAIGN = {
  id: '1',
  slug: 'community-library-project',
  title: 'Community Library Project',
  description: 'Help us build a library for underprivileged children in East Jakarta to promote literacy and education.',
  story: `
    <p>In the heart of East Jakarta, thousands of children lack access to books and educational resources. This project aims to build a community library that will serve as a hub for learning, creativity, and community engagement.</p>
    
    <p>The library will feature:</p>
    <ul>
      <li>A collection of 5,000+ books in both Indonesian and English</li>
      <li>A digital learning center with computers and internet access</li>
      <li>Weekly reading programs and educational workshops</li>
      <li>Dedicated spaces for studying and collaborative learning</li>
    </ul>
    
    <p>Your support will help us:</p>
    <ol>
      <li>Secure a location in a central, accessible area</li>
      <li>Purchase books, shelving, and furniture</li>
      <li>Set up the digital learning center</li>
      <li>Cover operational costs for the first year</li>
    </ol>
    
    <p>This library will impact an estimated 500 children monthly, providing them with resources to develop literacy skills, explore new ideas, and build a foundation for lifelong learning.</p>
  `,
  thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1625764198/samples/landscapes/nature-mountains.jpg',
  bannerUrl: 'https://res.cloudinary.com/demo/image/upload/v1625764198/samples/landscapes/nature-mountains.jpg',
  category: 'EDUCATION',
  tags: ['education', 'literacy', 'community', 'children'],
  currentAmount: 15000000,
  goalAmount: 25000000,
  startDate: '2025-07-01',
  endDate: '2025-08-12',
  contributorCount: 48,
  creatorName: 'Pendidikan Untuk Semua',
  creatorAvatarUrl: 'https://res.cloudinary.com/demo/image/upload/v1625764198/samples/people/kitchen-bar.jpg',
  creatorBio: 'A non-profit organization dedicated to improving access to quality education for all children in Indonesia.',
  updates: [
    {
      id: '1',
      title: 'Location secured!',
      content: 'We are excited to announce that we have secured a location for the library in the Duren Sawit area!',
      publishedAt: '2025-07-15T09:00:00Z',
    },
    {
      id: '2',
      title: 'First book donations received',
      content: 'We have received our first batch of book donations from local publishers. Thank you for the support!',
      publishedAt: '2025-07-20T14:30:00Z',
    }
  ]
};

// Donation amount presets
const DONATION_PRESETS = [
  { value: 50000, label: '50K' },
  { value: 100000, label: '100K' },
  { value: 250000, label: '250K' },
  { value: 500000, label: '500K' },
  { value: 1000000, label: '1M' },
];

const CampaignDetailPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState(MOCK_CAMPAIGN);
  const [donationAmount, setDonationAmount] = useState(100000);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // This would be replaced with a real API call
  React.useEffect(() => {
    if (slug) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCampaign(MOCK_CAMPAIGN);
        setIsLoading(false);
      }, 500);
    }
  }, [slug]);
  
  if (isLoading) {
    return (
      <Layout
        navigationProps={{
          logoSrc: "/logo.svg",
          logoAlt: "Merajut ASA logo",
          items: [],
          isFixed: true,
        }}
      >
        <Box>Loading campaign details...</Box>
      </Layout>
    );
  }
  
  if (!campaign) {
    return (
      <Layout
        navigationProps={{
          logoSrc: "/logo.svg",
          logoAlt: "Merajut ASA logo",
          items: [],
          isFixed: true,
        }}
      >
        <Alert status="error" title="Campaign not found">
          The campaign you are looking for does not exist or has been removed.
        </Alert>
      </Layout>
    );
  }
  
  // Calculate progress percentage
  const progressPercent = Math.min(Math.round((campaign.currentAmount / campaign.goalAmount) * 100), 100);
  
  // Format currency (IDR)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Calculate days left
  const calculateDaysLeft = () => {
    const today = new Date();
    const endDate = new Date(campaign.endDate);
    const differenceInTime = endDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? differenceInDays : 0;
  };
  
  const daysLeft = calculateDaysLeft();
  
  // Handle donation amount change
  const handleDonationAmountChange = (value: string) => {
    setDonationAmount(parseInt(value, 10));
  };
  
  // Handle preset amount selection
  const handlePresetSelection = (value: number) => {
    setDonationAmount(value);
  };
  
  // Handle donate button click
  const handleDonate = () => {
    // In a real implementation, this would navigate to checkout or open a payment modal
    alert(`Processing donation of ${formatCurrency(donationAmount)}`);
  };
  
  // Navigation items
  const navigationItems = [
    { label: 'Home', href: '/' },
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
        <title>{campaign.title} | Merajut ASA</title>
        <meta name="description" content={campaign.description} />
        <meta property="og:title" content={`${campaign.title} | Merajut ASA`} />
        <meta property="og:description" content={campaign.description} />
        <meta property="og:image" content={campaign.bannerUrl} />
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
        {/* Campaign Header */}
        <Box as="section" mb="8">
          <Heading as="h1" size="display" mb="4">
            {campaign.title}
          </Heading>
          
          <Text fontSize="xl" color="neutral.stormCloud" mb="6">
            {campaign.description}
          </Text>
          
          <Box position="relative" height={{ base: "200px", md: "400px" }} mb="6">
            <Image
              src={campaign.bannerUrl}
              alt={`${campaign.title} campaign banner`}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
              priority
            />
          </Box>
          
          {/* Campaign Categories and Tags */}
          <Flex flexWrap="wrap" gap="2" mb="6">
            <Badge colorScheme="blue" fontSize="sm" px="2" py="1" borderRadius="md">
              {campaign.category}
            </Badge>
            
            {campaign.tags.map(tag => (
              <Tag key={tag} size="md" variant="subtle" colorScheme="teal">
                {tag}
              </Tag>
            ))}
          </Flex>
        </Box>
        
        <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap="8">
          <GridItem>
            {/* Campaign Content */}
            <Tabs 
              colorScheme="blue" 
              isFitted={isMobile}
              isLazy
              index={activeTab}
              onChange={(index) => setActiveTab(index)}
            >
              <TabList mb="4">
                <Tab>Story</Tab>
                <Tab>Updates ({campaign.updates.length})</Tab>
                <Tab>Comments</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel px="0">
                  <Box 
                    className="campaign-story"
                    dangerouslySetInnerHTML={{ __html: campaign.story }}
                    sx={{
                      '& p': { mb: 4 },
                      '& ul, & ol': { mb: 4, pl: 6 },
                      '& li': { mb: 2 },
                    }}
                  />
                  
                  {/* Creator Information */}
                  <Box mt="8" p="6" borderWidth="1px" borderRadius="lg">
                    <Heading as="h3" size="md" mb="4">
                      About the Creator
                    </Heading>
                    
                    <Flex gap="4" alignItems="center" mb="4">
                      <Avatar
                        name={campaign.creatorName}
                        src={campaign.creatorAvatarUrl}
                        size="xl"
                        showBorder
                      />
                      
                      <Box>
                        <Heading as="h4" size="md">
                          {campaign.creatorName}
                        </Heading>
                        <Text color="neutral.stormCloud" fontSize="sm">
                          Campaign Creator
                        </Text>
                      </Box>
                    </Flex>
                    
                    <Text>{campaign.creatorBio}</Text>
                    
                    <Button 
                      variant="outline" 
                      colorScheme="blue" 
                      mt="4"
                      onClick={() => alert("This would open contact modal in a real implementation")}
                    >
                      Contact Creator
                    </Button>
                  </Box>
                </TabPanel>
                
                <TabPanel px="0">
                  {campaign.updates.length > 0 ? (
                    <VStack spacing="6" align="stretch">
                      {campaign.updates.map(update => (
                        <Box key={update.id} p="4" borderWidth="1px" borderRadius="md">
                          <Heading as="h3" size="md" mb="2">
                            {update.title}
                          </Heading>
                          <Text color="neutral.stormCloud" fontSize="sm" mb="3">
                            {new Date(update.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Text>
                          <Text>{update.content}</Text>
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <Alert status="info">
                      No updates have been posted yet.
                    </Alert>
                  )}
                </TabPanel>
                
                <TabPanel px="0">
                  <Box textAlign="center" py="8">
                    <Text mb="4">Join the conversation about this campaign.</Text>
                    <Button colorScheme="blue">Log in to comment</Button>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          
          <GridItem>
            {/* Campaign Stats and Donation */}
            <Box 
              position={isMobile ? "static" : "sticky"}
              top="100px"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p="6"
            >
              <Box mb="4">
                <Flex justify="space-between" mb="1">
                  <Text fontWeight="bold">{formatCurrency(campaign.currentAmount)}</Text>
                  <Text color="neutral.stormCloud">
                    {progressPercent}% of {formatCurrency(campaign.goalAmount)}
                  </Text>
                </Flex>
                <Progress 
                  value={progressPercent} 
                  colorScheme="blue" 
                  size="md" 
                  borderRadius="full"
                  aria-label={`${progressPercent}% of goal reached`}
                  mb="4"
                />
              </Box>
              
              <Flex justify="space-between" mb="6">
                <Stat>
                  <StatNumber>{campaign.contributorCount}</StatNumber>
                  <StatHelpText mb="0">Supporters</StatHelpText>
                </Stat>
                
                <Stat>
                  <StatNumber>{daysLeft}</StatNumber>
                  <StatHelpText mb="0">Days Left</StatHelpText>
                </Stat>
              </Flex>
              
              {/* Donation Form */}
              <Box mb="4">
                <FormLabel htmlFor="donation-amount">Donation Amount</FormLabel>
                <NumberInput 
                  id="donation-amount"
                  value={donationAmount} 
                  onChange={handleDonationAmountChange}
                  min={10000} 
                  max={100000000}
                  step={10000}
                  mb="2"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                
                {/* Preset donation amounts */}
                <Flex gap="2" flexWrap="wrap" mb="4">
                  {DONATION_PRESETS.map(preset => (
                    <Button 
                      key={preset.value} 
                      size="sm" 
                      variant={donationAmount === preset.value ? "solid" : "outline"}
                      colorScheme="blue"
                      onClick={() => handlePresetSelection(preset.value)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </Flex>
                
                <FormControl display="flex" alignItems="center" mb="4">
                  <RadioGroup
                    onChange={(value) => setIsAnonymous(value === 'true')}
                    value={isAnonymous.toString()}
                  >
                    <Stack direction="row">
                      <Radio value="false">Show my name</Radio>
                      <Radio value="true">Donate anonymously</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Box>
              
              <Button 
                colorScheme="blue" 
                size="lg" 
                width="100%" 
                mb="4"
                onClick={handleDonate}
                isDisabled={donationAmount < 10000}
              >
                Donate Now
              </Button>
              
              <Flex gap="2" mb="4">
                <Button 
                  flex="1" 
                  variant="outline"
                  leftIcon={<span aria-hidden="true">↗</span>}
                  onClick={() => alert("Share functionality would open here")}
                >
                  Share
                </Button>
                <Button 
                  flex="1" 
                  variant="outline"
                  leftIcon={<span aria-hidden="true">♥</span>}
                  onClick={() => alert("Follow functionality would be implemented here")}
                >
                  Follow
                </Button>
              </Flex>
              
              <Divider my="4" />
              
              {/* Payment Methods */}
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb="2">
                  Secure payment methods:
                </Text>
                <Flex gap="2" flexWrap="wrap">
                  <Box p="2" borderWidth="1px" borderRadius="md">
                    <Text fontSize="xs">Bank Transfer</Text>
                  </Box>
                  <Box p="2" borderWidth="1px" borderRadius="md">
                    <Text fontSize="xs">Credit Card</Text>
                  </Box>
                  <Box p="2" borderWidth="1px" borderRadius="md">
                    <Text fontSize="xs">E-Wallet</Text>
                  </Box>
                </Flex>
                <Text fontSize="xs" color="neutral.stormCloud" mt="2">
                  All donations are secure and encrypted
                </Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
        
        {/* Similar Campaigns Section */}
        <Box as="section" mt="12" mb="8">
          <Heading as="h2" size="lg" mb="6">
            Similar Campaigns
          </Heading>
          <Text>
            This section would display similar campaigns based on category and tags.
          </Text>
        </Box>
      </Layout>
    </>
  );
};

export default CampaignDetailPage;
