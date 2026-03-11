/**
 * IPhoneInput Component Types
 *
 * Type definitions for the IPhoneInput component including props,
 * emits, sub-component types, and exposed methods.
 */

import type {
	BaseFormFieldProps,
	BaseTextFieldEmits,
	BaseFormFieldExposed,
} from '@/types/common';

export type { PhoneCountry } from '@/utils/phone';

/**
 * Props interface for IPhoneInput component
 */
export interface IPhoneInputProps extends BaseFormFieldProps {
	/**
	 * Bound value (v-model). Should be a raw digits-only phone number
	 * including the dial code prefix (e.g. `"16175551234"`).
	 */
	modelValue?: string;

	/**
	 * Base path to the assets directory used by IFlag to load flag SVGs.
	 */
	assetPath?: string;

	/**
	 * Validation type. Pass `"phone"` to enable phone-specific validation
	 * (E.164 format check, starts-with-zero guard, minimum length).
	 */
	validation?: string;

	/**
	 * Current validation error type (e.g. `"required"`, `"starts_with_zero"`).
	 * Passed down to IInput to display the corresponding error message.
	 */
	invalidType?: string;

	/**
	 * Pre-select a country in the dropdown by its ISO alpha-2 code
	 * (e.g. `"gb"` for United Kingdom). Takes precedence over the
	 * dial code inferred from `modelValue`.
	 */
	preSelectCountryCode?: string;
}

/**
 * Emits interface for IPhoneInput component.
 * Extends the standard text-field emits (modelValue, focus, blur, error, invalidType).
 */
export interface IPhoneInputEmits extends BaseTextFieldEmits {}

/**
 * Exposed methods interface for IPhoneInput component.
 */
export interface IPhoneInputExposed extends BaseFormFieldExposed {}
