/**
 * Container size variants
 */
export type ContainerSize = 'small' | 'medium' | 'large';

/**
 * Props for the IContainer component
 */
export interface IContainerProps {
	/**
	 * The size of the container
	 */
	size?: ContainerSize;
}
