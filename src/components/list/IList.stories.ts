import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";
import IList from "./IList.vue";
import type { ListSize, ListType } from "./IList.types";

const sizeOptions: ListSize[] = ["xsmall", "small", "medium", "large"];
const typeOptions: ListType[] = ["striped", "divider"];

const meta: Meta<typeof IList> = {
	title: "Molecules/List",
	component: IList,
	parameters: {
		docs: {
			description: {
				component:
					"Display lists with items. Supports ordered and unordered lists with striped or divider styles and multiple size variants.",
			},
		},
	},
	argTypes: {
		isOrdered: {
			control: "boolean",
			description: "Whether to render as ordered list (ol) or unordered list (ul)",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
				category: "Props",
			},
		},
		type: {
			control: { type: "select" },
			options: [undefined, ...typeOptions],
			description: "Visual style type (striped: alternating backgrounds, divider: borders between items)",
			table: {
				type: { summary: "ListType" },
				defaultValue: { summary: "undefined" },
				category: "Props",
			},
		},
		size: {
			control: { type: "select" },
			options: [undefined, ...sizeOptions],
			description: "Size of the list items",
			table: {
				type: { summary: "ListSize" },
				defaultValue: { summary: "undefined" },
				category: "Props",
			},
		},
	},
	args: {
		isOrdered: false,
		type: undefined,
		size: undefined,
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IList>;

const renderDefault: StoryFn<typeof IList> = (args) => ({
	components: { IList },
	setup() {
		return { args };
	},
	template: `
		<div style="width: 250px; border: 1px solid #e5e5e5; border-radius: 4px; overflow: hidden;">
			<IList v-bind="args">
				<li>Show all</li>
				<li>Articles</li>
				<li>Categories</li>
				<li>Tags</li>
				<li>Authors</li>
			</IList>
		</div>
	`,
});

export const Default: Story = {
	render: renderDefault,
	args: {},
};

export const OrderedList: Story = {
	render: renderDefault,
	args: {
		isOrdered: true,
	},
};

export const Striped: Story = {
	render: renderDefault,
	args: {
		type: "striped",
	},
};

export const Divider: Story = {
	render: renderDefault,
	args: {
		type: "divider",
	},
};

export const StripedOrdered: Story = {
	render: renderDefault,
	args: {
		isOrdered: true,
		type: "striped",
	},
};

export const DividerOrdered: Story = {
	render: renderDefault,
	args: {
		isOrdered: true,
		type: "divider",
	},
};

const renderNested: StoryFn<typeof IList> = (args) => ({
	components: { IList },
	setup() {
		return { args };
	},
	template: `
		<div style="width: 250px; border: 1px solid #e5e5e5; border-radius: 4px; overflow: hidden;">
			<IList v-bind="args">
				<li>
					Electronics
					<IList>
						<li>Phones</li>
						<li>Laptops</li>
						<li>Tablets</li>
					</IList>
				</li>
				<li>
					Clothing
					<IList>
						<li>Men</li>
						<li>Women</li>
					</IList>
				</li>
				<li>Accessories</li>
			</IList>
		</div>
	`,
});

export const NestedList: Story = {
	render: renderNested,
	args: {},
};

export const NestedDivider: Story = {
	render: renderNested,
	args: {
		type: "divider",
	},
};

export const SizeXSmall: Story = {
	render: renderDefault,
	args: {
		size: "xsmall",
	},
};

export const SizeSmall: Story = {
	render: renderDefault,
	args: {
		size: "small",
	},
};

export const SizeMedium: Story = {
	render: renderDefault,
	args: {
		size: "medium",
	},
};

export const SizeLarge: Story = {
	render: renderDefault,
	args: {
		size: "large",
	},
};

export const StripedWithSize: Story = {
	render: renderDefault,
	args: {
		type: "striped",
		size: "medium",
	},
};

export const DividerWithSize: Story = {
	render: renderDefault,
	args: {
		type: "divider",
		size: "medium",
	},
};

const renderWithCustomContent: StoryFn<typeof IList> = (args) => ({
	components: { IList },
	setup() {
		return { args };
	},
	template: `
		<div style="width: 320px; border: 1px solid #e5e5e5; border-radius: 4px; overflow: hidden;">
			<IList v-bind="args">
				<li>
					<div style="display: flex; align-items: center; gap: 8px;">
						<span style="width: 8px; height: 8px; border-radius: 50%; background: #03a84e;"></span>
						<span>Dashboard</span>
						<span style="margin-left: auto; font-size: 12px; color: #03a84e;">Active</span>
					</div>
				</li>
				<li>
					<div style="display: flex; align-items: center; gap: 8px;">
						<span style="width: 8px; height: 8px; border-radius: 50%; background: #e5e5e5;"></span>
						<span>Settings</span>
					</div>
				</li>
				<li>
					<div style="display: flex; align-items: center; gap: 8px;">
						<span style="width: 8px; height: 8px; border-radius: 50%; background: #e5e5e5;"></span>
						<span>Profile</span>
					</div>
				</li>
			</IList>
		</div>
	`,
});

export const CustomContent: Story = {
	render: renderWithCustomContent,
	args: {
		type: "divider",
	},
};
