import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Flex,
  useStyleConfig,
  forwardRef,
  AspectRatio,
  Badge,
  Avatar,
  Link,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

import { Card } from '../Card/Card';
import { CampaignProgress } from '../Progress';
import { Tag } from '../Tag/Tag';

export interface CampaignCardProps {
  /**
   * Campaign data
   */
  campaign: {
    id: string;
    slug: string;
    title: string;
    description: string;
    thumbnailUrl?: string;
    category: string;
    currentAmount: number;
    goalAmount: number;
    daysLeft: number;
    contributorCount: number;
    creatorName: string;
    creatorAvatarUrl?: string;
    isUrgent?: boolean;
    isCompleted?: boolean;
  };
  /**
   * Card variant
   */
  variant?: 'default' | 'compact' | 'featured';
  /**
   * If true, card acts as a link
   */
  isClickable?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * If true, shows loading state
   */
  isLoading?: boolean;
  /**
   * Custom image aspect ratio
   */
  imageAspectRatio?: number;
  /**
   * If true, shows creator information
   */
  showCreator?: boolean;
  /**
   * If true, shows campaign progress
   */
  showProgress?: boolean;
  /**
   * If true, shows campaign category
   */
  showCategory?: boolean;
}

/**
 * Campaign card component optimized for displaying campaign information.
 * Follows accessibility guidelines and performance best practices.
 */
export const CampaignCard = forwardRef<CampaignCardProps, 'div'>((props, ref) => {
  const {
    campaign,
    variant = 'default',
    isClickable = true,
    onClick,
    isLoading = false,
    imageAspectRatio = 16 / 9,
    showCreator = true,
    showProgress = true,
    showCategory = true,
    ...rest
  } = props;

  // Loading state
  if (isLoading) {
    return (
      <Card
        ref={ref}
        variant="elevated"
        role="status"
        aria-busy="true"
        aria-label="Loading campaign"
        {...rest}
      >
        <AspectRatio ratio={imageAspectRatio}>
          <Skeleton borderRadius="md" />
        </AspectRatio>
        <VStack align="stretch" p={4} spacing={3}>
          <HStack justify="space-between" align="flex-start">
            <SkeletonText noOfLines={1} skeletonHeight="20px" width="60%" />
            <Skeleton height="24px" width="80px" />
          </HStack>
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="16px" />
          <Skeleton height="8px" width="100%" />
          <HStack justify="space-between">
            <SkeletonText noOfLines={1} skeletonHeight="14px" width="40%" />
            <SkeletonText noOfLines={1} skeletonHeight="14px" width="30%" />
          </HStack>
        </VStack>
      </Card>
    );
  }

  const {
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
    isUrgent,
    isCompleted,
  } = campaign;

  const percentage = goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0;

  // Determine status
  const getStatus = () => {
    if (isCompleted) return 'completed';
    if (isUrgent || daysLeft <= 3) return 'urgent';
    return 'active';
  };

  const status = getStatus();

  // Handle click
  const handleClick = () => {
    if (isClickable && onClick) {
      onClick();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <Card
        ref={ref}
        variant="elevated"
        isInteractive={isClickable}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        tabIndex={isClickable ? 0 : -1}
        role={isClickable ? 'button' : 'article'}
        aria-label={isClickable ? `View campaign: ${title}` : undefined}
        cursor={isClickable ? 'pointer' : 'default'}
        {...rest}
      >
        <HStack spacing={4} p={4}>
          {thumbnailUrl && (
            <Box flexShrink={0}>
              <AspectRatio ratio={1} width="80px">
                <Image
                  src={thumbnailUrl}
                  alt={`${title} campaign image`}
                  objectFit="cover"
                  borderRadius="md"
                  fallback={<Box bg="neutral.misty" borderRadius="md" />}
                />
              </AspectRatio>
            </Box>
          )}
          
          <VStack align="stretch" spacing={2} flex={1} minW={0}>
            <HStack justify="space-between" align="flex-start">
              <Heading
                size="sm"
                color="neutral.deep-space"
                noOfLines={1}
                flex={1}
              >
                {title}
              </Heading>
              {showCategory && (
                <Tag size="sm" variant="subtle">
                  {category}
                </Tag>
              )}
            </HStack>
            
            <Text
              variant="body-small"
              color="neutral.storm-cloud"
              noOfLines={2}
            >
              {description}
            </Text>
            
            {showProgress && (
              <CampaignProgress
                currentAmount={currentAmount}
                goalAmount={goalAmount}
                size="sm"
                showDetails={false}
              />
            )}
          </VStack>
        </HStack>
      </Card>
    );
  }

  // Featured variant
  if (variant === 'featured') {
    return (
      <Card
        ref={ref}
        variant="elevated"
        isInteractive={isClickable}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        tabIndex={isClickable ? 0 : -1}
        role={isClickable ? 'button' : 'article'}
        aria-label={isClickable ? `View featured campaign: ${title}` : undefined}
        cursor={isClickable ? 'pointer' : 'default'}
        boxShadow="xl"
        {...rest}
      >
        <Box position="relative">
          <AspectRatio ratio={imageAspectRatio}>
            <Image
              src={thumbnailUrl}
              alt={`${title} campaign image`}
              objectFit="cover"
              fallback={<Box bg="neutral.misty" />}
            />
          </AspectRatio>
          
          {/* Status badges */}
          <HStack position="absolute" top={4} left={4} spacing={2}>
            {status === 'completed' && (
              <Badge colorScheme="green" variant="solid">
                Selesai
              </Badge>
            )}
            {status === 'urgent' && (
              <Badge colorScheme="red" variant="solid">
                Mendesak
              </Badge>
            )}
            {showCategory && (
              <Tag size="sm" variant="solid">
                {category}
              </Tag>
            )}
          </HStack>
        </Box>
        
        <VStack align="stretch" p={6} spacing={4}>
          <Heading
            size="lg"
            color="neutral.deep-space"
            noOfLines={2}
            lineHeight="tight"
          >
            {title}
          </Heading>
          
          <Text
            variant="body"
            color="neutral.midnight"
            noOfLines={3}
            lineHeight="relaxed"
          >
            {description}
          </Text>
          
          {showProgress && (
            <CampaignProgress
              currentAmount={currentAmount}
              goalAmount={goalAmount}
              contributorCount={contributorCount}
              daysLeft={daysLeft}
              size="lg"
            />
          )}
          
          {showCreator && (
            <HStack justify="space-between" align="center" pt={2}>
              <HStack spacing={3}>
                <Avatar
                  size="sm"
                  src={creatorAvatarUrl}
                  name={creatorName}
                />
                <VStack align="flex-start" spacing={0}>
                  <Text variant="body-small" color="neutral.storm-cloud">
                    Dibuat oleh
                  </Text>
                  <Text variant="body-small" fontWeight="medium" color="neutral.deep-space">
                    {creatorName}
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          )}
        </VStack>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      ref={ref}
      variant="elevated"
      isInteractive={isClickable}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={isClickable ? 0 : -1}
      role={isClickable ? 'button' : 'article'}
      aria-label={isClickable ? `View campaign: ${title}` : undefined}
      cursor={isClickable ? 'pointer' : 'default'}
      {...rest}
    >
      {/* Campaign Image */}
      {thumbnailUrl && (
        <Box position="relative">
          <AspectRatio ratio={imageAspectRatio}>
            <Image
              src={thumbnailUrl}
              alt={`${title} campaign image`}
              objectFit="cover"
              fallback={<Box bg="neutral.misty" />}
            />
          </AspectRatio>
          
          {/* Status badges */}
          <HStack position="absolute" top={3} left={3} spacing={2}>
            {status === 'completed' && (
              <Badge colorScheme="green" variant="solid" fontSize="xs">
                Selesai
              </Badge>
            )}
            {status === 'urgent' && (
              <Badge colorScheme="red" variant="solid" fontSize="xs">
                Mendesak
              </Badge>
            )}
          </HStack>
          
          {showCategory && (
            <Box position="absolute" top={3} right={3}>
              <Tag size="sm" variant="solid">
                {category}
              </Tag>
            </Box>
          )}
        </Box>
      )}
      
      {/* Campaign Content */}
      <VStack align="stretch" p={4} spacing={3}>
        <Heading
          size="md"
          color="neutral.deep-space"
          noOfLines={2}
          lineHeight="tight"
        >
          {title}
        </Heading>
        
        <Text
          variant="body-small"
          color="neutral.midnight"
          noOfLines={3}
          lineHeight="relaxed"
        >
          {description}
        </Text>
        
        {showProgress && (
          <CampaignProgress
            currentAmount={currentAmount}
            goalAmount={goalAmount}
            contributorCount={contributorCount}
            daysLeft={daysLeft}
            size="md"
          />
        )}
        
        {showCreator && (
          <HStack spacing={3} pt={2}>
            <Avatar
              size="xs"
              src={creatorAvatarUrl}
              name={creatorName}
            />
            <VStack align="flex-start" spacing={0}>
              <Text variant="caption" color="neutral.storm-cloud">
                Dibuat oleh
              </Text>
              <Text variant="caption" fontWeight="medium" color="neutral.deep-space">
                {creatorName}
              </Text>
            </VStack>
          </HStack>
        )}
      </VStack>
    </Card>
  );
});

CampaignCard.displayName = 'CampaignCard';
