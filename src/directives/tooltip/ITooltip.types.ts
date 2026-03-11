/**
 * ITooltip Directive Types
 *
 * Type definitions for the ITooltip custom directive
 * that provides tooltip functionality on hover.
 */

import type { ObjectDirective } from 'vue';

/**
 * Tooltip position relative to the target element
 */
export type ITooltipPosition = 'top' | 'bottom';

/**
 * Options for the ITooltip directive binding value.
 */
export interface ITooltipOptions {
	/** Position of the tooltip relative to the trigger element */
	position?: ITooltipPosition;

	/**
	 * Whether the tooltip should recalculate position on each mouseover.
	 * Enable this when the target element can change position dynamically.
	 */
	isDynamic?: boolean;
}

/**
 * Type definition for the ITooltip directive
 */
export type ITooltipDirective = ObjectDirective<HTMLElement, ITooltipOptions>;
