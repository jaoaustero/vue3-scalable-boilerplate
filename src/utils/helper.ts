// Validator.js Tree-shakeable subsets of ES
import isEmpty from 'validator/es/lib/isEmpty';
import isEmail from 'validator/es/lib/isEmail';
import isLength from 'validator/es/lib/isLength';

export interface ValidationResult {
	isValid: boolean;
	message: string;
}

export interface ValidateOptions {
	value: string;
	type: 'email' | 'name' | 'phone';
}

/**
 * Helper utilities for validation and other common operations
 */
export const Helper = {
	/**
	 * Validates input based on the specified type using validator.js
	 *
	 * @param options - Object containing value and type to validate
	 * @returns ValidationResult with isValid flag and error message
	 * @see {@link https://github.com/validatorjs/validator.js}
	 */
	isValid({ value = '', type }: ValidateOptions): ValidationResult {
		if (type === 'email') {
			const isEmailValid = isEmail(value, {
				allow_display_name: false,
				require_display_name: false,
				allow_utf8_local_part: true,
				require_tld: true
			});

			if (isEmailValid && value.length <= 150) {
				return {
					isValid: true,
					message: ''
				};
			} else {
				return {
					isValid: false,
					message: 'Invalid email address'
				};
			}
		} else if (type === 'name') {
			if (isLength(value, { min: 0, max: 40 })) {
				return {
					isValid: true,
					message: ''
				};
			} else {
				return {
					isValid: false,
					message: 'Must not be exceed in 40 characters'
				};
			}
		} else if (type === 'phone') {
			if (value.length === 0) {
				return {
					isValid: false,
					message: 'Invalid phone number length'
				};
			} else {
				return {
					isValid: true,
					message: ''
				};
			}
		} else {
			throw new Error('Invalid type');
		}
	},

	/**
	 * Checks if a string is empty using validator.js isEmpty
	 *
	 * @param value - String to check
	 * @returns Boolean indicating if the value is empty
	 */
	isEmpty(value = ''): boolean {
		return isEmpty(value);
	},

	/**
	 * Generates a random UUID-like string for ID purposes
	 *
	 * @returns A unique string identifier
	 */
	generateUUID(): string {
		const alphabet = 'abcdefghijklmnopqrstuvwxyz';
		const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
		const newDate = new Date().getTime();

		return `${randomCharacter}${Math.random().toString(32).substring(2)}${newDate}`;
	},

	/**
	 * Generates a random integer between 1 and 4
	 *
	 * @returns Random integer from 1 to 4
	 */
	generateRandomInt(): number {
		return Math.floor(Math.random() * 3 + 1);
	},

	/**
	 * Converts pixels to rem units
	 *
	 * @param px - Pixel value to convert
	 * @returns Rem value
	 */
	convertPixelToRem(px: number): number {
		const baseFontSize = 16;
		return (1 / baseFontSize) * px;
	},

	/**
	 * Convert pixels to rems
	 * @param pixels - The number of pixels to convert
	 * @returns {number} The number of rems
	*/
	pxToRem(pixels: number): number {
		return pixels / 16;
	},

	/**
	 * Convert rems to pixels
	 * @param rems - The number of rems to convert
	 * @returns {number} The number of pixels
	 */
	remToPx(rems: number): number {
		return rems * 16;
	},
};
