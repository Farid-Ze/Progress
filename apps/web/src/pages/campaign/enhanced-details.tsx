import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Progress,
  Image,
  Badge,
  Divider,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  useToast,
  Flex,
  Icon,
  Avatar,
  Tag,
  TagLabel
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  imageUrl: string;
  category: string;
  location: string;
  endDate: string;
  organizerId: string;
  organizerName: string;
  organizerAvatar: string;
  supporters: number;
  updates: CampaignUpdate[];
  comments: Comment[];
}

interface CampaignUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  date: string;
  amount?: number;
}

const EnhancedCampaignDetails: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const toast = useToast();
  const { isOpen: isDonateOpen, onOpen: onDonateOpen, onClose: onDonateClose } = useDisclosure();
  const { isOpen: isShareOpen, onOpen: onShareOpen, onClose: onShareClose } = useDisclosure();
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchCampaignDetails();
    }
  }, [slug]);

  const fetchCampaignDetails = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCampaign({
          id: '1',
          title: 'Membangun Perpustakaan Digital untuk Anak Desa',
          description: 'Kampanye untuk membangun perpustakaan digital modern yang akan membantu anak-anak desa mengakses pendidikan berkualitas melalui teknologi.',
          goal: 50000000,
          raised: 32500000,
          imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          category: 'Pendidikan',
          location: 'Desa Sukamaju, Jawa Barat',
          endDate: '2024-06-30',
          organizerId: 'org1',
          organizerName: 'Yayasan Pendidikan Nusantara',
          organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
          supporters: 245,
          updates: [
            {
              id: '1',
              title: 'Progres Pembangunan Minggu Ke-2',
              content: 'Alhamdulillah, konstruksi ruang perpustakaan telah mencapai 60%. Tim konstruksi bekerja dengan sangat baik.',
              date: '2024-03-15',
              imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
            }
          ],
          comments: [
            {
              id: '1',
              authorName: 'Ahmad Rizki',
              authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
              content: 'Semangat untuk proyeknya! Semoga bermanfaat untuk anak-anak desa.',
              date: '2024-03-14',
              amount: 500000
            }
          ]
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching campaign:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat detail kampanye',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    if (!donationAmount || donationAmount <= 0) {
      toast({
        title: 'Error',
        description: 'Masukkan jumlah donasi yang valid',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Simulate donation process
      toast({
        title: 'Donasi Berhasil!',
        description: `Terima kasih atas donasi Rp ${donationAmount.toLocaleString('id-ID')}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      onDonateClose();
      // Refresh campaign data
      fetchCampaignDetails();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal memproses donasi',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Container maxW="6xl" py={8}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (!campaign) {
    return (
      <Container maxW="6xl" py={8}>
        <Text>Kampanye tidak ditemukan</Text>
      </Container>
    );
  }

  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <Container maxW="6xl" py={8}>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
        <Box gridColumn={{ lg: "span 2" }}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Image
                src={campaign.imageUrl}
                alt={campaign.title}
                w="full"
                h="400px"
                objectFit="cover"
                borderRadius="lg"
              />
            </Box>

            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Badge colorScheme="blue" fontSize="sm">
                  {campaign.category}
                </Badge>
                <HStack>
                  <Button variant="outline" size="sm">
                    Favorit
                  </Button>
                  <Button variant="outline" size="sm" onClick={onShareOpen}>
                    Bagikan
                  </Button>
                </HStack>
              </HStack>

              <Heading size="xl">{campaign.title}</Heading>
              
              <HStack spacing={4} color="gray.600">
                <HStack>
                  <Text fontSize="sm">{campaign.location}</Text>
                </HStack>
                <HStack>
                  <Text fontSize="sm">Berakhir: {new Date(campaign.endDate).toLocaleDateString('id-ID')}</Text>
                </HStack>
              </HStack>

              <Text fontSize="lg" color="gray.700">
                {campaign.description}
              </Text>
            </VStack>

            <Tabs>
              <TabList>
                <Tab>Cerita</Tab>
                <Tab>Update ({campaign.updates.length})</Tab>
                <Tab>Komentar ({campaign.comments.length})</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Text>
                    Ini adalah cerita lengkap tentang kampanye pembangunan perpustakaan digital. 
                    Kami membutuhkan dukungan dari semua pihak untuk mewujudkan mimpi anak-anak desa 
                    mendapatkan akses pendidikan yang berkualitas.
                  </Text>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    {campaign.updates.map((update) => (
                      <Card key={update.id}>
                        <CardBody>
                          <VStack spacing={3} align="stretch">
                            <HStack justify="space-between">
                              <Heading size="md">{update.title}</Heading>
                              <Text fontSize="sm" color="gray.500">
                                {new Date(update.date).toLocaleDateString('id-ID')}
                              </Text>
                            </HStack>
                            <Text>{update.content}</Text>
                            {update.imageUrl && (
                              <Image src={update.imageUrl} alt="Update" borderRadius="md" />
                            )}
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    {campaign.comments.map((comment) => (
                      <Card key={comment.id}>
                        <CardBody>
                          <HStack spacing={3} align="start">
                            <Avatar src={comment.authorAvatar} name={comment.authorName} size="sm" />
                            <VStack spacing={2} align="stretch" flex={1}>
                              <HStack justify="space-between">
                                <Text fontWeight="bold">{comment.authorName}</Text>
                                <HStack>
                                  {comment.amount && (
                                    <Tag colorScheme="green" size="sm">
                                      <TagLabel>Rp {comment.amount.toLocaleString('id-ID')}</TagLabel>
                                    </Tag>
                                  )}
                                  <Text fontSize="sm" color="gray.500">
                                    {new Date(comment.date).toLocaleDateString('id-ID')}
                                  </Text>
                                </HStack>
                              </HStack>
                              <Text>{comment.content}</Text>
                            </VStack>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Box>

        <Box>
          <Card position="sticky" top="20px">
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color="green.500">
                    Rp {campaign.raised.toLocaleString('id-ID')}
                  </Text>
                  <Text color="gray.600">
                    dari target Rp {campaign.goal.toLocaleString('id-ID')}
                  </Text>
                  <Progress value={progressPercentage} colorScheme="green" size="lg" mt={2} />
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    {progressPercentage.toFixed(1)}% tercapai
                  </Text>
                </Box>

                <Divider />

                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <HStack>
                      <Text fontWeight="bold">{campaign.supporters}</Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">Pendukung</Text>
                  </HStack>

                  <HStack justify="space-between">
                    <HStack>
                      <Text fontWeight="bold">
                        {Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">Hari tersisa</Text>
                  </HStack>
                </VStack>

                <Divider />

                <VStack spacing={3} align="stretch">
                  <HStack>
                    <Avatar src={campaign.organizerAvatar} name={campaign.organizerName} size="sm" />
                    <VStack spacing={0} align="start" flex={1}>
                      <Text fontSize="sm" fontWeight="bold">{campaign.organizerName}</Text>
                      <Text fontSize="xs" color="gray.500">Penyelenggara</Text>
                    </VStack>
                  </HStack>
                </VStack>

                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={onDonateOpen}
                >
                  Donasi Sekarang
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>

      {/* Donation Modal */}
      <Modal isOpen={isDonateOpen} onClose={onDonateClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Donasi untuk {campaign.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Jumlah Donasi (Rp)</FormLabel>
                <NumberInput
                  value={donationAmount}
                  onChange={(_, value) => setDonationAmount(value)}
                  min={10000}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Nama Anda</FormLabel>
                <Input
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Masukkan nama (opsional)"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Pesan Dukungan</FormLabel>
                <Textarea
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder="Tulis pesan dukungan (opsional)"
                  rows={3}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDonateClose}>
              Batal
            </Button>
            <Button colorScheme="green" onClick={handleDonate}>
              Donasi Rp {donationAmount.toLocaleString('id-ID')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Share Modal */}
      <Modal isOpen={isShareOpen} onClose={onShareClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bagikan Kampanye</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Bagikan kampanye ini untuk mendukung pencapaian target donasi.</Text>
            {/* Add social sharing buttons here */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onShareClose}>Tutup</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default EnhancedCampaignDetails;
