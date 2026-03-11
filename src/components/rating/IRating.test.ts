import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import IRating from "./IRating.vue";
import IButton from "@/components/button/IButton.vue";

describe("IRating Component", () => {
	it("Should render the component", () => {
		const wrapper = mount(IRating);
		expect(wrapper.find(".i-rating").exists()).toBe(true);
	});

	it("Should render two rating buttons", () => {
		const wrapper = mount(IRating);
		const buttons = wrapper.findAllComponents(IButton);
		expect(buttons).toHaveLength(2);
	});

	it("Should render images by default (not text)", () => {
		const wrapper = mount(IRating, {
			props: {
				assetPath: "/assets",
			},
		});
		const images = wrapper.findAll(".i-image");
		expect(images).toHaveLength(2);
		const textSpans = wrapper.findAll(".i-rating-button > span");
		expect(textSpans).toHaveLength(0);
	});

	it("Should render text when isText prop is true", () => {
		const wrapper = mount(IRating, {
			props: {
				isText: true,
			},
		});
		const spans = wrapper.findAll("span");
		expect(spans.length).toBeGreaterThanOrEqual(2);
		expect(wrapper.text()).toContain("Yes");
		expect(wrapper.text()).toContain("No");
	});

	it("Should render custom text when provided", () => {
		const wrapper = mount(IRating, {
			props: {
				isText: true,
				upVoteText: "Helpful",
				downVoteText: "Not Helpful",
			},
		});
		expect(wrapper.text()).toContain("Helpful");
		expect(wrapper.text()).toContain("Not Helpful");
	});

	it("Should use correct image type", () => {
		const wrapper = mount(IRating, {
			props: {
				type: "yellow",
				assetPath: "/assets",
			},
		});
		const images = wrapper.findAll(".i-image");
		expect(images[0]!.attributes("src")).toContain("yellow-upvote-1.svg");
		expect(images[1]!.attributes("src")).toContain("yellow-downvote-1.svg");
	});

	it("Should disable like button when isLikeDisabled is true", () => {
		const wrapper = mount(IRating, {
			props: {
				isLikeDisabled: true,
			},
		});
		const buttons = wrapper.findAllComponents(IButton);
		expect(buttons[0]!.props("isDisabled")).toBe(true);
		expect(buttons[1]!.props("isDisabled")).toBe(false);
	});

	it("Should disable dislike button when isDislikeDisabled is true", () => {
		const wrapper = mount(IRating, {
			props: {
				isDislikeDisabled: true,
			},
		});
		const buttons = wrapper.findAllComponents(IButton);
		expect(buttons[0]!.props("isDisabled")).toBe(false);
		expect(buttons[1]!.props("isDisabled")).toBe(true);
	});

	it("Should emit like event when like button is clicked", async () => {
		const wrapper = mount(IRating);
		const buttons = wrapper.findAllComponents(IButton);
		await buttons[0]!.trigger("click");
		expect(wrapper.emitted("like")).toBeTruthy();
		expect(wrapper.emitted("like")).toHaveLength(1);
	});

	it("Should emit dislike event when dislike button is clicked", async () => {
		const wrapper = mount(IRating);
		const buttons = wrapper.findAllComponents(IButton);
		await buttons[1]!.trigger("click");
		expect(wrapper.emitted("dislike")).toBeTruthy();
		expect(wrapper.emitted("dislike")).toHaveLength(1);
	});

	it("Should have correct aria attributes", () => {
		const wrapper = mount(IRating, {
			props: {
				upVoteLabel: "Positive rating",
				downVoteLabel: "Negative rating",
			},
		});
		const buttons = wrapper.findAllComponents(IButton);
		expect(buttons[0]!.props("label")).toBe("Positive rating");
		expect(buttons[1]!.props("label")).toBe("Negative rating");
	});

	it("Should match snapshot", () => {
		const wrapper = mount(IRating, {
			props: {
				assetPath: "/assets",
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});

	it("Should match snapshot with text style", () => {
		const wrapper = mount(IRating, {
			props: {
				isText: true,
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
