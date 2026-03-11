import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import IIcon from "./IIcon.vue";
import type { IIconName } from "./IIcon.types";

const baseProps = {
	type: "alert" as IIconName,
};

describe("IIcon Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IIcon>>;

	beforeEach(() => {
		wrapper = shallowMount(IIcon, {
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
		expect(wrapper.element.tagName.toLowerCase()).toBe("svg");
		expect(wrapper.classes()).toContain("i-icon");
		expect(wrapper.classes()).toContain("i-icon-alert");
	});

	it("Should apply size modifier class", async () => {
		await wrapper.setProps({
			size: "xxlarge",
		});

		expect(wrapper.classes()).toContain("i-icon-xxlarge");
	});

	it("Should mark icon as decorative without label", () => {
		expect(wrapper.attributes("aria-label")).toBeUndefined();
		expect(wrapper.attributes("aria-hidden")).toBe("true");
	});

	it("Should set label attributes when provided", async () => {
		await wrapper.setProps({
			label: "Alert notification",
		});

		expect(wrapper.attributes("aria-label")).toBe("Alert notification");
		expect(wrapper.attributes("aria-hidden")).toBeUndefined();
	});
});
