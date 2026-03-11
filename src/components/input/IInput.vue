<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { IInputProps, IInputEmits } from './IInput.types';
import { useCustomStyle } from '@/composables/useCustomStyle';
import { Helper } from '@/utils';

defineOptions({
	name: 'IInput',
	inheritAttrs: false
});

const emit = defineEmits<IInputEmits>();

const props = withDefaults(defineProps<IInputProps>(), {
	errorMessage: () => ({}),
	isRequired: false,
	isSuccess: false,
	label: null,
	size: null,
	modelValue: '',
	validation: '',
	invalidType: ''
});

const isActive = ref(false);
const inputId = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const labelRef = ref<HTMLLabelElement | null>(null);

const { inputCustomStyle, labelCustomSize, customStyle } = useCustomStyle();

onMounted(() => {
	if (inputRef.value && labelRef.value) {
		customStyle(inputRef.value.clientHeight, labelRef.value?.clientHeight || 0);
	}
});

const inputClasses = computed(() => {
	return [
		'i-input',
		props.invalidType && 'i-form-danger',
		props.isSuccess && 'i-form-success',
		props.size && `i-input-${props.size}`
	];
});

const labelClasses = computed(() => {
	return [
		'i-form-label',
		props.invalidType && 'i-text-red-1',
		props.isSuccess && 'i-text-green-1',
		isActive.value || props.modelValue ? 'i-active' : '',
		labelCustomSize ? 'i-form-label-custom-style' : ''
	];
});

const errorLabel = computed(() => {
	return props.errorMessage[props.invalidType];
});

const handleId = () => {
	const attrs = getCurrentInstance()?.attrs;
	if (attrs?.id === undefined || attrs?.id === '') {
		inputId.value = Helper.generateUUID();
	} else {
		inputId.value = attrs.id as string;
	}
};

const setActive = () => {
	isActive.value = true;
	emit('focus');
};

const unsetActive = () => {
	if (isActive.value && !(inputRef.value?.value.length ?? 0 > 0)) {
		isActive.value = false;
	}

	if (props.isRequired) {
		const isEmpty = handleIsEmpty();
		if (!isEmpty && props.validation.length) {
			handleValidation();
		}
	} else {
		if (props.validation.length && inputRef.value?.value.length) {
			handleValidation();
		}
	}

	emit('blur');
};

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};

const handleIsEmpty = (): boolean => {
	const isEmpty = Helper.isEmpty(inputRef.value?.value || '');

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
	// Bypass the phone that will be handled by the phone-input component
	if (props.validation === 'phone') {
		return;
	}

	// Trim the whitespace and update the value
	if (props.validation === 'email' && inputRef.value) {
		inputRef.value.value = inputRef.value.value.trim();
	}

	if (!inputRef.value) return;

	const validator = Helper.isValid({
		value: inputRef.value.value,
		type: props.validation as 'email' | 'name' | 'phone'
	});

	if (validator.isValid) {
		emit('update:error', false);
		emit('update:invalidType', '');
	} else {
		emit('update:error', true);
		emit('update:invalidType', props.validation);
	}
};

const validate = () => {
	unsetActive();
};

// Initialize inputId
handleId();

// Expose validate method
defineExpose({
	validate
});

// Get current instance for accessing attrs
import { getCurrentInstance } from 'vue';
</script>

<template>
	<div class="i-form-wrapper">
		<input
			ref="inputRef"
			:class="inputClasses"
			v-bind="$attrs"
			role="input"
			:id="inputId"
			:value="modelValue"
			:required="isRequired"
			@focus="setActive"
			@blur="unsetActive"
			@input="handleInput"
			:aria-required="isRequired"
			:aria-placeholder="label || undefined"
			:aria-label="label === null || label.length === 0 ? 'Input field' : undefined"
			:aria-labelledby="label !== null && label.length ? inputId : undefined"
			:aria-invalid="invalidType && invalidType.length ? true : undefined"
			:style="inputCustomStyle" />

		<label
			v-if="label !== null && label.length"
			:class="labelClasses"
			:for="inputId"
			ref="labelRef">
			<span v-if="isRequired">*</span> {{ label }}
		</label>

		<small
			v-if="invalidType"
			class="i-form-error-message i-text-regular-1">
			{{ errorLabel }}
		</small>
	</div>
</template>

<style lang="scss">
@use "./IInput.scss" as *;
</style>
