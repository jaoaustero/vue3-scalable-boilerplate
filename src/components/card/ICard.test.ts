import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import ICard from "@/components/card/ICard.vue";

describe("ICard Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof ICard>>;

	beforeEach(() => {
		wrapper = shallowMount(ICard, {
			slots: {
				default: "Card content",
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it("Should render default card element and classes", () => {
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-card");
		expect(wrapper.text()).toBe("Card content");
	});

	it("Should apply color modifier class", async () => {
		await wrapper.setProps({
			color: "primary",
		});

		expect(wrapper.classes()).toContain("i-card-primary");
	});

	it("Should apply inverse color modifier class", async () => {
		await wrapper.setProps({
			color: "inverse",
		});

		expect(wrapper.classes()).toContain("i-card-inverse");
	});

	it("Should apply default color modifier class", async () => {
		await wrapper.setProps({
			color: "default",
		});

		expect(wrapper.classes()).toContain("i-card-default");
	});

	it("Should apply xsmall size modifier class", async () => {
		await wrapper.setProps({
			size: "xsmall",
		});

		expect(wrapper.classes()).toContain("i-card-xsmall");
	});

	it("Should apply small size modifier class", async () => {
		await wrapper.setProps({
			size: "small",
		});

		expect(wrapper.classes()).toContain("i-card-small");
	});

	it("Should apply medium size modifier class", async () => {
		await wrapper.setProps({
			size: "medium",
		});

		expect(wrapper.classes()).toContain("i-card-medium");
	});

	it("Should apply large size modifier class", async () => {
		await wrapper.setProps({
			size: "large",
		});

		expect(wrapper.classes()).toContain("i-card-large");
	});

	it("Should apply both color and size modifier classes", async () => {
		await wrapper.setProps({
			color: "primary",
			size: "large",
		});

		expect(wrapper.classes()).toContain("i-card-primary");
		expect(wrapper.classes()).toContain("i-card-large");
	});

	it("Should render slot content correctly", async () => {
		const customWrapper = shallowMount(ICard, {
			slots: {
				default: "<p>Custom content</p>",
			},
		});

		expect(customWrapper.html()).toContain("<p>Custom content</p>");
		customWrapper.unmount();
	});
});
