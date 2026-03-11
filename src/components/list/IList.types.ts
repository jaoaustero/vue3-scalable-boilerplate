/**
 * IList Component Types
 *
 * Type definitions for the IList component including props
 * and related types.
 */

import type { Size } from "@/types/common";

/**
 * Available list item sizes
 */
export type ListSize = Extract<Size, "xsmall" | "small" | "medium" | "large">;

/**
 * Available list types for visual styling
 */
export type ListType = "striped" | "divider";

/**
 * Props interface for IList component
 */
export interface IListProps {
	/**
	 * Whether to render as ordered list (ol) or unordered list (ul)
	 * @default false
	 */
	isOrdered?: boolean;

	/**
	 * Visual style type of the list
	 * - striped: alternating background colors
	 * - divider: border between items
	 * @default undefined
	 */
	type?: ListType;

	/**
	 * Size of the list items
	 * @default undefined (uses default padding)
	 */
	size?: ListSize;
}
