import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import IVideo from "@/components/video/IVideo.vue";

const baseContent = {
	source: "selfhosted" as const,
	url: "https://www.w3schools.com/TAgs/movie.ogg",
	options: {
		controls: true,
		mute: true,
		loop: true,
		startTime: "0:00",
	},
};

const youtubeContent = {
	source: "youtube" as const,
	url: "https://www.youtube.com/embed/u2841PIQSVE",
	options: {} as Record<string, unknown>,
};

describe("IVideo Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IVideo>>;

	beforeEach(() => {
		wrapper = mount(IVideo, {
			props: {
				content: baseContent,
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	function getVideoSrc(): string {
		return wrapper.find("video").attributes("src") ?? "";
	}

	function getIframeSrc(): string {
		return wrapper.find("iframe").attributes("src") ?? "";
	}

	it("Should render video element for selfhosted source", () => {
		expect(wrapper.find("video").exists()).toBe(true);
		expect(wrapper.find(".i-video-el").exists()).toBe(true);
		expect(wrapper.find(".i-video-iframe-container").exists()).toBe(false);
	});

	it("Should set video src and data-src for selfhosted without time fragment", async () => {
		await wrapper.setProps({
			content: {
				source: "selfhosted",
				url: "https://www.w3schools.com/TAgs/movie.ogg",
				options: { controls: true, mute: true, loop: true },
			},
		});

		expect(getVideoSrc()).toBe("https://www.w3schools.com/TAgs/movie.ogg");
		expect(wrapper.find("video").attributes("data-src")).toBe(
			"https://www.w3schools.com/TAgs/movie.ogg"
		);
		expect(wrapper.find("video").classes()).toContain("i-video-el");
	});

	it("Should append start and end time fragment for selfhosted when both set", async () => {
		await wrapper.setProps({
			content: {
				source: "selfhosted",
				url: "https://example.com/video.mp4",
				options: { startTime: "10", endTime: "20" },
			},
		});

		expect(getVideoSrc()).toBe("https://example.com/video.mp4#t=10,20");
	});

	it("Should append only end time fragment for selfhosted when only endTime set", async () => {
		await wrapper.setProps({
			content: {
				source: "selfhosted",
				url: "https://example.com/video.mp4",
				options: { endTime: "30" },
			},
		});

		expect(getVideoSrc()).toBe("https://example.com/video.mp4#t=0,30");
	});

	it("Should append only start time fragment for selfhosted when only startTime set", async () => {
		await wrapper.setProps({
			content: {
				source: "selfhosted",
				url: "https://example.com/video.mp4",
				options: { startTime: "5" },
			},
		});

		expect(getVideoSrc()).toBe("https://example.com/video.mp4#t=5");
	});

	it("Should not append time fragment for selfhosted when options are empty", async () => {
		await wrapper.setProps({
			content: {
				source: "selfhosted",
				url: "https://example.com/video.mp4",
				options: {},
			},
		});

		expect(getVideoSrc()).toBe("https://example.com/video.mp4");
	});

	it("Should render iframe for non-selfhosted source", async () => {
		await wrapper.setProps({ content: youtubeContent });

		expect(wrapper.find("iframe").exists()).toBe(true);
		expect(wrapper.find(".i-video-iframe-container").exists()).toBe(true);
		expect(wrapper.find("video").exists()).toBe(false);
	});

	it("Should set iframe src for YouTube embed", async () => {
		await wrapper.setProps({ content: youtubeContent });

		const src = getIframeSrc();
		expect(src).toContain("youtube.com");
		expect(src).toContain("embed");
	});

	it("Should transform YouTube watch URL to embed URL", async () => {
		await wrapper.setProps({
			content: {
				source: "youtube",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				options: { controls: true },
			},
		});

		expect(getIframeSrc()).toContain("youtube.com/embed/dQw4w9WgXcQ");
	});

	it("Should use youtube-nocookie when privacy option is true", async () => {
		await wrapper.setProps({
			content: {
				source: "youtube",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				options: { privacy: true },
			},
		});

		expect(getIframeSrc()).toContain("youtube-nocookie.com");
	});

	it("Should extract video id from youtu.be short URL", async () => {
		await wrapper.setProps({
			content: {
				source: "youtube",
				url: "https://youtu.be/dQw4w9WgXcQ",
				options: {},
			},
		});

		expect(getIframeSrc()).toContain("embed/dQw4w9WgXcQ");
	});

	it("Should include YouTube query params for loop, controls, autoplay, mute, start, end", async () => {
		await wrapper.setProps({
			content: {
				source: "youtube",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				options: {
					loop: true,
					controls: true,
					autoplay: true,
					mute: true,
					startTime: 10,
					endTime: 20,
				},
			},
		});

		const src = getIframeSrc();
		expect(src).toContain("loop=1");
		expect(src).toContain("controls=1");
		expect(src).toContain("autoplay=1");
		expect(src).toContain("mute=1");
		expect(src).toContain("start=10");
		expect(src).toContain("end=20");
	});

	it("Should include modestbranding when YouTube branding option is true", async () => {
		await wrapper.setProps({
			content: {
				source: "youtube",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				options: { branding: true },
			},
		});

		expect(getIframeSrc()).toContain("modestbranding=1");
	});

	it("Should set autoplay=0 in YouTube embed when isMobile is true and options.mobile is false", async () => {
		await wrapper.setProps({
			content: {
				source: "youtube",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				options: { autoplay: true, mobile: false },
			},
			isMobile: true,
		});

		expect(getIframeSrc()).toContain("autoplay=0");
	});

	it("Should set autoplay=1 in YouTube embed when isMobile is true and options.mobile is true", async () => {
		await wrapper.setProps({
			content: {
				source: "youtube",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				options: { autoplay: true, mobile: true },
			},
			isMobile: true,
		});

		expect(getIframeSrc()).toContain("autoplay=1");
	});

	it("Should render Dailymotion embed with correct embed URL", async () => {
		await wrapper.setProps({
			content: {
				source: "dailymotion",
				url: "https://www.dailymotion.com/video/x3zbiv",
				options: { controls: true },
			},
		});

		expect(getIframeSrc()).toContain("dailymotion.com/embed/video/x3zbiv");
	});

	it("Should extract Dailymotion video id from dai.ly short URL", async () => {
		await wrapper.setProps({
			content: {
				source: "dailymotion",
				url: "https://dai.ly/x3zbiv",
				options: {},
			},
		});

		expect(getIframeSrc()).toContain("dailymotion.com/embed/video/x3zbiv");
	});

	it("Should include Dailymotion query params for startTime, controlsColor, logo, info, mute", async () => {
		await wrapper.setProps({
			content: {
				source: "dailymotion",
				url: "https://www.dailymotion.com/video/x3zbiv",
				options: {
					startTime: 5,
					controlsColor: "ff0000",
					logo: true,
					info: true,
					mute: true,
				},
			},
		});

		const src = getIframeSrc();
		expect(src).toContain("start=5");
		expect(src).toContain("ui-highlight=ff0000");
		expect(src).toContain("ui-logo=1");
		expect(src).toContain("ui-start-screen-info=1");
		expect(src).toContain("mute=1");
	});

	it("Should render Vimeo embed with correct embed URL", async () => {
		await wrapper.setProps({
			content: {
				source: "vimeo",
				url: "https://player.vimeo.com/video/390751852",
				options: { controls: true },
			},
		});

		expect(getIframeSrc()).toContain("player.vimeo.com/video/390751852");
	});

	it("Should preserve Vimeo h and app_id query params in embed URL", async () => {
		await wrapper.setProps({
			content: {
				source: "vimeo",
				url: "https://player.vimeo.com/video/756442506?h=0edce955ef&app_id=58479",
				options: {},
			},
		});

		const src = getIframeSrc();
		expect(src).toContain("h=0edce955ef");
		expect(src).toContain("app_id=58479");
	});

	it("Should include Vimeo query params for color, title, portrait, byline, startTime, muted", async () => {
		await wrapper.setProps({
			content: {
				source: "vimeo",
				url: "https://player.vimeo.com/video/390751852",
				options: {
					controlsColor: "00adef",
					introTitle: true,
					introPortrait: true,
					introByline: true,
					startTime: "10",
					mute: true,
				},
			},
		});

		const src = getIframeSrc();
		expect(src).toContain("color=00adef");
		expect(src).toContain("title=1");
		expect(src).toContain("portrait=1");
		expect(src).toContain("byline=1");
		expect(src).toContain("muted=1");
		expect(src).toContain("#t=10s");
	});

	it("Should always include controls=1 in Vimeo embed URL", async () => {
		await wrapper.setProps({
			content: {
				source: "vimeo",
				url: "https://player.vimeo.com/video/390751852",
				options: { controls: false },
			},
		});

		expect(getIframeSrc()).toContain("controls=1");
	});

	it("Should render Loom embed with correct embed URL", async () => {
		await wrapper.setProps({
			content: {
				source: "loom",
				url: "https://www.loom.com/share/abc123def",
				options: {},
			},
		});

		expect(getIframeSrc()).toContain("loom.com/embed/abc123def");
	});

	it("Should extract Loom video id from embed URL", async () => {
		await wrapper.setProps({
			content: {
				source: "loom",
				url: "https://www.loom.com/embed/abc123def",
				options: {},
			},
		});

		expect(getIframeSrc()).toContain("loom.com/embed/abc123def");
	});

	it("Should include Loom start time in query when startTime option is set", async () => {
		await wrapper.setProps({
			content: {
				source: "loom",
				url: "https://www.loom.com/share/abc123def",
				options: { startTime: 30 },
			},
		});

		expect(getIframeSrc()).toContain("t=30");
	});

	it("Should return content url when source is undefined", async () => {
		await wrapper.setProps({
			content: { url: "https://example.com/embed/xyz" },
		});

		expect(wrapper.find("iframe").attributes("src")).toBe(
			"https://example.com/embed/xyz"
		);
	});

	it("Should render video when content has no options object", async () => {
		await wrapper.setProps({
			content: {
				source: "selfhosted",
				url: "https://example.com/video.mp4",
			},
		});

		expect(wrapper.find("video").exists()).toBe(true);
		expect(getVideoSrc()).toBe("https://example.com/video.mp4");
	});

	it("Should include default embed query params when embed source has empty options", async () => {
		await wrapper.setProps({
			content: {
				source: "youtube",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				options: {},
			},
		});

		const src = getIframeSrc();
		expect(src).toContain("loop=0");
		expect(src).toContain("controls=0");
		expect(src).toContain("autoplay=0");
		expect(src).toContain("mute=0");
	});

	it("Should default isMobile to false", async () => {
		await wrapper.setProps({
			content: {
				source: "youtube",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				options: { autoplay: true },
			},
		});

		expect(getIframeSrc()).toContain("autoplay=1");
	});

	it("Should forward attributes to video element", () => {
		wrapper = mount(IVideo, {
			props: { content: baseContent },
			attrs: {
				"data-testid": "video-player",
				title: "Test video",
			},
		});

		const video = wrapper.find("video");
		expect(video.attributes("data-testid")).toBe("video-player");
		expect(video.attributes("title")).toBe("Test video");
	});

	it("Should forward attributes to iframe element", () => {
		wrapper = mount(IVideo, {
			props: { content: youtubeContent },
			attrs: { height: "315", width: "550" },
		});

		const iframe = wrapper.find("iframe");
		expect(iframe.attributes("height")).toBe("315");
		expect(iframe.attributes("width")).toBe("550");
	});

	it("Should include allow and allowfullscreen on iframe", async () => {
		await wrapper.setProps({ content: youtubeContent });

		const iframe = wrapper.find("iframe");
		expect(iframe.attributes("allow")).toContain("autoplay");
		expect(iframe.attributes("allowfullscreen")).toBeDefined();
	});

	it("Should set iframe frameborder to 0 and apply container and el classes", async () => {
		await wrapper.setProps({ content: youtubeContent });

		const iframe = wrapper.find("iframe");
		expect(iframe.attributes("frameborder")).toBe("0");
		expect(iframe.classes()).toContain("i-video-iframe");
		expect(iframe.classes()).toContain("i-video-el");
		expect(wrapper.find(".i-video-iframe-container").exists()).toBe(true);
	});

	it("Should render root div with video element", () => {
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.find("video").exists()).toBe(true);
	});

	it("Should render video when isMobile is true with selfhosted content", async () => {
		await wrapper.setProps({
			content: baseContent,
			isMobile: true,
		});

		expect(wrapper.find("video").exists()).toBe(true);
	});
});
