import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Divider,
} from '@chakra-ui/react';

// Donation amount presets
const DONATION_PRESETS = [
  { value: 50000, label: '50K' },
  { value: 100000, label: '100K' },
  { value: 250000, label: '250K' },
  { value: 500000, label: '500K' },
  { value: 1000000, label: '1M' },
];

interface DonationFormProps {
  /**
   * Campaign ID for the donation
   */
  campaignId: string;
  /**
   * Campaign name for the donation
   */
  campaignName: string;
  /**
   * Minimum donation amount allowed
   */
  minAmount?: number;
  /**
   * Maximum donation amount allowed
   */
  maxAmount?: number;
  /**
   * Default donation amount
   */
  defaultAmount?: number;
  /**
   * Callback when donation is submitted
   */
  onDonate: (data: DonationData) => void;
  /**
   * Is the form in a loading state
   */
  isLoading?: boolean;
}

export interface DonationData {
  campaignId: string;
  amount: number;
  isAnonymous: boolean;
  message?: string;
}

/**
 * Donation form component for campaign pages
 */
export const DonationForm: React.FC<DonationFormProps> = ({
  campaignId,
  campaignName,
  minAmount = 10000,
  maxAmount = 100000000,
  defaultAmount = 100000,
  onDonate,
  isLoading = false,
}) => {
  const [donationAmount, setDonationAmount] = useState(defaultAmount);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  
  // Format currency (IDR)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Handle donation amount change
  const handleDonationAmountChange = (value: string) => {
    setDonationAmount(parseInt(value, 10));
  };
  
  // Handle preset amount selection
  const handlePresetSelection = (value: number) => {
    setDonationAmount(value);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate amount
    if (donationAmount < minAmount) {
      alert(`Minimum donation amount is ${formatCurrency(minAmount)}`);
      return;
    }
    
    if (donationAmount > maxAmount) {
      alert(`Maximum donation amount is ${formatCurrency(maxAmount)}`);
      return;
    }
    
    // Call the callback with donation data
    onDonate({
      campaignId,
      amount: donationAmount,
      isAnonymous,
      message: message.trim() || undefined,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} aria-labelledby="donation-form-title">
      <Box mb="4">
        <Text id="donation-form-title" fontWeight="bold" fontSize="lg" mb="4">
          Support this campaign
        </Text>
        
        <FormLabel htmlFor="donation-amount">Donation Amount</FormLabel>
        <NumberInput 
          id="donation-amount"
          value={donationAmount} 
          onChange={handleDonationAmountChange}
          min={minAmount} 
          max={maxAmount}
          step={10000}
          mb="2"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        
        {/* Preset donation amounts */}
        <Flex gap="2" flexWrap="wrap" mb="4">
          {DONATION_PRESETS.map(preset => (
            <Button 
              key={preset.value} 
              size="sm" 
              variant={donationAmount === preset.value ? "solid" : "outline"}
              colorScheme="blue"
              type="button"
              onClick={() => handlePresetSelection(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
        </Flex>
        
        <FormControl display="flex" mb="4">
          <RadioGroup
            onChange={(value) => setIsAnonymous(value === 'true')}
            value={isAnonymous.toString()}
          >
            <Stack direction={{ base: "column", sm: "row" }}>
              <Radio value="false">Show my name</Radio>
              <Radio value="true">Donate anonymously</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        
        <FormControl mb="4">
          <FormLabel htmlFor="donation-message">Message (Optional)</FormLabel>
          <textarea
            id="donation-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={200}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #DDE1EB',
              minHeight: '80px',
            }}
            aria-describedby="message-helper"
          />
          <Text id="message-helper" fontSize="xs" color="neutral.stormCloud" mt="1">
            Your message will be displayed publicly with your donation
          </Text>
        </FormControl>
      </Box>
      
      <Button 
        colorScheme="blue" 
        size="lg" 
        width="100%" 
        mb="4"
        type="submit"
        isLoading={isLoading}
        isDisabled={donationAmount < minAmount || donationAmount > maxAmount}
      >
        Donate {formatCurrency(donationAmount)}
      </Button>
      
      <Divider my="4" />
      
      {/* Payment Methods */}
      <Box>
        <Text fontSize="sm" fontWeight="medium" mb="2">
          Secure payment methods:
        </Text>
        <Flex gap="2" flexWrap="wrap">
          <Box p="2" borderWidth="1px" borderRadius="md">
            <Text fontSize="xs">Bank Transfer</Text>
          </Box>
          <Box p="2" borderWidth="1px" borderRadius="md">
            <Text fontSize="xs">Credit Card</Text>
          </Box>
          <Box p="2" borderWidth="1px" borderRadius="md">
            <Text fontSize="xs">E-Wallet</Text>
          </Box>
        </Flex>
        <Text fontSize="xs" color="neutral.stormCloud" mt="2">
          All donations are secure and encrypted
        </Text>
      </Box>
    </form>
  );
};

export default DonationForm;
