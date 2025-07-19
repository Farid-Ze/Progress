import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  forwardRef,
  Box,
} from '@chakra-ui/react';

// Base form field props
interface BaseFormFieldProps {
  /**
   * Field label
   */
  label?: string;
  /**
   * Help text to display below the field
   */
  helpText?: string;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * If true, the field is required
   */
  isRequired?: boolean;
  /**
   * If true, the field is disabled
   */
  isDisabled?: boolean;
  /**
   * If true, the field is invalid
   */
  isInvalid?: boolean;
  /**
   * If true, the field is read-only
   */
  isReadOnly?: boolean;
}

// Input Field Component
export interface InputFieldProps extends Omit<ChakraInputProps, 'size'>, BaseFormFieldProps {
  /**
   * Input size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Input variant
   */
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
}

/**
 * Input field with built-in form controls and accessibility features.
 * Follows WCAG 2.1 AA guidelines for form inputs.
 */
export const InputField = forwardRef<InputFieldProps, 'input'>((props, ref) => {
  const {
    label,
    helpText,
    errorMessage,
    isRequired = false,
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
    size = 'md',
    variant = 'outline',
    id,
    'aria-describedby': ariaDescribedBy,
    ...inputProps
  } = props;

  const generatedId = `field-${Math.random().toString(36).substr(2, 9)}`;
  const fieldId = id || generatedId;
  const helpTextId = `${fieldId}-help-text`;
  const errorId = `${fieldId}-error`;

  // Build aria-describedby
  let describedBy = ariaDescribedBy;
  if (helpText) {
    describedBy = describedBy ? `${describedBy} ${helpTextId}` : helpTextId;
  }
  if (isInvalid && errorMessage) {
    describedBy = describedBy ? `${describedBy} ${errorId}` : errorId;
  }

  return (
    <FormControl
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
    >
      {label && (
        <FormLabel htmlFor={fieldId} mb={2}>
          {label}
        </FormLabel>
      )}
      
      <ChakraInput
        ref={ref}
        id={fieldId}
        size={size}
        variant={variant}
        aria-describedby={describedBy}
        aria-invalid={isInvalid}
        aria-required={isRequired}
        {...inputProps}
      />
      
      {helpText && (
        <FormHelperText id={helpTextId} mt={2}>
          {helpText}
        </FormHelperText>
      )}
      
      {isInvalid && errorMessage && (
        <FormErrorMessage id={errorId} mt={2}>
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  );
});

InputField.displayName = 'InputField';

// Textarea Field Component
export interface TextareaFieldProps extends Omit<ChakraTextareaProps, 'size'>, BaseFormFieldProps {
  /**
   * Textarea size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Textarea variant
   */
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
}

/**
 * Textarea field with built-in form controls and accessibility features.
 */
export const TextareaField = forwardRef<TextareaFieldProps, 'textarea'>((props, ref) => {
  const {
    label,
    helpText,
    errorMessage,
    isRequired = false,
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
    size = 'md',
    variant = 'outline',
    id,
    'aria-describedby': ariaDescribedBy,
    ...textareaProps
  } = props;

  const generatedId = `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const fieldId = id || generatedId;
  const helpTextId = `${fieldId}-help-text`;
  const errorId = `${fieldId}-error`;

  // Build aria-describedby
  let describedBy = ariaDescribedBy;
  if (helpText) {
    describedBy = describedBy ? `${describedBy} ${helpTextId}` : helpTextId;
  }
  if (isInvalid && errorMessage) {
    describedBy = describedBy ? `${describedBy} ${errorId}` : errorId;
  }

  return (
    <FormControl
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
    >
      {label && (
        <FormLabel htmlFor={fieldId} mb={2}>
          {label}
        </FormLabel>
      )}
      
      <ChakraTextarea
        ref={ref}
        id={fieldId}
        size={size}
        variant={variant}
        aria-describedby={describedBy}
        aria-invalid={isInvalid}
        aria-required={isRequired}
        resize="vertical"
        minHeight="120px"
        {...textareaProps}
      />
      
      {helpText && (
        <FormHelperText id={helpTextId} mt={2}>
          {helpText}
        </FormHelperText>
      )}
      
      {isInvalid && errorMessage && (
        <FormErrorMessage id={errorId} mt={2}>
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  );
});

TextareaField.displayName = 'TextareaField';

// Select Field Component
export interface SelectFieldProps extends Omit<ChakraSelectProps, 'size' | 'children'>, BaseFormFieldProps {
  /**
   * Select options
   */
  options: { value: string; label: string; disabled?: boolean }[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Select size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Select variant
   */
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
}

/**
 * Select field with built-in form controls and accessibility features.
 */
export const SelectField = forwardRef<SelectFieldProps, 'select'>((props, ref) => {
  const {
    label,
    helpText,
    errorMessage,
    isRequired = false,
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
    options,
    placeholder,
    size = 'md',
    variant = 'outline',
    id,
    'aria-describedby': ariaDescribedBy,
    ...selectProps
  } = props;

  const generatedId = `select-${Math.random().toString(36).substr(2, 9)}`;
  const fieldId = id || generatedId;
  const helpTextId = `${fieldId}-help-text`;
  const errorId = `${fieldId}-error`;

  // Build aria-describedby
  let describedBy = ariaDescribedBy;
  if (helpText) {
    describedBy = describedBy ? `${describedBy} ${helpTextId}` : helpTextId;
  }
  if (isInvalid && errorMessage) {
    describedBy = describedBy ? `${describedBy} ${errorId}` : errorId;
  }

  return (
    <FormControl
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
    >
      {label && (
        <FormLabel htmlFor={fieldId} mb={2}>
          {label}
        </FormLabel>
      )}
      
      <ChakraSelect
        ref={ref}
        id={fieldId}
        size={size}
        variant={variant}
        placeholder={placeholder}
        aria-describedby={describedBy}
        aria-invalid={isInvalid}
        aria-required={isRequired}
        {...selectProps}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </ChakraSelect>
      
      {helpText && (
        <FormHelperText id={helpTextId} mt={2}>
          {helpText}
        </FormHelperText>
      )}
      
      {isInvalid && errorMessage && (
        <FormErrorMessage id={errorId} mt={2}>
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  );
});

SelectField.displayName = 'SelectField';

// Form Section Component for grouping related fields
export interface FormSectionProps {
  /**
   * Section title
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Form fields
   */
  children: React.ReactNode;
}

/**
 * Form section component for grouping related form fields.
 * Provides semantic structure with fieldset and legend.
 */
export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Box as="fieldset" border="none" p={0} mb={8}>
      {title && (
        <Box as="legend" mb={4}>
          <Box
            as="h3"
            fontSize="heading-3"
            fontWeight="semibold"
            color="neutral.deep-space"
            mb={1}
          >
            {title}
          </Box>
          {description && (
            <Box
              as="p"
              fontSize="body-small"
              color="neutral.storm-cloud"
              maxW="600px"
            >
              {description}
            </Box>
          )}
        </Box>
      )}
      {children}
    </Box>
  );
};
