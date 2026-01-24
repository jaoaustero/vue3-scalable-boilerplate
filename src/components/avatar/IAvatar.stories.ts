import type { Meta, StoryObj } from "@storybook/vue3";

import IAvatar from "./IAvatar.vue";

const meta: Meta<typeof IAvatar> = {
	title: "Atoms/Avatar",
	parameters: {
		docs: {
			description: {
				component: "Avatar component for displaying user images or initials",
			},
		},
	},
	component: IAvatar,
	tags: ["autodocs"],
	argTypes: {
		label: {
			control: "text",
		},
		color: {
			control: "select",
			options: ["primary", "secondary"],
		},
		size: {
			control: "select",
			options: ["xsmall", "small", "medium", "large", "xlarge"],
		},
		src: {
			control: "text",
		}
	},
};

export default meta;

type Story = StoryObj<typeof IAvatar>;

export const Default: Story = {
	render: (args) => ({
		components: { IAvatar },
		setup() {
			return { args };
		},
		template: `
			<IAvatar v-bind="args">
				Avatar
			</IAvatar>`,
	}),
	args: {
		label: "A",
	},
};

export const ColorModifier: Story = {
	...Default,
	args: {
		color: "primary",
		label: "P",
	},
};

export const SizeModifier: Story = {
	...Default,
	args: {
		size: "small",
		label: "S",
	},
};

export const ImageModifier: Story = {
	...Default,
	args: {
		src: "https://tecdn.b-cdn.net/img/new/avatars/2.webp",
		label: "A",
	},
};
