/**
 * IEmoji Component Types
 *
 * Shared type definitions for the IEmoji, IEmojiGroup,
 * and IEmojiPicker components.
 */

declare global {
	interface Window {
		emojione?: any;
	}
}

/**
 * Single emoji item with a display title
 */
export interface EmojiItem {
	title: string;
}

/**
 * Raw category data before filtering
 */
export interface EmojiCategoryData {
	name: string;
	emoji: string;
	header: string;
	content: string[];
	show: boolean;
}

/**
 * Filtered category used by EmojiGroup and EmojiPicker
 */
export interface EmojiFilteredCategory {
	category_name: string;
	emoji: string;
	name: string;
	header: string;
	emojis: EmojiItem[];
	show: boolean;
}
