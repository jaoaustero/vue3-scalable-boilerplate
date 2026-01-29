import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { shallowMount, VueWrapper, enableAutoUnmount } from "@vue/test-utils";
import type { ComponentPublicInstance } from "vue";

import IIcon from "./IIcon.vue";

enableAutoUnmount(afterEach);

describe("IIcon", () => {
	let wrapper: VueWrapper<ComponentPublicInstance>;

	beforeEach(() => {
		wrapper = shallowMount(IIcon, {
			propsData: {
				type: "add-note",
				label: "Add note",
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it("Should set default attributes, element and class", () => {
		expect(wrapper.element.tagName).toBe("svg");
		expect(wrapper.classes()).toContain("i-icon");
	});

	it("Should set the aria label from prop", () => {
		expect(wrapper.attributes("aria-label")).toBe("Add note");
	});

	it("Should fall back aria label to type when label is undefined", async () => {
		await wrapper.setProps({
			label: 'Alert notification',
		});

		expect(wrapper.attributes("aria-label")).toBe("Alert notification");
		expect(wrapper.attributes("aria-hidden")).toBeUndefined();
	});
});
