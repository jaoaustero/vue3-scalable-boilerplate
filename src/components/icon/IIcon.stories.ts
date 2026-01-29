import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";

import IIcon from "./IIcon.vue";
import type { IIconProps } from "./IIcon.types";
import { iconSizes } from "./IIcon.types";

const iconModules = import.meta.glob("@/assets/images/icons/*.svg", {
	eager: true,
	query: "?raw",
	import: "default",
}) as Record<string, string>;

const iconNames = Object.keys(iconModules)
	.map((path) => path.split("/").pop()?.replace(".svg", ""))
	.filter((iconName): iconName is string => Boolean(iconName))
	.sort((first, second) => first.localeCompare(second));

const meta: Meta<typeof IIcon> = {
	title: "Atoms/Icon",
	component: IIcon,
	parameters: {
		docs: {
			description: {
				component: "Display an SVG icon from the shared icon set.",
			},
		},
	},
	argTypes: {
		type: {
			control: {
				type: "select",
			},
			options: iconNames,
			description: "The icon name that matches an SVG asset",
		},
		size: {
			control: {
				type: "select",
			},
			options: iconSizes,
			description: "A size modifier that increases or decreases the icon size",
		},
		label: {
			control: "text",
			description: "Accessible label for the icon",
		},
	},
	args: {
		type: iconNames[0] ?? "add-note",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IIcon>;

const renderIcon: StoryFn<typeof IIcon> = (args) => ({
	components: { IIcon },
	setup() {
		return { args };
	},
	template: "<i-icon v-bind=\"args\" />",
});

export const DefaultStyle: Story = {
	render: renderIcon,
	args: {} satisfies Partial<IIconProps>,
};

export const TypeModifier: Story = {
	render: renderIcon,
	args: {
		type: 'home'
	} satisfies Partial<IIconProps>,
};

export const SmallSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "small",
		type: 'home'
	} satisfies Partial<IIconProps>,
};

export const MediumSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "medium",
		type: 'home'
	} satisfies Partial<IIconProps>,
};

export const LargeSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "large",
		type: 'home'
	} satisfies Partial<IIconProps>,
};

export const XLargeSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "xlarge",
		type: 'home'
	} satisfies Partial<IIconProps>,
};

export const XXLargeSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "xxlarge",
		type: 'home'
	} satisfies Partial<IIconProps>,
};
