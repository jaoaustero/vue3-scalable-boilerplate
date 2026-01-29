/**
 * Avatar color variants
 */
export type AvatarColor = 'default' | 'primary' | 'secondary';

/**
 * Avatar size variants
 */
export type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Props for the IAvatar component
 */
export interface IAvatarProps {
	/**
	 * The color for the avatar background
	 */
	color?: AvatarColor;

	/**
	 * Text for the avatar, at least 1 or 2 characters mostly used
	 * for user Initials
	 */
	label: string;

	/**
	 * Specific size or dimension
	 */
	size?: AvatarSize | null;

	/**
	 * Image source or path
	 */
	src?: string | null;
}
