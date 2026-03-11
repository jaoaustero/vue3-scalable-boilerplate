/**
 * ISearch Component Types
 *
 * Type definitions for the ISearch component and subcomponents.
 */

/**
 * Option item for search results list
 */
export interface ISearchOption {
	id: number | string;
	title: string;
	subtitle?: string;
}

/**
 * Props for the main ISearch component
 */
export interface ISearchProps {
	/** Show the search icon button */
	hasIcon?: boolean;
	/** Show the icon on the left side */
	iconFlip?: boolean;
	/** Show the loader in the dropdown */
	isLoading?: boolean;
	/** Whether the dropdown is open */
	isOpen?: boolean;
	/** Collection of options to display */
	options?: ISearchOption[];
	/** Limit for showing option items before "Show all" */
	optionsLimit?: number;
	/** Delay in ms before emitting submitSearch after typing */
	searchDelay?: number;
	/** Current input value (v-model) */
	modelValue?: string;
	/** Placeholder text */
	placeholderText?: string;
	/** Total number of results (for "Show all X results") */
	totalResults?: number;
	/** Extra class for the search button */
	btnClass?: string;
	/** Tab index for focusable elements */
	tabindex?: number;
}

/**
 * Emits for the main ISearch component
 */
export interface ISearchEmits {
	(e: "update:modelValue", value: string): void;
	(e: "update:isOpen", open: boolean): void;
	(e: "clearInput"): void;
	(e: "submitSearch"): void;
	(e: "selectOption", option: ISearchOption): void;
	(e: "showAll"): void;
}

/**
 * Props for ISearchList (internal)
 */
export interface ISearchListProps {
	highlightItem: number;
	highlightShowAll: boolean;
	isLoading: boolean;
	options: ISearchOption[];
	optionsLimit: number;
	reducedOptions: ISearchOption[];
	totalResults: number;
	textAlign?: boolean;
}

/**
 * Props for ISearchDropdown (internal)
 */
export interface ISearchDropdownProps {
	isOpen: boolean;
}
