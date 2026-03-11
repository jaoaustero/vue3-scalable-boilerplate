import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import IFlag from "@/components/flag/IFlag.vue";

const baseProps = {
	type: "us",
};

describe("IFlag Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IFlag>>;

	beforeEach(() => {
		wrapper = shallowMount(IFlag, {
			props: {
				...baseProps,
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it("Should render default element and classes", () => {
		expect(wrapper.element.tagName.toLowerCase()).toBe("div");
		expect(wrapper.classes()).toContain("i-flag");
	});

	it("Should render an img element", () => {
		const img = wrapper.find("img");
		expect(img.exists()).toBe(true);
	});

	it("Should set the correct src with type prop", () => {
		const img = wrapper.find("img");
		expect(img.attributes("src")).toBe("/images/flags-square/us.svg");
	});

	it("Should include assetPath in the img src", async () => {
		await wrapper.setProps({ assetPath: "/src/assets" });

		const img = wrapper.find("img");
		expect(img.attributes("src")).toBe("/src/assets/images/flags-square/us.svg");
	});

	it("Should apply size modifier class", async () => {
		await wrapper.setProps({ size: "large" });

		expect(wrapper.classes()).toContain("i-flag-large");
	});

	it("Should apply xsmall size modifier class", async () => {
		await wrapper.setProps({ size: "xsmall" });

		expect(wrapper.classes()).toContain("i-flag-xsmall");
	});

	it("Should apply xxlarge size modifier class", async () => {
		await wrapper.setProps({ size: "xxlarge" });

		expect(wrapper.classes()).toContain("i-flag-xxlarge");
	});

	it("Should not apply size modifier class when size is not set", () => {
		const classList = wrapper.classes();
		const hasSizeClass = classList.some((cls) => /^i-flag-(xsmall|small|medium|large|xlarge|xxlarge)$/.test(cls));
		expect(hasSizeClass).toBe(false);
	});

	it("Should use default alt text derived from type prop", () => {
		const img = wrapper.find("img");
		expect(img.attributes("alt")).toBe("us flag");
	});

	it("Should use custom alt text when alt prop is provided", async () => {
		await wrapper.setProps({ alt: "Flag of the United States" });

		const img = wrapper.find("img");
		expect(img.attributes("alt")).toBe("Flag of the United States");
	});

	it("Should fall back to un.svg on image load error", async () => {
		const img = wrapper.find("img");
		await img.trigger("error");

		expect(img.attributes("src")).toBe("/images/flags-square/un.svg");
	});

	it("Should reset error state when type prop changes", async () => {
		const img = wrapper.find("img");

		await img.trigger("error");
		expect(img.attributes("src")).toBe("/images/flags-square/un.svg");

		await wrapper.setProps({ type: "gb" });
		expect(img.attributes("src")).toBe("/images/flags-square/gb.svg");
	});

	it("Should update alt text when type prop changes", async () => {
		await wrapper.setProps({ type: "fr" });

		const img = wrapper.find("img");
		expect(img.attributes("alt")).toBe("fr flag");
	});
});
