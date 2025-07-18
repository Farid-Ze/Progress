import React from 'react';
import {
  Box,
  Flex,
  Progress,
  Stat,
  StatNumber,
  StatHelpText,
  Text,
} from '@chakra-ui/react';

interface CampaignProgressProps {
  /**
   * Current amount raised
   */
  currentAmount: number;
  /**
   * Goal amount for the campaign
   */
  goalAmount: number;
  /**
   * Number of contributors
   */
  contributorCount: number;
  /**
   * Number of days left
   */
  daysLeft: number;
  /**
   * Variant for display size
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Campaign progress component showing funding status
 */
export const CampaignProgress: React.FC<CampaignProgressProps> = ({
  currentAmount,
  goalAmount,
  contributorCount,
  daysLeft,
  size = 'md',
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

  // Size-based styling
  const getStyles = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return {
          fontSize: 'sm',
          statSize: 'sm',
          progressSize: 'sm',
          spacing: '2',
        };
      case 'lg':
        return {
          fontSize: 'lg',
          statSize: 'lg',
          progressSize: 'lg',
          spacing: '6',
        };
      case 'md':
      default:
        return {
          fontSize: 'md',
          statSize: 'md',
          progressSize: 'md',
          spacing: '4',
        };
    }
  };
  
  const styles = getStyles(size);
  
  return (
    <Box>
      <Box mb="4">
        <Flex justify="space-between" mb="1">
          <Text fontWeight="bold" fontSize={styles.fontSize}>
            {formatCurrency(currentAmount)}
          </Text>
          <Text color="neutral.stormCloud" fontSize={styles.fontSize}>
            {progressPercent}% of {formatCurrency(goalAmount)}
          </Text>
        </Flex>
        <Progress 
          value={progressPercent} 
          colorScheme="blue" 
          size={styles.progressSize}
          borderRadius="full"
          aria-label={`${progressPercent}% of goal reached`}
          mb={styles.spacing}
        />
      </Box>
      
      <Flex justify="space-between">
        <Stat size={styles.statSize}>
          <StatNumber>{contributorCount}</StatNumber>
          <StatHelpText mb="0">Supporters</StatHelpText>
        </Stat>
        
        <Stat size={styles.statSize}>
          <StatNumber>{daysLeft}</StatNumber>
          <StatHelpText mb="0">Days Left</StatHelpText>
        </Stat>
      </Flex>
    </Box>
  );
};

export default CampaignProgress;
