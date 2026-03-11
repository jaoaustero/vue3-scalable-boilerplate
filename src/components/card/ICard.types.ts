/**
 * ICard Component Types
 *
 * Type definitions for the ICard component including props
 * and related types.
 */

import type { Size } from "@/types/common";

/**
 * Available card colors
 */
export type CardColor = "default" | "primary" | "inverse";

/**
 * Available card sizes
 */
export type CardSize = Extract<Size, "xsmall" | "small" | "medium" | "large">;

/**
 * Props interface for ICard component
 */
export interface ICardProps {
	/**
	 * A color modifier for the card
	 */
	color?: CardColor;

	/**
	 * Increase or decrease padding around the card
	 */
	size?: CardSize;
}
