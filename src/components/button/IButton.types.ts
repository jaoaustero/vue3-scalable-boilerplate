/**
 * Button color variants
 */
export type ButtonColor = 'default' | 'primary' | 'secondary' | 'warning' | 'danger';

/**
 * Button size variants
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Props for the IButton component
 */
export interface IButtonProps {
	/**
	 * A color that has traffic light color base on the status
	 */
	color?: ButtonColor;

	/**
	 * A site link that will convert the button to anchor
	 */
	href?: string;

	/**
	 * Make the circle that mostly used as floating action button
	 */
	isCircle?: boolean;

	/**
	 * A modifier that will make the background to white with a border dashed
	 */
	isDashed?: boolean;

	/**
	 * Make the button unclickable and apply idle style color
	 */
	isDisabled?: boolean;

	/**
	 * A modifier that will make the background to white
	 */
	isOutline?: boolean;

	/**
	 * A modifier that will make the button border sharpless
	 */
	isRounded?: boolean;

	/**
	 * Make the button padding consistent
	 */
	isSquare?: boolean;

	/**
	 * Make the button look like a plain text
	 */
	isText?: boolean;

	/**
	 * Increase or decrease the dimension and gutter of the button
	 */
	size?: ButtonSize;

	/**
	 * Label to describe the button that will be used on wcag attributes
	 */
	label: string;
}

/**
 * Events emitted by the IButton component
 */
export interface IButtonEmits {
	/**
	 * Emitted when the button is clicked
	 */
	(e: 'click', event: MouseEvent): void;
}
