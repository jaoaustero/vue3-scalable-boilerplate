import type { Meta, StoryObj } from "@storybook/vue3";

import IIcon from "./IIcon.vue";

const iconModules = import.meta.glob("@/assets/images/icons/*.svg", {
	eager: true,
	query: "?raw",
	import: "default",
}) as Record<string, string>;

const iconNames = Object.keys(iconModules)
	.map((path) => path.split("/").pop()?.replace(".svg", ""))
	.filter((iconName): iconName is string => Boolean(iconName))
	.sort((first, second) => first.localeCompare(second));

const meta: Meta<typeof IIcon> = {
	title: "Atoms/Icon",
	parameters: {
		docs: {
			description: {
				component: "Icon component for rendering svg assets.",
			},
		},
	},
	component: IIcon,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: iconNames,
		},
		label: {
			control: "text",
		},
	},
	args: {
		type: iconNames[0] ?? "add-note",
		label: iconNames[0] ?? "add-note",
	},
};

export default meta;
type Story = StoryObj<typeof IIcon>;

export const Default: Story = {
	render: (args) => ({
		components: { IIcon },
		setup() {
			return { args };
		},
		template: `
			<IIcon v-bind="args" />`,
	}),
};

export const AllIcons: Story = {
	render: () => ({
		components: { IIcon },
		setup() {
			return { iconNames };
		},
		template: `
			<div
				style="
					width: 100%;
					padding: 60px 40px;
					box-sizing: border-box;
					display: grid;
					grid-template-columns: repeat(10, minmax(140px, 1fr));
					gap: 16px;
				"
			>
				<div
					v-for="iconName in iconNames"
					:key="iconName"
					style="
						display: flex;
						align-items: center;
						gap: 20px;
						padding: 10px 12px;
						border: 1px solid #e9ecef;
						border-radius: 8px;
						color: #2f3137;
						background: #ffffff;
					"
				>
					<IIcon :type="iconName" :label="iconName" style="height: 24px; width: 24px;"/>
					<span style="font-size: 14px;">{{ iconName }}</span>
				</div>
			</div>
		`,
	}),
};
