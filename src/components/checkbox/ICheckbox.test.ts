import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import ICheckbox from "@/components/checkbox/ICheckbox.vue";

const baseOptions = [
	{
		id: 1,
		label: "Label",
		value: "1",
	},
];

describe("ICheckbox Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof ICheckbox>>;

	beforeEach(() => {
		wrapper = shallowMount(ICheckbox, {
			props: {
				modelValue: [],
				options: baseOptions,
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it("Should render correctly", () => {
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.attributes("role")).toBe("group");
		expect(wrapper.classes()).toContain("i-form-wrapper");

		const children = wrapper.element.children;
		expect(children.length).toBeGreaterThanOrEqual(2);
		expect(children[0].tagName).toBe("LABEL");
		expect(children[1].tagName).toBe("LABEL");
	});

	it("Should have no disabled attribute on input when option is not disabled", () => {
		const input = wrapper.find("input");
		expect(input.attributes("disabled")).toBeUndefined();
	});

	it("Should have disabled attribute when option has disabled set", async () => {
		await wrapper.setProps({
			modelValue: [],
			options: [
				{
					id: 1,
					label: "",
					value: "",
					disabled: true,
				},
			],
		});

		const input = wrapper.find("input");
		expect(input.attributes("disabled")).toBeDefined();
	});

	it("Should render group label when label prop is set", async () => {
		await wrapper.setProps({
			label: "How can we help?",
		});

		expect(wrapper.text()).toContain("How can we help?");
	});

	it("Should render required asterisk when isRequired is true", async () => {
		await wrapper.setProps({
			label: "Required field",
			isRequired: true,
		});

		expect(wrapper.text()).toContain("*");
		expect(wrapper.text()).toContain("Required field");
	});

	it("Should expose validate method", () => {
		expect(typeof wrapper.vm.validate).toBe("function");
	});
});
