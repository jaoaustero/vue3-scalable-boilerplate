import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import IOverlay from "@/components/overlay/IOverlay.vue";

describe("IOverlay Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IOverlay>>;

	beforeEach(() => {
		wrapper = shallowMount(IOverlay, {
			props: {
				isOpen: false,
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it("Should render default overlay element and classes", () => {
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-overlay");
	});

	it("Should have header and body sections", () => {
		expect(wrapper.find(".i-overlay-header").exists()).toBe(true);
		expect(wrapper.find(".i-overlay-body").exists()).toBe(true);
	});

	it("Should have back button", () => {
		const button = wrapper.findComponent({ name: "IButton" });
		expect(button.exists()).toBe(true);
	});

	it("Should have open class when isOpen is true", async () => {
		await wrapper.setProps({
			isOpen: true,
		});

		expect(wrapper.classes()).toContain("i-open");
	});

	it("Should not have open class when isOpen is false", () => {
		expect(wrapper.classes()).not.toContain("i-open");
	});

	it("Should display title", async () => {
		await wrapper.setProps({
			isOpen: false,
			title: "Sample Title",
		});

		expect(wrapper.find(".i-overlay-title").exists()).toBe(true);
		expect(wrapper.find(".i-overlay-title").text()).toBe("Sample Title");
	});

	it("Should emit goBack event when back button is clicked", async () => {
		const button = wrapper.findComponent({ name: "IButton" });
		await button.trigger("click");

		expect(wrapper.emitted()).toHaveProperty("goBack");
		expect(wrapper.emitted("goBack")).toHaveLength(1);
	});

	it("Should apply custom header class", async () => {
		await wrapper.setProps({
			isOpen: false,
			headerClass: "custom-header",
		});

		expect(wrapper.find(".i-overlay-header").classes()).toContain("custom-header");
	});

	it("Should set correct tabindex based on isOpen state", async () => {
		const headerLeft = wrapper.find(".i-overlay-header-left");
		expect(headerLeft.attributes("tabindex")).toBe("-1");

		await wrapper.setProps({
			isOpen: true,
		});

		expect(headerLeft.attributes("tabindex")).toBe("0");
	});

	it("Should render default slot content", async () => {
		const customWrapper = shallowMount(IOverlay, {
			props: {
				isOpen: false,
			},
			slots: {
				default: "<p>Custom content</p>",
			},
		});

		expect(customWrapper.find(".i-overlay-body").html()).toContain("<p>Custom content</p>");
		customWrapper.unmount();
	});

	it("Should render options slot content", async () => {
		const customWrapper = shallowMount(IOverlay, {
			props: {
				isOpen: false,
			},
			slots: {
				options: "<span>Options content</span>",
			},
		});

		expect(customWrapper.html()).toContain("<span>Options content</span>");
		customWrapper.unmount();
	});

	it("Should apply flex-1 class when alignAllButtons is not left", () => {
		const headerLeft = wrapper.find(".i-overlay-header-left");
		expect(headerLeft.classes()).toContain("i-flex-1");
	});

	it("Should not apply flex-1 class when alignAllButtons is left", async () => {
		await wrapper.setProps({
			isOpen: false,
			options: { alignAllButtons: "left" },
		});

		const headerLeft = wrapper.find(".i-overlay-header-left");
		expect(headerLeft.classes()).not.toContain("i-flex-1");
	});

	it("Should apply margin-auto-right class when alignAllButtons is left", async () => {
		await wrapper.setProps({
			isOpen: false,
			options: { alignAllButtons: "left" },
		});

		const optionsWrapper = wrapper.find(".i-margin-auto-right");
		expect(optionsWrapper.exists()).toBe(true);
	});

	it("Should apply margin-auto-left class when alignAllButtons is not left", () => {
		const optionsWrapper = wrapper.find(".i-margin-auto-left");
		expect(optionsWrapper.exists()).toBe(true);
	});

	it("Should set back button label from backTooltipText prop", async () => {
		await wrapper.setProps({
			isOpen: false,
			backTooltipText: "Go Back",
		});

		const button = wrapper.findComponent({ name: "IButton" });
		expect(button.attributes("label")).toBe("Go Back");
	});

	it("Should focus on header left when isOpen changes to true", async () => {
		const focusMock = vi.fn();
		const headerLeft = wrapper.find(".i-overlay-header-left");
		(headerLeft.element as HTMLElement).focus = focusMock;

		await wrapper.setProps({
			isOpen: true,
		});

		// Wait for the watcher to execute
		await wrapper.vm.$nextTick();

		expect(focusMock).toHaveBeenCalled();
	});
});
