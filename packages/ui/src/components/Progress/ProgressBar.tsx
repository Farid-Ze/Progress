import React from 'react';
import {
  Box,
  Progress as ChakraProgress,
  ProgressProps as ChakraProgressProps,
  Text,
  Flex,
  VStack,
  useStyleConfig,
  forwardRef,
} from '@chakra-ui/react';

export interface ProgressBarProps extends Omit<ChakraProgressProps, 'value' | 'max'> {
  /**
   * Current value (amount raised)
   */
  value: number;
  /**
   * Maximum value (goal amount)
   */
  max: number;
  /**
   * Progress variant
   */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /**
   * Progress size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * If true, shows percentage text
   */
  showPercentage?: boolean;
  /**
   * If true, shows value labels (current/max)
   */
  showValues?: boolean;
  /**
   * Custom label for current value
   */
  currentLabel?: string;
  /**
   * Custom label for max value
   */
  maxLabel?: string;
  /**
   * Currency formatter function
   */
  formatCurrency?: (amount: number) => string;
  /**
   * If true, animates the progress fill
   */
  isAnimated?: boolean;
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  /**
   * ARIA describedby for accessibility
   */
  'aria-describedby'?: string;
}

const defaultFormatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Progress bar component optimized for displaying campaign funding progress.
 * Follows accessibility guidelines with proper ARIA attributes and keyboard navigation.
 * 
 * @example
 * ```tsx
 * <ProgressBar
 *   value={15000000}
 *   max={25000000}
 *   showPercentage
 *   showValues
 *   aria-label="Campaign funding progress"
 * />
 * ```
 */
export const ProgressBar = forwardRef<ProgressBarProps, 'div'>((props, ref) => {
  const {
    value,
    max,
    variant = 'default',
    size = 'md',
    showPercentage = false,
    showValues = false,
    currentLabel,
    maxLabel,
    formatCurrency = defaultFormatCurrency,
    isAnimated = true,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props;

  // Calculate percentage
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  
  // Get color scheme based on variant
  const getColorScheme = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'green';
      case 'warning':
        return 'yellow';
      case 'error':
        return 'red';
      default:
        return 'blue'; // Maps to our primary blue color
    }
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      height: '4px',
      fontSize: 'body-small',
    },
    md: {
      height: '8px',
      fontSize: 'body',
    },
    lg: {
      height: '12px',
      fontSize: 'body-large',
    },
  };

  const config = sizeConfig[size];

  return (
    <VStack ref={ref} spacing={2} align="stretch" w="full" {...rest}>
      {/* Progress labels */}
      {(showPercentage || showValues) && (
        <Flex justify="space-between" align="center">
          <Box>
            {currentLabel && (
              <Text variant="caption" color="neutral.storm-cloud" mb={1}>
                {currentLabel}
              </Text>
            )}
            {showValues && (
              <Text fontSize={config.fontSize} fontWeight="medium" color="neutral.deep-space">
                {formatCurrency(value)}
              </Text>
            )}
          </Box>
          
          <Box textAlign="right">
            {showPercentage && (
              <Text
                fontSize={config.fontSize}
                fontWeight="semibold"
                color="primary.asa-blue"
              >
                {Math.round(percentage)}%
              </Text>
            )}
            {maxLabel && (
              <Text variant="caption" color="neutral.storm-cloud" mb={1}>
                {maxLabel}
              </Text>
            )}
            {showValues && (
              <Text
                variant="caption"
                color="neutral.storm-cloud"
              >
                dari {formatCurrency(max)}
              </Text>
            )}
          </Box>
        </Flex>
      )}

      {/* Progress bar */}
      <ChakraProgress
        value={percentage}
        size={size}
        colorScheme={getColorScheme(variant)}
        bg="neutral.misty"
        borderRadius="full"
        height={config.height}
        hasStripe={isAnimated}
        isAnimated={isAnimated}
        aria-label={ariaLabel || `Progress: ${Math.round(percentage)}% complete`}
        aria-describedby={ariaDescribedBy}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-valuetext={`${formatCurrency(value)} dari ${formatCurrency(max)}`}
        role="progressbar"
        sx={{
          '& > div': {
            background: variant === 'default'
              ? 'linear-gradient(90deg, #1A6BCC 0%, #00A9A5 100%)'
              : undefined,
            transition: 'width 0.6s ease-in-out',
          },
        }}
      />

      {/* Additional info text */}
      {showValues && !showPercentage && (
        <Text
          variant="caption"
          color="neutral.storm-cloud"
          textAlign="center"
        >
          {Math.round(percentage)}% tercapai
        </Text>
      )}
    </VStack>
  );
});

ProgressBar.displayName = 'ProgressBar';

// Campaign specific progress component
export interface CampaignProgressProps {
  /**
   * Current amount raised
   */
  currentAmount: number;
  /**
   * Goal amount
   */
  goalAmount: number;
  /**
   * Number of contributors
   */
  contributorCount?: number;
  /**
   * Days remaining
   */
  daysLeft?: number;
  /**
   * If true, shows detailed information
   */
  showDetails?: boolean;
  /**
   * Progress size
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Specialized progress component for campaign funding display.
 * Includes additional campaign-specific information.
 */
export const CampaignProgress: React.FC<CampaignProgressProps> = ({
  currentAmount,
  goalAmount,
  contributorCount,
  daysLeft,
  showDetails = true,
  size = 'md',
}) => {
  const percentage = goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0;
  
  // Determine variant based on progress and time left
  const getVariant = () => {
    if (percentage >= 100) return 'success';
    if (daysLeft !== undefined && daysLeft <= 3) return 'warning';
    return 'default';
  };

  return (
    <VStack spacing={3} align="stretch">
      <ProgressBar
        value={currentAmount}
        max={goalAmount}
        variant={getVariant()}
        size={size}
        showPercentage
        showValues
        isAnimated
        aria-label={`Campaign funding progress: ${Math.round(percentage)}% of goal reached`}
      />
      
      {showDetails && (
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          {contributorCount !== undefined && (
            <Box>
              <Text fontSize="body-small" color="neutral.storm-cloud">
                {contributorCount.toLocaleString('id-ID')} kontributor
              </Text>
            </Box>
          )}
          
          {daysLeft !== undefined && (
            <Box textAlign="right">
              <Text
                fontSize="body-small"
                color={daysLeft <= 3 ? 'semantic.warning' : 'neutral.storm-cloud'}
                fontWeight={daysLeft <= 3 ? 'medium' : 'normal'}
              >
                {daysLeft > 0 ? `${daysLeft} hari tersisa` : 'Berakhir'}
              </Text>
            </Box>
          )}
        </Flex>
      )}
    </VStack>
  );
};
