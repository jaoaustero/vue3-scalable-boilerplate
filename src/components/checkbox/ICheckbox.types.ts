/**
 * ICheckbox Component Types
 *
 * Type definitions for the ICheckbox component including props,
 * emits, exposed methods, and related types.
 */

import type { BaseFormFieldProps, BaseOption, BaseFormFieldExposed } from "@/types/common";

/**
 * Checkbox option interface
 */
export interface CheckboxOption extends BaseOption {}

/**
 * Props interface for ICheckbox component
 */
export interface ICheckboxProps extends BaseFormFieldProps {
	/**
	 * Unique identifier for the checkbox group
	 */
	id?: string;

	/**
	 * Selected checkbox values
	 */
	modelValue?: (string | number)[];

	/**
	 * Selected checkbox values
	 */
	value?: (string | number)[];

	/**
	 * Checkbox attributes
	 */
	options?: CheckboxOption[];

	/**
	 * Make the border color into success color
	 */
	isSuccess?: boolean;
}

/**
 * Emits interface for ICheckbox component
 */
export interface ICheckboxEmits {
	/**
	 * Emitted when checkbox value changes
	 */
	(e: "input", value: (string | number)[]): void;

	/**
	 * Emitted when model value updates
	 */
	(e: "update:modelValue", value: (string | number)[]): void;

	/**
	 * Emitted when error state changes
	 */
	(e: "update:error", value: boolean): void;
}

/**
 * Exposed methods interface for ICheckbox component
 */
export interface ICheckboxExposed extends BaseFormFieldExposed {}
