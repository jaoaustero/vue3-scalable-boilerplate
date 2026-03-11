/**
 * IInput Component Types
 *
 * Type definitions for the IInput component including props,
 * emits, and exposed methods.
 */

import type {
	BaseTextFieldProps,
	BaseTextFieldEmits,
	BaseFormFieldExposed,
} from "@/types/common";

/**
 * Props interface for IInput component
 */
export interface IInputProps extends BaseTextFieldProps {
	/**
	 * Increase/decrease the dimension and gutter of the component
	 */
	size?: "medium" | null;
}

/**
 * Emits interface for IInput component
 */
export interface IInputEmits extends BaseTextFieldEmits {}

/**
 * Exposed methods interface for IInput component
 */
export interface IInputExposed extends BaseFormFieldExposed {}
