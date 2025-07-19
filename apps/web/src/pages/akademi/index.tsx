import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Card,
  CardBody,
  Badge,
  Icon,
  Flex,
  SimpleGrid,
  Progress,
  Avatar,
  AvatarGroup,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
// Simple icon placeholders from react-icons/fi
const FiPlay = () => <span>▶️</span>;
const FiBook = () => <span>📚</span>;
const FiUsers = () => <span>👥</span>;
const FiAward = () => <span>🏆</span>;
const FiClock = () => <span>⏰</span>;
const FiCheckCircle = () => <span>✅</span>;
const FiStar = () => <span>⭐</span>;
const FiTrendingUp = () => <span>📈</span>;
const FiVideo = () => <span>📹</span>;
const FiFileText = () => <span>📄</span>;
const FiDownload = () => <span>⬇️</span>;
import Head from 'next/head';
import { Navigation } from '@merajut-asa/ui';
import { Footer } from '../../components/layout/Footer';

interface LearningTrack {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: string;
  modules: number;
  participants: number;
  rating: number;
  category: string;
  image: string;
  progress?: number;
}

interface Module {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  completed: boolean;
}

const learningTracks: LearningTrack[] = [
  {
    id: '1',
    title: 'Digital Literacy Fundamentals',
    description: 'Dasar-dasar literasi digital untuk berpartisipasi efektif di platform',
    level: 'beginner',
    duration: '4 minggu',
    modules: 8,
    participants: 247,
    rating: 4.8,
    category: 'Dasar',
    image: '/api/placeholder/400/200',
    progress: 0,
  },
  {
    id: '2',
    title: 'Campaign Creation Excellence',
    description: 'Panduan lengkap membuat kampanye fundraising yang efektif',
    level: 'intermediate',
    duration: '3 minggu',
    modules: 6,
    participants: 189,
    rating: 4.9,
    category: 'Kampanye',
    image: '/api/placeholder/400/200',
    progress: 75,
  },
  {
    id: '3',
    title: 'Digital Storytelling',
    description: 'Teknik bercerita digital yang menarik dan persuasif',
    level: 'intermediate',
    duration: '2 minggu',
    modules: 5,
    participants: 156,
    rating: 4.7,
    category: 'Komunikasi',
    image: '/api/placeholder/400/200',
    progress: 100,
  },
  {
    id: '4',
    title: 'Community Engagement',
    description: 'Strategi membangun dan mengelola komunitas pendukung aktif',
    level: 'advanced',
    duration: '5 minggu',
    modules: 10,
    participants: 98,
    rating: 4.9,
    category: 'Komunitas',
    image: '/api/placeholder/400/200',
    progress: 0,
  },
  {
    id: '5',
    title: 'Financial Management',
    description: 'Pengelolaan dana transparan dan akuntabel untuk organisasi',
    level: 'advanced',
    duration: '4 minggu',
    modules: 8,
    participants: 67,
    rating: 4.8,
    category: 'Keuangan',
    image: '/api/placeholder/400/200',
    progress: 0,
  },
  {
    id: '6',
    title: 'Digital Leadership',
    description: 'Keterampilan kepemimpinan untuk era digital dan komunitas online',
    level: 'expert',
    duration: '6 minggu',
    modules: 12,
    participants: 45,
    rating: 5.0,
    category: 'Kepemimpinan',
    image: '/api/placeholder/400/200',
    progress: 0,
  },
];

const sampleModules: Module[] = [
  {
    id: '1',
    title: 'Pengenalan Platform Digital',
    duration: '15 menit',
    type: 'video',
    completed: true,
  },
  {
    id: '2',
    title: 'Navigasi Dashboard',
    duration: '10 menit',
    type: 'video',
    completed: true,
  },
  {
    id: '3',
    title: 'Keamanan Akun Digital',
    duration: '20 menit',
    type: 'reading',
    completed: true,
  },
  {
    id: '4',
    title: 'Latihan: Membuat Profil',
    duration: '30 menit',
    type: 'exercise',
    completed: false,
  },
  {
    id: '5',
    title: 'Quiz: Dasar-dasar Digital',
    duration: '15 menit',
    type: 'quiz',
    completed: false,
  },
];

const AkademiPenggerakDigital: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'green';
      case 'intermediate': return 'blue';
      case 'advanced': return 'purple';
      case 'expert': return 'orange';
      default: return 'gray';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Pemula';
      case 'intermediate': return 'Menengah';
      case 'advanced': return 'Lanjutan';
      case 'expert': return 'Ahli';
      default: return level;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return FiVideo;
      case 'reading': return FiFileText;
      case 'exercise': return FiBook;
      case 'quiz': return FiAward;
      default: return FiBook;
    }
  };

  const filteredTracks = learningTracks.filter(track => {
    const levelMatch = selectedLevel === 'all' || track.level === selectedLevel;
    const categoryMatch = selectedCategory === 'all' || track.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  const stats = {
    totalTracks: learningTracks.length,
    totalParticipants: learningTracks.reduce((acc, track) => acc + track.participants, 0),
    completedTracks: learningTracks.filter(track => track.progress === 100).length,
    avgRating: learningTracks.reduce((acc, track) => acc + track.rating, 0) / learningTracks.length,
  };

  return (
    <>
      <Head>
        <title>Akademi Penggerak Digital - Merajut ASA</title>
        <meta name="description" content="Platform pembelajaran digital untuk mengembangkan kemampuan komunitas dalam era digital" />
      </Head>

      <Navigation
        logoSrc="/logo.svg"
        logoAlt="Merajut ASA"
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Jelajahi', href: '/explore' },
          { label: 'Katalisator Jabar', href: '/katalisator' },
          { label: 'Akademi Digital', href: '/akademi', isActive: true },
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
          bg="linear-gradient(135deg, #2B77D9 0%, #667eea 100%)"
          color="white"
          py="16"
          mb="8"
        >
          <Container maxW="container.xl">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="12">
              <VStack spacing="6" align="start">
                <Heading as="h1" size="2xl" fontWeight="bold">
                  Akademi Penggerak Digital
                </Heading>
                <Text fontSize="xl">
                  Tingkatkan kemampuan digital Anda untuk menciptakan dampak sosial 
                  yang lebih besar. Pelajari keterampilan praktis dari kampanye creation 
                  hingga community leadership.
                </Text>
                <HStack spacing="4">
                  <Button 
                    size="lg" 
                    colorScheme="white" 
                    variant="outline"
                    leftIcon={<FiPlay />}
                  >
                    Mulai Belajar
                  </Button>
                  <Button 
                    size="lg" 
                    bg="white" 
                    color="blue.600"
                    _hover={{ bg: 'gray.50' }}
                    leftIcon={<FiBook />}
                  >
                    Lihat Kurikulum
                  </Button>
                </HStack>
              </VStack>
              
              <Box textAlign="center">
                <SimpleGrid columns={2} spacing="6">
                  <VStack>
                    <Text fontSize="3xl" fontWeight="bold">{stats.totalTracks}</Text>
                    <Text>Learning Tracks</Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="3xl" fontWeight="bold">{stats.totalParticipants}</Text>
                    <Text>Peserta Aktif</Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="3xl" fontWeight="bold">{stats.avgRating.toFixed(1)}</Text>
                    <Text>Rating Rata-rata</Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="3xl" fontWeight="bold">95%</Text>
                    <Text>Tingkat Kepuasan</Text>
                  </VStack>
                </SimpleGrid>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        <Container maxW="container.xl" pb="16">
          <Tabs variant="enclosed" colorScheme="blue">
            <TabList mb="8">
              <Tab>Semua Kursus</Tab>
              <Tab>Kursus Saya</Tab>
              <Tab>Sertifikat</Tab>
              <Tab>Leaderboard</Tab>
            </TabList>

            <TabPanels>
              {/* All Courses Tab */}
              <TabPanel px="0">
                {/* Filters */}
                <HStack spacing="4" mb="8">
                  <Button
                    variant={selectedLevel === 'all' ? 'solid' : 'outline'}
                    colorScheme="blue"
                    onClick={() => setSelectedLevel('all')}
                  >
                    Semua Level
                  </Button>
                  <Button
                    variant={selectedLevel === 'beginner' ? 'solid' : 'outline'}
                    colorScheme="green"
                    onClick={() => setSelectedLevel('beginner')}
                  >
                    Pemula
                  </Button>
                  <Button
                    variant={selectedLevel === 'intermediate' ? 'solid' : 'outline'}
                    colorScheme="blue"
                    onClick={() => setSelectedLevel('intermediate')}
                  >
                    Menengah
                  </Button>
                  <Button
                    variant={selectedLevel === 'advanced' ? 'solid' : 'outline'}
                    colorScheme="purple"
                    onClick={() => setSelectedLevel('advanced')}
                  >
                    Lanjutan
                  </Button>
                  <Button
                    variant={selectedLevel === 'expert' ? 'solid' : 'outline'}
                    colorScheme="orange"
                    onClick={() => setSelectedLevel('expert')}
                  >
                    Ahli
                  </Button>
                </HStack>

                {/* Courses Grid */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
                  {filteredTracks.map((track) => (
                    <Card key={track.id} bg={cardBg} borderColor={borderColor} _hover={{ shadow: 'lg' }}>
                      <Box position="relative">
                        <Image
                          src={track.image}
                          alt={track.title}
                          w="full"
                          h="200px"
                          objectFit="cover"
                          borderTopRadius="md"
                        />
                        {track.progress !== undefined && track.progress > 0 && (
                          <Box position="absolute" top="2" right="2">
                            <Badge colorScheme="green" fontSize="xs">
                              {track.progress === 100 ? 'Selesai' : `${track.progress}%`}
                            </Badge>
                          </Box>
                        )}
                      </Box>
                      
                      <CardBody>
                        <VStack align="start" spacing="4">
                          <VStack align="start" spacing="2">
                            <HStack justify="space-between" w="full">
                              <Badge colorScheme={getLevelColor(track.level)}>
                                {getLevelText(track.level)}
                              </Badge>
                              <Badge variant="outline">{track.category}</Badge>
                            </HStack>
                            
                            <Heading size="md">{track.title}</Heading>
                            <Text fontSize="sm" color="gray.600" noOfLines={2}>
                              {track.description}
                            </Text>
                          </VStack>

                          <SimpleGrid columns={2} spacing="4" w="full" fontSize="sm">
                            <HStack>
                              <Text color="gray.500">⏰</Text>
                              <Text>{track.duration}</Text>
                            </HStack>
                            <HStack>
                              <Text color="gray.500">📚</Text>
                              <Text>{track.modules} modul</Text>
                            </HStack>
                            <HStack>
                              <Text color="gray.500">👥</Text>
                              <Text>{track.participants} peserta</Text>
                            </HStack>
                            <HStack>
                              <Text color="yellow.500">⭐</Text>
                              <Text>{track.rating}</Text>
                            </HStack>
                          </SimpleGrid>

                          {track.progress !== undefined && (
                            <Box w="full">
                              <Progress 
                                value={track.progress} 
                                colorScheme="blue" 
                                size="sm" 
                                borderRadius="full"
                              />
                              <Text fontSize="xs" color="gray.500" mt="1">
                                Progress: {track.progress}%
                              </Text>
                            </Box>
                          )}

                          <Button
                            colorScheme="blue"
                            w="full"
                            leftIcon={track.progress === 0 ? <FiPlay /> : <FiBook />}
                          >
                            {track.progress === 0 ? 'Mulai Belajar' : 
                             track.progress === 100 ? 'Review' : 'Lanjutkan'}
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </TabPanel>

              {/* My Courses Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Kursus Saya</Heading>
                  
                  {/* Active Course Detail */}
                  <Card bg={cardBg} borderColor={borderColor}>
                    <CardBody>
                      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing="6">
                        <Box>
                          <Image
                            src="/api/placeholder/300/200"
                            alt="Campaign Creation Excellence"
                            borderRadius="md"
                            w="full"
                            h="150px"
                            objectFit="cover"
                          />
                        </Box>
                        
                        <VStack align="start" spacing="3">
                          <Badge colorScheme="blue">Menengah</Badge>
                          <Heading size="md">Campaign Creation Excellence</Heading>
                          <Text color="gray.600" fontSize="sm">
                            Progress: 3 dari 6 modul selesai
                          </Text>
                          <Progress value={75} colorScheme="blue" w="full" />
                          <Button colorScheme="blue" leftIcon={<FiPlay />}>
                            Lanjutkan Belajar
                          </Button>
                        </VStack>
                        
                        <VStack align="start" spacing="2">
                          <Text fontWeight="semibold" mb="2">Modul Progress:</Text>
                          {sampleModules.map((module) => (
                            <HStack key={module.id} w="full" justify="space-between">
                              <HStack>
                                <Icon 
                                  as={module.completed ? FiCheckCircle : getTypeIcon(module.type)} 
                                  color={module.completed ? 'green.500' : 'gray.400'}
                                />
                                <Text fontSize="sm" color={module.completed ? 'green.600' : 'gray.600'}>
                                  {module.title}
                                </Text>
                              </HStack>
                              <Text fontSize="xs" color="gray.500">{module.duration}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </SimpleGrid>
                    </CardBody>
                  </Card>
                </VStack>
              </TabPanel>

              {/* Certificates Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Sertifikat Saya</Heading>
                  <Text>
                    Sertifikat yang telah Anda raih akan ditampilkan di sini.
                    Selesaikan kursus untuk mendapatkan sertifikat digital.
                  </Text>
                  
                  {/* Sample Certificate */}
                  <Card bg={cardBg} borderColor={borderColor}>
                    <CardBody>
                      <HStack spacing="4">
                        <Text fontSize="40px" color="yellow.500">🏆</Text>
                        <VStack align="start">
                          <Heading size="md">Digital Storytelling</Heading>
                          <Text fontSize="sm" color="gray.600">
                            Diselesaikan pada 15 Juli 2024
                          </Text>
                          <Button size="sm" leftIcon={<FiDownload />}>
                            Unduh Sertifikat
                          </Button>
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                </VStack>
              </TabPanel>

              {/* Leaderboard Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Leaderboard</Heading>
                  <Text>
                    Lihat peserta dengan pencapaian terbaik di Akademi Penggerak Digital.
                  </Text>
                  
                  <Card bg={cardBg} borderColor={borderColor}>
                    <CardBody>
                      <VStack spacing="4">
                        {[1, 2, 3, 4, 5].map((rank) => (
                          <HStack key={rank} w="full" justify="space-between" p="2">
                            <HStack>
                              <Text fontWeight="bold" color="blue.600" minW="20px">
                                #{rank}
                              </Text>
                              <Avatar size="sm" name={`User ${rank}`} />
                              <VStack align="start" spacing="0">
                                <Text fontWeight="semibold">Peserta {rank}</Text>
                                <Text fontSize="sm" color="gray.500">
                                  {5 - rank + 1} kursus selesai
                                </Text>
                              </VStack>
                            </HStack>
                            <VStack align="end" spacing="0">
                              <Text fontWeight="bold">{1000 - rank * 100} poin</Text>
                              <HStack>
                                <Text color="yellow.500">⭐</Text>
                                <Text fontSize="sm">4.{9 - rank}</Text>
                              </HStack>
                            </VStack>
                          </HStack>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
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

export default AkademiPenggerakDigital;
