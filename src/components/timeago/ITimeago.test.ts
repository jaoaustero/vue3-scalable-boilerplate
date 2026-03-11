import { afterEach, describe, expect, it } from "vitest";
// import { expect, it, vi } from "vitest"; // Descomentar cuando escribas los tests
// import { mount } from "@vue/test-utils"; // Descomentar cuando escribas los tests
import { shallowMount, type VueWrapper } from "@vue/test-utils";

import ITimeago from "@/components/timeago/ITimeago.vue";

describe("ITimeago Component", () => {
	let wrapper: VueWrapper<InstanceType<typeof ITimeago>>;

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});


	it("Should render timeago component and classes", () =>{
		wrapper = shallowMount(ITimeago, {
			props: {
				datetime: new Date("2026-01-27T12:00:00"),
			},
		});

		expect(wrapper.element.tagName).toBe("TIME");
		expect(wrapper.classes()).toContain("i-timeago");
	});

	it("Should display time only when timeOnly is true", () => {
		wrapper = shallowMount(ITimeago, {
			props: {
				timeOnly: true,
				datetime: new Date("2026-01-27T12:00:00"),
			},
		});

		expect(wrapper.text()).toBe("12:00");
	});

	it("Should display date and time when timeOnly is false", () => {
		wrapper = shallowMount(ITimeago, {
			props: {
				timeOnly: false,
				isDuration: false,
				datetime: new Date("2025-01-27T12:00:00"),
			},
		});

		expect(wrapper.text()).toBe("January 27 2025, 12:00");
	});
});
