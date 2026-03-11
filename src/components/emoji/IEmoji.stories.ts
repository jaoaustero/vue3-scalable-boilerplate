import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import IEmojiPicker from "./IEmojiPicker.vue";
import IEmoji from "./IEmoji.vue";

const meta = {
	title: "Atoms/Emoji",
	component: IEmojiPicker,
	tags: ["autodocs"],
	argTypes: {
		isShow: {
			control: "boolean",
			description: "Controls picker visibility",
		},
	},
	args: {
		isShow: true,
	},
} satisfies Meta<typeof IEmojiPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmojiPicker: Story = {
	args: {
		isShow: true,
	},
	render: (args) => ({
		components: { IEmojiPicker },
		setup() {
			const handleSelect = (emoji: string) => {
				console.log("Selected emoji:", emoji);
			};

			return { args, handleSelect };
		},
		template: `
			<div style="padding: 20px; display: flex; justify-content: center;">
				<i-emoji-picker
					v-bind="args"
					@select="handleSelect"
				/>
			</div>
		`,
	}),
};

export const EmojiRenderer: Story = {
	render: () => ({
		components: { IEmoji },
		template: `
			<div style="padding: 20px; font-size: 16px; line-height: 2;">
				<h3>Shortcode Examples:</h3>
				<p><i-emoji emoji=":smile:" /> Hello World</p>
				<p><i-emoji emoji=":heart:" /> Love <i-emoji emoji=":sparkles:" /></p>
				<p><i-emoji emoji=":thumbsup:" /> <i-emoji emoji=":100:" /> <i-emoji emoji=":fire:" /></p>

				<h3>Unicode Examples:</h3>
				<p><i-emoji emoji="😀" /> Direct Unicode</p>
				<p><i-emoji emoji="❤️" /> <i-emoji emoji="💯" /> <i-emoji emoji="🔥" /></p>

				<h3>Mixed Content:</h3>
				<p><i-emoji emoji=":thinking: Hmm... :grin: Got it! :tada:" /></p>

				<h3>Symbols:</h3>
				<p><i-emoji emoji="™️" /> Trademark</p>
				<p><i-emoji emoji="®️" /> Registered</p>
				<p><i-emoji emoji="©️" /> Copyright</p>
			</div>
		`,
	}),
};

export const EmojiOnly: Story = {
	render: () => ({
		components: { IEmoji },
		template: `
			<div style="padding: 20px;">
				<h3>Single Emoji (larger):</h3>
				<p><i-emoji emoji=":grinning:" /></p>
				<p><i-emoji emoji=":heart:" /></p>
				<p><i-emoji emoji=":rocket:" /></p>

				<h3>With Text (normal size):</h3>
				<p><i-emoji emoji=":smile:" /> Hello!</p>
			</div>
		`,
	}),
};

export const InteractivePicker: Story = {
	render: () => ({
		components: { IEmojiPicker, IEmoji },
		setup() {
			const selectedEmojis = ref<string[]>([]);

			const handleSelect = (emoji: string) => {
				selectedEmojis.value.push(emoji);
			};

			const clearEmojis = () => {
				selectedEmojis.value = [];
			};

			return { selectedEmojis, handleSelect, clearEmojis };
		},
		template: `
			<div style="padding: 20px;">
				<div style="margin-bottom: 20px;">
					<h3>Select Emojis:</h3>
					<i-emoji-picker
						:isShow="true"
						@select="handleSelect"
					/>
				</div>

				<div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 10px;">
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
						<h4 style="margin: 0;">Selected Emojis:</h4>
						<button @click="clearEmojis" style="padding: 5px 10px;">Clear</button>
					</div>
					<div style="font-size: 24px; min-height: 40px;">
						<i-emoji
							v-for="(emoji, index) in selectedEmojis"
							:key="index"
							:emoji="emoji"
						/>
						<span v-if="selectedEmojis.length === 0" style="color: #999; font-size: 14px;">
							Click emojis above to select them
						</span>
					</div>
				</div>
			</div>
		`,
	}),
};
