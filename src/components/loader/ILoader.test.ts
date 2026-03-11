import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import ILoader from "@/components/loader/ILoader.vue";

describe("ILoader Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof ILoader>>;

	beforeEach(() => {
		wrapper = shallowMount(ILoader);

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it("Should render default loader element and classes", () => {
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-loader");
		expect(wrapper.classes()).toContain("i-loader-bar");
		expect(wrapper.classes()).toContain("i-loader-animation");
	});

	it("Should apply bar type class by default", () => {
		expect(wrapper.classes()).toContain("i-loader-bar");
	});

	it("Should apply icon type class", async () => {
		await wrapper.setProps({
			type: "icon",
		});

		expect(wrapper.classes()).toContain("i-loader-icon");
		expect(wrapper.classes()).not.toContain("i-loader-bar");
	});

	it("Should apply avatar type class", async () => {
		await wrapper.setProps({
			type: "avatar",
		});

		expect(wrapper.classes()).toContain("i-loader-avatar");
		expect(wrapper.classes()).not.toContain("i-loader-bar");
	});

	it("Should apply animation class when isShimmering is true", () => {
		expect(wrapper.classes()).toContain("i-loader-animation");
	});

	it("Should not apply animation class when isShimmering is false", async () => {
		await wrapper.setProps({
			isShimmering: false,
		});

		expect(wrapper.classes()).not.toContain("i-loader-animation");
	});

	it("Should set a size class modifier", async () => {
		await wrapper.setProps({
			size: "small",
		});

		expect(wrapper.classes()).toContain("i-loader-bar-small");
	});
});
