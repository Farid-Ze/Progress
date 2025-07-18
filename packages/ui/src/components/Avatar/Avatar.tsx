import React from 'react';
import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
  AvatarBadge,
  useStyleConfig,
  forwardRef,
} from '@chakra-ui/react';

export interface AvatarProps extends Omit<ChakraAvatarProps, 'size'> {
  /**
   * The name of the person in the avatar
   */
  name?: string;
  /**
   * The image src attribute
   */
  src?: string;
  /**
   * How large should the avatar be
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * If true, shows a border around the avatar
   */
  showBorder?: boolean;
  /**
   * If true, shows a badge on the avatar
   */
  isOnline?: boolean;
  /**
   * Additional role for screen readers
   */
  role?: string;
}

/**
 * Avatar component for user profile images with accessibility features.
 */
export const Avatar = forwardRef<AvatarProps, 'span'>((props, ref) => {
  const {
    name,
    src,
    size = 'md',
    showBorder = false,
    isOnline,
    role = 'img',
    ...rest
  } = props;

  // Get styles from the theme
  const styles = useStyleConfig('Avatar', { size });

  // Create accessible label for screen readers
  const ariaLabel = name 
    ? `Profile picture of ${name}${isOnline ? ', online' : ''}`
    : 'Profile picture';

  return (
    <ChakraAvatar
      ref={ref}
      name={name}
      src={src}
      size={size}
      aria-label={ariaLabel}
      role={role}
      sx={{
        ...styles,
        border: showBorder ? '2px solid' : 'none',
        borderColor: 'brand.blue.100',
      }}
      {...rest}
    >
      {isOnline !== undefined && (
        <AvatarBadge
          boxSize="1em" 
          bg={isOnline ? 'semantic.success' : 'neutral.stormCloud'}
          aria-hidden="true"
        />
      )}
    </ChakraAvatar>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
