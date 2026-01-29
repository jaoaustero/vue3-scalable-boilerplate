/**
 * Available icon sizes
 */
export const iconSizes = [
	"xsmall",
	"small",
	"medium",
	"large",
	"xlarge",
	"xxlarge",
] as const;

/**
 * Icon size type
 */
export type IIconSize = (typeof iconSizes)[number];

/**
 * Icon name type
 * Auto-generated icon names will be determined at runtime
 */
export type IIconName = string;

/**
 * Props for the IIcon component
 */
export interface IIconProps {
	/**
	 * The icon name that matches an SVG asset
	 */
	type: IIconName;

	/**
	 * A size modifier that increases or decreases the icon size
	 */
	size?: IIconSize;

	/**
	 * Accessible label for the icon
	 */
	label?: string;
}
