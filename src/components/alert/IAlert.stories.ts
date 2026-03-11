import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";

import IAlert from "./IAlert.vue";
import type { AlertStatus, AlertSize } from "./IAlert.types";

const meta: Meta<typeof IAlert> = {
	title: "Atoms/Alert",
	component: IAlert,
	parameters: {
		docs: {
			description: {
				component: "A message that calls the attention and alert user",
			},
		},
	},
	argTypes: {
		title: {
			control: "text",
		},
		description: {
			control: "text",
		},
		status: {
			control: {
				type: "select",
			},
			options: ["success", "warning", "danger"] as AlertStatus[],
		},
		size: {
			control: {
				type: "select",
			},
			options: ["xsmall", "small", "medium"] as AlertSize[],
		},
		icon: {
			control: "text",
		},
		isDismissable: {
			control: "boolean",
		},
		isAutoDismissable: {
			control: "boolean",
		},
		dismissCountdown: {
			control: "number",
		},
		isMobile: {
			control: "boolean",
		},
		onDismiss: {
			action: "dismissed",
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IAlert>;

const renderWithIcon =
	(iconMarkup = ""): StoryFn<typeof IAlert> =>
	(args) => ({
		components: { IAlert },
		setup() {
			return { args };
		},
		template: `
			<i-alert v-bind="args" @dismiss="args.onDismiss">
				${iconMarkup ? `<template #icon>${iconMarkup}</template>` : ""}
			</i-alert>`,
	});

export const DefaultStyle: Story = {
	render: renderWithIcon('<span aria-hidden="true">⚠️</span>'),
	args: {
		icon: "warning-triangle",
		title: "Status: All system is operational",
		description: "Updated: April 11, 11:12 UTC",
	},
};

export const ChangeIcon: Story = {
	render: renderWithIcon('<span aria-hidden="true">✏️</span>'),
	args: {
		icon: "edit",
		title: "Changed named is applied!",
		description: "Restarting in 3",
	},
};

export const SuccessStatus: Story = {
	render: renderWithIcon('<span aria-hidden="true">👍</span>'),
	args: {
		status: "success",
		icon: "thumbs-up",
		title: "Status: All system is operational",
		description: "Updated: April 11, 11:12 UTC",
	},
};

export const WarningStatus: Story = {
	render: renderWithIcon('<span aria-hidden="true">🔇</span>'),
	args: {
		status: "warning",
		icon: "mute",
		title: "Status: Mute applied",
		description: "There will be no sounds",
	},
};

export const DangerStatus: Story = {
	render: renderWithIcon('<span aria-hidden="true">❌</span>'),
	args: {
		status: "danger",
		icon: "details",
		title: "Unable to upload file. Please try again.",
		description: "my-image.gif",
	},
};

export const Dismissable: Story = {
	render: renderWithIcon('<span aria-hidden="true">ℹ️</span>'),
	args: {
		icon: "details",
		title: "Status : All system is operational",
		description: "my-image.gif",
		isDismissable: true,
	},
};

export const AutoDismissable: Story = {
	render: renderWithIcon('<span aria-hidden="true">ℹ️</span>'),
	args: {
		status: "danger",
		icon: "details",
		title: "Status : All system is operational",
		description: "my-image.gif",
		isAutoDismissable: true,
	},
};

export const DismissableShowOnMobile: Story = {
	render: renderWithIcon('<span aria-hidden="true">ℹ️</span>'),
	args: {
		icon: "details",
		title: "Status : All system is operational",
		description: "my-image.gif",
		isDismissable: true,
		isMobile: true,
	},
};

export const NoIcon: Story = {
	render: renderWithIcon(),
	args: {
		title: "Status : All system is operational",
		description: "my-image.gif",
	},
};

export const SizeModifier: Story = {
	render: renderWithIcon('<span aria-hidden="true">🔇</span>'),
	args: {
		icon: "mute",
		title: "Status : All system is operational",
		description: "my-image.gif",
		size: "xsmall",
	},
};
