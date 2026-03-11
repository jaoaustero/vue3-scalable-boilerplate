/**
 * IRadio Component Types
 *
 * Type definitions for the IRadio component including props,
 * emits, exposed methods, and related types.
 */

import type { BaseFormFieldProps, BaseOption, BaseFormFieldExposed } from "@/types/common";

/**
 * Radio option interface
 */
export interface RadioOption extends BaseOption {
	/**
	 * Name attribute for the radio input
	 */
	name?: string;
}

/**
 * Props interface for IRadio component
 */
export interface IRadioProps extends BaseFormFieldProps {
	/**
	 * Unique identifier for the radio group
	 */
	id?: string;

	/**
	 * Selected radio value
	 */
	modelValue?: string | number;

	/**
	 * Selected radio value
	 */
	checked?: string | number;

	/**
	 * Radio button attributes
	 */
	options?: RadioOption[];
}

/**
 * Emits interface for IRadio component
 */
export interface IRadioEmits {
	/**
	 * Emitted when radio value changes
	 */
	(e: "input", value: string | number): void;

	/**
	 * Emitted when model value updates
	 */
	(e: "update:modelValue", value: string | number): void;

	/**
	 * Emitted when error state changes
	 */
	(e: "update:error", value: boolean): void;
}

/**
 * Exposed methods interface for IRadio component
 */
export interface IRadioExposed extends BaseFormFieldExposed {}
