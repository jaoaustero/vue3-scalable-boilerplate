import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import ISearch from "@/components/search/ISearch.vue";

const baseProps = {
	options: [] as { id: number | string; title: string; subtitle?: string }[],
	isOpen: false,
	isLoading: false,
};

describe("ISearch Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof ISearch>>;

	beforeEach(() => {
		vi.useFakeTimers();

		wrapper = shallowMount(ISearch, {
			props: baseProps,
			global: {
				stubs: {
					IIcon: true,
					IButton: true,
					ISearchDropdown: true,
					ISearchList: true,
				},
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
		vi.useRealTimers();
	});

	it("Should render wrapper and input with default classes", () => {
		expect(wrapper.classes()).toContain("i-search-wrapper");
		expect(wrapper.find("input.i-search").exists()).toBe(true);
	});

	it("Should set searchDelay from props", async () => {
		await wrapper.setProps({ searchDelay: 3000 });
		expect(wrapper.props("searchDelay")).toBe(3000);
	});

	it("Should emit update:modelValue when input changes", async () => {
		const input = wrapper.find("input");
		await input.setValue("test");
		expect(wrapper.emitted("update:modelValue")).toBeTruthy();
		expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["test"]);
	});

	it("Should emit update:isOpen when input is focused", async () => {
		const input = wrapper.find("input");
		await input.trigger("focus");
		expect(wrapper.emitted("update:isOpen")).toBeTruthy();
		expect(wrapper.emitted("update:isOpen")?.[0]).toEqual([true]);
	});

	it("Should show clear button when input has value", async () => {
		await wrapper.find("input").setValue("ab");
		await vi.advanceTimersByTimeAsync(0);
		expect(wrapper.find(".i-search-button-close").exists()).toBe(true);
	});

	it("Should render search dropdown when isOpen is true", async () => {
		await wrapper.setProps({ isOpen: true });
		expect(wrapper.findComponent({ name: "ISearchDropdown" }).exists()).toBe(
			true
		);
	});

	it("Should render dropdown with isOpen and pass options when open", async () => {
		const options = [
			{ id: 1, title: "A", subtitle: "" },
			{ id: 2, title: "B", subtitle: "" },
		];
		await wrapper.setProps({ isOpen: true, options, optionsLimit: 5 });
		const dropdown = wrapper.findComponent({ name: "ISearchDropdown" });
		expect(dropdown.exists()).toBe(true);
		expect(dropdown.props("isOpen")).toBe(true);
	});
});
