import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { defineComponent } from 'vue';

import { ITooltip } from '@/directives/tooltip/ITooltip';
import type { ITooltipOptions } from '@/directives/tooltip/ITooltip.types';

function createTestComponent(
	tooltipText: string = 'Test tooltip',
	options?: ITooltipOptions,
) {
	return defineComponent({
		directives: {
			'i-tooltip': ITooltip,
		},
		setup() {
			return { options };
		},
		template: `
			<button v-i-tooltip="options" data-text="${tooltipText}">
				Hover me
			</button>
		`,
	});
}

describe('ITooltip Directive', () => {
	let wrapper: VueWrapper;

	beforeEach(() => {
		wrapper = mount(createTestComponent());
		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it('Should add i-tooltip class to the element', () => {
		const button = wrapper.find('button');
		expect(button.classes()).toContain('i-tooltip');
	});

	it('Should create tooltip hover element', () => {
		const tooltipHover = wrapper.find('.i-tooltip-hover');
		expect(tooltipHover.exists()).toBe(true);
	});

	it('Should create tooltip arrow element', () => {
		const tooltipArrow = wrapper.find('.i-tooltip-arrow');
		expect(tooltipArrow.exists()).toBe(true);
	});

	it('Should display the tooltip text from data-text attribute', () => {
		const tooltipHover = wrapper.find('.i-tooltip-hover');
		expect(tooltipHover.text()).toContain('Test tooltip');
	});

	it('Should apply position class when position option is provided', async () => {
		wrapper.unmount();
		wrapper = mount(createTestComponent('Test tooltip', { position: 'bottom' }));

		const tooltipHover = wrapper.find('.i-tooltip-hover');
		expect(tooltipHover.classes()).toContain('bottom');
	});

	it('Should trigger mouseover handler', async () => {
		const button = wrapper.find('button');
		await button.trigger('mouseover');

		const tooltipHover = wrapper.find('.i-tooltip-hover');
		expect(tooltipHover.exists()).toBe(true);
	});

	it('Should keep mouseover handler when isDynamic is true', async () => {
		wrapper.unmount();
		wrapper = mount(createTestComponent('Dynamic tooltip', { isDynamic: true }));

		const button = wrapper.find('button');

		await button.trigger('mouseover');
		await button.trigger('mouseover');

		const tooltipHover = wrapper.find('.i-tooltip-hover');
		expect(tooltipHover.exists()).toBe(true);
	});

	it('Should cleanup tooltip elements on unmount', () => {
		const el = wrapper.find('button').element;
		wrapper.unmount();

		expect(el.classList.contains('i-tooltip')).toBe(false);
		expect(el.querySelector('.i-tooltip-hover')).toBeNull();

		wrapper = mount(createTestComponent());
	});
});
