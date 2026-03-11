/**
 * IRating Component Types
 *
 * Type definitions for the IRating component including props,
 * emits, and related types.
 */

/**
 * Rating icon type
 */
export type RatingType = "thumb" | "yellow" | "orange";

/**
 * Props interface for IRating component
 */
export interface IRatingProps {
	/**
	 * Remove the Image and set it to text
	 */
	isText?: boolean;

	/**
	 * Type of the icon svg
	 */
	type?: RatingType;

	/**
	 * Disable the like button
	 */
	isLikeDisabled?: boolean;

	/**
	 * Disable the dislike button
	 */
	isDislikeDisabled?: boolean;

	/**
	 * Asset path for images
	 */
	assetPath?: string;

	/**
	 * Custom text for the upvote button
	 */
	upVoteText?: string;

	/**
	 * Custom text for the downvote button
	 */
	downVoteText?: string;

	/**
	 * Aria label for upvote button
	 */
	upVoteLabel?: string;

	/**
	 * Aria label for downvote button
	 */
	downVoteLabel?: string;
}

/**
 * Emits interface for IRating component
 */
export interface IRatingEmits {
	/**
	 * Emitted when the like button is clicked
	 */
	(e: "like"): void;

	/**
	 * Emitted when the dislike button is clicked
	 */
	(e: "dislike"): void;
}
