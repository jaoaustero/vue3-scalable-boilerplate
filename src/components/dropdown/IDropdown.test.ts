import { describe, expect, it } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import IDropdown from "@/components/dropdown/IDropdown.vue";

describe("IDropdown Component", () => {
	it("Should set default element and classes", () => {
		const wrapper = shallowMount(IDropdown, {
			props: {
				isOpen: false,
			},
			slots: {},
		});

		// Base class
		expect(wrapper.classes()).toContain("i-dropdown");

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("Should have child menu container", async () => {
		const wrapper = shallowMount(IDropdown, {
			props: {
				isOpen: false,
			},
			slots: {},
		});

		expect(wrapper.find(".i-dropdown-menu").exists()).toBe(false);

		await wrapper.setProps({ isOpen: true });
		const menu = wrapper.find(".i-dropdown-menu");
		expect(menu.exists()).toBe(true);
		expect(menu.classes()).toContain("i-dropdown-menu");
	});

	it("Should set position class modifier", async () => {
		const wrapper = shallowMount(IDropdown, {
			props: {
				position: "right",
				isOpen: true,
			},
			slots: {},
		});

		const menu = wrapper.find(".i-dropdown-menu");
		expect(menu.exists()).toBe(true);
		expect(menu.classes()).toContain("i-dropdown-menu-right");

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("Should set open class modifier", async () => {
		const wrapper = shallowMount(IDropdown, {
			props: {
				isOpen: true,
			},
		});

		const menu = wrapper.find(".i-dropdown-menu");
		expect(menu.exists()).toBe(true);
		expect(menu.classes()).toContain("i-open");

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("Should have button class and menu list as child components", async () => {
		const button = "<button>Dropdown</button>";
		const menu = "<ul><li>Option 1</li><li>Option 2</li></ul>";
		const wrapper = mount(IDropdown, {
			props: {
				isOpen: true,
			},
			slots: {
				default: button,
				menu: menu,
			},
		});

		expect(wrapper.find("button").exists()).toBe(true);
		expect(wrapper.find("ul").exists()).toBe(true);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
