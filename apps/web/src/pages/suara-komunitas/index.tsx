import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  FormHelperText,
  Card,
  CardBody,
  Badge,
  Icon,
  Flex,
  useToast,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
// Simple icon placeholders from react-icons/fi
const FiMessageCircle = () => <span>💬</span>;
const FiTrendingUp = () => <span>📈</span>;
const FiUsers = () => <span>👥</span>;
const FiCheckCircle = () => <span>✅</span>;
const FiClock = () => <span>⏰</span>;
const FiStar = () => <span>⭐</span>;
import Head from 'next/head';

interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  category: 'feature' | 'bug' | 'improvement' | 'general';
  priority: 'low' | 'medium' | 'high';
  status: 'submitted' | 'reviewing' | 'in-progress' | 'completed' | 'rejected';
  votes: number;
  author: string;
  createdAt: string;
  responses?: number;
}

// Mock data
const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    title: 'Fitur notifikasi untuk update kampanye',
    description: 'Saya ingin mendapat notifikasi ketika ada update dari kampanye yang saya dukung',
    category: 'feature',
    priority: 'medium',
    status: 'in-progress',
    votes: 42,
    author: 'Andi Pratama',
    createdAt: '2024-07-15',
    responses: 8,
  },
  {
    id: '2',
    title: 'Perbaikan tampilan mobile untuk dashboard',
    description: 'Dashboard terlihat terpotong di layar HP kecil',
    category: 'bug',
    priority: 'high',
    status: 'reviewing',
    votes: 28,
    author: 'Sari Wulandari',
    createdAt: '2024-07-14',
    responses: 5,
  },
  {
    id: '3',
    title: 'Filter pencarian berdasarkan lokasi',
    description: 'Perlu filter untuk mencari kampanye berdasarkan daerah Jawa Barat',
    category: 'improvement',
    priority: 'medium',
    status: 'completed',
    votes: 35,
    author: 'Budi Santoso',
    createdAt: '2024-07-12',
    responses: 12,
  },
];

const SuaraKomunitas: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [newFeedback, setNewFeedback] = useState({
    title: '',
    description: '',
    category: 'general' as const,
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleSubmitFeedback = () => {
    // Simulate API call
    toast({
      title: 'Feedback berhasil dikirim!',
      description: 'Terima kasih atas masukan Anda. Tim kami akan meninjau segera.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    setNewFeedback({ title: '', description: '', category: 'general' });
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'gray';
      case 'reviewing': return 'yellow';
      case 'in-progress': return 'blue';
      case 'completed': return 'green';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted': return 'Terkirim';
      case 'reviewing': return 'Ditinjau';
      case 'in-progress': return 'Dikerjakan';
      case 'completed': return 'Selesai';
      case 'rejected': return 'Ditolak';
      default: return 'Unknown';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'feature': return 'Fitur Baru';
      case 'bug': return 'Bug Report';
      case 'improvement': return 'Perbaikan';
      case 'general': return 'Umum';
      default: return category;
    }
  };

  const filteredFeedback = mockFeedback.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const stats = {
    totalFeedback: mockFeedback.length,
    inProgress: mockFeedback.filter(f => f.status === 'in-progress').length,
    completed: mockFeedback.filter(f => f.status === 'completed').length,
    avgVotes: Math.round(mockFeedback.reduce((acc, f) => acc + f.votes, 0) / mockFeedback.length),
  };

  return (
    <>
      <Head>
        <title>Suara Komunitas - Merajut ASA</title>
        <meta name="description" content="Platform feedback dan masukan dari komunitas untuk pengembangan Merajut ASA" />
      </Head>

      <Box as="main" minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl" py="8">
          {/* Header */}
          <VStack spacing="6" align="stretch" mb="8">
            <Box textAlign="center">
              <Heading as="h1" size="2xl" color="blue.600" mb="4">
                Suara Komunitas
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
                Platform untuk berbagi feedback, saran, dan ide pengembangan. 
                Suara Anda membantu kami membangun platform yang lebih baik untuk semua.
              </Text>
            </Box>

            {/* Statistics */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing="4">
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Total Feedback</StatLabel>
                    <StatNumber color="blue.600">{stats.totalFeedback}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Sedang Dikerjakan</StatLabel>
                    <StatNumber color="blue.500">{stats.inProgress}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Selesai</StatLabel>
                    <StatNumber color="green.600">{stats.completed}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} borderColor={borderColor}>
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Rata-rata Dukungan</StatLabel>
                    <StatNumber color="purple.600">{stats.avgVotes}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>

          <Tabs variant="enclosed" colorScheme="blue">
            <Flex justify="space-between" align="center" mb="6">
              <TabList>
                <Tab>Semua Feedback</Tab>
                <Tab>Trending</Tab>
                <Tab>Saya Berikan</Tab>
              </TabList>
              
              <Button 
                colorScheme="blue" 
                leftIcon={<Icon as={FiMessageCircle} />}
                onClick={onOpen}
              >
                Berikan Feedback
              </Button>
            </Flex>

            <TabPanels>
              <TabPanel px="0">
                {/* Filters */}
                <HStack spacing="4" mb="6">
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    maxW="200px"
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="feature">Fitur Baru</option>
                    <option value="bug">Bug Report</option>
                    <option value="improvement">Perbaikan</option>
                    <option value="general">Umum</option>
                  </Select>
                  
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    maxW="200px"
                  >
                    <option value="all">Semua Status</option>
                    <option value="submitted">Terkirim</option>
                    <option value="reviewing">Ditinjau</option>
                    <option value="in-progress">Dikerjakan</option>
                    <option value="completed">Selesai</option>
                  </Select>
                </HStack>

                {/* Feedback List */}
                <VStack spacing="4" align="stretch">
                  {filteredFeedback.map((item) => (
                    <Card key={item.id} bg={cardBg} borderColor={borderColor} _hover={{ shadow: 'md' }}>
                      <CardBody>
                        <Flex justify="space-between" align="start">
                          <VStack align="start" spacing="3" flex="1">
                            <Flex align="center" gap="3">
                              <Heading size="md">{item.title}</Heading>
                              <Badge colorScheme="blue">{getCategoryText(item.category)}</Badge>
                              <Badge colorScheme={getStatusColor(item.status)}>
                                {getStatusText(item.status)}
                              </Badge>
                            </Flex>
                            
                            <Text color="gray.600">{item.description}</Text>
                            
                            <HStack spacing="4" fontSize="sm" color="gray.500">
                              <HStack>
                                <Icon as={FiUsers} />
                                <Text>{item.author}</Text>
                              </HStack>
                              <HStack>
                                <Icon as={FiClock} />
                                <Text>{new Date(item.createdAt).toLocaleDateString('id-ID')}</Text>
                              </HStack>
                              {item.responses && (
                                <HStack>
                                  <Icon as={FiMessageCircle} />
                                  <Text>{item.responses} respons</Text>
                                </HStack>
                              )}
                            </HStack>
                          </VStack>
                          
                          <VStack spacing="2" minW="80px" align="center">
                            <Button
                              variant="outline"
                              size="sm"
                              leftIcon={<Icon as={FiTrendingUp} />}
                              colorScheme="blue"
                            >
                              {item.votes}
                            </Button>
                            <Text fontSize="xs" color="gray.500">dukungan</Text>
                          </VStack>
                        </Flex>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </TabPanel>

              <TabPanel px="0">
                <Text>Feedback trending berdasarkan jumlah dukungan dan aktivitas terbaru.</Text>
              </TabPanel>

              <TabPanel px="0">
                <Text>Feedback yang Anda berikan dan statusnya.</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>

      {/* Submit Feedback Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Berikan Feedback</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            <VStack spacing="4">
              <FormControl isRequired>
                <FormLabel>Judul</FormLabel>
                <Input
                  value={newFeedback.title}
                  onChange={(e) => setNewFeedback({ ...newFeedback, title: e.target.value })}
                  placeholder="Ringkas feedback Anda dalam satu kalimat"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Kategori</FormLabel>
                <Select
                  value={newFeedback.category}
                  onChange={(e) => setNewFeedback({ ...newFeedback, category: e.target.value as any })}
                >
                  <option value="feature">Fitur Baru</option>
                  <option value="bug">Bug Report</option>
                  <option value="improvement">Perbaikan</option>
                  <option value="general">Umum</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Deskripsi</FormLabel>
                <Textarea
                  value={newFeedback.description}
                  onChange={(e) => setNewFeedback({ ...newFeedback, description: e.target.value })}
                  placeholder="Jelaskan detail feedback, saran, atau masalah yang Anda alami"
                  rows={4}
                />
                <FormHelperText>
                  Berikan detail yang cukup agar tim kami dapat memahami dan menindaklanjuti feedback Anda.
                </FormHelperText>
              </FormControl>

              <Flex justify="space-between" w="full" pt="4">
                <Button variant="ghost" onClick={onClose}>
                  Batal
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={handleSubmitFeedback}
                  isDisabled={!newFeedback.title || !newFeedback.description}
                >
                  Kirim Feedback
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuaraKomunitas;
