import type { Meta, StoryObj } from "@storybook/vue3";

import IContainer from "./IContainer.vue";

const meta: Meta<typeof IContainer> = {
	title: "Atoms/Container",
	parameters: {
		docs: {
			description: {
				component: "Container component for wrapping content with consistent sizing",
			},
		},
	},
	component: IContainer,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["small", "medium", "large"],
		},
	},
};

export default meta;

type Story = StoryObj<typeof IContainer>;

export const Default: Story = {
	render: (args) => ({
		components: { IContainer },
		setup() {
			return { args };
		},
		template: `
			<IContainer v-bind="args">
				Container content
			</IContainer>`,
	}),
	args: {},
};

export const Small: Story = {
	...Default,
	args: {
		size: "small",
	},
};

export const Medium: Story = {
	...Default,
	args: {
		size: "medium",
	},
};

export const Large: Story = {
	...Default,
	args: {
		size: "large",
	},
};
