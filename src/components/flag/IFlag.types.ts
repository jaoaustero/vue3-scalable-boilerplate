/**
 * IFlag Component Types
 */

import type { Size } from "@/types/common";

/**
 * Available flag sizes
 */
export type FlagSize = Extract<
	Size,
	"xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge"
>;

/**
 * Props interface for IFlag component
 */
export interface IFlagProps {
	/**
	 * Base path to the assets directory that contains flag SVG files.
	 * Flags are expected at `{assetPath}/images/flags-square/{type}.svg`.
	 */
	assetPath?: string;

	/**
	 * Country or region code that maps to an SVG file (e.g. `"us"`, `"gb"`, `"fr"`).
	 * Falls back to the United Nations flag (`un.svg`) if the image fails to load.
	 */
	type: string;

	/**
	 * A size modifier that increases or decreases the flag dimensions.
	 * @values 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
	 */
	size?: FlagSize;

	/**
	 * Accessible alternative text for the flag image.
	 * Defaults to `"{type} flag"` when not provided.
	 */
	alt?: string;
}
