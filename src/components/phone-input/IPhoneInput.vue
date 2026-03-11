<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import IPhoneInputCountryDropdown from './IPhoneInputCountryDropdown.vue';
import IInput from '@/components/input/IInput.vue';

import { Phone } from '@/utils';
import type { IPhoneInputProps, IPhoneInputEmits, PhoneCountry } from './IPhoneInput.types';

defineOptions({
	name: 'IPhoneInput',
});

const emit = defineEmits<IPhoneInputEmits>();

const props = withDefaults(defineProps<IPhoneInputProps>(), {
	assetPath: '',
	label: null,
	modelValue: '',
	isRequired: false,
	validation: '',
	invalidType: '',
	errorMessage: () => ({}),
	preSelectCountryCode: '',
});

const DEFAULT_COUNTRY: PhoneCountry = {
	label: 'United States',
	value: 'us',
	dialCode: '1',
	priority: 0,
	areaCodes: null,
};

const currentPhoneNumber = ref('');
const formatPhoneNumber = ref({ dialCode: '', number: '' });
const selectedCountry = ref<PhoneCountry>({ ...DEFAULT_COUNTRY });
const isActive = ref(false);
const isPhoneDropdownOpen = ref(false);

onMounted(() => {
	if (props.preSelectCountryCode && props.preSelectCountryCode.length) {
		const countryData = Phone.getCountryData(props.preSelectCountryCode);

		selectedCountry.value = countryData;
		formatPhoneNumber.value.dialCode = countryData.dialCode;
		formatPhoneNumber.value.number = props.modelValue;

		currentPhoneNumber.value = `${formatPhoneNumber.value.dialCode}${formatPhoneNumber.value.number}`;
	} else if (props.modelValue && props.modelValue.length) {
		const formatted = Phone.format(props.modelValue);

		selectedCountry.value = {
			...selectedCountry.value,
			value: formatted.countryCode,
			dialCode: formatted.dialCode,
		};
		formatPhoneNumber.value.dialCode = formatted.dialCode;
		formatPhoneNumber.value.number = formatted.phoneNumber;

		currentPhoneNumber.value = `${formatPhoneNumber.value.dialCode}${formatPhoneNumber.value.number}`;
	} else {
		setPhoneNumber();
	}

	if (currentPhoneNumber.value.length > 0) {
		isActive.value = true;
	}
});

const wrapperStyle = computed(() => ({
	zIndex: isPhoneDropdownOpen.value ? 10 : 0,
}));

const phoneInputPlusClasses = computed(() => [
	'i-phone-input-plus',
	isActive.value && 'i-active',
]);

const selectCountry = (country: PhoneCountry) => {
	selectedCountry.value = country;

	resetPhoneNumber();
	setActive();

	emit('update:modelValue', currentPhoneNumber.value);
};

const handleSearch = (value: string) => {
	const sanitizedValue = Phone.sanitizedValue({ value });

	currentPhoneNumber.value = sanitizedValue;

	const formatted = Phone.format(sanitizedValue);

	selectedCountry.value = {
		...selectedCountry.value,
		value: formatted.countryCode,
		dialCode: formatted.dialCode,
	};
	formatPhoneNumber.value.dialCode = formatted.dialCode;
	formatPhoneNumber.value.number = formatted.phoneNumber;

	if (props.isRequired) {
		const isEmpty = handleIsEmpty();
		if (!isEmpty && props.validation && props.validation.length) {
			handleValidation();
		}
	} else {
		if (props.validation && props.validation.length && currentPhoneNumber.value.length) {
			handleValidation();
		}
	}

	emit('update:modelValue', sanitizedValue);
};

const resetPhoneNumber = () => {
	currentPhoneNumber.value = '';
	formatPhoneNumber.value.dialCode = selectedCountry.value.dialCode;
	formatPhoneNumber.value.number = '';
	currentPhoneNumber.value = formatPhoneNumber.value.dialCode;

	emit('update:modelValue', currentPhoneNumber.value);
};

const setPhoneNumber = () => {
	const getPhoneNumber = currentPhoneNumber.value.replace(/\D/g, '').slice(-10);

	currentPhoneNumber.value = '';
	formatPhoneNumber.value.dialCode = selectedCountry.value.dialCode;
	formatPhoneNumber.value.number = getPhoneNumber;
	currentPhoneNumber.value = `${formatPhoneNumber.value.dialCode}${formatPhoneNumber.value.number}`;
};

const setActive = () => {
	isActive.value = true;
	emit('focus');
};

const unsetActive = () => {
	if (isActive.value && !currentPhoneNumber.value.length) {
		isActive.value = false;
	}

	if (props.isRequired) {
		const isEmpty = handleIsEmpty();
		if (!isEmpty && props.validation && props.validation.length) {
			handleValidation();
		}
	} else {
		if (props.validation && props.validation.length && currentPhoneNumber.value.length) {
			handleValidation();
		}
	}

	emit('blur');
};

const handleIsEmpty = (): boolean => {
	const isEmpty = !currentPhoneNumber.value.trim().length;

	if (isEmpty) {
		emit('update:error', true);
		emit('update:invalidType', 'required');
		return true;
	} else {
		emit('update:error', false);
		emit('update:invalidType', '');
		return false;
	}
};

const handleValidation = () => {
	if (currentPhoneNumber.value.startsWith('0')) {
		emit('update:error', true);
		emit('update:invalidType', 'starts_with_zero');
	} else if (props.isRequired && currentPhoneNumber.value.length === 0) {
		emit('update:error', true);
		emit('update:invalidType', 'required');
	} else if (props.isRequired && currentPhoneNumber.value.length <= 3) {
		emit('update:error', true);
		emit('update:invalidType', 'invalid_length');
	} else if (props.isRequired && currentPhoneNumber.value.length >= 4) {
		if (isValidE164PhoneNumber(currentPhoneNumber.value)) {
			emit('update:error', false);
			emit('update:invalidType', '');
		} else {
			emit('update:error', true);
			emit('update:invalidType', 'invalid_country_code');
		}
	} else {
		emit('update:error', false);
		emit('update:invalidType', '');
	}
};

const isValidE164PhoneNumber = (phoneNumber: string): boolean => {
	const cleanedNumber = phoneNumber.replace(/[\s\-()]/g, '');
	const e164Regex = /^[1-9]\d{1,14}$/;
	return e164Regex.test(cleanedNumber);
};

const handleDropdownToggle = (isDropdownOpen: boolean) => {
	if (isDropdownOpen) {
		isPhoneDropdownOpen.value = isDropdownOpen;
		return;
	}

	setTimeout(() => {
		isPhoneDropdownOpen.value = isDropdownOpen;
	}, 300);
};

const validate = () => {
	unsetActive();
};

defineExpose({ validate });
</script>

<template>
	<div
		class="i-form-wrapper i-phone-input-wrapper"
		:style="wrapperStyle"
	>
		<IPhoneInputCountryDropdown
			:assetPath="assetPath"
			:selectedCountry="selectedCountry"
			@selectCountry="selectCountry"
			@update:isOpen="handleDropdownToggle"
		/>

		<div class="i-flex-1 i-inline">
			<span :class="phoneInputPlusClasses">+</span>

			<IInput
				:label="label"
				:modelValue="currentPhoneNumber"
				:isRequired="isRequired"
				:invalidType="invalidType"
				:errorMessage="errorMessage"
				inputMode="numeric"
				name="phone"
				type="tel"
				@update:modelValue="handleSearch"
				@focus="setActive"
				@blur="unsetActive"
			/>
		</div>
	</div>
</template>

<style lang="scss">
@use "./IPhoneInput.scss" as *;
</style>
