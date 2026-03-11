import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import ITextarea from "@/components/textarea/ITextarea.vue";
import { Helper } from "@/utils";

vi.spyOn(Helper, "generateUUID").mockReturnValue("test-textarea-id");

const baseProps = {
	label: "Textarea",
	modelValue: "",
};

describe("ITextarea Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof ITextarea>>;

	beforeEach(() => {
		wrapper = shallowMount(ITextarea, {
			props: baseProps,
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it("Should render wrapper and default elements", () => {
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-form-wrapper");

		const textarea = wrapper.find("textarea");
		expect(textarea.exists()).toBe(true);
		expect(textarea.classes()).toContain("i-textarea");

		const label = wrapper.find(".i-form-label");
		expect(label.exists()).toBe(true);
		expect(label.text()).toContain("Textarea");
	});

	it("Should not have disabled attribute by default", () => {
		const textarea = wrapper.find("textarea");
		expect(textarea.attributes("disabled")).toBeUndefined();
	});

	it("Should have disabled attribute when disabled attr is set", () => {
		wrapper = shallowMount(ITextarea, {
			props: baseProps,
			attrs: { disabled: true },
		});

		const textarea = wrapper.find("textarea");
		expect(textarea.attributes("disabled")).toBeDefined();
	});

	it("Should set active class when modelValue has content", async () => {
		await wrapper.setProps({ modelValue: "sample text" });

		const label = wrapper.find("label");
		expect(label.classes()).toContain("i-active");
	});

	it("Should set error state and error message when invalidType and errorMessage are set", async () => {
		await wrapper.setProps({
			invalidType: "required",
			errorMessage: { required: "Empty is not allowed!" },
		});

		const textarea = wrapper.find("textarea");
		expect(textarea.classes()).toContain("i-form-danger");

		const label = wrapper.find("label");
		expect(label.classes()).toContain("i-text-red-1");

		const small = wrapper.find("small.i-form-error-message");
		expect(small.exists()).toBe(true);
		expect(small.text()).toBe("Empty is not allowed!");
	});

	it("Should set success state when isSuccess is true", async () => {
		await wrapper.setProps({ isSuccess: true });

		const textarea = wrapper.find("textarea");
		expect(textarea.classes()).toContain("i-form-success");

		const label = wrapper.find("label");
		expect(label.classes()).toContain("i-text-green-1");
	});

	it("Should display required asterisk when isRequired is true", async () => {
		await wrapper.setProps({ isRequired: true });

		const label = wrapper.find("label");
		const span = label.find("span");
		expect(span.text()).toBe("*");
	});

	it("Should emit update:modelValue when input changes", async () => {
		const textarea = wrapper.find("textarea");
		await textarea.setValue("new value");

		expect(wrapper.emitted("update:modelValue")).toBeTruthy();
		expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["new value"]);
	});

	it("Should emit focus when textarea is focused", async () => {
		const textarea = wrapper.find("textarea");
		await textarea.trigger("focus");

		expect(wrapper.emitted("focus")).toBeTruthy();
	});

	it("Should emit blur when textarea loses focus", async () => {
		const textarea = wrapper.find("textarea");
		await textarea.trigger("blur");

		expect(wrapper.emitted("blur")).toBeTruthy();
	});

	it("Should set maxlength to 500", () => {
		const textarea = wrapper.find("textarea");
		expect(textarea.attributes("maxlength")).toBe("500");
	});

	it("Should apply wrapper max-width when width prop is set", async () => {
		await wrapper.setProps({ width: 250 });

		const wrapperEl = wrapper.find(".i-form-wrapper");
		expect(wrapperEl.attributes("style")).toContain("250px");
	});

	it("Should not show error message when invalidType is empty", () => {
		const small = wrapper.find("small.i-form-error-message");
		expect(small.exists()).toBe(false);
	});

	it("Should hide label when label is empty", async () => {
		await wrapper.setProps({ label: "" });

		const label = wrapper.find("label");
		expect(label.exists()).toBe(false);
	});

	it("Should expose validate method", () => {
		expect(wrapper.vm.validate).toBeDefined();
		expect(typeof wrapper.vm.validate).toBe("function");
	});
});
