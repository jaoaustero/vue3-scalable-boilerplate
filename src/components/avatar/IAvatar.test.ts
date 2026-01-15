import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { shallowMount, VueWrapper, enableAutoUnmount } from "@vue/test-utils";
import type { ComponentPublicInstance } from "vue";

import IAvatar from "./IAvatar.vue";

enableAutoUnmount(afterEach);

describe("IAvatar", () => {
	let wrapper: VueWrapper<ComponentPublicInstance>;

	beforeEach(() => {
		wrapper = shallowMount(IAvatar, {
			propsData: {
				label: "A",
			},
		});

		expect(wrapper.exists()).toBe(true);
	});
	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it("Should set default attributes, element and class", () => {
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-avatar");
		expect(wrapper.text()).toBe("A");
	});

	it("Should display label text in span", () => {
		const span = wrapper.find("span");
		expect(span.exists()).toBe(true);
		expect(span.text()).toBe("A");
	});

	it("Should set a color modifier class name", async () => {
		await wrapper.setProps({
			color: "primary",
		});

		expect(wrapper.classes()).toContain("i-avatar-primary");
	});

	it("Should set a size modifier class name", async () => {
		await wrapper.setProps({
			size: "large",
		});

		expect(wrapper.classes()).toContain("i-avatar-large");
	});

	it("Should set image modifier class name and render img when src is provided", async () => {
		await wrapper.setProps({
			src: "https://example.com/avatar.jpg",
		});

		expect(wrapper.classes()).toContain("i-avatar-image");
		const img = wrapper.find("img");
		expect(img.exists()).toBe(true);
		expect(img.attributes("src")).toBe("https://example.com/avatar.jpg");
		expect(img.attributes("alt")).toBe("A");
	});

	it("Should not render span when src is provided", async () => {
		await wrapper.setProps({
			src: "https://example.com/avatar.jpg",
		});

		const span = wrapper.find("span");
		expect(span.exists()).toBe(false);
	});
});
