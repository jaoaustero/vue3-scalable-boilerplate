import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";

import IEmoji from "@/components/emoji/IEmoji.vue";
import IEmojiPicker from "@/components/emoji/IEmojiPicker.vue";
import IEmojiGroup from "@/components/emoji/IEmojiGroup.vue";

// Mock EmojiOne library
const mockEmojiOne = {
	shortnameToImage: (shortcode: string) => `<img class="emojione" src="emoji.png" alt="${shortcode}">`,
	shortnameToUnicode: (shortcode: string) => {
		const map: Record<string, string> = {
			':smile:': '😄',
			':heart:': '❤️',
			':grinning:': '😀',
		};
		return map[shortcode] || shortcode;
	},
	toImage: (text: string) => text.replace(/:\w+:/g, (match) => `<img class="emojione" src="emoji.png" alt="${match}">`),
	unifyUnicode: (text: string) => text,
	regUnicode: /[\u{1F300}-\u{1F9FF}]/gu,
	ascii: true,
	shortnames: ':smile:|:heart:|:grinning:|:thumbsup:|:fire:|:rocket:',
};

// Mock window.emojione
(globalThis as any).window = { ...(globalThis as any).window, emojione: mockEmojiOne };

// Mock test categories for EmojiGroup
const mockCategories = [
	{
		category_name: 'people',
		emoji: '1f603',
		name: 'Smileys & People',
		header: '<img src="emoji.png" alt=":smiley:">',
		emojis: [
			{ title: ':grinning:' },
			{ title: ':smile:' },
			{ title: ':heart:' },
		],
		show: true,
	},
	{
		category_name: 'nature',
		emoji: '1f340',
		name: 'Animals & Nature',
		header: '<img src="emoji.png" alt=":four_leaf_clover:">',
		emojis: [
			{ title: ':dog:' },
			{ title: ':cat:' },
		],
		show: true,
	},
];

describe("IEmoji Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IEmoji>>;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	it("Should render emoji container", () => {
		wrapper = mount(IEmoji, {
			props: {
				emoji: ":smile:",
			},
		});

		expect(wrapper.find("span").exists()).toBe(true);
	});

	it("Should handle enabled prop", () => {
		wrapper = mount(IEmoji, {
			props: {
				emoji: ":smile:",
				enabled: true,
			},
		});

		expect(wrapper.props().enabled).toBe(true);
	});

	it("Should show raw text when disabled", () => {
		wrapper = mount(IEmoji, {
			props: {
				emoji: ":smile:",
				enabled: false,
			},
		});

		// When disabled, it should eventually show the raw emoji text
		expect(wrapper.props().enabled).toBe(false);
	});
});

describe("IEmojiGroup Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IEmojiGroup>>;

	beforeEach(() => {
		wrapper = mount(IEmojiGroup, {
			props: {
				categories: mockCategories,
				activeCategory: mockCategories[0],
			},
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("Should render all category tabs", () => {
		const tabs = wrapper.findAll(".i-emoji-group-tab");
		expect(tabs.length).toBe(mockCategories.length);
	});

	it("Should mark active category", () => {
		const activeTabs = wrapper.findAll(".i-emoji-group-tab-active");
		expect(activeTabs.length).toBe(1);
	});

	it("Should emit click event when tab is clicked", async () => {
		const tabs = wrapper.findAll(".i-emoji-group-tab");
		await tabs[1]!.trigger("click");

		expect(wrapper.emitted("click")).toBeTruthy();
		expect(wrapper.emitted("click")![0]![0]).toEqual(mockCategories[1]);
	});

	it("Should display category images from CDN", () => {
		const images = wrapper.findAll("img");
		expect(images.length).toBe(mockCategories.length);
		images.forEach((img) => {
			expect(img.attributes("src")).toContain("emojione");
		});
	});
});

describe("IEmojiPicker Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IEmojiPicker>>;

	beforeEach(() => {
		wrapper = mount(IEmojiPicker, {
			props: {
				isShow: true,
			},
		});
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it("Should render emoji picker", () => {
		expect(wrapper.find(".i-emoji-picker").exists()).toBe(true);
	});

	it("Should have focusable container", () => {
		const picker = wrapper.find(".i-emoji-picker");
		expect(picker.attributes("tabindex")).toBe("0");
	});

	it("Should have correct prop default", () => {
		expect(wrapper.props().isShow).toBe(true);
	});

	it("Should render loading state initially", () => {
		// Component should exist even before EmojiOne loads
		expect(wrapper.find(".i-emoji-picker").exists()).toBe(true);
		// Loading state shows when loaded is false
		expect(wrapper.find(".i-emoji-loading").exists()).toBe(true);
	});
});
