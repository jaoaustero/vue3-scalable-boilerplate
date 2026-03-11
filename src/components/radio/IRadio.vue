<script setup lang="ts">
import { computed, ref } from "vue";
import type { IRadioProps, IRadioEmits } from "./IRadio.types";

defineOptions({
	name: "IRadio"
});

const emit = defineEmits<IRadioEmits>();

const props = withDefaults(
	defineProps<IRadioProps>(), {
		id: undefined,
		label: undefined,
		modelValue: undefined,
		checked: undefined,
		options: () => [],
		errorMessage: () => ({}),
		isRequired: false
	});

const value = computed({
	get: () => props.modelValue ?? props.checked ?? "",
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

const isOptionChecked = (optionValue: string | number): boolean => {
	if (value.value === "" || value.value === undefined || value.value === null) {
		return false;
	}

	return String(value.value) === String(optionValue);
};

const handleChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const targetValue = target.value;
	value.value = targetValue;
	handleValidation(targetValue);
};

const handleValidation = (picked?: string | number) => {
	if (!props.isRequired) {
		return;
	}

	const hasValue = picked !== undefined && picked !== null && String(picked).length > 0;
	if (hasValue) {
		emit("update:error", false);
		invalidType.value = "";
	} else {
		emit("update:error", true);
		invalidType.value = "required";
	}
};

const validate = () => {
	handleValidation(value.value);
};

defineExpose({
	validate
});
</script>

<template>
	<div
		role="group"
		class="i-form-wrapper"
		:aria-labelledby="id">
		<label
			:id="id"
			:class="labelClasses">
			<span v-if="isRequired">*</span> {{ label }}
		</label>

		<label
			class="i-radio-container"
			v-for="option in options"
			:key="option.id">
			<input
				v-bind="$attrs"
				@input="handleChange"
				type="radio"
				class="i-radio"
				:value="option.value"
				:name="option.name"
				:checked="isOptionChecked(option.value)"
				:disabled="option.disabled"
				:required="isRequired"
				ref="radiobutton">

			<span class="i-form-label">{{ option.label }}</span>

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
@use "./IRadio.scss" as *;
</style>
