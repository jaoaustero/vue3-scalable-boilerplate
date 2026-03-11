import type { Meta, StoryObj } from "@storybook/vue3";
import IRating from "./IRating.vue";

const meta = {
	title: "Molecules/Rating",
	component: IRating,
	tags: ["autodocs"],
	argTypes: {
		isText: {
			control: "boolean",
			description: "Display text instead of icons",
		},
		type: {
			control: "select",
			options: ["thumb", "yellow", "orange"],
			description: "Type of icon to display",
		},
		isLikeDisabled: {
			control: "boolean",
			description: "Disable the like button",
		},
		isDislikeDisabled: {
			control: "boolean",
			description: "Disable the dislike button",
		},
		assetPath: {
			control: "text",
			description: "Path to asset directory",
		},
		upVoteText: {
			control: "text",
			description: "Custom text for upvote button",
		},
		downVoteText: {
			control: "text",
			description: "Custom text for downvote button",
		},
		upVoteLabel: {
			control: "text",
			description: "Aria label for upvote button",
		},
		downVoteLabel: {
			control: "text",
			description: "Aria label for downvote button",
		},
		onLike: {
			action: "like",
		},
		onDislike: {
			action: "dislike",
		},
	},
	parameters: {
		docs: {
			description: {
				component: "A like and dislike rating component for knowledge base articles.",
			},
		},
	},
} satisfies Meta<typeof IRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStyle: Story = {
	args: {
		assetPath: "",
	},
	render: (args) => ({
		components: { IRating },
		setup() {
			return { args };
		},
		template: `
			<i-rating
				v-bind="args"
				@like="args.onLike"
				@dislike="args.onDislike"
			/>
		`,
	}),
};

export const YellowEmojiStyle: Story = {
	args: {
		type: "yellow",
		assetPath: "",
	},
	render: (args) => ({
		components: { IRating },
		setup() {
			return { args };
		},
		template: `
			<i-rating
				v-bind="args"
				@like="args.onLike"
				@dislike="args.onDislike"
			/>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: "Rating with yellow emoji icons",
			},
		},
	},
};

export const OrangeEmojiStyle: Story = {
	args: {
		type: "orange",
		assetPath: "",
	},
	render: (args) => ({
		components: { IRating },
		setup() {
			return { args };
		},
		template: `
			<i-rating
				v-bind="args"
				@like="args.onLike"
				@dislike="args.onDislike"
			/>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: "Rating with orange emoji icons",
			},
		},
	},
};

export const TextStyle: Story = {
	args: {
		isText: true,
	},
	render: (args) => ({
		components: { IRating },
		setup() {
			return { args };
		},
		template: `
			<i-rating
				v-bind="args"
				@like="args.onLike"
				@dislike="args.onDislike"
			/>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: "Rating with text labels instead of icons",
			},
		},
	},
};

export const DisabledLike: Story = {
	args: {
		isLikeDisabled: true,
		assetPath: "",
	},
	render: (args) => ({
		components: { IRating },
		setup() {
			return { args };
		},
		template: `
			<i-rating
				v-bind="args"
				@like="args.onLike"
				@dislike="args.onDislike"
			/>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: "Rating with like button disabled",
			},
		},
	},
};

export const CustomText: Story = {
	args: {
		isText: true,
		upVoteText: "Helpful",
		downVoteText: "Not Helpful",
		upVoteLabel: "This was helpful",
		downVoteLabel: "This was not helpful",
	},
	render: (args) => ({
		components: { IRating },
		setup() {
			return { args };
		},
		template: `
			<i-rating
				v-bind="args"
				@like="args.onLike"
				@dislike="args.onDislike"
			/>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: "Rating with custom text and aria labels",
			},
		},
	},
};
