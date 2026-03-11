import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount, type VueWrapper } from '@vue/test-utils';

import IInput from '@/components/input/IInput.vue';
import { Helper } from '@/utils';

// Mock generateUUID to return a deterministic ID for snapshot testing
vi.spyOn(Helper, 'generateUUID').mockReturnValue('test-input-id');

describe('IInput Component', () => {
	let wrapper: VueWrapper<InstanceType<typeof IInput>>;

	beforeEach(() => {
		wrapper = shallowMount(IInput, {
			props: {
				label: 'Input',
				placeholder: 'placeholder'
			}
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it('Should set a default element and class', () => {
		// Wrapper
		expect(wrapper.classes()).toContain('i-form-wrapper');

		// Default child elements
		const input = wrapper.find('.i-input');
		expect(input.element.tagName).toBe('INPUT');
		expect(input.attributes('placeholder')).toBe('placeholder');

		const label = wrapper.find('.i-form-label');
		expect(label.element.tagName).toBe('LABEL');
		expect(label.text()).toContain('Input');
	});

	it('Should set active class when value prop has data', async () => {
		await wrapper.setProps({
			modelValue: 'sample'
		});

		const label = wrapper.find('label');
		expect(label.classes()).toContain('i-active');
	});

	it('Should set error state colors and error message', async () => {
		await wrapper.setProps({
			invalidType: 'email',
			errorMessage: {
				email: 'Error message'
			}
		});

		const input = wrapper.find('input');
		expect(input.classes()).toContain('i-form-danger');

		const label = wrapper.find('label');
		expect(label.classes()).toContain('i-text-red-1');

		const small = wrapper.find('small.i-form-error-message');
		expect(small.text()).toBe('Error message');
	});

	it('Should set success state color', async () => {
		await wrapper.setProps({
			isSuccess: true
		});

		const input = wrapper.find('input');
		expect(input.classes()).toContain('i-form-success');

		const label = wrapper.find('label');
		expect(label.classes()).toContain('i-text-green-1');
	});

	it('Should set label text', () => {
		const label = wrapper.find('label');
		expect(label.text()).toContain('Input');
	});

	it('Should set size class modifier', async () => {
		await wrapper.setProps({
			size: 'medium'
		});

		const input = wrapper.find('input');
		expect(input.classes()).toContain('i-input-medium');
	});

	it('Should display required asterisk when isRequired is true', async () => {
		await wrapper.setProps({
			isRequired: true
		});

		const label = wrapper.find('label');
		const span = label.find('span');
		expect(span.text()).toBe('*');
	});

	it('Should emit update:modelValue when input changes', async () => {
		const input = wrapper.find('input');
		await input.setValue('test value');

		expect(wrapper.emitted('update:modelValue')).toBeTruthy();
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value']);
	});

	it('Should emit focus event when input is focused', async () => {
		const input = wrapper.find('input');
		await input.trigger('focus');

		expect(wrapper.emitted('focus')).toBeTruthy();
	});

	it('Should emit blur event when input loses focus', async () => {
		const input = wrapper.find('input');
		await input.trigger('blur');

		expect(wrapper.emitted('blur')).toBeTruthy();
	});

	it('Should set aria attributes correctly', async () => {
		await wrapper.setProps({
			isRequired: true,
			label: 'Email',
			invalidType: 'email'
		});

		const input = wrapper.find('input');
		expect(input.attributes('aria-required')).toBe('true');
		expect(input.attributes('aria-placeholder')).toBe('Email');
		expect(input.attributes('aria-invalid')).toBe('true');
	});

	it('Should not show error message when invalidType is empty', () => {
		const errorMessage = wrapper.find('small.i-form-error-message');
		expect(errorMessage.exists()).toBe(false);
	});

	it('Should hide label when label prop is null or empty', async () => {
		await wrapper.setProps({
			label: null
		});

		const label = wrapper.find('label');
		expect(label.exists()).toBe(false);
	});

	it('Should expose validate method', () => {
		expect(wrapper.vm.validate).toBeDefined();
		expect(typeof wrapper.vm.validate).toBe('function');
	});
});
