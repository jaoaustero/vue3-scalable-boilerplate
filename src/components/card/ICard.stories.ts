import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";

import ICard from "./ICard.vue";
import type { CardColor, CardSize } from "./ICard.types";

const meta: Meta<typeof ICard> = {
	title: "Atoms/Card",
	component: ICard,
	parameters: {
		docs: {
			description: {
				component: "A box content containers",
			},
		},
	},
	argTypes: {
		color: {
			control: {
				type: "select",
			},
			options: ["default", "inverse", "primary"] as CardColor[],
		},
		size: {
			control: {
				type: "select",
			},
			options: ["xsmall", "small", "medium", "large"] as CardSize[],
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ICard>;

const renderWithSlot =
	(slotMarkup = "Hello world"): StoryFn<typeof ICard> =>
	(args) => ({
		components: { ICard },
		setup() {
			return { args };
		},
		template: `
			<i-card v-bind="args">
				${slotMarkup}
			</i-card>`,
	});

export const DefaultStyle: Story = {
	render: renderWithSlot(),
	args: {},
};

export const ColorModifier: Story = {
	render: renderWithSlot(),
	args: {
		color: "primary",
	},
};

export const InverseColor: Story = {
	render: renderWithSlot(),
	args: {
		color: "inverse",
	},
};

export const SizeXSmall: Story = {
	render: renderWithSlot(),
	args: {
		size: "xsmall",
	},
};

export const SizeSmall: Story = {
	render: renderWithSlot(),
	args: {
		size: "small",
	},
};

export const SizeMedium: Story = {
	render: renderWithSlot(),
	args: {
		size: "medium",
	},
};

export const SizeLarge: Story = {
	render: renderWithSlot(),
	args: {
		size: "large",
	},
};

export const CombinedModifiers: Story = {
	render: renderWithSlot("This is a large primary card"),
	args: {
		color: "primary",
		size: "large",
	},
};
