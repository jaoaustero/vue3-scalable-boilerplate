import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import IList from "@/components/list/IList.vue";

describe("IList Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IList>>;

	beforeEach(() => {
		wrapper = shallowMount(IList, {
			slots: {
				default: "<li>Item 1</li><li>Item 2</li><li>Item 3</li>",
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it("Should render default list element and classes", () => {
		expect(wrapper.element.tagName).toBe("UL");
		expect(wrapper.classes()).toContain("i-list");
	});

	it("Should render slot content", () => {
		const items = wrapper.findAll("li");
		expect(items.length).toBe(3);
	});

	it("Should render as ordered list when isOrdered is true", async () => {
		await wrapper.setProps({
			isOrdered: true,
		});

		expect(wrapper.element.tagName).toBe("OL");
		expect(wrapper.classes()).toContain("i-list");
	});

	it("Should apply striped type class", async () => {
		await wrapper.setProps({
			type: "striped",
		});

		expect(wrapper.classes()).toContain("i-list-striped");
	});

	it("Should apply divider type class", async () => {
		await wrapper.setProps({
			type: "divider",
		});

		expect(wrapper.classes()).toContain("i-list-divider");
	});

	it("Should apply xsmall size modifier class", async () => {
		await wrapper.setProps({
			size: "xsmall",
		});

		expect(wrapper.classes()).toContain("i-list-xsmall");
	});

	it("Should apply small size modifier class", async () => {
		await wrapper.setProps({
			size: "small",
		});

		expect(wrapper.classes()).toContain("i-list-small");
	});

	it("Should apply medium size modifier class", async () => {
		await wrapper.setProps({
			size: "medium",
		});

		expect(wrapper.classes()).toContain("i-list-medium");
	});

	it("Should apply large size modifier class", async () => {
		await wrapper.setProps({
			size: "large",
		});

		expect(wrapper.classes()).toContain("i-list-large");
	});

	it("Should not apply type or size class when undefined", () => {
		const classList = wrapper.classes();
		expect(classList).not.toContain("i-list-striped");
		expect(classList).not.toContain("i-list-divider");
		expect(classList).not.toContain("i-list-xsmall");
		expect(classList).not.toContain("i-list-small");
		expect(classList).not.toContain("i-list-medium");
		expect(classList).not.toContain("i-list-large");
	});

	it("Should combine isOrdered and type props correctly", async () => {
		await wrapper.setProps({
			isOrdered: true,
			type: "divider",
		});

		expect(wrapper.element.tagName).toBe("OL");
		expect(wrapper.classes()).toContain("i-list");
		expect(wrapper.classes()).toContain("i-list-divider");
	});

	it("Should combine type and size props correctly", async () => {
		await wrapper.setProps({
			type: "striped",
			size: "medium",
		});

		expect(wrapper.classes()).toContain("i-list");
		expect(wrapper.classes()).toContain("i-list-striped");
		expect(wrapper.classes()).toContain("i-list-medium");
	});

	it("Should combine all props correctly", async () => {
		await wrapper.setProps({
			isOrdered: true,
			type: "divider",
			size: "large",
		});

		expect(wrapper.element.tagName).toBe("OL");
		expect(wrapper.classes()).toContain("i-list");
		expect(wrapper.classes()).toContain("i-list-divider");
		expect(wrapper.classes()).toContain("i-list-large");
	});
});
