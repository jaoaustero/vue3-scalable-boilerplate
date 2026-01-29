import type { Meta, StoryObj } from "@storybook/vue3";

import IContainer from "./IContainer.vue";
import type { IContainerProps, ContainerSize } from "./IContainer.types";

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
			options: ["small", "medium", "large"] as ContainerSize[],
			description: "The size of the container",
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
	args: {} satisfies Partial<IContainerProps>,
};

export const Small: Story = {
	...Default,
	args: {
		size: "small",
	} satisfies Partial<IContainerProps>,
};

export const Medium: Story = {
	...Default,
	args: {
		size: "medium",
	} satisfies Partial<IContainerProps>,
};

export const Large: Story = {
	...Default,
	args: {
		size: "large",
	} satisfies Partial<IContainerProps>,
};
