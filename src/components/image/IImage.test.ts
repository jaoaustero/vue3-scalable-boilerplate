import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import IImage from "@/components/image/IImage.vue";

describe("IImage Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IImage>>;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	it("Should render correctly", () => {
		wrapper = mount(IImage, {
			props: {
				src: "/foo.jpg",
			},
		});

		expect(wrapper.find("img").exists()).toBe(true);
		expect(wrapper.find(".i-image").exists()).toBe(true);
		expect(wrapper.find("img").classes()).toContain("i-image");
	});

	it("Should have src attribute when props src is set", () => {
		wrapper = mount(IImage, {
			props: {
				src: "/foo.jpg",
			},
		});

		const img = wrapper.find("img");
		expect(img.exists()).toBe(true);
		expect(img.attributes("src")).toBe("/foo.jpg");
	});

	it("Should have alt attribute when props alt is set", () => {
		wrapper = mount(IImage, {
			props: {
				src: "/foo.jpg",
				alt: "Test image",
			},
		});

		const img = wrapper.find("img");
		expect(img.attributes("alt")).toBe("Test image");
	});

	it("Should apply position class when position prop is set to left", () => {
		wrapper = mount(IImage, {
			props: {
				src: "/foo.jpg",
				position: "left",
			},
		});

		expect(wrapper.find(".i-image-left").exists()).toBe(true);
	});

	it("Should apply position class when position prop is set to right", () => {
		wrapper = mount(IImage, {
			props: {
				src: "/foo.jpg",
				position: "right",
			},
		});

		expect(wrapper.find(".i-image-right").exists()).toBe(true);
	});

	it("Should apply position class when position prop is set to center", () => {
		wrapper = mount(IImage, {
			props: {
				src: "/foo.jpg",
				position: "center",
			},
		});

		expect(wrapper.find(".i-image-center").exists()).toBe(true);
	});

	it("Should show loading spinner initially", () => {
		wrapper = mount(IImage, {
			props: {
				src: "/foo.jpg",
			},
		});

		expect(wrapper.find(".i-image-loader").exists()).toBe(true);
	});

	it("Should hide image initially before load", () => {
		wrapper = mount(IImage, {
			props: {
				src: "/foo.jpg",
			},
		});

		const img = wrapper.find("img");
		// v-show="loaded" starts as false
		expect(img.element.style.display).toBe("none");
	});

	it("Should emit imageLoaded event when image loads", async () => {
		wrapper = mount(IImage, {
			props: {
				src: "/foo.jpg",
			},
		});

		const img = wrapper.find("img");

		// Trigger load event
		await img.trigger("load");

		// Check if event was emitted
		expect(wrapper.emitted("imageLoaded")).toBeTruthy();
	});

	it("Should support additional HTML attributes via v-bind", () => {
		wrapper = mount(IImage, {
			props: {
				src: "/foo.jpg",
			},
			attrs: {
				title: "Custom title",
				"data-test": "test-value",
			},
		});

		const img = wrapper.find("img");
		expect(img.attributes("title")).toBe("Custom title");
		expect(img.attributes("data-test")).toBe("test-value");
	});

	it("Should match snapshot", () => {
		wrapper = mount(IImage, {
			props: {
				src: "/test-image.jpg",
				alt: "Test image",
				position: "center",
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
