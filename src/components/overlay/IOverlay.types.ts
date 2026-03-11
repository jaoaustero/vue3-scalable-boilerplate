/**
 * IOverlay Component Types
 *
 * Type definitions for the IOverlay component including props,
 * emits, and related types.
 */

/**
 * Options configuration for the overlay
 */
export interface IOverlayOptions {
	/**
	 * Align all buttons to the left side
	 */
	alignAllButtons?: "left";
}

/**
 * Props interface for IOverlay component
 */
export interface IOverlayProps {
	/**
	 * Show and Hide the overlay
	 */
	isOpen: boolean;

	/**
	 * Title of the overlay that shows on the top
	 */
	title?: string;

	/**
	 * A label on the tooltip for back button
	 */
	backTooltipText?: string;

	/**
	 * Additional CSS class for the header
	 */
	headerClass?: string;

	/**
	 * Options configuration for the overlay
	 */
	options?: IOverlayOptions;
}

/**
 * Emits interface for IOverlay component
 */
export interface IOverlayEmits {
	/**
	 * Emitted when the back button is clicked
	 */
	(e: "goBack"): void;
}
