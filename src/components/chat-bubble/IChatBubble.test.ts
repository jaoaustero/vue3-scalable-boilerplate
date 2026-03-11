import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import IChatBubble from "./IChatBubble.vue";

describe("IChatBubble", () => {
	it("renders properly with default slot content", () => {
		const wrapper = mount(IChatBubble, {
			slots: {
				default: "Test message content",
			},
		});
		expect(wrapper.text()).toContain("Test message content");
		expect(wrapper.find(".i-chat-bubble").exists()).toBe(true);
	});

	it("applies active class when isActive is true", () => {
		const wrapper = mount(IChatBubble, {
			props: {
				isActive: true,
			},
		});
		expect(wrapper.find(".i-chat-bubble").classes()).toContain(
			"i-active"
		);
	});

	it("does not apply active class when isActive is false", () => {
		const wrapper = mount(IChatBubble, {
			props: {
				isActive: false,
			},
		});
		expect(wrapper.find(".i-chat-bubble").classes()).not.toContain(
			"i-active"
		);
	});

	it("renders images when provided", () => {
		const wrapper = mount(IChatBubble, {
			props: {
				attachments: {
					images: [
						{
							source: "https://example.com/image1.jpg",
							name: "Image 1",
						},
						{
							source: "https://example.com/image2.jpg",
							name: "Image 2",
						},
					],
				},
			},
		});
		const images = wrapper.findAll(".i-chat-bubble-images img");
		expect(images).toHaveLength(2);
		expect(images[0]!.attributes("src")).toBe(
			"https://example.com/image1.jpg"
		);
		expect(images[1]!.attributes("src")).toBe(
			"https://example.com/image2.jpg"
		);
	});

	it("renders correct grid class for single image", () => {
		const wrapper = mount(IChatBubble, {
			props: {
				attachments: {
					images: [
						{
							source: "https://example.com/image1.jpg",
							name: "Image 1",
						},
					],
				},
			},
		});
		expect(
			wrapper.find(".i-chat-bubble-images").classes()
		).toContain("i-grid-1");
	});

	it("renders correct grid class for three images", () => {
		const wrapper = mount(IChatBubble, {
			props: {
				attachments: {
					images: [
						{
							source: "https://example.com/image1.jpg",
							name: "Image 1",
						},
						{
							source: "https://example.com/image2.jpg",
							name: "Image 2",
						},
						{
							source: "https://example.com/image3.jpg",
							name: "Image 3",
						},
					],
				},
			},
		});
		expect(
			wrapper.find(".i-chat-bubble-images").classes()
		).toContain("i-grid-3");
	});

	it("renders audio attachments", () => {
		const wrapper = mount(IChatBubble, {
			props: {
				attachments: {
					audios: [
						{
							source: "/audio/test.mp3",
							type: "audio/mpeg",
							name: "test.mp3",
							size: "4.1mb",
						},
					],
				},
			},
		});
		const audio = wrapper.find(".i-chat-bubble-audios audio");
		expect(audio.exists()).toBe(true);
		expect(audio.attributes("src")).toBe("/audio/test.mp3");
	});

	it("renders file attachments", () => {
		const wrapper = mount(IChatBubble, {
			props: {
				attachments: {
					files: [
						{
							source: "/files/test.pdf",
							name: "test.pdf",
							size: "32mb",
						},
					],
				},
			},
		});
		const fileLink = wrapper.find(".i-chat-bubble-files a");
		expect(fileLink.exists()).toBe(true);
		expect(fileLink.attributes("href")).toBe("/files/test.pdf");
	});

	it("renders video placeholder for video attachments", () => {
		const wrapper = mount(IChatBubble, {
			props: {
				attachments: {
					videos: [
						{
							name: "test-video.mp4",
							source: "selfhosted",
							url: "/videos/test.mp4",
							options: {
								controls: false,
								mute: true,
								loop: false,
								startTime: 0,
							},
							size: "102.5mb",
						},
					],
				},
			},
		});
		const video = wrapper.find(".i-chat-bubble-videos");
		expect(video.exists()).toBe(true);
	});

	it("emits imageLoaded event when image loads", async () => {
		const wrapper = mount(IChatBubble, {
			props: {
				attachments: {
					images: [
						{
							source: "https://example.com/image1.jpg",
							name: "Image 1",
						},
					],
				},
			},
		});

		const img = wrapper.find(".i-chat-bubble-images img");
		await img.trigger("load");

		expect(wrapper.emitted()).toHaveProperty("imageLoaded");
	});

	it("opens new tab when image is clicked", async () => {
		const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => null);

		const wrapper = mount(IChatBubble, {
			props: {
				attachments: {
					images: [
						{
							source: "https://example.com/image1.jpg",
							name: "Image 1",
						},
					],
				},
			},
		});

		const imageContainer = wrapper.find(".i-chat-bubble-images li");
		await imageContainer.trigger("click");

		expect(windowOpenSpy).toHaveBeenCalledWith(
			"https://example.com/image1.jpg",
			"_blank"
		);

		windowOpenSpy.mockRestore();
	});

	it("renders with no attachments", () => {
		const wrapper = mount(IChatBubble, {
			slots: {
				default: "Just text content",
			},
		});
		expect(wrapper.find(".i-chat-bubble-images").exists()).toBe(false);
		expect(wrapper.find(".i-chat-bubble-videos").exists()).toBe(false);
		expect(wrapper.find(".i-chat-bubble-audios").exists()).toBe(false);
		expect(wrapper.find(".i-chat-bubble-files").exists()).toBe(false);
	});

	it("renders multiple attachment types together", () => {
		const wrapper = mount(IChatBubble, {
			props: {
				attachments: {
					images: [
						{
							source: "https://example.com/image1.jpg",
							name: "Image 1",
						},
					],
					files: [
						{
							source: "/files/test.pdf",
							name: "test.pdf",
							size: "32mb",
						},
					],
					audios: [
						{
							source: "/audio/test.mp3",
							type: "audio/mpeg",
							name: "test.mp3",
							size: "4.1mb",
						},
					],
				},
			},
		});
		expect(wrapper.find(".i-chat-bubble-images").exists()).toBe(true);
		expect(wrapper.find(".i-chat-bubble-files").exists()).toBe(true);
		expect(wrapper.find(".i-chat-bubble-audios").exists()).toBe(true);
	});
});
