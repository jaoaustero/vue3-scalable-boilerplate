/**
 * Common Types
 *
 * Shared, generic type definitions used across multiple components.
 * These types eliminate duplication and provide a single source of truth
 * for common patterns found throughout the component library.
 */

// ─── Size ────────────────────────────────────────────────────────────────────

/**
 * All available size values used across the component library.
 *
 * Components use `Extract<Size, ...>` to pick the subset they support.
 *
 * @example
 * // Component that only supports small and medium
 * type MyComponentSize = Extract<Size, "small" | "medium">;
 */
export type Size =
	| "xsmall"
	| "small"
	| "medium"
	| "large"
	| "xlarge"
	| "xxlarge";

// ─── Status ──────────────────────────────────────────────────────────────────

/**
 * Semantic status values (traffic-light pattern) used for visual feedback.
 *
 * Components use `Extract<Status, ...>` to pick the subset they support.
 *
 * @example
 * // Component that only supports success and danger
 * type MyComponentStatus = Extract<Status, "success" | "danger">;
 */
export type Status = "success" | "warning" | "danger";

// ─── Position ────────────────────────────────────────────────────────────────

/**
 * Horizontal alignment / position values.
 *
 * Components use `Extract<HorizontalPosition, ...>` to pick the subset they support.
 */
export type HorizontalPosition = "left" | "right" | "center";

// ─── Validation ──────────────────────────────────────────────────────────────

/**
 * Supported validation types for form fields.
 */
export type ValidationType = "" | "email" | "name" | "phone";

// ─── Form Field ──────────────────────────────────────────────────────────────

/**
 * Base props shared by all form field components (input, textarea, checkbox, radio).
 */
export interface BaseFormFieldProps {
	/**
	 * Error messages keyed by invalidType, displayed under the field
	 */
	errorMessage?: Record<string, string>;

	/**
	 * When true, value is required and empty state triggers error
	 */
	isRequired?: boolean;

	/**
	 * Label text for the field
	 */
	label?: string | null;
}

/**
 * Base props for text-based form fields (input, textarea).
 * Extends BaseFormFieldProps with text-input-specific properties.
 */
export interface BaseTextFieldProps extends BaseFormFieldProps {
	/**
	 * When true, applies success border and label color
	 */
	isSuccess?: boolean;

	/**
	 * Bound value (v-model)
	 */
	modelValue?: string;

	/**
	 * Validation type run on blur
	 */
	validation?: ValidationType;

	/**
	 * Current validation error type (e.g. 'required', 'email')
	 */
	invalidType?: string;
}

/**
 * Base emits for text-based form fields (input, textarea).
 */
export interface BaseTextFieldEmits {
	/**
	 * Emitted when the field value changes
	 */
	(e: "update:modelValue", value: string): void;

	/**
	 * Emitted when the field gains focus
	 */
	(e: "focus"): void;

	/**
	 * Emitted when the field loses focus
	 */
	(e: "blur"): void;

	/**
	 * Emitted when error state changes
	 */
	(e: "update:error", hasError: boolean): void;

	/**
	 * Emitted when invalidType changes
	 */
	(e: "update:invalidType", type: string): void;
}

/**
 * Base exposed methods for form field components that support validation.
 */
export interface BaseFormFieldExposed {
	/**
	 * Validates the field value
	 */
	validate: () => void;
}

// ─── Option ──────────────────────────────────────────────────────────────────

/**
 * Base option interface for selection components (checkbox, radio).
 *
 * Extend this interface to add component-specific option properties.
 *
 * @example
 * interface MyRadioOption extends BaseOption {
 *   name?: string;
 * }
 */
export interface BaseOption {
	/**
	 * Unique identifier
	 */
	id: string | number;

	/**
	 * Option value
	 */
	value: string | number;

	/**
	 * Display label
	 */
	label: string;

	/**
	 * Whether the option is disabled
	 */
	disabled?: boolean;
}
