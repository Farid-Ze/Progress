import {
  Alert as ChakraAlert,
  AlertProps as ChakraAlertProps,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useStyleConfig,
  forwardRef,
} from '@chakra-ui/react';
import React from 'react';

import { useReducedMotion } from '../../hooks';

export interface AlertProps extends Omit<ChakraAlertProps, 'status'> {
  /**
   * The status of the alert
   */
  status: 'success' | 'warning' | 'error' | 'info';
  /**
   * The title of the alert
   */
  title?: string;
  /**
   * If true, adds a close button to the alert
   */
  isClosable?: boolean;
  /**
   * Callback when alert is closed
   */
  onClose?: () => void;
  /**
   * If true, the alert will take up the full width of its container
   */
  fullWidth?: boolean;
  /**
   * Controls if the alert is prominently displayed
   */
  variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent';
}

/**
 * Alert component for feedback messages, notifications, and status updates.
 * Implements proper ARIA attributes and live region for accessibility.
 */
export const Alert = forwardRef<AlertProps, 'div'>((props, ref) => {
  const {
    status,
    title,
    isClosable = false,
    onClose,
    fullWidth = false,
    variant = 'subtle',
    children,
    ...rest
  } = props;

  const prefersReducedMotion = useReducedMotion();
  
  // Get styles from the theme
  const styles = useStyleConfig('Alert', { status, variant });

  // Determine appropriate aria-live value based on status
  const ariaLive = status === 'error' ? 'assertive' : 'polite';

  return (
    <ChakraAlert
      ref={ref}
      status={status}
      variant={variant}
      width={fullWidth ? '100%' : undefined}
      sx={{
        ...styles,
        transition: prefersReducedMotion ? 'none' : 'all 0.2s ease-in-out',
      }}
      aria-live={ariaLive}
      role={status === 'error' ? 'alert' : 'status'}
      {...rest}
    >
      <AlertIcon />
      {title && <AlertTitle marginRight="2">{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
      {isClosable && (
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={onClose}
          aria-label="Close alert"
        />
      )}
    </ChakraAlert>
  );
});

Alert.displayName = 'Alert';

export default Alert;
