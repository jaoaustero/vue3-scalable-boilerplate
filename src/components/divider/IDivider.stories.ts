import type { Meta, StoryObj } from "@storybook/vue3";

import IDivider from "./IDivider.vue";
import type { IDividerProps } from "./IDivider.types";

const meta: Meta<typeof IDivider> = {
	title: "Atoms/Divider",
	parameters: {
		docs: {
			description: {
				component: "A divider component to visually separate content sections",
			},
		},
	},
	component: IDivider,
	tags: ["autodocs"],
	argTypes: {
		title: {
			control: "text",
			description: "Optional title text to display inside the divider",
		},
		isDashed: {
			control: "boolean",
			description: "Apply dashed line style to the divider",
		},
		isDotted: {
			control: "boolean",
			description: "Apply dotted line style to the divider",
		},
	},
};

export default meta;

type Story = StoryObj<typeof IDivider>;

export const Default: Story = {
	render: (args) => ({
		components: { IDivider },
		setup() {
			return { args };
		},
		template: `
			<IDivider v-bind="args" />
		`,
	}),
	args: {} satisfies Partial<IDividerProps>,
};

export const WithTitle: Story = {
	...Default,
	args: {
		title: "Section Title",
	} satisfies Partial<IDividerProps>,
};

export const Dashed: Story = {
	...Default,
	args: {
		isDashed: true,
	} satisfies Partial<IDividerProps>,
};

export const DashedWithTitle: Story = {
	...Default,
	args: {
		title: "Dashed Section",
		isDashed: true,
	} satisfies Partial<IDividerProps>,
};

export const Dotted: Story = {
	...Default,
	args: {
		isDotted: true,
	} satisfies Partial<IDividerProps>,
};

export const DottedWithTitle: Story = {
	...Default,
	args: {
		title: "Dotted Section",
		isDotted: true,
	} satisfies Partial<IDividerProps>,
};
