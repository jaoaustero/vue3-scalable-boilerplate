import type { Meta, StoryObj } from "@storybook/vue3";

import IButton from "./IButton.vue";
import type { IButtonProps, ButtonColor, ButtonSize } from "./IButton.types";

const meta: Meta<typeof IButton> = {
	title: "Atoms/Button",
	parameters: {
		docs: {
			description: {
				component: "Easily create nice looking buttons, which come in different styles.",
			},
		},
	},
	component: IButton,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: ["default", "primary", "secondary", "warning", "danger"] as ButtonColor[],
			description: "A color that has traffic light color base on the status",
		},
		href: {
			control: "text",
			description: "A site link that will convert the button to anchor",
		},
		isCircle: {
			control: "boolean",
			description: "Make the circle that mostly used as floating action button",
		},
		isDashed: {
			control: "boolean",
			description: "A modifier that will make the background to white with a border dashed",
		},
		isDisabled: {
			control: "boolean",
			description: "Make the button unclickable and apply idle style color",
		},
		isOutline: {
			control: "boolean",
			description: "A modifier that will make the background to white",
		},
		isRounded: {
			control: "boolean",
			description: "A modifier that will make the button border sharpless",
		},
		isText: {
			control: "boolean",
			description: "Make the button look like a plain text",
		},
		isSquare: {
			control: "boolean",
			description: "Make the button padding consistent",
		},
		size: {
			control: "select",
			options: ["small", "medium", "large"] as ButtonSize[],
			description: "Increase or decrease the dimension and gutter of the button",
		},
		label: {
			control: "text",
			description: "Label to describe the button that will be used on wcag attributes",
		},
		onClick: { action: "clicked" },
	},
};

export default meta;
type Story = StoryObj<typeof IButton>;

export const DefaultButton: Story = {
	render: (args) => ({
		components: { IButton },
		setup() {
			return { args };
		},
		template: `
			<IButton v-bind="args">
				Button
			</IButton>`,
	}),

	args: {
		label: "Default Button",
	} satisfies Partial<IButtonProps>,
};

export const PrimaryButton: Story = {
	...DefaultButton,
	args: {
		color: "primary",
		label: "Primary Button",
	} satisfies Partial<IButtonProps>,
};

export const SecondaryButton: Story = {
	...DefaultButton,
	args: {
		color: "secondary",
		label: "Secondary Button",
	} satisfies Partial<IButtonProps>,
};

export const WarningButton: Story = {
	...DefaultButton,
	args: {
		color: "warning",
		label: "Warning Button",
	} satisfies Partial<IButtonProps>,
};

export const DangerButton: Story = {
	...DefaultButton,
	args: {
		color: "danger",
		label: "Danger Button",
	} satisfies Partial<IButtonProps>,
};

export const LinkButton: Story = {
	...DefaultButton,
	args: {
		href: "htts://google.com",
		label: "Link Button",
	} satisfies Partial<IButtonProps>,
};

export const CircleButton: Story = {
	...DefaultButton,
	args: {
		isCircle: true,
		label: "Circle Button",
	} satisfies Partial<IButtonProps>,
};

export const DashedButton: Story = {
	...DefaultButton,
	args: {
		isDashed: true,
		label: "Dashed Button",
	} satisfies Partial<IButtonProps>,
};

export const OutlineButton: Story = {
	...DefaultButton,
	args: {
		isOutline: true,
		label: "Outline Button",
	} satisfies Partial<IButtonProps>,
};

export const OutlinePrimaryButton: Story = {
	...DefaultButton,
	args: {
		isOutline: true,
		color: "primary",
		label: "Outline Primary Button",
	} satisfies Partial<IButtonProps>,
};

export const RoundedButton: Story = {
	...DefaultButton,
	args: {
		isRounded: true,
		label: "Rounded Button",
	} satisfies Partial<IButtonProps>,
};

export const TextButton: Story = {
	...DefaultButton,
	args: {
		isText: true,
		label: "Text Button",
	} satisfies Partial<IButtonProps>,
};

export const SmallButton: Story = {
	...DefaultButton,
	args: {
		size: "small",
		label: "Small Button",
	} satisfies Partial<IButtonProps>,
};

export const MediumButton: Story = {
	...DefaultButton,
	args: {
		size: "medium",
		label: "Medium Button",
	} satisfies Partial<IButtonProps>,
};

export const LargeButton: Story = {
	...DefaultButton,
	args: {
		size: "large",
		label: "Large Button",
	} satisfies Partial<IButtonProps>,
};
