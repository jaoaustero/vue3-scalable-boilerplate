import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { shallowMount, VueWrapper, enableAutoUnmount } from "@vue/test-utils";
import type { ComponentPublicInstance } from "vue";

import IContainer from "./IContainer.vue";

enableAutoUnmount(afterEach);

describe("IContainer", () => {
	let wrapper: VueWrapper<ComponentPublicInstance>;

	beforeEach(() => {
		wrapper = shallowMount(IContainer, {
			slots: {
				default: "Container content",
			},
		});

		expect(wrapper.exists()).toBe(true);
	});
	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it("Should set default attributes, element and class", () => {
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-container");
		expect(wrapper.text()).toBe("Container content");
	});

	it("Should render slot content", () => {
		expect(wrapper.text()).toBe("Container content");
	});

	it("Should set a small size modifier class name", async () => {
		await wrapper.setProps({
			size: "small",
		});

		expect(wrapper.classes()).toContain("i-container-small");
	});

	it("Should set a medium size modifier class name", async () => {
		await wrapper.setProps({
			size: "medium",
		});

		expect(wrapper.classes()).toContain("i-container-medium");
	});

	it("Should set a large size modifier class name", async () => {
		await wrapper.setProps({
			size: "large",
		});

		expect(wrapper.classes()).toContain("i-container-large");
	});
});
