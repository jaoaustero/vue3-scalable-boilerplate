import type { Meta, StoryObj } from "@storybook/vue3";
import IChatInput from "./IChatInput.vue";

const meta = {
	title: "Organisms/ChatInput",
	component: IChatInput,
	tags: ["autodocs"],
	argTypes: {
		placeholder: {
			control: "text",
			description: "Placeholder text for the textarea",
		},
		features: {
			control: "object",
			description: "Feature toggles for emoji, rating, and uploads",
		},
	},
	args: {
		placeholder: "Type here and press enter...",
		features: {
			emoji: true,
			rating: true,
			uploads: true,
		},
	},
} satisfies Meta<typeof IChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Type here and press enter...",
	},
	render: (args) => ({
		components: { IChatInput },
		setup() {
			const handleSendMessage = (payload: any) => {
				console.log("Send message:", payload);
			};

			const handleMessageTyping = (event: KeyboardEvent) => {
				console.log("Typing:", event);
			};

			const handleRatingClicked = (rating: number) => {
				console.log("Rating:", rating);
			};

			const handleFilesAdded = () => {
				console.log("Files added");
			};

			const handleFilesRemoved = () => {
				console.log("Files removed");
			};

			const handleEmojiPreview = (show: boolean) => {
				console.log("Emoji preview:", show);
			};

			const handleFocus = () => {
				console.log("Input focused");
			};

			const handleBlur = () => {
				console.log("Input blurred");
			};

			const handleTextareaResized = (heightChange: number) => {
				console.log("Textarea resized:", heightChange);
			};

			return {
				args,
				handleSendMessage,
				handleMessageTyping,
				handleRatingClicked,
				handleFilesAdded,
				handleFilesRemoved,
				handleEmojiPreview,
				handleFocus,
				handleBlur,
				handleTextareaResized,
			};
		},
		template: `
			<div style="margin-top: 300px; width: 400px; padding: 15px; background: #f5f5f5; border-radius: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, .10);">
				<i-chat-input
					v-bind="args"
					@sendMessage="handleSendMessage"
					@messageTyping="handleMessageTyping"
					@ratingClicked="handleRatingClicked"
					@filesAdded="handleFilesAdded"
					@filesRemoved="handleFilesRemoved"
					@emojiPreview="handleEmojiPreview"
					@focus="handleFocus"
					@blur="handleBlur"
					@textareaResized="handleTextareaResized"
				/>
			</div>
		`,
	}),
};

export const NoEmoji: Story = {
	args: {
		placeholder: "Type here and press enter...",
		features: {
			emoji: false,
			rating: true,
			uploads: true,
		},
	},
	render: (args) => ({
		components: { IChatInput },
		setup() {
			return { args };
		},
		template: `
			<div style="margin-top: 300px; width: 400px; padding: 15px; background: #f5f5f5; border-radius: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, .10);">
				<i-chat-input v-bind="args" />
			</div>
		`,
	}),
};

export const NoRating: Story = {
	args: {
		placeholder: "Type here and press enter...",
		features: {
			emoji: true,
			rating: false,
			uploads: true,
		},
	},
	render: (args) => ({
		components: { IChatInput },
		setup() {
			return { args };
		},
		template: `
			<div style="margin-top: 300px; width: 400px; padding: 15px; background: #f5f5f5; border-radius: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, .10);">
				<i-chat-input v-bind="args" />
			</div>
		`,
	}),
};

export const NoUpload: Story = {
	args: {
		placeholder: "Type here and press enter...",
		features: {
			emoji: true,
			rating: true,
			uploads: false,
		},
	},
	render: (args) => ({
		components: { IChatInput },
		setup() {
			return { args };
		},
		template: `
			<div style="margin-top: 300px; width: 400px; padding: 15px; background: #f5f5f5; border-radius: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, .10);">
				<i-chat-input v-bind="args" />
			</div>
		`,
	}),
};

export const NoFeatures: Story = {
	args: {
		placeholder: "Type here and press enter...",
		features: {
			emoji: false,
			rating: false,
			uploads: false,
		},
	},
	render: (args) => ({
		components: { IChatInput },
		setup() {
			return { args };
		},
		template: `
			<div style="margin-top: 300px; width: 400px; padding: 15px; background: #f5f5f5; border-radius: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, .10);">
				<i-chat-input v-bind="args" />
			</div>
		`,
	}),
};

export const WithLongPlaceholder: Story = {
	args: {
		placeholder:
			"Type your message here and press enter to send, or shift+enter for a new line...",
		features: {
			emoji: true,
			rating: true,
			uploads: true,
		},
	},
	render: (args) => ({
		components: { IChatInput },
		setup() {
			return { args };
		},
		template: `
			<div style="margin-top: 300px; width: 400px; padding: 15px; background: #f5f5f5; border-radius: 10px; box-shadow: 0px 2px 8px rgba(0, 0, 0, .10);">
				<i-chat-input v-bind="args" />
			</div>
		`,
	}),
};
