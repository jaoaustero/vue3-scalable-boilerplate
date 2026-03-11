import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";

import IFlag from "./IFlag.vue";
import type { FlagSize } from "./IFlag.types";

const flagSizes: FlagSize[] = [
	"xsmall",
	"small",
	"medium",
	"large",
	"xlarge",
	"xxlarge",
];

const meta: Meta<typeof IFlag> = {
	title: "Atoms/Flag",
	component: IFlag,
	parameters: {
		docs: {
			description: {
				component:
					"Displays a square country or region flag SVG. Falls back to the UN flag when the image fails to load.",
			},
		},
	},
	argTypes: {
		type: {
			control: "text",
			description: "Country or region code (e.g. \"us\", \"gb\", \"fr\")",
		},
		assetPath: {
			control: "text",
			description: "Base path to the assets directory",
		},
		size: {
			control: { type: "select" },
			options: flagSizes,
			description: "Size modifier",
		},
		alt: {
			control: "text",
			description: "Accessible alternative text for the flag image",
		},
	},
	args: {
		type: "us",
		assetPath: "/src/assets",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IFlag>;

const renderFlag: StoryFn<typeof IFlag> = (args) => ({
	components: { IFlag },
	setup() {
		return { args };
	},
	template: '<i-flag v-bind="args" />',
});

export const DefaultStyle: Story = {
	render: renderFlag,
	args: {},
};

export const TypeModifier: Story = {
	render: renderFlag,
	args: {
		type: "gb",
	},
};

export const XsmallSizeModifier: Story = {
	render: renderFlag,
	args: {
		size: "xsmall",
	},
};

export const SmallSizeModifier: Story = {
	render: renderFlag,
	args: {
		size: "small",
	},
};

export const MediumSizeModifier: Story = {
	render: renderFlag,
	args: {
		size: "medium",
	},
};

export const LargeSizeModifier: Story = {
	render: renderFlag,
	args: {
		size: "large",
	},
};

export const XLargeSizeModifier: Story = {
	render: renderFlag,
	args: {
		size: "xlarge",
	},
};

export const XXLargeSizeModifier: Story = {
	render: renderFlag,
	args: {
		size: "xxlarge",
	},
};

export const WithCustomAlt: Story = {
	render: renderFlag,
	args: {
		type: "fr",
		alt: "Flag of France",
	},
};

export const FallbackOnError: Story = {
	render: renderFlag,
	args: {
		type: "invalid-country-code",
	},
	parameters: {
		docs: {
			description: {
				story:
					"When the flag image fails to load, the component automatically falls back to the UN flag (`un.svg`).",
			},
		},
	},
};

export const AllSizes: Story = {
	render: (args) => ({
		components: { IFlag },
		setup() {
			return { args, flagSizes };
		},
		template: `
			<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
				<i-flag
					v-for="size in flagSizes"
					:key="size"
					v-bind="args"
					:size="size"
				/>
			</div>
		`,
	}),
	args: {
		type: "us",
	},
	parameters: {
		docs: {
			description: {
				story: "All available size modifiers from xsmall to xxlarge.",
			},
		},
	},
};
