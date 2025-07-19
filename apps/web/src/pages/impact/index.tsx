import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Icon,
  Flex,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
// Simple icon placeholders from react-icons/fi
const FiTrendingUp = () => <span>📈</span>;
const FiUsers = () => <span>👥</span>;
const FiDollarSign = () => <span>💰</span>;
const FiTarget = () => <span>🎯</span>;
const FiBarChart3 = () => <span>📊</span>;
const FiPieChart = () => <span>🥧</span>;
const FiMapPin = () => <span>📍</span>;
const FiAward = () => <span>🏆</span>;
const FiCalendar = () => <span>📅</span>;
const FiDownload = () => <span>⬇️</span>;
import Head from 'next/head';

interface ImpactMetric {
  id: string;
  title: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  category: 'social' | 'economic' | 'digital' | 'community';
  period: string;
}

interface RegionalImpact {
  region: string;
  beneficiaries: number;
  fundsRaised: number;
  projectsCompleted: number;
  digitalLiteracyGrowth: number;
}

const impactMetrics: ImpactMetric[] = [
  {
    id: '1',
    title: 'Total Penerima Manfaat',
    value: 12847,
    target: 15000,
    unit: 'orang',
    trend: 'up',
    trendValue: 23,
    category: 'social',
    period: 'YTD 2024',
  },
  {
    id: '2',
    title: 'Dana Tersalurkan',
    value: 8.7,
    target: 12,
    unit: 'miliar IDR',
    trend: 'up',
    trendValue: 31,
    category: 'economic',
    period: 'YTD 2024',
  },
  {
    id: '3',
    title: 'Literasi Digital Meningkat',
    value: 68,
    target: 80,
    unit: '%',
    trend: 'up',
    trendValue: 15,
    category: 'digital',
    period: 'Q2 2024',
  },
  {
    id: '4',
    title: 'Komunitas Aktif',
    value: 247,
    target: 300,
    unit: 'komunitas',
    trend: 'up',
    trendValue: 18,
    category: 'community',
    period: 'YTD 2024',
  },
  {
    id: '5',
    title: 'Mitra Organisasi',
    value: 89,
    target: 120,
    unit: 'organisasi',
    trend: 'up',
    trendValue: 12,
    category: 'community',
    period: 'YTD 2024',
  },
  {
    id: '6',
    title: 'Pelatihan Digital Selesai',
    value: 1456,
    target: 2000,
    unit: 'peserta',
    trend: 'up',
    trendValue: 27,
    category: 'digital',
    period: 'YTD 2024',
  },
];

const regionalImpacts: RegionalImpact[] = [
  {
    region: 'Bandung Raya',
    beneficiaries: 3247,
    fundsRaised: 2847500000,
    projectsCompleted: 23,
    digitalLiteracyGrowth: 72,
  },
  {
    region: 'Cirebon',
    beneficiaries: 2156,
    fundsRaised: 1923000000,
    projectsCompleted: 18,
    digitalLiteracyGrowth: 65,
  },
  {
    region: 'Bekasi',
    beneficiaries: 2891,
    fundsRaised: 2134000000,
    projectsCompleted: 21,
    digitalLiteracyGrowth: 70,
  },
  {
    region: 'Bogor',
    beneficiaries: 1987,
    fundsRaised: 1567000000,
    projectsCompleted: 15,
    digitalLiteracyGrowth: 63,
  },
  {
    region: 'Sukabumi',
    beneficiaries: 1534,
    fundsRaised: 1298000000,
    projectsCompleted: 12,
    digitalLiteracyGrowth: 58,
  },
  {
    region: 'Karawang',
    beneficiaries: 1032,
    fundsRaised: 982000000,
    projectsCompleted: 8,
    digitalLiteracyGrowth: 55,
  },
];

const ImpactMeasurement: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('ytd-2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'social': return 'blue';
      case 'economic': return 'green';
      case 'digital': return 'purple';
      case 'community': return 'orange';
      default: return 'gray';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'social': return 'Sosial';
      case 'economic': return 'Ekonomi';
      case 'digital': return 'Digital';
      case 'community': return 'Komunitas';
      default: return category;
    }
  };

  const filteredMetrics = impactMetrics.filter(metric => {
    if (selectedCategory === 'all') return true;
    return metric.category === selectedCategory;
  });

  const totalBeneficiaries = regionalImpacts.reduce((acc, region) => acc + region.beneficiaries, 0);
  const totalFunds = regionalImpacts.reduce((acc, region) => acc + region.fundsRaised, 0);
  const totalProjects = regionalImpacts.reduce((acc, region) => acc + region.projectsCompleted, 0);
  const avgDigitalLiteracy = regionalImpacts.reduce((acc, region) => acc + region.digitalLiteracyGrowth, 0) / regionalImpacts.length;

  return (
    <>
      <Head>
        <title>Impact Measurement - Merajut ASA</title>
        <meta name="description" content="Dashboard pengukuran dampak program Merajut ASA untuk transparansi dan akuntabilitas" />
      </Head>

      <Box as="main" minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl" py="8">
          {/* Header */}
          <VStack spacing="6" align="stretch" mb="8">
            <Flex justify="space-between" align="center">
              <Box>
                <Heading as="h1" size="2xl" color="blue.600" mb="2">
                  Impact Measurement Dashboard
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Transparansi dampak program Merajut ASA untuk pertanggungjawaban publik
                </Text>
              </Box>
              
              <VStack spacing="2">
                <Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  maxW="200px"
                >
                  <option value="ytd-2024">YTD 2024</option>
                  <option value="q2-2024">Q2 2024</option>
                  <option value="q1-2024">Q1 2024</option>
                  <option value="2023">Tahun 2023</option>
                </Select>
                <Button size="sm" leftIcon={<FiDownload />}>
                  Export Report
                </Button>
              </VStack>
            </Flex>

            {/* Overview Stats */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing="4">
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Total Penerima Manfaat</StatLabel>
                    <StatNumber color="blue.600">{totalBeneficiaries.toLocaleString()}</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      23% dari target
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Total Dana Tersalurkan</StatLabel>
                    <StatNumber color="green.600" fontSize="lg">
                      {formatCurrency(totalFunds)}
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      31% bulan ini
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Proyek Selesai</StatLabel>
                    <StatNumber color="purple.600">{totalProjects}</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      18% bulan ini
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Rata-rata Digital Literacy</StatLabel>
                    <StatNumber color="orange.600">{avgDigitalLiteracy.toFixed(1)}%</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      15% improvement
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>

          <Tabs variant="enclosed" colorScheme="blue">
            <TabList mb="6">
              <Tab>Metrics Overview</Tab>
              <Tab>Regional Impact</Tab>
              <Tab>Program Performance</Tab>
              <Tab>SDG Alignment</Tab>
            </TabList>

            <TabPanels>
              {/* Metrics Overview Tab */}
              <TabPanel px="0">
                {/* Category Filters */}
                <HStack spacing="4" mb="6">
                  <Button
                    variant={selectedCategory === 'all' ? 'solid' : 'outline'}
                    colorScheme="blue"
                    onClick={() => setSelectedCategory('all')}
                  >
                    Semua Kategori
                  </Button>
                  <Button
                    variant={selectedCategory === 'social' ? 'solid' : 'outline'}
                    colorScheme="blue"
                    onClick={() => setSelectedCategory('social')}
                  >
                    Sosial
                  </Button>
                  <Button
                    variant={selectedCategory === 'economic' ? 'solid' : 'outline'}
                    colorScheme="green"
                    onClick={() => setSelectedCategory('economic')}
                  >
                    Ekonomi
                  </Button>
                  <Button
                    variant={selectedCategory === 'digital' ? 'solid' : 'outline'}
                    colorScheme="purple"
                    onClick={() => setSelectedCategory('digital')}
                  >
                    Digital
                  </Button>
                  <Button
                    variant={selectedCategory === 'community' ? 'solid' : 'outline'}
                    colorScheme="orange"
                    onClick={() => setSelectedCategory('community')}
                  >
                    Komunitas
                  </Button>
                </HStack>

                {/* Metrics Grid */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
                  {filteredMetrics.map((metric) => (
                    <Card key={metric.id} bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <VStack spacing="4" align="stretch">
                          <Flex justify="space-between" align="center">
                            <Badge colorScheme={getCategoryColor(metric.category)}>
                              {getCategoryText(metric.category)}
                            </Badge>
                            <Text fontSize="xs" color="gray.500">{metric.period}</Text>
                          </Flex>
                          
                          <VStack align="start" spacing="2">
                            <Heading size="sm">{metric.title}</Heading>
                            <HStack>
                              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                                {metric.value.toLocaleString()}
                              </Text>
                              <Text fontSize="sm" color="gray.600">{metric.unit}</Text>
                            </HStack>
                          </VStack>

                          <VStack spacing="2" align="stretch">
                            <HStack justify="space-between">
                              <Text fontSize="sm">Target: {metric.target.toLocaleString()} {metric.unit}</Text>
                              <HStack>
                                <Icon 
                                  as={FiTrendingUp} 
                                  color={metric.trend === 'up' ? 'green.500' : 'red.500'} 
                                />
                                <Text 
                                  fontSize="sm" 
                                  color={metric.trend === 'up' ? 'green.500' : 'red.500'}
                                >
                                  +{metric.trendValue}%
                                </Text>
                              </HStack>
                            </HStack>
                            
                            <Progress 
                              value={(metric.value / metric.target) * 100} 
                              colorScheme={getCategoryColor(metric.category)}
                              size="sm"
                              borderRadius="full"
                            />
                            
                            <Text fontSize="xs" color="gray.500">
                              {((metric.value / metric.target) * 100).toFixed(1)}% dari target tercapai
                            </Text>
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </TabPanel>

              {/* Regional Impact Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Impact Regional Jawa Barat</Heading>
                  
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Wilayah</Th>
                          <Th isNumeric>Penerima Manfaat</Th>
                          <Th isNumeric>Dana Tersalurkan</Th>
                          <Th isNumeric>Proyek Selesai</Th>
                          <Th isNumeric>Digital Literacy Growth</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {regionalImpacts.map((region, index) => (
                          <Tr key={index}>
                            <Td fontWeight="semibold">{region.region}</Td>
                            <Td isNumeric>{region.beneficiaries.toLocaleString()}</Td>
                            <Td isNumeric>{formatCurrency(region.fundsRaised)}</Td>
                            <Td isNumeric>{region.projectsCompleted}</Td>
                            <Td isNumeric>
                              <HStack justify="flex-end">
                                <Text>{region.digitalLiteracyGrowth}%</Text>
                                <Progress 
                                  value={region.digitalLiteracyGrowth} 
                                  colorScheme="blue" 
                                  size="sm" 
                                  w="60px"
                                />
                              </HStack>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  {/* Regional Performance Cards */}
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6" mt="8">
                    {regionalImpacts.slice(0, 3).map((region, index) => (
                      <Card key={index} bg={cardBg} borderColor={borderColor}>
                        <CardBody>
                          <VStack spacing="4" align="start">
                            <HStack justify="space-between" w="full">
                              <Heading size="md" color="blue.600">{region.region}</Heading>
                              <Text color="gray.500">📍</Text>
                            </HStack>
                            
                            <SimpleGrid columns={2} spacing="4" w="full">
                              <VStack align="start" spacing="1">
                                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                                  {region.beneficiaries.toLocaleString()}
                                </Text>
                                <Text fontSize="sm" color="gray.600">Penerima Manfaat</Text>
                              </VStack>
                              <VStack align="start" spacing="1">
                                <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                                  {region.projectsCompleted}
                                </Text>
                                <Text fontSize="sm" color="gray.600">Proyek Selesai</Text>
                              </VStack>
                            </SimpleGrid>
                            
                            <Box w="full">
                              <Text fontSize="lg" fontWeight="semibold" color="blue.600" mb="2">
                                Digital Literacy: {region.digitalLiteracyGrowth}%
                              </Text>
                              <Progress 
                                value={region.digitalLiteracyGrowth} 
                                colorScheme="blue" 
                                size="sm"
                                borderRadius="full"
                              />
                            </Box>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </VStack>
              </TabPanel>

              {/* Program Performance Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Performance Program Strategis</Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
                    {/* Katalisator Perubahan Jabar */}
                    <Card bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <VStack spacing="4" align="start">
                          <Heading size="md" color="blue.600">Katalisator Perubahan Jabar</Heading>
                          <SimpleGrid columns={2} spacing="4" w="full">
                            <VStack align="start">
                              <Text fontSize="2xl" fontWeight="bold">127</Text>
                              <Text fontSize="sm" color="gray.600">Mitra Aktif</Text>
                            </VStack>
                            <VStack align="start">
                              <Text fontSize="2xl" fontWeight="bold">43</Text>
                              <Text fontSize="sm" color="gray.600">Kampanye Aktif</Text>
                            </VStack>
                          </SimpleGrid>
                          <Box w="full">
                            <Text fontSize="sm" mb="2">Target Achievement: 85%</Text>
                            <Progress value={85} colorScheme="blue" size="sm" />
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* Akademi Penggerak Digital */}
                    <Card bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <VStack spacing="4" align="start">
                          <Heading size="md" color="purple.600">Akademi Penggerak Digital</Heading>
                          <SimpleGrid columns={2} spacing="4" w="full">
                            <VStack align="start">
                              <Text fontSize="2xl" fontWeight="bold">1,456</Text>
                              <Text fontSize="sm" color="gray.600">Peserta Aktif</Text>
                            </VStack>
                            <VStack align="start">
                              <Text fontSize="2xl" fontWeight="bold">847</Text>
                              <Text fontSize="sm" color="gray.600">Lulus Training</Text>
                            </VStack>
                          </SimpleGrid>
                          <Box w="full">
                            <Text fontSize="sm" mb="2">Completion Rate: 73%</Text>
                            <Progress value={73} colorScheme="purple" size="sm" />
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* Program Mentorship */}
                    <Card bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <VStack spacing="4" align="start">
                          <Heading size="md" color="green.600">Program Mentorship</Heading>
                          <SimpleGrid columns={2} spacing="4" w="full">
                            <VStack align="start">
                              <Text fontSize="2xl" fontWeight="bold">89</Text>
                              <Text fontSize="sm" color="gray.600">Mentor Aktif</Text>
                            </VStack>
                            <VStack align="start">
                              <Text fontSize="2xl" fontWeight="bold">567</Text>
                              <Text fontSize="sm" color="gray.600">Sesi Selesai</Text>
                            </VStack>
                          </SimpleGrid>
                          <Box w="full">
                            <Text fontSize="sm" mb="2">Satisfaction Rate: 4.8/5</Text>
                            <Progress value={96} colorScheme="green" size="sm" />
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* Suara Komunitas */}
                    <Card bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <VStack spacing="4" align="start">
                          <Heading size="md" color="orange.600">Suara Komunitas</Heading>
                          <SimpleGrid columns={2} spacing="4" w="full">
                            <VStack align="start">
                              <Text fontSize="2xl" fontWeight="bold">234</Text>
                              <Text fontSize="sm" color="gray.600">Feedback Diterima</Text>
                            </VStack>
                            <VStack align="start">
                              <Text fontSize="2xl" fontWeight="bold">87</Text>
                              <Text fontSize="sm" color="gray.600">Feedback Implemented</Text>
                            </VStack>
                          </SimpleGrid>
                          <Box w="full">
                            <Text fontSize="sm" mb="2">Implementation Rate: 37%</Text>
                            <Progress value={37} colorScheme="orange" size="sm" />
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </VStack>
              </TabPanel>

              {/* SDG Alignment Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Keselarasan dengan Sustainable Development Goals</Heading>
                  <Text color="gray.600">
                    Program Merajut ASA berkontribusi pada pencapaian beberapa SDG target:
                  </Text>
                  
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
                    {/* SDG 1: No Poverty */}
                    <Card bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <VStack spacing="3" align="start">
                          <HStack>
                            <Box w="10px" h="10px" bg="red.500" borderRadius="full" />
                            <Heading size="sm">SDG 1: No Poverty</Heading>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            Dana tersalurkan untuk mengurangi kemiskinan
                          </Text>
                          <Text fontSize="2xl" fontWeight="bold" color="red.500">
                            {formatCurrency(totalFunds)}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            kepada {totalBeneficiaries.toLocaleString()} penerima manfaat
                          </Text>
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* SDG 4: Quality Education */}
                    <Card bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <VStack spacing="3" align="start">
                          <HStack>
                            <Box w="10px" h="10px" bg="blue.500" borderRadius="full" />
                            <Heading size="sm">SDG 4: Quality Education</Heading>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            Peningkatan literasi digital masyarakat
                          </Text>
                          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                            {avgDigitalLiteracy.toFixed(1)}%
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            rata-rata pertumbuhan literasi digital
                          </Text>
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* SDG 17: Partnerships */}
                    <Card bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <VStack spacing="3" align="start">
                          <HStack>
                            <Box w="10px" h="10px" bg="green.500" borderRadius="full" />
                            <Heading size="sm">SDG 17: Partnerships</Heading>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            Kemitraan untuk mencapai tujuan bersama
                          </Text>
                          <Text fontSize="2xl" fontWeight="bold" color="green.500">
                            89
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            organisasi mitra aktif
                          </Text>
                        </VStack>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </>
  );
};

export default ImpactMeasurement;
