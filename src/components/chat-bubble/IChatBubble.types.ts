/**
 * IChatBubble Component Types
 *
 * Type definitions for the IChatBubble component including props,
 * emits, and related types.
 */

/**
 * Attachment interface for files, images, and audio
 */
export interface ChatBubbleAttachment {
	/**
	 * Source URL of the attachment
	 */
	source: string;

	/**
	 * Name of the attachment
	 */
	name: string;

	/**
	 * Size of the attachment (e.g., "32mb")
	 */
	size?: string;

	/**
	 * MIME type of the attachment
	 */
	type?: string;
}

/**
 * Video attachment interface with additional video-specific options
 */
export interface ChatBubbleVideoAttachment extends ChatBubbleAttachment {
	/**
	 * Video URL
	 */
	url: string;

	/**
	 * Video player options
	 */
	options: {
		/**
		 * Show video controls
		 */
		controls?: boolean;

		/**
		 * Mute the video
		 */
		mute?: boolean;

		/**
		 * Loop the video
		 */
		loop?: boolean;

		/**
		 * Start time in seconds
		 */
		startTime?: number;

		/**
		 * Autoplay the video
		 */
		autoplay?: boolean;

		/**
		 * Mobile-specific settings
		 */
		mobile?: boolean;
	};
}

/**
 * Attachments collection interface
 */
export interface ChatBubbleAttachments {
	/**
	 * Array of video attachments
	 */
	videos?: ChatBubbleVideoAttachment[];

	/**
	 * Array of image attachments
	 */
	images?: ChatBubbleAttachment[];

	/**
	 * Array of audio attachments
	 */
	audios?: ChatBubbleAttachment[];

	/**
	 * Array of file attachments
	 */
	files?: ChatBubbleAttachment[];
}

/**
 * Props interface for IChatBubble component
 */
export interface IChatBubbleProps {
	/**
	 * To set active color
	 */
	isActive?: boolean;

	/**
	 * A list of attachments
	 */
	attachments?: ChatBubbleAttachments;
}

/**
 * Emits interface for IChatBubble component
 */
export interface IChatBubbleEmits {
	/**
	 * Emitted when an image has finished loading
	 */
	(e: "imageLoaded"): void;
}
