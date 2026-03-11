import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import IRadioButton from "@/components/radio/IRadio.vue";

describe("IRadio RadioButton", () => {
	it("should render correctly", () => {
		const wrapper = shallowMount(IRadioButton, {
			props: {
				checked: "",
				options: [
					{
						id: 1,
						label: "Free Chat Widget",
						name: "option",
						value: "Free Chat Widget",
					},
				],
			},
		});

		expect(wrapper).toBeDefined();
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-form-wrapper");

		const children = wrapper.element.children;

		expect(children.length).toEqual(2);
		expect(children[0].tagName).toEqual("LABEL");
		expect(children[1].tagName).toEqual("LABEL");

		expect(wrapper.html()).toMatchSnapshot();

		wrapper.unmount();
	});

	it("should have label", () => {
		const wrapper = shallowMount(IRadioButton, {
			props: {
				checked: "",
				options: [
					{
						id: 1,
						label: "Free Chat Widget",
						name: "option",
						value: "Free Chat Widget",
					},
				],
			},
		});

		const label = wrapper.find("label");
		expect(label.exists()).toBe(true);

		expect(wrapper.html()).toMatchSnapshot();

		wrapper.unmount();
	});

	it("should have input", () => {
		const wrapper = shallowMount(IRadioButton, {
			props: {
				checked: "",
				options: [
					{
						id: 1,
						label: "Free Chat Widget",
						name: "option",
						value: "Free Chat Widget",
					},
				],
			},
		});

		const input = wrapper.find("input");
		expect(input.classes().length).toEqual(1);
		expect(input.classes()).toContain("i-radio");

		expect(wrapper.html()).toMatchSnapshot();

		wrapper.unmount();
	});

	it("should have no disabled attribute on input", async () => {
		const wrapper = shallowMount(IRadioButton, {
			props: {
				checked: "",
				options: [
					{
						id: 1,
						label: "Free Chat Widget",
						name: "option",
						value: "Free Chat Widget",
					},
				],
			},
		});

		const input = wrapper.find("input");
		expect(input.attributes("disabled")).not.toBeDefined();

		expect(wrapper.html()).toMatchSnapshot();

		wrapper.unmount();
	});

	it("should have disabled attribute when prop disabled set", async () => {
		const wrapper = shallowMount(IRadioButton, {
			props: {
				checked: "",
				options: [
					{
						id: 1,
						label: "Free Chat Widget",
						name: "option",
						value: "Free Chat Widget",
						disabled: true,
					},
				],
			},
		});

		const input = wrapper.find("input");
		expect(input.attributes("disabled")).toBeDefined();

		expect(wrapper.html()).toMatchSnapshot();

		wrapper.unmount();
	});

	it("should have no required attribute on input", async () => {
		const wrapper = shallowMount(IRadioButton, {
			props: {
				checked: "",
				options: [
					{
						id: 1,
						label: "Free Chat Widget",
						name: "option",
						value: "Free Chat Widget",
					},
				],
			},
		});

		const input = wrapper.find("input");
		expect(input.attributes("required")).not.toBeDefined();

		expect(wrapper.html()).toMatchSnapshot();

		wrapper.unmount();
	});
});
