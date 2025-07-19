import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Link,
  Stack,
  Divider,
  ButtonGroup,
  IconButton,
  Input,
  Button,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

// Social media icons (placeholders)
const FacebookIcon = () => <span aria-hidden="true">f</span>;
const TwitterIcon = () => <span aria-hidden="true">t</span>;
const InstagramIcon = () => <span aria-hidden="true">i</span>;
const YoutubeIcon = () => <span aria-hidden="true">y</span>;

/**
 * Main footer component for the application
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      as="footer" 
      role="contentinfo" 
      bg="neutral.deepSpace" 
      color="white"
    >
      <Container maxW="container.xl" py="12">
        <Grid 
          templateColumns={{ 
            base: "1fr", 
            md: "2fr 1fr 1fr 1fr",
            lg: "2fr 1fr 1fr 1fr" 
          }}
          gap="8"
        >
          {/* Brand and about */}
          <GridItem>
            <Box mb="4">
              <Image 
                src="/logo-white.svg" 
                alt="Merajut ASA Logo" 
                width={180} 
                height={40} 
                priority
              />
            </Box>
            
            <Text mb="4" fontSize="sm">
              Merajut ASA connects communities across Indonesia to support 
              meaningful initiatives that create lasting positive impact.
            </Text>
            
            <ButtonGroup variant="ghost" spacing="4" mb="4">
              <IconButton
                aria-label="Facebook"
                icon={<FacebookIcon />}
                color="white"
                _hover={{ bg: 'whiteAlpha.300' }}
              />
              <IconButton
                aria-label="Twitter"
                icon={<TwitterIcon />}
                color="white"
                _hover={{ bg: 'whiteAlpha.300' }}
              />
              <IconButton
                aria-label="Instagram"
                icon={<InstagramIcon />}
                color="white"
                _hover={{ bg: 'whiteAlpha.300' }}
              />
              <IconButton
                aria-label="YouTube"
                icon={<YoutubeIcon />}
                color="white"
                _hover={{ bg: 'whiteAlpha.300' }}
              />
            </ButtonGroup>
          </GridItem>
          
          {/* Quick links */}
          <GridItem>
            <Heading as="h3" size="sm" mb="4" color="white">
              Quick Links
            </Heading>
            <Stack spacing="2">
              <Link href="/" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                Home
              </Link>
              <Link href="/explore" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                Explore Campaigns
              </Link>
              <Link href="/katalisator" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                Katalisator Jabar
              </Link>
              <Link href="/akademi" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                Akademi Digital
              </Link>
              <Link href="/start-campaign" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                Start a Campaign
              </Link>
              <Link href="/about" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                About Us
              </Link>
            </Stack>
          </GridItem>
          
          {/* Categories */}
          <GridItem>
            <Heading as="h3" size="sm" mb="4" color="white">
              Program Strategis
            </Heading>
            <Stack spacing="2">
              <Link href="/katalisator" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                Katalisator Perubahan Jabar
              </Link>
              <Link href="/akademi" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                Akademi Penggerak Digital
              </Link>
              <Link href="/mentorship" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                Program Mentorship
              </Link>
              <Link href="/suara-komunitas" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                Suara Komunitas
              </Link>
              <Link href="/impact" color="whiteAlpha.800" _hover={{ color: 'white' }}>
                Impact Measurement
              </Link>
            </Stack>
          </GridItem>
          
          {/* Newsletter */}
          <GridItem>
            <Heading as="h3" size="sm" mb="4" color="white">
              Stay Updated
            </Heading>
            <Text fontSize="sm" mb="4">
              Subscribe to our newsletter for the latest campaigns and impact stories.
            </Text>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to newsletter!') }}>
              <Flex>
                <Input 
                  placeholder="Email address" 
                  bg="whiteAlpha.200"
                  border="none"
                  mr="2"
                  _placeholder={{ color: 'whiteAlpha.600' }}
                  aria-label="Email address for newsletter"
                />
                <Button 
                  type="submit" 
                  colorScheme="blue" 
                  aria-label="Subscribe to newsletter"
                >
                  Join
                </Button>
              </Flex>
            </form>
          </GridItem>
        </Grid>
        
        <Divider my="8" borderColor="whiteAlpha.300" />
        
        {/* Bottom footer */}
        <Flex 
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          fontSize="sm"
        >
          <Text color="whiteAlpha.800">
            &copy; {currentYear} Merajut ASA. All rights reserved.
          </Text>
          
          <Stack 
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "2", md: "8" }}
            mt={{ base: "4", md: "0" }}
          >
            <Link href="/terms" color="whiteAlpha.800" _hover={{ color: 'white' }}>
              Terms of Service
            </Link>
            <Link href="/privacy" color="whiteAlpha.800" _hover={{ color: 'white' }}>
              Privacy Policy
            </Link>
            <Link href="/cookies" color="whiteAlpha.800" _hover={{ color: 'white' }}>
              Cookie Policy
            </Link>
            <Link href="/accessibility" color="whiteAlpha.800" _hover={{ color: 'white' }}>
              Accessibility
            </Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
