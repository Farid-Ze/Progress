import React from 'react';
import { 
  Box, 
  Text, 
  Progress, 
  Flex, 
  HStack,
  Stat,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { Card, Tag, Avatar } from '@merajut-asa/ui';
import Link from 'next/link';
import Image from 'next/image';

export interface CampaignCardProps {
  /**
   * Campaign ID
   */
  id: string;
  /**
   * Campaign slug for URL
   */
  slug: string;
  /**
   * Campaign title
   */
  title: string;
  /**
   * Campaign description (short summary)
   */
  description: string;
  /**
   * URL to campaign thumbnail image
   */
  thumbnailUrl: string;
  /**
   * Campaign category
   */
  category: string;
  /**
   * Current amount raised
   */
  currentAmount: number;
  /**
   * Goal amount
   */
  goalAmount: number;
  /**
   * Number of days left in campaign
   */
  daysLeft: number;
  /**
   * Number of contributors
   */
  contributorCount: number;
  /**
   * Creator name
   */
  creatorName: string;
  /**
   * Creator avatar URL
   */
  creatorAvatarUrl?: string;
  /**
   * If true, applies a loading skeleton state
   */
  isLoading?: boolean;
}

/**
 * Campaign card component used for displaying campaigns in listings.
 * Implements all design system tokens and accessibility requirements.
 */
export const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  slug,
  title,
  description,
  thumbnailUrl,
  category,
  currentAmount,
  goalAmount,
  daysLeft,
  contributorCount,
  creatorName,
  creatorAvatarUrl,
  isLoading = false,
}) => {
  // Calculate progress percentage
  const progressPercent = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);
  
  // Format currency (IDR)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Determine status based on days left
  const getStatusColor = () => {
    if (daysLeft <= 3) return 'error';
    if (daysLeft <= 7) return 'warning';
    return 'info';
  };

  if (isLoading) {
    return <Card isLoading aria-label="Loading campaign" />;
  }

  return (
    <Link href={`/campaign/${slug}`} passHref style={{ textDecoration: 'none' }}>
      <Card
        variant="elevated"
        title={title}
        isInteractive
        data-testid={`campaign-card-${id}`}
        aria-label={`${title}, Campaign by ${creatorName}, ${formatCurrency(currentAmount)} raised of ${formatCurrency(goalAmount)} goal, ${daysLeft} days left`}
      >
        <Box position="relative" height="200px" mb="4">
          <Image
            src={thumbnailUrl}
            alt={`${title} campaign thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover', borderRadius: '0.375rem' }}
            priority={false}
          />
          <Tag 
            position="absolute" 
            top="2" 
            right="2" 
            colorScheme="blue"
            size="sm"
          >
            {category}
          </Tag>
        </Box>
        
        <Text noOfLines={2} mb="3" color="neutral.deepSpace">
          {description}
        </Text>
        
        <Box mb="4">
          <Flex justify="space-between" mb="1">
            <Text fontWeight="medium">{formatCurrency(currentAmount)}</Text>
            <Text color="neutral.stormCloud">{progressPercent}%</Text>
          </Flex>
          <Progress 
            value={progressPercent} 
            colorScheme="blue" 
            size="sm" 
            borderRadius="full"
            aria-label={`${progressPercent}% of goal reached`}
          />
        </Box>
        
        <Flex justifyContent="space-between" alignItems="center">
          <Stat size="sm">
            <StatNumber>{daysLeft}</StatNumber>
            <StatHelpText margin="0">Days Left</StatHelpText>
          </Stat>
          
          <HStack spacing="1">
            <Avatar 
              name={creatorName} 
              src={creatorAvatarUrl} 
              size="sm"
            />
            <Text fontSize="sm" color="neutral.stormCloud">
              by {creatorName}
            </Text>
          </HStack>
        </Flex>
      </Card>
    </Link>
  );
};

export default CampaignCard;
