import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { shallowMount, VueWrapper, enableAutoUnmount } from "@vue/test-utils";
import type { ComponentPublicInstance } from "vue";

import IBadge from "./IBadge.vue";

enableAutoUnmount(afterEach);

describe("IBadge", () => {
	let wrapper: VueWrapper<ComponentPublicInstance>;

	beforeEach(() => {
		wrapper = shallowMount(IBadge, {
			propsData: {
				count: 5,
			},
		});

		expect(wrapper.exists()).toBe(true);
	});
	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it("Should set default attributes, element and class", () => {
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-badge");
		expect(wrapper.text()).toBe("5");
	});

	it("Should display count prop value", () => {
		expect(wrapper.text()).toBe("5");
	});

	it("Should display zero when count is 0", async () => {
		await wrapper.setProps({
			count: 0,
		});

		expect(wrapper.text()).toBe("0");
	});

	it("Should display single digit count", async () => {
		await wrapper.setProps({
			count: 9,
		});

		expect(wrapper.text()).toBe("9");
	});

	it("Should display double digit count", async () => {
		await wrapper.setProps({
			count: 42,
		});

		expect(wrapper.text()).toBe("42");
	});

	it("Should display large number count", async () => {
		await wrapper.setProps({
			count: 999,
		});

		expect(wrapper.text()).toBe("99+");
	});
});
