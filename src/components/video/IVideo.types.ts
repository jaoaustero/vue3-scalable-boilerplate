/**
 * IVideo Component Types
 *
 * Type definitions for the IVideo component including props,
 * video content, and embed options for multiple providers.
 */

/**
 * Supported video embed sources
 */
export type VideoSource =
	| "selfhosted"
	| "youtube"
	| "dailymotion"
	| "vimeo"
	| "loom";

/**
 * Common options shared across embed providers
 */
export interface VideoOptions {
	/** Show native video/embed controls */
	controls?: boolean;
	/** Mute by default */
	mute?: boolean;
	/** Loop playback */
	loop?: boolean;
	/** Autoplay when possible */
	autoplay?: boolean;
	/** Allow autoplay on mobile */
	mobile?: boolean;
	/** Start time (format varies by provider) */
	startTime?: string | number;
	/** End time (selfhosted/youtube/dailymotion) */
	endTime?: string | number;
	/** YouTube: use privacy-enhanced mode (youtube-nocookie.com) */
	privacy?: boolean;
	/** YouTube: modest branding */
	branding?: boolean;
	/** Dailymotion/Vimeo: accent color for controls */
	controlsColor?: string;
	/** Dailymotion: show logo */
	logo?: boolean;
	/** Dailymotion: show start screen info */
	info?: boolean;
	/** Vimeo: show title */
	introTitle?: boolean;
	/** Vimeo: show portrait */
	introPortrait?: boolean;
	/** Vimeo: show byline */
	introByline?: boolean;
}

/**
 * Video content payload (url + source + options)
 */
export interface VideoContent {
	/** URL of the video (provider URL or direct file URL for selfhosted) */
	url: string;
	/** Embed source; if omitted, url is used as-is with query params */
	source?: VideoSource;
	/** Playback and embed options */
	options?: VideoOptions;
}

/**
 * Props interface for IVideo component
 */
export interface IVideoProps {
	/** Video content: url, source, and options */
	content: VideoContent;
	/** When true, autoplay may be disabled on mobile unless options.mobile is set */
	isMobile?: boolean;
}
