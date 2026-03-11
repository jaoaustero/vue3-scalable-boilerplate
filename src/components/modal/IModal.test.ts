import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import IModal from "@/components/modal/IModal.vue";

describe("IModal Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof IModal>>;

	beforeEach(() => {
		wrapper = shallowMount(IModal, {
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

	it("Should render default modal element and classes", () => {
		expect(wrapper.element.tagName).toBe("DIV");
		expect(wrapper.classes()).toContain("i-modal");
	});

	it("Should have modal content section", () => {
		expect(wrapper.find(".i-modal-content").exists()).toBe(true);
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

	it("Should render default slot content", async () => {
		const customWrapper = shallowMount(IModal, {
			props: {
				isOpen: false,
			},
			slots: {
				default: "<p>Modal content</p>",
			},
		});

		expect(customWrapper.find(".i-modal-content").html()).toContain("<p>Modal content</p>");
		customWrapper.unmount();
	});

	it("Should render complex slot content", async () => {
		const customWrapper = shallowMount(IModal, {
			props: {
				isOpen: true,
			},
			slots: {
				default: `
					<div class="custom-modal-body">
						<h2>Title</h2>
						<p>Description</p>
					</div>
				`,
			},
		});

		expect(customWrapper.find(".custom-modal-body").exists()).toBe(true);
		expect(customWrapper.find("h2").text()).toBe("Title");
		expect(customWrapper.find("p").text()).toBe("Description");
		customWrapper.unmount();
	});

	it("Should toggle visibility when isOpen prop changes", async () => {
		expect(wrapper.classes()).not.toContain("i-open");

		await wrapper.setProps({
			isOpen: true,
		});

		expect(wrapper.classes()).toContain("i-open");

		await wrapper.setProps({
			isOpen: false,
		});

		expect(wrapper.classes()).not.toContain("i-open");
	});
});
