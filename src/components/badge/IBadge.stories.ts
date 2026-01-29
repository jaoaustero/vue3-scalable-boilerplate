import type { Meta, StoryObj } from "@storybook/vue3";

import IBadge from "./IBadge.vue";
import type { IBadgeProps } from "./IBadge.types";

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
			description: "The count to display in the badge. Numbers above 99 will be displayed as \"99+\"",
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
	} satisfies IBadgeProps,
};

export const Zero: Story = {
	...Default,
	args: {
		count: 0,
	} satisfies IBadgeProps,
};

export const SingleDigit: Story = {
	...Default,
	args: {
		count: 9,
	} satisfies IBadgeProps,
};

export const DoubleDigit: Story = {
	...Default,
	args: {
		count: 42,
	} satisfies IBadgeProps,
};

export const LargeNumber: Story = {
	...Default,
	args: {
		count: 999,
	} satisfies IBadgeProps,
};
