import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";

import IAlert from "@/components/alert/IAlert.vue";

const baseProps = {
	title: "Status: All system is operational",
	description: "Updated: April 11, 11:12 UTC",
};

describe("IAlert Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IAlert>>;

	beforeEach(() => {
		wrapper = mount(IAlert, {
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

	it("Should render default elements and classes", () => {
		const alert = wrapper.find(".i-alert");
		expect(alert.exists()).toBe(true);
		expect(alert.classes()).toContain("i-alert");
		expect(wrapper.get(".i-alert-title").text()).toBe(baseProps.title);
		expect(wrapper.get(".i-alert-description").text()).toBe(
			baseProps.description
		);
	});

	it("Should apply status modifier class", async () => {
		await wrapper.setProps({
			status: "warning",
		});

		const alert = wrapper.find(".i-alert");
		expect(alert.classes()).toContain("i-alert-warning");
	});

	it("Should apply success status class", async () => {
		await wrapper.setProps({
			status: "success",
		});

		const alert = wrapper.find(".i-alert");
		expect(alert.classes()).toContain("i-alert-success");
	});

	it("Should apply danger status class", async () => {
		await wrapper.setProps({
			status: "danger",
		});

		const alert = wrapper.find(".i-alert");
		expect(alert.classes()).toContain("i-alert-danger");
	});

	it("Should apply size modifier class", async () => {
		await wrapper.setProps({
			size: "xsmall",
		});

		const alert = wrapper.find(".i-alert");
		expect(alert.classes()).toContain("i-alert-xsmall");
	});

	it("Should show dismiss button when isDismissable is true", async () => {
		await wrapper.setProps({
			isDismissable: true,
		});

		expect(wrapper.find(".i-close").exists()).toBe(true);
	});

	it("Should show dismiss button when isAutoDismissable is true", async () => {
		await wrapper.setProps({
			isAutoDismissable: true,
		});

		expect(wrapper.find(".i-close").exists()).toBe(true);
	});

	it("Should hide alert when dismiss button is clicked", async () => {
		await wrapper.setProps({
			isDismissable: true,
		});

		const closeButton = wrapper.find(".i-close");
		await closeButton.trigger("click");

		// Check if dismiss event was emitted
		expect(wrapper.emitted("dismiss")).toBeTruthy();

		// Wait for transition
		await wrapper.vm.$nextTick();

		// Alert should not be visible
		expect(wrapper.find(".i-alert").exists()).toBe(false);
	});

	it("Should apply isMobile class when isMobile is true", async () => {
		await wrapper.setProps({
			isDismissable: true,
			isMobile: true,
		});

		const closeButton = wrapper.find(".i-close");
		expect(closeButton.classes()).toContain("i-isMobile");
	});

	it("Should auto-dismiss after timeout when isAutoDismissable is true", async () => {
		vi.useFakeTimers();

		const wrapper = mount(IAlert, {
			props: {
				...baseProps,
				isAutoDismissable: true,
				dismissCountdown: 1000,
			},
		});

		expect(wrapper.find(".i-alert").exists()).toBe(true);

		// Fast-forward time
		vi.advanceTimersByTime(1000);
		await wrapper.vm.$nextTick();

		// Check if dismiss event was emitted
		expect(wrapper.emitted("dismiss")).toBeTruthy();

		// Alert should not be visible
		expect(wrapper.find(".i-alert").exists()).toBe(false);

		vi.useRealTimers();
		wrapper.unmount();
	});

	it("Should display icon slot when icon prop is provided", async () => {
		const wrapper = mount(IAlert, {
			props: {
				...baseProps,
				icon: "warning-triangle",
			},
			slots: {
				icon: '<span class="test-icon">Icon</span>',
			},
		});

		expect(wrapper.find(".i-alert-icon").exists()).toBe(true);
		expect(wrapper.find(".test-icon").exists()).toBe(true);

		wrapper.unmount();
	});
});
