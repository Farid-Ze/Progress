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
  Avatar,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
// Simple icon placeholders from react-icons/fi
const FiUser = () => <span>👤</span>;
const FiUsers = () => <span>👥</span>;
const FiStar = () => <span>⭐</span>;
const FiMessageCircle = () => <span>💬</span>;
const FiCalendar = () => <span>📅</span>;
const FiBookOpen = () => <span>📖</span>;
const FiTrendingUp = () => <span>📈</span>;
const FiAward = () => <span>🏆</span>;
const FiClock = () => <span>⏰</span>;
const FiTarget = () => <span>🎯</span>;
const FiHeart = () => <span>❤️</span>;
import Head from 'next/head';

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  experience: string;
  rating: number;
  totalMentees: number;
  availability: 'available' | 'busy' | 'full';
  bio: string;
  achievements: string[];
}

interface MentorshipSession {
  id: string;
  mentorName: string;
  mentorAvatar: string;
  topic: string;
  date: string;
  duration: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: '1:1' | 'group' | 'workshop';
}

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Sari Wulandari',
    avatar: '/api/placeholder/100/100',
    expertise: ['Campaign Strategy', 'Digital Marketing', 'Community Building'],
    experience: '8 tahun pengalaman NGO',
    rating: 4.9,
    totalMentees: 45,
    availability: 'available',
    bio: 'Praktisi berpengalaman dalam penggalangan dana digital dan pembangunan komunitas.',
    achievements: ['Best Mentor 2023', '1000+ mentees helped', 'Campaign Expert'],
  },
  {
    id: '2',
    name: 'Ahmad Pratama',
    avatar: '/api/placeholder/100/100',
    expertise: ['Financial Management', 'Legal Compliance', 'Transparency'],
    experience: '10 tahun pengalaman keuangan',
    rating: 4.8,
    totalMentees: 32,
    availability: 'busy',
    bio: 'Ahli manajemen keuangan transparaan untuk organisasi sosial.',
    achievements: ['Finance Expert', 'Compliance Specialist', 'Top Rated Mentor'],
  },
  {
    id: '3',
    name: 'Maya Kusuma',
    avatar: '/api/placeholder/100/100',
    expertise: ['Digital Storytelling', 'Content Creation', 'Social Media'],
    experience: '6 tahun pengalaman kreatif',
    rating: 5.0,
    totalMentees: 28,
    availability: 'available',
    bio: 'Creator konten digital dengan spesialisasi storytelling untuk causa sosial.',
    achievements: ['Creative Excellence', 'Top Content Creator', 'Storytelling Master'],
  },
  {
    id: '4',
    name: 'Budi Santoso',
    avatar: '/api/placeholder/100/100',
    expertise: ['Technology', 'Platform Usage', 'Digital Security'],
    experience: '12 tahun pengalaman IT',
    rating: 4.7,
    totalMentees: 38,
    availability: 'full',
    bio: 'Technical expert membantu komunitas memanfaatkan teknologi secara optimal.',
    achievements: ['Tech Innovator', 'Security Expert', 'Platform Specialist'],
  },
];

const upcomingSessions: MentorshipSession[] = [
  {
    id: '1',
    mentorName: 'Dr. Sari Wulandari',
    mentorAvatar: '/api/placeholder/100/100',
    topic: 'Strategi Kampanye Digital',
    date: '2024-07-22 14:00',
    duration: '60 menit',
    status: 'upcoming',
    type: '1:1',
  },
  {
    id: '2',
    mentorName: 'Maya Kusuma',
    mentorAvatar: '/api/placeholder/100/100',
    topic: 'Workshop: Content Creation',
    date: '2024-07-24 10:00',
    duration: '90 menit',
    status: 'upcoming',
    type: 'workshop',
  },
];

const MentorshipProgram: React.FC = () => {
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');
  const [mentorshipRequest, setMentorshipRequest] = useState({
    mentorId: '',
    topic: '',
    goals: '',
    experience: 'beginner',
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleRequestMentorship = () => {
    toast({
      title: 'Permintaan mentoring berhasil dikirim!',
      description: 'Mentor akan menghubungi Anda dalam 1-2 hari kerja.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    setMentorshipRequest({
      mentorId: '',
      topic: '',
      goals: '',
      experience: 'beginner',
    });
    onClose();
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'green';
      case 'busy': return 'yellow';
      case 'full': return 'red';
      default: return 'gray';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Tersedia';
      case 'busy': return 'Sibuk';
      case 'full': return 'Penuh';
      default: return 'Unknown';
    }
  };

  const filteredMentors = mentors.filter(mentor => {
    if (selectedExpertise === 'all') return true;
    return mentor.expertise.some(exp => 
      exp.toLowerCase().includes(selectedExpertise.toLowerCase())
    );
  });

  const stats = {
    totalMentors: mentors.length,
    activeMentees: 143,
    sessionsCompleted: 567,
    avgRating: mentors.reduce((acc, mentor) => acc + mentor.rating, 0) / mentors.length,
  };

  return (
    <>
      <Head>
        <title>Program Mentorship - Merajut ASA</title>
        <meta name="description" content="Program mentorship untuk pengembangan kemampuan dan kepemimpinan komunitas" />
      </Head>

      <Box as="main" minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl" py="8">
          {/* Header */}
          <VStack spacing="6" align="stretch" mb="8">
            <Box textAlign="center">
              <Heading as="h1" size="2xl" color="blue.600" mb="4">
                Program Mentorship
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
                Bergabunglah dengan program mentorship untuk mengembangkan kemampuan, 
                berbagi pengetahuan, dan membangun jaringan komunitas yang kuat.
              </Text>
            </Box>

            {/* Statistics */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing="4">
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Total Mentor</StatLabel>
                    <StatNumber color="blue.600">{stats.totalMentors}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Mentee Aktif</StatLabel>
                    <StatNumber color="green.600">{stats.activeMentees}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Sesi Selesai</StatLabel>
                    <StatNumber color="purple.600">{stats.sessionsCompleted}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Rating Rata-rata</StatLabel>
                    <StatNumber color="yellow.600">{stats.avgRating.toFixed(1)}</StatNumber>
                    <StatHelpText>⭐ dari mentee</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>

          <Tabs variant="enclosed" colorScheme="blue">
            <Flex justify="space-between" align="center" mb="6">
              <TabList>
                <Tab>Temukan Mentor</Tab>
                <Tab>Sesi Saya</Tab>
                <Tab>Jadi Mentor</Tab>
                <Tab>Progress</Tab>
              </TabList>
              
              <Button 
                colorScheme="blue" 
                leftIcon={<FiUsers />}
                onClick={onOpen}
              >
                Request Mentorship
              </Button>
            </Flex>

            <TabPanels>
              {/* Find Mentors Tab */}
              <TabPanel px="0">
                {/* Filters */}
                <HStack spacing="4" mb="6">
                  <Button
                    variant={selectedExpertise === 'all' ? 'solid' : 'outline'}
                    colorScheme="blue"
                    onClick={() => setSelectedExpertise('all')}
                  >
                    Semua Expertise
                  </Button>
                  <Button
                    variant={selectedExpertise === 'campaign' ? 'solid' : 'outline'}
                    onClick={() => setSelectedExpertise('campaign')}
                  >
                    Campaign
                  </Button>
                  <Button
                    variant={selectedExpertise === 'financial' ? 'solid' : 'outline'}
                    onClick={() => setSelectedExpertise('financial')}
                  >
                    Financial
                  </Button>
                  <Button
                    variant={selectedExpertise === 'content' ? 'solid' : 'outline'}
                    onClick={() => setSelectedExpertise('content')}
                  >
                    Content
                  </Button>
                  <Button
                    variant={selectedExpertise === 'technology' ? 'solid' : 'outline'}
                    onClick={() => setSelectedExpertise('technology')}
                  >
                    Technology
                  </Button>
                </HStack>

                {/* Mentors Grid */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
                  {filteredMentors.map((mentor) => (
                    <Card key={mentor.id} bg={cardBg} borderColor={borderColor} _hover={{ shadow: 'lg' }}>
                      <CardBody>
                        <VStack spacing="4">
                          <VStack spacing="2">
                            <Avatar size="xl" src={mentor.avatar} name={mentor.name} />
                            <Heading size="md" textAlign="center">{mentor.name}</Heading>
                            <Badge colorScheme={getAvailabilityColor(mentor.availability)}>
                              {getAvailabilityText(mentor.availability)}
                            </Badge>
                          </VStack>

                          <Text fontSize="sm" color="gray.600" textAlign="center" noOfLines={2}>
                            {mentor.bio}
                          </Text>

                          <VStack spacing="2" w="full">
                            <HStack justify="space-between" w="full">
                              <HStack>
                                <Text color="yellow.500">⭐</Text>
                                <Text fontWeight="semibold">{mentor.rating}</Text>
                              </HStack>
                              <HStack>
                                <Text color="blue.500">👥</Text>
                                <Text fontSize="sm">{mentor.totalMentees} mentees</Text>
                              </HStack>
                            </HStack>

                            <Text fontSize="sm" color="gray.600" textAlign="center">
                              {mentor.experience}
                            </Text>
                          </VStack>

                          <VStack spacing="2" w="full">
                            <Text fontSize="sm" fontWeight="semibold">Expertise:</Text>
                            <Flex wrap="wrap" gap="1" justify="center">
                              {mentor.expertise.map((exp, index) => (
                                <Badge key={index} variant="outline" colorScheme="blue" fontSize="xs">
                                  {exp}
                                </Badge>
                              ))}
                            </Flex>
                          </VStack>

                          <VStack spacing="2" w="full">
                            <Text fontSize="sm" fontWeight="semibold">Achievements:</Text>
                            <VStack spacing="1">
                              {mentor.achievements.slice(0, 2).map((achievement, index) => (
                                <HStack key={index}>
                                  <Text color="yellow.500" fontSize="12px">🏆</Text>
                                  <Text fontSize="xs" color="gray.600">{achievement}</Text>
                                </HStack>
                              ))}
                            </VStack>
                          </VStack>

                          <Button
                            colorScheme="blue"
                            w="full"
                            isDisabled={mentor.availability === 'full'}
                            leftIcon={<FiMessageCircle />}
                            onClick={() => {
                              setMentorshipRequest({ ...mentorshipRequest, mentorId: mentor.id });
                              onOpen();
                            }}
                          >
                            {mentor.availability === 'full' ? 'Tidak Tersedia' : 'Request Mentorship'}
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </TabPanel>

              {/* My Sessions Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Sesi Mentorship Saya</Heading>
                  
                  {/* Upcoming Sessions */}
                  <Box>
                    <Heading size="md" mb="4" color="blue.600">Sesi Mendatang</Heading>
                    <VStack spacing="4">
                      {upcomingSessions.map((session) => (
                        <Card key={session.id} bg={cardBg} borderColor={borderColor} w="full">
                          <CardBody>
                            <HStack justify="space-between" align="start">
                              <HStack spacing="4">
                                <Avatar src={session.mentorAvatar} name={session.mentorName} />
                                <VStack align="start" spacing="1">
                                  <Heading size="sm">{session.topic}</Heading>
                                  <Text fontSize="sm" color="gray.600">
                                    dengan {session.mentorName}
                                  </Text>
                                  <HStack fontSize="sm" color="gray.500">
                                    <FiCalendar />
                                    <Text>{new Date(session.date).toLocaleString('id-ID')}</Text>
                                    <FiClock />
                                    <Text>{session.duration}</Text>
                                  </HStack>
                                </VStack>
                              </HStack>
                              
                              <VStack align="end" spacing="2">
                                <Badge colorScheme="green">{session.type}</Badge>
                                <Button size="sm" colorScheme="blue">
                                  Join Session
                                </Button>
                              </VStack>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </Box>
                  
                  {/* Session History */}
                  <Box>
                    <Heading size="md" mb="4" color="gray.600">Riwayat Sesi</Heading>
                    <Text color="gray.500">Riwayat sesi mentorship akan ditampilkan di sini.</Text>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Become Mentor Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch" maxW="2xl">
                  <Heading size="lg">Bergabung Sebagai Mentor</Heading>
                  <Text>
                    Bagikan pengalaman dan pengetahuan Anda untuk membantu komunitas berkembang. 
                    Sebagai mentor, Anda berkontribusi dalam membangun ekosistem gotong royong digital.
                  </Text>
                  
                  <Card bg={cardBg} borderColor={borderColor}>
                    <CardBody>
                      <VStack spacing="4" align="start">
                        <Heading size="md">Kriteria Mentor</Heading>
                        <VStack align="start" spacing="2">
                          <HStack>
                            <Text color="green.500">🎯</Text>
                            <Text fontSize="sm">Minimal 2 tahun pengalaman di bidang terkait</Text>
                          </HStack>
                          <HStack>
                            <Text color="green.500">❤️</Text>
                            <Text fontSize="sm">Komitmen untuk membantu komunitas</Text>
                          </HStack>
                          <HStack>
                            <Text color="green.500">📖</Text>
                            <Text fontSize="sm">Kesediaan berbagi pengetahuan secara konsisten</Text>
                          </HStack>
                          <HStack>
                            <Text color="green.500">⏰</Text>
                            <Text fontSize="sm">Waktu minimal 2 jam per minggu untuk mentoring</Text>
                          </HStack>
                        </VStack>
                        
                        <Button colorScheme="blue" w="full" mt="4">
                          Daftar Sebagai Mentor
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </TabPanel>

              {/* Progress Tab */}
              <TabPanel px="0">
                <VStack spacing="6" align="stretch">
                  <Heading size="lg">Progress Mentorship</Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
                    {/* Learning Progress */}
                    <Card bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <VStack spacing="4" align="start">
                          <Heading size="md">Progress Pembelajaran</Heading>
                          <VStack spacing="3" w="full">
                            <HStack justify="space-between" w="full">
                              <Text fontSize="sm">Campaign Strategy</Text>
                              <Text fontSize="sm" fontWeight="semibold">75%</Text>
                            </HStack>
                            <Progress value={75} colorScheme="blue" w="full" />
                          </VStack>
                          
                          <VStack spacing="3" w="full">
                            <HStack justify="space-between" w="full">
                              <Text fontSize="sm">Digital Marketing</Text>
                              <Text fontSize="sm" fontWeight="semibold">60%</Text>
                            </HStack>
                            <Progress value={60} colorScheme="green" w="full" />
                          </VStack>
                          
                          <VStack spacing="3" w="full">
                            <HStack justify="space-between" w="full">
                              <Text fontSize="sm">Content Creation</Text>
                              <Text fontSize="sm" fontWeight="semibold">90%</Text>
                            </HStack>
                            <Progress value={90} colorScheme="purple" w="full" />
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* Goals & Achievements */}
                    <Card bg={cardBg} borderColor={borderColor}>
                      <CardBody>
                        <VStack spacing="4" align="start">
                          <Heading size="md">Goals & Achievements</Heading>
                          <VStack align="start" spacing="2">
                            <HStack>
                              <Text color="yellow.500">🏆</Text>
                              <Text fontSize="sm">First Campaign Completed</Text>
                            </HStack>
                            <HStack>
                              <Text color="blue.500">👥</Text>
                              <Text fontSize="sm">5 Mentorship Sessions</Text>
                            </HStack>
                            <HStack>
                              <Text color="green.500">📈</Text>
                              <Text fontSize="sm">Campaign Performance +150%</Text>
                            </HStack>
                          </VStack>
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

      {/* Request Mentorship Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Mentorship</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            <VStack spacing="4">
              <FormControl isRequired>
                <FormLabel>Pilih Mentor</FormLabel>
                <Select
                  value={mentorshipRequest.mentorId}
                  onChange={(e) => setMentorshipRequest({ ...mentorshipRequest, mentorId: e.target.value })}
                  placeholder="Pilih mentor"
                >
                  {mentors.filter(m => m.availability !== 'full').map((mentor) => (
                    <option key={mentor.id} value={mentor.id}>
                      {mentor.name} - {mentor.expertise.join(', ')}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Topik/Bidang</FormLabel>
                <Select
                  value={mentorshipRequest.topic}
                  onChange={(e) => setMentorshipRequest({ ...mentorshipRequest, topic: e.target.value })}
                  placeholder="Pilih topik"
                >
                  <option value="campaign-strategy">Campaign Strategy</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="financial-management">Financial Management</option>
                  <option value="content-creation">Content Creation</option>
                  <option value="community-building">Community Building</option>
                  <option value="platform-usage">Platform Usage</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Level Pengalaman</FormLabel>
                <Select
                  value={mentorshipRequest.experience}
                  onChange={(e) => setMentorshipRequest({ ...mentorshipRequest, experience: e.target.value })}
                >
                  <option value="beginner">Pemula</option>
                  <option value="intermediate">Menengah</option>
                  <option value="advanced">Lanjutan</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Goals & Objectives</FormLabel>
                <Textarea
                  value={mentorshipRequest.goals}
                  onChange={(e) => setMentorshipRequest({ ...mentorshipRequest, goals: e.target.value })}
                  placeholder="Jelaskan tujuan dan yang ingin Anda capai dari sesi mentorship"
                  rows={4}
                />
              </FormControl>

              <Flex justify="space-between" w="full" pt="4">
                <Button variant="ghost" onClick={onClose}>
                  Batal
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={handleRequestMentorship}
                  isDisabled={!mentorshipRequest.mentorId || !mentorshipRequest.topic || !mentorshipRequest.goals}
                >
                  Kirim Request
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MentorshipProgram;
