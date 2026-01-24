import type { Meta, StoryObj } from "@storybook/vue3";

import IBadge from "./IBadge.vue";

const meta: Meta<typeof IBadge> = {
	title: "Atoms/Badge",
	parameters: {
		docs: {
			description: {
				component: "Badge component for displaying notification counts",
			},
		},
	},
	component: IBadge,
	tags: ["autodocs"],
	argTypes: {
		count: {
			control: "number",
		},
	},
};

export default meta;

type Story = StoryObj<typeof IBadge>;

export const Default: Story = {
	render: (args) => ({
		components: { IBadge },
		setup() {
			return { args };
		},
		template: `
			<IBadge v-bind="args" />
		`,
	}),
	args: {
		count: 5,
	},
};

export const Zero: Story = {
	...Default,
	args: {
		count: 0,
	},
};

export const SingleDigit: Story = {
	...Default,
	args: {
		count: 9,
	},
};

export const DoubleDigit: Story = {
	...Default,
	args: {
		count: 42,
	},
};

export const LargeNumber: Story = {
	...Default,
	args: {
		count: 999,
	},
};
