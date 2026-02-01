import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { shallowMount, VueWrapper, enableAutoUnmount } from "@vue/test-utils";
import type { ComponentPublicInstance } from "vue";

import IDivider from "./IDivider.vue";

enableAutoUnmount(afterEach);

describe("IDivider", () => {
	let wrapper: VueWrapper<ComponentPublicInstance>;

	beforeEach(() => {
		wrapper = shallowMount(IDivider, {
			propsData: {},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it("Should set default attributes, element and class", () => {
		expect(wrapper.element.tagName).toBe("HR");
		expect(wrapper.classes()).toContain("i-divider");
	});

	it("Should render as div when title is provided", async () => {
		await wrapper.setProps({
			title: "Section Title",
		});

		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-divider");
		expect(wrapper.text()).toBe("Section Title");
	});

	it("Should set a dashed modifier class name", async () => {
		await wrapper.setProps({
			isDashed: true,
		});

		expect(wrapper.classes()).toContain("i-divider-dashed");
	});

	it("Should set a dotted modifier class name", async () => {
		await wrapper.setProps({
			isDotted: true,
		});

		expect(wrapper.classes()).toContain("i-divider-dotted");
	});

	it("Should display title text when provided", async () => {
		await wrapper.setProps({
			title: "My Title",
		});

		expect(wrapper.text()).toBe("My Title");
	});

	it("Should combine dashed and title modifiers", async () => {
		await wrapper.setProps({
			title: "Dashed Title",
			isDashed: true,
		});

		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-divider");
		expect(wrapper.classes()).toContain("i-divider-dashed");
		expect(wrapper.text()).toBe("Dashed Title");
	});

	it("Should combine dotted and title modifiers", async () => {
		await wrapper.setProps({
			title: "Dotted Title",
			isDotted: true,
		});

		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-divider");
		expect(wrapper.classes()).toContain("i-divider-dotted");
		expect(wrapper.text()).toBe("Dotted Title");
	});
});
