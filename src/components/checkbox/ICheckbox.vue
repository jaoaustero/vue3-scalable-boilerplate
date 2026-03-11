<script setup lang="ts">
import { ref, computed } from "vue";
import type { ICheckboxProps, ICheckboxEmits, CheckboxOption } from "./ICheckbox.types";

defineOptions({
	name: "ICheckbox"
});

const emit = defineEmits<ICheckboxEmits>();

const props = withDefaults(
	defineProps<ICheckboxProps>(), {
		id: undefined,
		label: undefined,
		modelValue: undefined,
		value: undefined,
		options: () => [],
		errorMessage: () => ({}),
		isRequired: false,
		isSuccess: false,
	});

const value = computed({
	get: () => props.modelValue ?? props.value ?? [],
	set: (newValue) => {
		emit("update:modelValue", newValue);
		emit("input", newValue);
	}
});

const invalidType = ref<string>("");

const labelClasses = computed(() => {
	return [
		"i-form-label i-form-field-label",
		invalidType.value && "i-text-red-1"
	];
});

const errorLabel = computed(() => {
	return props.errorMessage[invalidType.value];
});

// Helper function to check if a value exists in the array
const isValueChecked = (optionValue: string | number): boolean => {
	return value.value.some(item => String(item) === String(optionValue));
};

// Helper function to find index of a value in array
const findValueIndex = (arr: (string | number)[], val: string | number): number => {
	return arr.findIndex(item => String(item) === String(val));
};

// Helper function to get option by value
const getOptionByValue = (optionValue: string | number): CheckboxOption | undefined => {
	return props.options?.find(opt => String(opt.value) === String(optionValue));
};

const handleChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const targetValue = target.value;
	const currentValue = [...value.value];
	const valueIndex = findValueIndex(currentValue, targetValue);

	if (target.checked) {
		if (valueIndex === -1) {
			const option = getOptionByValue(targetValue);
			currentValue.push(option?.value ?? targetValue);
		}
	} else {
		if (valueIndex > -1) {
			currentValue.splice(valueIndex, 1);
		}
	}

	value.value = currentValue;
	handleValidation(currentValue);
};

const handleValidation = (val?: (string | number)[]) => {
	const valueToValidate = val ?? value.value;
	if (props.isRequired) {
		if (valueToValidate.length > 0) {
			emit("update:error", false);
			invalidType.value = "";
		} else {
			emit("update:error", true);
			invalidType.value = "required";
		}
	}
};

const validate = () => {
	handleValidation(value.value);
};

// Expose validate method for parent components
defineExpose({
	validate
});

</script>

<template>
	<div
		role="group"
		:aria-labelledby="id"
		class="i-form-wrapper">
		<label
			:id="id"
			:class="labelClasses">
				<span v-if="isRequired">*</span> {{ label }}
			</label>

		<label
			v-for="option in options"
			:key="option.id"
			class="i-checkbox-container">
			<input
				v-bind="$attrs"
				type="checkbox"
				class="i-checkbox"
				@input="handleChange"
				:value="option.value"
				:checked="isValueChecked(option.value)"
				:disabled="option.disabled"
				:required="isRequired" />

				<span class="i-form-label">{{option.label}}</span>

				<span class="i-checkmark"></span>
		</label>

		<small
			v-if="invalidType"
			class="i-text-red-1 i-text-regular-1 i-margin-small-left">
			{{ errorLabel }}
		</small>
	</div>
</template>

<style lang="scss">
@use './ICheckbox.scss' as *;
</style>
