import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import IChatInput from "@/components/chat-input/IChatInput.vue";

const baseProps = {
	placeholder: "Type here...",
	features: {
		emoji: true,
		rating: true,
		uploads: true,
	},
};

describe("IChatInput Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IChatInput>>;

	beforeEach(() => {
		wrapper = shallowMount(IChatInput, {
			props: baseProps,
			global: {
				stubs: {
					IEmojiPicker: true,
					IIcon: true,
				},
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it("Should render default chat input with textarea", () => {
		const textarea = wrapper.find("textarea");
		expect(textarea.exists()).toBe(true);
		expect(textarea.classes()).toContain("i-chatinput-editor");
		expect(textarea.attributes("placeholder")).toBe("Type here...");
	});

	it("Should render IEmojiPicker component instead of placeholder", () => {
		const emojiPicker = wrapper.findComponent({ name: "IEmojiPicker" });
		expect(emojiPicker.exists()).toBe(true);

		const placeholder = wrapper.find(".i-emoji-picker-placeholder");
		expect(placeholder.exists()).toBe(false);
	});

	it("Should render IIcon components instead of emoji placeholders", () => {
		const icons = wrapper.findAllComponents({ name: "IIcon" });
		expect(icons.length).toBeGreaterThan(0);

		const iconPlaceholder = wrapper.find(".icon-placeholder");
		expect(iconPlaceholder.exists()).toBe(false);
	});

	it("Should render IIcon with emoji type for emoji button", () => {
		const emojiButton = wrapper.find('button[title="Insert emoji"]');
		expect(emojiButton.exists()).toBe(true);

		const icon = emojiButton.findComponent({ name: "IIcon" });
		expect(icon.exists()).toBe(true);
		expect(icon.props("type")).toBe("emoji");
	});

	it("Should render IIcon with attachment type for upload button", () => {
		const uploadButton = wrapper.find('button[title="Upload File"]');
		expect(uploadButton.exists()).toBe(true);

		const icon = uploadButton.findComponent({ name: "IIcon" });
		expect(icon.exists()).toBe(true);
		expect(icon.props("type")).toBe("attachment");
	});

	it("Should render IIcon with thumbs-up and thumbs-down for ratings", () => {
		const thumbsDown = wrapper.find(".i-chatinput-ratings-thumbs-down");
		expect(thumbsDown.exists()).toBe(true);

		const thumbsDownIcon = thumbsDown.findComponent({ name: "IIcon" });
		expect(thumbsDownIcon.exists()).toBe(true);
		expect(thumbsDownIcon.props("type")).toBe("thumbs-down");

		const thumbsUp = wrapper.find(".i-chatinput-ratings-thumbs-up");
		expect(thumbsUp.exists()).toBe(true);

		const thumbsUpIcon = thumbsUp.findComponent({ name: "IIcon" });
		expect(thumbsUpIcon.exists()).toBe(true);
		expect(thumbsUpIcon.props("type")).toBe("thumbs-up");
	});

	it("Should render with all features enabled by default", () => {
		const buttons = wrapper.findAll("button");
		expect(buttons.length).toBeGreaterThan(0);

		const rating = wrapper.find('[role="button"][title="Rate this chat"]');
		expect(rating.exists()).toBe(true);
	});

	it("Should hide emoji button when emoji feature is disabled", async () => {
		await wrapper.setProps({
			features: {
				emoji: false,
				rating: true,
				uploads: true,
			},
		});

		const emojiButton = wrapper.find('button[title="Insert emoji"]');
		expect(emojiButton.exists()).toBe(false);
	});

	it("Should hide rating section when rating feature is disabled", async () => {
		await wrapper.setProps({
			features: {
				emoji: true,
				rating: false,
				uploads: true,
			},
		});

		const rating = wrapper.find('[role="button"][title="Rate this chat"]');
		expect(rating.exists()).toBe(false);
	});

	it("Should hide upload button when uploads feature is disabled", async () => {
		await wrapper.setProps({
			features: {
				emoji: true,
				rating: true,
				uploads: false,
			},
		});

		const uploadButton = wrapper.find('button[title="Upload File"]');
		expect(uploadButton.exists()).toBe(false);
	});

	it("Should emit focus event when textarea is focused", async () => {
		const textarea = wrapper.find("textarea");
		await textarea.trigger("focus");

		expect(wrapper.emitted("focus")).toBeTruthy();
	});

	it("Should emit blur event when textarea loses focus", async () => {
		const textarea = wrapper.find("textarea");
		await textarea.trigger("blur");

		expect(wrapper.emitted("blur")).toBeTruthy();
	});

	it("Should emit messageTyping event when typing", async () => {
		const textarea = wrapper.find("textarea");
		await textarea.trigger("keydown", { key: "a" });

		expect(wrapper.emitted("messageTyping")).toBeTruthy();
	});

	it("Should show send button when textarea has value", async () => {
		const textarea = wrapper.find("textarea");
		const element = textarea.element as HTMLTextAreaElement;

		element.value = "Hello";
		await textarea.trigger("keyup");

		await wrapper.vm.$nextTick();
		await new Promise((resolve) => setTimeout(resolve, 150));

		const sendButton = wrapper.find(".i-chatinput-send");
		expect(sendButton.exists()).toBe(true);
	});

	it("Should render IIcon with send type in send button", async () => {
		const textarea = wrapper.find("textarea");
		const element = textarea.element as HTMLTextAreaElement;

		element.value = "Hello";
		await textarea.trigger("keyup");

		await wrapper.vm.$nextTick();
		await new Promise((resolve) => setTimeout(resolve, 150));

		const sendButton = wrapper.find(".i-chatinput-send");
		const icon = sendButton.findComponent({ name: "IIcon" });
		expect(icon.exists()).toBe(true);
		expect(icon.props("type")).toBe("send");
	});

	it("Should emit sendMessage event when send button is clicked", async () => {
		const textarea = wrapper.find("textarea");
		const element = textarea.element as HTMLTextAreaElement;

		element.value = "Test message";
		await textarea.trigger("keyup");

		await wrapper.vm.$nextTick();
		await new Promise((resolve) => setTimeout(resolve, 150));

		const sendButton = wrapper.find(".i-chatinput-send");
		await sendButton.trigger("click");

		expect(wrapper.emitted("sendMessage")).toBeTruthy();
		const emittedEvent = wrapper.emitted("sendMessage");
		if (emittedEvent && emittedEvent[0]) {
			expect(emittedEvent[0][0]).toEqual({
				message: "Test message",
				attachments: [],
			});
		}
	});

	it("Should emit sendMessage when Enter is pressed without Shift", async () => {
		const textarea = wrapper.find("textarea");
		const element = textarea.element as HTMLTextAreaElement;

		element.value = "Test message";
		await textarea.trigger("keydown", {
			key: "Enter",
			keyCode: 13,
			shiftKey: false,
		});

		expect(wrapper.emitted("sendMessage")).toBeTruthy();
	});

	it("Should not emit sendMessage when Shift+Enter is pressed", async () => {
		const textarea = wrapper.find("textarea");
		await textarea.trigger("keydown", {
			key: "Enter",
			keyCode: 13,
			shiftKey: true,
		});

		expect(wrapper.emitted("sendMessage")).toBeFalsy();
	});

	it("Should emit ratingClicked event with positive rating", async () => {
		const thumbsUp = wrapper.find(".i-chatinput-ratings-thumbs-up");
		await thumbsUp.trigger("click");

		expect(wrapper.emitted("ratingClicked")).toBeTruthy();
		const emittedEvent = wrapper.emitted("ratingClicked");
		if (emittedEvent && emittedEvent[0]) {
			expect(emittedEvent[0][0]).toBe(1);
		}
	});

	it("Should emit ratingClicked event with negative rating", async () => {
		const thumbsDown = wrapper.find(".i-chatinput-ratings-thumbs-down");
		await thumbsDown.trigger("click");

		expect(wrapper.emitted("ratingClicked")).toBeTruthy();
		const emittedEvent = wrapper.emitted("ratingClicked");
		if (emittedEvent && emittedEvent[0]) {
			expect(emittedEvent[0][0]).toBe(-1);
		}
	});

	it("Should clear textarea after sending message", async () => {
		const textarea = wrapper.find("textarea");
		const element = textarea.element as HTMLTextAreaElement;

		element.value = "Test message";
		await textarea.trigger("keyup");

		await wrapper.vm.$nextTick();
		await new Promise((resolve) => setTimeout(resolve, 150));

		const sendButton = wrapper.find(".i-chatinput-send");
		await sendButton.trigger("click");

		expect(element.value).toBe("");
	});

	it("Should handle file upload click", async () => {
		const uploadButton = wrapper.find('button[title="Upload File"]');
		await uploadButton.trigger("click");

		expect(wrapper.emitted("filesAdded")).toBeFalsy(); // No files added yet
	});

	it("Should toggle emoji picker when emoji button is clicked", async () => {
		const emojiButton = wrapper.find('button[title="Insert emoji"]');
		await emojiButton.trigger("click");

		expect(wrapper.emitted("emojiPreview")).toBeTruthy();
		const emittedEvent = wrapper.emitted("emojiPreview");
		if (emittedEvent && emittedEvent[0]) {
			expect(emittedEvent[0][0]).toBe(true);
		}
	});

	it("Should apply active class to action buttons when input has value", async () => {
		const textarea = wrapper.find("textarea");
		const element = textarea.element as HTMLTextAreaElement;

		element.value = "Hello";
		await textarea.trigger("keyup");

		await wrapper.vm.$nextTick();
		await new Promise((resolve) => setTimeout(resolve, 150));

		const actionButtons = wrapper.find(".i-chatinput-action-buttons");
		expect(actionButtons.classes()).toContain("active");
	});

	it("Should set placeholder correctly", async () => {
		await wrapper.setProps({
			placeholder: "Custom placeholder",
		});

		const textarea = wrapper.find("textarea");
		expect(textarea.attributes("placeholder")).toBe("Custom placeholder");
	});
});
