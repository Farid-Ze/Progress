import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps as ChakraModalProps,
  useDisclosure,
  // Box, - Removed unused
  Heading,
  Text,
  // IconButton, - Removed unused
  // VStack, - Removed unused
  HStack,
  Divider,
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

import { Button } from '../Button';

export interface ModalProps extends Omit<ChakraModalProps, 'children'> {
  /**
   * Modal title
   */
  title: string;
  /**
   * Modal body content
   */
  children: React.ReactNode;
  /**
   * Modal footer content
   */
  footer?: React.ReactNode;
  /**
   * Modal size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * If true, modal is open
   */
  isOpen: boolean;
  /**
   * Callback when modal is closed
   */
  onClose: () => void;
  /**
   * If true, clicking overlay closes modal
   */
  closeOnOverlayClick?: boolean;
  /**
   * If true, pressing Escape closes modal
   */
  closeOnEsc?: boolean;
  /**
   * If true, shows close button
   */
  showCloseButton?: boolean;
  /**
   * Custom close button aria-label
   */
  closeButtonAriaLabel?: string;
  /**
   * If true, focuses the first focusable element on open
   */
  autoFocus?: boolean;
  /**
   * If true, returns focus to trigger element on close
   */
  returnFocusOnClose?: boolean;
  /**
   * Custom initial focus ref
   */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /**
   * Custom final focus ref
   */
  finalFocusRef?: React.RefObject<HTMLElement>;
}

/**
 * Modal component with proper focus management and accessibility.
 * Follows WCAG 2.1 AA guidelines for modal dialogs.
 * 
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Confirm Action"
 *   size="md"
 *   footer={
 *     <HStack>
 *       <Button variant="outline" onClick={onClose}>Cancel</Button>
 *       <Button onClick={handleConfirm}>Confirm</Button>
 *     </HStack>
 *   }
 * >
 *   <Text>Are you sure you want to proceed?</Text>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  footer,
  size = 'md',
  isOpen,
  onClose,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  closeButtonAriaLabel = 'Close modal',
  // autoFocus removed for accessibility compliance
  returnFocusOnClose = true,
  initialFocusRef,
  finalFocusRef,
  ...rest
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        // Keep focus within modal
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          // Shift + Tab: if focused on first element, focus last
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: if focused on last element, focus first
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
      returnFocusOnClose={returnFocusOnClose}
      initialFocusRef={initialFocusRef}
      finalFocusRef={finalFocusRef}
      isCentered
      {...rest}
    >
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(4px)" />
      <ModalContent
        ref={modalRef}
        borderRadius="lg"
        bg="neutral.white"
        boxShadow="2xl"
        mx={4}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <ModalHeader pb={2}>
          <Heading
            id="modal-title"
            size="lg"
            color="neutral.deep-space"
            pr={showCloseButton ? 10 : 0}
          >
            {title}
          </Heading>
        </ModalHeader>
        
        {showCloseButton && (
          <ModalCloseButton
            aria-label={closeButtonAriaLabel}
            size="lg"
            top={4}
            right={4}
            color="neutral.storm-cloud"
            _hover={{
              color: 'neutral.deep-space',
              bg: 'neutral.misty',
            }}
            _focus={{
              boxShadow: '0 0 0 2px #1A6BCC',
              outline: 'none',
            }}
          />
        )}

        <Divider color="neutral.misty" />

        <ModalBody py={6}>
          {children}
        </ModalBody>

        {footer && (
          <>
            <Divider color="neutral.misty" />
            <ModalFooter pt={4}>
              {footer}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </ChakraModal>
  );
};

// Confirmation Modal Component
export interface ConfirmationModalProps {
  /**
   * If true, modal is open
   */
  isOpen: boolean;
  /**
   * Callback when modal is closed
   */
  onClose: () => void;
  /**
   * Callback when action is confirmed
   */
  onConfirm: () => void;
  /**
   * Modal title
   */
  title: string;
  /**
   * Confirmation message
   */
  message: string;
  /**
   * Confirm button text
   */
  confirmText?: string;
  /**
   * Cancel button text
   */
  cancelText?: string;
  /**
   * Confirmation variant (affects button styling)
   */
  variant?: 'default' | 'danger';
  /**
   * If true, shows loading state on confirm button
   */
  isLoading?: boolean;
}

/**
 * Specialized confirmation modal for destructive or important actions.
 */
export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      initialFocusRef={cancelRef}
      footer={
        <HStack spacing={3}>
          <Button
            ref={cancelRef}
            variant="outline"
            onClick={onClose}
            isDisabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </HStack>
      }
    >
      <Text color="neutral.midnight" lineHeight="relaxed">
        {message}
      </Text>
    </Modal>
  );
};

// Custom hook for modal management
export const useModal = (initialIsOpen = false) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: initialIsOpen,
  });

  return {
    isOpen,
    onOpen,
    onClose,
    toggle: isOpen ? onClose : onOpen,
  };
};
