import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  Avatar,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Icon,
  StatArrow,
} from '@chakra-ui/react';
// Simple icon placeholders
const FiMapPin = () => <span>📍</span>;
const FiUsers = () => <span>👥</span>;
const FiTrendingUp = () => <span>📈</span>;
const FiAward = () => <span>🏆</span>;
import { Navigation } from '@merajut-asa/ui';
import Head from 'next/head';

import { Footer } from '../../components/layout/Footer';

// Mock data untuk dashboard regional
const regionalStats = {
  totalPartners: 127,
  activeCampaigns: 43,
  fundsRaised: 2847500000,
  beneficiaries: 8540,
  regions: [
    { name: 'Bandung Raya', partners: 23, campaigns: 12, funds: 845000000 },
    { name: 'Cirebon', partners: 18, campaigns: 8, funds: 623000000 },
    { name: 'Bekasi', partners: 21, campaigns: 9, funds: 512000000 },
    { name: 'Bogor', partners: 15, campaigns: 6, funds: 387000000 },
    { name: 'Sukabumi', partners: 12, campaigns: 4, funds: 298000000 },
    { name: 'Karawang', partners: 14, campaigns: 4, funds: 182000000 },
  ]
};

const recentInitiatives = [
  {
    id: 1,
    title: "Program Beasiswa Anak Yatim Bandung",
    region: "Bandung Raya",
    partner: "Panti Asuhan Ar-Rahman",
    status: "active",
    progress: 75,
    target: 50000000,
    raised: 37500000,
  },
  {
    id: 2,
    title: "Renovasi Fasilitas Pendidikan",
    region: "Cirebon",
    partner: "Yayasan Pendidikan Cirebon",
    status: "completed",
    progress: 100,
    target: 25000000,
    raised: 25000000,
  },
  {
    id: 3,
    title: "Program Gizi Balita",
    region: "Bekasi",
    partner: "Puskesmas Bekasi Timur",
    status: "planning",
    progress: 15,
    target: 30000000,
    raised: 4500000,
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const KatalisatorDashboard: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <>
      <Head>
        <title>Katalisator Perubahan Jabar - Merajut ASA</title>
        <meta name="description" content="Dashboard program Katalisator Perubahan Jawa Barat untuk memajukan komunitas melalui gotong royong digital" />
      </Head>

      <Navigation
        logoSrc="/logo.svg"
        logoAlt="Merajut ASA"
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Jelajahi', href: '/explore' },
          { label: 'Katalisator Jabar', href: '/katalisator', isActive: true },
          { label: 'Akademi Digital', href: '/akademi' },
          { label: 'Tentang', href: '/about' },
        ]}
        actions={
          <HStack spacing={4}>
            <Button as="a" href="/auth/login" variant="ghost" colorScheme="white">
              Masuk
            </Button>
            <Button as="a" href="/auth/register" variant="solid" colorScheme="blue">
              Daftar
            </Button>
          </HStack>
        }
      />

      <Box as="main" pt="20">
        {/* Hero Section */}
        <Box
          bg="linear-gradient(135deg, #1A6BCC 0%, #2B77D9 100%)"
          color="white"
          py="16"
          mb="8"
        >
          <Container maxW="container.xl">
            <VStack spacing="6" align="start">
              <Heading as="h1" size="2xl" fontWeight="bold">
                Katalisator Perubahan Jabar
              </Heading>
              <Text fontSize="xl" maxW="2xl">
                Membangun ekosistem gotong royong digital di Jawa Barat melalui 
                kemitraan strategis dengan panti asuhan, organisasi komunitas, 
                dan pelaku usaha untuk menciptakan dampak sosial yang berkelanjutan.
              </Text>
              <HStack spacing="4">
                <Button 
                  size="lg" 
                  colorScheme="white" 
                  variant="outline"
                  leftIcon={<Icon as={FiUsers} />}
                >
                  Gabung Program
                </Button>
                <Button 
                  size="lg" 
                  bg="white" 
                  color="blue.600"
                  _hover={{ bg: 'gray.50' }}
                  leftIcon={<Icon as={FiMapPin} />}
                >
                  Lihat Peta Regional
                </Button>
              </HStack>
            </VStack>
          </Container>
        </Box>

        <Container maxW="container.xl" pb="16">
          {/* Statistics Overview */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="6" mb="12">
            <Card bg={cardBg} borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Total Mitra Aktif</StatLabel>
                  <StatNumber color="blue.600">{regionalStats.totalPartners}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23% bulan ini
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Kampanye Berjalan</StatLabel>
                  <StatNumber color="green.600">{regionalStats.activeCampaigns}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12% bulan ini
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Dana Terkumpul</StatLabel>
                  <StatNumber color="purple.600" fontSize="lg">
                    {formatCurrency(regionalStats.fundsRaised)}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    31% bulan ini
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Penerima Manfaat</StatLabel>
                  <StatNumber color="orange.600">{regionalStats.beneficiaries.toLocaleString()}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    18% bulan ini
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Main Content Tabs */}
          <Tabs variant="enclosed" colorScheme="blue">
            <TabList>
              <Tab>Dashboard Regional</Tab>
              <Tab>Inisiatif Terbaru</Tab>
              <Tab>Mitra & Partnership</Tab>
              <Tab>Impact Stories</Tab>
            </TabList>

            <TabPanels>
              {/* Regional Dashboard Tab */}
              <TabPanel px="0">
                <VStack spacing="8" align="stretch">
                  <Box>
                    <Heading size="lg" mb="6">Sebaran Regional Jawa Barat</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
                      {regionalStats.regions.map((region, index) => (
                        <Card key={index} bg={cardBg} borderColor={borderColor} _hover={{ shadow: 'md' }}>
                          <CardBody>
                            <VStack align="start" spacing="4">
                              <Flex justify="space-between" w="full" align="center">
                                <Heading size="md" color="blue.600">{region.name}</Heading>
                                <Icon as={FiMapPin} color="gray.500" />
                              </Flex>
                              
                              <SimpleGrid columns={2} spacing="4" w="full">
                                <Box>
                                  <Text fontSize="2xl" fontWeight="bold" color="green.600">
                                    {region.partners}
                                  </Text>
                                  <Text fontSize="sm" color="gray.600">Mitra Aktif</Text>
                                </Box>
                                <Box>
                                  <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                                    {region.campaigns}
                                  </Text>
                                  <Text fontSize="sm" color="gray.600">Kampanye</Text>
                                </Box>
                              </SimpleGrid>
                              
                              <Box w="full">
                                <Text fontSize="lg" fontWeight="semibold" color="purple.600">
                                  {formatCurrency(region.funds)}
                                </Text>
                                <Text fontSize="sm" color="gray.600">Dana Terkumpul</Text>
                              </Box>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Recent Initiatives Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Inisiatif Terbaru</Heading>
                  {recentInitiatives.map((initiative) => (
                    <Card key={initiative.id} bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <Flex justify="space-between" align="start" mb="4">
                          <VStack align="start" spacing="2">
                            <Heading size="md">{initiative.title}</Heading>
                            <HStack>
                              <Badge colorScheme="blue">{initiative.region}</Badge>
                              <Badge 
                                colorScheme={
                                  initiative.status === 'completed' ? 'green' :
                                  initiative.status === 'active' ? 'blue' : 'gray'
                                }
                              >
                                {initiative.status === 'completed' ? 'Selesai' :
                                 initiative.status === 'active' ? 'Aktif' : 'Perencanaan'}
                              </Badge>
                            </HStack>
                            <Text color="gray.600">{initiative.partner}</Text>
                          </VStack>
                          
                          <VStack align="end" spacing="2">
                            <Text fontSize="xl" fontWeight="bold" color="green.600">
                              {formatCurrency(initiative.raised)}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              dari {formatCurrency(initiative.target)}
                            </Text>
                            <Text fontSize="sm" fontWeight="semibold" color="blue.600">
                              {initiative.progress}% tercapai
                            </Text>
                          </VStack>
                        </Flex>
                        
                        <Box w="full" bg="gray.200" borderRadius="full" h="2">
                          <Box
                            bg="blue.500"
                            h="2"
                            borderRadius="full"
                            w={`${initiative.progress}%`}
                          />
                        </Box>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </TabPanel>

              {/* Partners Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Mitra & Partnership Program</Heading>
                  <Text>
                    Fitur partnership management sedang dalam pengembangan. 
                    Akan mencakup direktori mitra, onboarding flow, dan dashboard partnership.
                  </Text>
                </VStack>
              </TabPanel>

              {/* Impact Stories Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Impact Stories</Heading>
                  <Text>
                    Fitur impact stories sedang dalam pengembangan. 
                    Akan menampilkan cerita-cerita dampak positif dari program Katalisator Perubahan Jabar.
                  </Text>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default KatalisatorDashboard;
