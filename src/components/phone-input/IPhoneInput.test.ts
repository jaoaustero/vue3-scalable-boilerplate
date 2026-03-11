import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, type VueWrapper } from '@vue/test-utils';

import IPhoneInput from '@/components/phone-input/IPhoneInput.vue';

describe('IPhoneInput Component', () => {
	let wrapper: VueWrapper<InstanceType<typeof IPhoneInput>>;

	beforeEach(() => {
		wrapper = shallowMount(IPhoneInput, {
			props: {
				label: 'Phone number',
				assetPath: '/assets',
			},
		});

		expect(wrapper.exists()).toBe(true);
	});

	afterEach(() => {
		expect(wrapper.html()).toMatchSnapshot();
		wrapper.unmount();
	});

	it('Should render with correct wrapper classes', () => {
		expect(wrapper.classes()).toContain('i-form-wrapper');
		expect(wrapper.classes()).toContain('i-phone-input-wrapper');
	});

	it('Should render IPhoneInputCountryDropdown with default US country', () => {
		const dropdown = wrapper.findComponent({ name: 'IPhoneInputCountryDropdown' });

		expect(dropdown.exists()).toBe(true);
		expect(dropdown.props('selectedCountry')).toMatchObject({
			value: 'us',
			dialCode: '1',
		});
	});

	it('Should render IInput', () => {
		const input = wrapper.findComponent({ name: 'IInput' });

		expect(input.exists()).toBe(true);
	});

	it('Should render the plus sign span', () => {
		const plus = wrapper.find('.i-phone-input-plus');

		expect(plus.exists()).toBe(true);
		expect(plus.text()).toBe('+');
	});

	it('Should have i-active class on plus sign after mount (dial code always pre-filled)', () => {
		// On mount, the default US dial code "1" is always pre-filled into
		// currentPhoneNumber, so isActive is true and the plus sign is visible.
		const plus = wrapper.find('.i-phone-input-plus');

		expect(plus.classes()).toContain('i-active');
	});

	it('Should pass assetPath to IPhoneInputCountryDropdown', () => {
		const dropdown = wrapper.findComponent({ name: 'IPhoneInputCountryDropdown' });

		expect(dropdown.props('assetPath')).toBe('/assets');
	});

	it('Should pass label and isRequired to IInput', async () => {
		await wrapper.setProps({ isRequired: true });

		const input = wrapper.findComponent({ name: 'IInput' });

		expect(input.props('label')).toBe('Phone number');
		expect(input.props('isRequired')).toBe(true);
	});

	it('Should pass invalidType and errorMessage to IInput', async () => {
		await wrapper.setProps({
			invalidType: 'required',
			errorMessage: { required: 'Phone is required' },
		});

		const input = wrapper.findComponent({ name: 'IInput' });

		expect(input.props('invalidType')).toBe('required');
		expect(input.props('errorMessage')).toEqual({ required: 'Phone is required' });
	});

	it('Should emit update:modelValue when IInput emits update:modelValue', async () => {
		const input = wrapper.findComponent({ name: 'IInput' });

		input.vm.$emit('update:modelValue', '16175551234');
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('update:modelValue')).toBeTruthy();
	});

	it('Should emit focus when IInput emits focus', async () => {
		const input = wrapper.findComponent({ name: 'IInput' });

		input.vm.$emit('focus');
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('focus')).toBeTruthy();
	});

	it('Should emit blur when IInput emits blur', async () => {
		const input = wrapper.findComponent({ name: 'IInput' });

		input.vm.$emit('blur');
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('blur')).toBeTruthy();
	});

	it('Should emit update:error and update:invalidType on required blur with empty value', async () => {
		await wrapper.setProps({ isRequired: true, validation: 'phone' });

		const input = wrapper.findComponent({ name: 'IInput' });
		input.vm.$emit('blur');
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('update:error')).toBeTruthy();
		expect(wrapper.emitted('update:invalidType')).toBeTruthy();
	});

	it('Should update selectedCountry when country is selected from dropdown', async () => {
		const dropdown = wrapper.findComponent({ name: 'IPhoneInputCountryDropdown' });

		dropdown.vm.$emit('selectCountry', {
			label: 'United Kingdom',
			value: 'gb',
			dialCode: '44',
			priority: 0,
			areaCodes: null,
		});
		await wrapper.vm.$nextTick();

		expect(dropdown.props('selectedCountry')).toMatchObject({
			value: 'gb',
			dialCode: '44',
		});
	});

	it('Should emit update:modelValue when country is changed', async () => {
		const dropdown = wrapper.findComponent({ name: 'IPhoneInputCountryDropdown' });

		dropdown.vm.$emit('selectCountry', {
			label: 'Germany',
			value: 'de',
			dialCode: '49',
			priority: 0,
			areaCodes: null,
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('update:modelValue')).toBeTruthy();
	});

	it('Should initialize with preSelectCountryCode', async () => {
		const localWrapper = shallowMount(IPhoneInput, {
			props: {
				label: 'Phone number',
				assetPath: '/assets',
				preSelectCountryCode: 'gb',
			},
		});

		await localWrapper.vm.$nextTick();

		const dropdown = localWrapper.findComponent({ name: 'IPhoneInputCountryDropdown' });

		expect(dropdown.props('selectedCountry')).toMatchObject({
			value: 'gb',
			dialCode: '44',
		});

		localWrapper.unmount();
	});

	it('Should initialize from modelValue and detect country', async () => {
		const localWrapper = shallowMount(IPhoneInput, {
			props: {
				label: 'Phone number',
				assetPath: '/assets',
				modelValue: '4412345678',
			},
		});

		await localWrapper.vm.$nextTick();

		const dropdown = localWrapper.findComponent({ name: 'IPhoneInputCountryDropdown' });

		expect(dropdown.props('selectedCountry')).toMatchObject({
			value: 'gb',
		});

		localWrapper.unmount();
	});

	it('Should expose validate method', () => {
		expect(wrapper.vm.validate).toBeDefined();
		expect(typeof wrapper.vm.validate).toBe('function');
	});
});
