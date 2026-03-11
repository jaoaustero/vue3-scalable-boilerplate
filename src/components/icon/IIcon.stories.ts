import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";

import IIcon from "./IIcon.vue";
import IButton from "../button/IButton.vue";
import { iconNames, iconSizes } from "./IIcon.types";

const meta: Meta<typeof IIcon> = {
	title: "Atoms/Icon",
	component: IIcon,
	subcomponents: { IButton },
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
		},
		size: {
			control: {
				type: "select",
			},
			options: iconSizes,
		},
		label: {
			control: "text",
		},
	},
	args: {
		type: "alert",
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
	template: '<i-icon v-bind="args" />',
});

export const DefaultStyle: Story = {
	render: renderIcon,
	args: {},
};

export const TypeModifier: Story = {
	render: renderIcon,
	args: {
		type: "user",
	},
};

export const XsmallSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "xsmall",
	},
};

export const SmallSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "small",
	},
};

export const MediumSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "medium",
	},
};

export const LargeSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "large",
	},
};

export const XLargeSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "xlarge",
	},
};

export const XXLargeSizeModifier: Story = {
	render: renderIcon,
	args: {
		size: "xxlarge",
	},
};

export const WithButtonSlot: Story = {
	render: (args) => ({
		components: { IButton, IIcon },
		setup() {
			return { args };
		},
		template: `
			<i-button>
				<i-icon v-bind="args" />
				Button with icon
			</i-button>
		`,
	}),
	args: {
		type: "alert",
		label: "Alert icon",
	},
};
