import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";

import ILoader from "./ILoader.vue";
import type { LoaderSize, LoaderType } from "./ILoader.types";

const meta: Meta<typeof ILoader> = {
	title: "Atoms/Loader",
	component: ILoader,
	parameters: {
		docs: {
			description: {
				component: "Loader component with shimmering effect and different types and sizes",
			},
		},
	},
	argTypes: {
		isShimmering: {
			control: "boolean",
		},
		size: {
			control: {
				type: "select",
			},
			options: ["xsmall", "small", "medium", "large", "xlarge"] as LoaderSize[],
		},
		type: {
			control: {
				type: "select",
			},
			options: ["bar", "icon", "avatar"] as LoaderType[],
		},
	},
	args: {
		isShimmering: true,
		type: "bar",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ILoader>;

const renderLoader: StoryFn<typeof ILoader> = (args) => ({
	components: { ILoader },
	setup() {
		return { args };
	},
	template: `<i-loader v-bind="args" />`
});

export const Default: Story = {
	render: renderLoader,
	args: {},
};

export const IconType: Story = {
	render: renderLoader,
	args: {
		type: "icon",
	},
};

export const AvatarType: Story = {
	render: renderLoader,
	args: {
		type: "avatar",
	},
};

export const WithoutShimmering: Story = {
	render: renderLoader,
	args: {
		isShimmering: false,
	},
};
