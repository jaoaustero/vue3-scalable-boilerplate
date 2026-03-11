/**
 * ITextarea Component Types
 *
 * Type definitions for the ITextarea component including props,
 * emits, and exposed methods.
 */

import type {
	BaseTextFieldProps,
	BaseTextFieldEmits,
	BaseFormFieldExposed,
} from "@/types/common";

/**
 * Props interface for ITextarea component
 */
export interface ITextareaProps extends BaseTextFieldProps {
	/**
	 * Optional max width in pixels for the wrapper
	 */
	width?: number;

	/**
	 * Placeholder text for the textarea (HTML attribute)
	 */
	placeholder?: string;
}

/**
 * Emits interface for ITextarea component
 */
export interface ITextareaEmits extends BaseTextFieldEmits {}

/**
 * Exposed methods for ITextarea component
 */
export interface ITextareaExposed extends BaseFormFieldExposed {}
