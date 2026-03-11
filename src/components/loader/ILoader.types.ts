/**
 * ILoader Component Types
 *
 * Type definitions for the ILoader component including props
 * and related types.
 */

import type { Size } from "@/types/common";

/**
 * Available loader sizes
 */
export type LoaderSize = Extract<Size, "xsmall" | "small" | "medium" | "large" | "xlarge">;

/**
 * Available loader types
 */
export type LoaderType = "bar" | "icon" | "avatar";

/**
 * Props interface for ILoader component
 */
export interface ILoaderProps {
	/**
	 * Toggle the shimmering effect of the loader
	 */
	isShimmering?: boolean;

	/**
	 * Increase or decrease the dimension size of the loader
	 */
	size?: LoaderSize;

	/**
	 * A different type of loader
	 */
	type?: LoaderType;
}
