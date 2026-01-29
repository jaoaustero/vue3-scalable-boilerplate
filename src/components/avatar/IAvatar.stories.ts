import type { Meta, StoryObj } from "@storybook/vue3";

import IAvatar from "./IAvatar.vue";
import type { IAvatarProps, AvatarColor, AvatarSize } from "./IAvatar.types";

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
			description: "Text for the avatar, at least 1 or 2 characters mostly used for user Initials",
		},
		color: {
			control: "select",
			options: ["default", "primary", "secondary"] as AvatarColor[],
			description: "The color for the avatar background",
		},
		size: {
			control: "select",
			options: ["xsmall", "small", "medium", "large", "xlarge"] as AvatarSize[],
			description: "Specific size or dimension",
		},
		src: {
			control: "text",
			description: "Image source or path",
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
	} satisfies Partial<IAvatarProps>,
};

export const ColorModifier: Story = {
	...Default,
	args: {
		color: "primary",
		label: "P",
	} satisfies Partial<IAvatarProps>,
};

export const SizeModifier: Story = {
	...Default,
	args: {
		size: "small",
		label: "S",
	} satisfies Partial<IAvatarProps>,
};

export const ImageModifier: Story = {
	...Default,
	args: {
		src: "https://tecdn.b-cdn.net/img/new/avatars/2.webp",
		label: "A",
	} satisfies Partial<IAvatarProps>,
};
