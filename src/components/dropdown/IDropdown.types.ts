/**
 * Position modifier for the dropdown menu
 */
export type IDropdownPosition = 'left' | 'right';

/**
 * Props for the IDropdown component
 */
export interface IDropdownProps {
	/**
	 * Toggles the dropdown menu
	 */
	isOpen: boolean;

	/**
	 * Position of the dropdown menu
	 */
	position?: IDropdownPosition;
}

/**
 * Events emitted by the IDropdown component
 */
export interface IDropdownEmits {
	/**
	 * Emitted when the dropdown open state is updated (v-model style)
	 */
	(e: 'update:isOpen', value: boolean): void;

	/**
	 * Emitted when a click happens inside the dropdown root (optional)
	 */
	(e: 'click', event: MouseEvent): void;
}
