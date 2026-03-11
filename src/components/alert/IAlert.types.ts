/**
 * IAlert Component Types
 *
 * Type definitions for the IAlert component including props,
 * emits, and related enums.
 */

import type { Size, Status } from "@/types/common";

/**
 * Available alert status colors
 */
export type AlertStatus = Extract<Status, "success" | "warning" | "danger">;

/**
 * Available alert sizes
 */
export type AlertSize = Extract<Size, "xsmall" | "small" | "medium">;

/**
 * Props interface for IAlert component
 */
export interface IAlertProps {
	/**
	 * The icon that will show on the left side, this will be used with the icon slot
	 */
	icon?: string;

	/**
	 * A short text that will describe the alert.
	 */
	description: string;

	/**
	 * A modifier for changing the border and title color.
	 */
	status?: AlertStatus;

	/**
	 * A title of the alert that will have call-to-action to viewers.
	 */
	title: string;

	/**
	 * Enable manual dismissal of the alert
	 */
	isDismissable?: boolean;

	/**
	 * Enable automatic dismissal of the alert after a timeout
	 */
	isAutoDismissable?: boolean;

	/**
	 * Time in milliseconds before auto-dismissal (only applies when isAutoDismissable is true)
	 */
	dismissCountdown?: number;

	/**
	 * Show dismiss button on mobile devices without hover
	 */
	isMobile?: boolean;

	/**
	 * Size modifier for the alert
	 */
	size?: AlertSize;
}

/**
 * Emits interface for IAlert component
 */
export interface IAlertEmits {
	/**
	 * Emitted when alert is dismissed
	 */
	(e: "dismiss"): void;
}
