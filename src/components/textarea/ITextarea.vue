<script setup lang="ts">
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import type { ITextareaProps, ITextareaEmits } from "./ITextarea.types";
import { useCustomStyle } from "@/composables/useCustomStyle";
import { Helper } from "@/utils";

defineOptions({
	name: "ITextarea",
	inheritAttrs: false,
});

const emit = defineEmits<ITextareaEmits>();

const props = withDefaults(defineProps<ITextareaProps>(), {
	errorMessage: () => ({}),
	isRequired: false,
	isSuccess: false,
	label: "",
	modelValue: "",
	validation: "",
	invalidType: "",
	width: undefined,
	placeholder: undefined,
});

const isActive = ref(false);
const textareaId = ref("");
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const labelRef = ref<HTMLLabelElement | null>(null);

const { inputCustomStyle, labelCustomSize, customStyle } = useCustomStyle();

onMounted(() => {
	if (textareaRef.value && labelRef.value) {
		customStyle(
			textareaRef.value.clientHeight,
			labelRef.value?.clientHeight ?? 0
		);
	}
});

const wrapperStyle = computed(() => ({
	maxWidth: props.width != null ? `${props.width}px` : undefined,
}));

const textareaClass = computed(() => [
	"i-textarea i-padding-small i-border-radius",
	props.invalidType && "i-form-danger",
	props.isSuccess && "i-form-success",
]);

const labelClass = computed(() => [
	"i-form-label",
	props.invalidType && "i-text-red-1",
	props.isSuccess && "i-text-green-1",
	(isActive.value || (props.modelValue?.length ?? 0) > 0) ? "i-active" : "",
	labelCustomSize ? "i-form-label-custom-style" : "",
]);

const errorLabel = computed(
	() => props.errorMessage[props.invalidType] ?? ""
);

function handleId() {
	const attrs = getCurrentInstance()?.attrs;
	if (attrs?.id === undefined || attrs?.id === "") {
		textareaId.value = Helper.generateUUID();
	} else {
		textareaId.value = String(attrs.id);
	}
}

function setActive() {
	isActive.value = true;
	emit("focus");
}

function unsetActive() {
	const valueLength = textareaRef.value?.value?.length ?? 0;
	if (isActive.value && valueLength === 0) {
		isActive.value = false;
	}

	if (props.isRequired) {
		const isEmpty = handleIsEmpty();
		if (!isEmpty && props.validation.length) {
			handleValidation();
		}
	} else {
		if (props.validation.length && valueLength > 0) {
			handleValidation();
		}
	}

	emit("blur");
}

function handleInput(event: Event) {
	const target = event.target as HTMLTextAreaElement;
	emit("update:modelValue", target.value);
}

function handleIsEmpty(): boolean {
	const value = textareaRef.value?.value ?? "";
	const isEmpty = Helper.isEmpty(value);

	if (isEmpty) {
		emit("update:error", true);
		emit("update:invalidType", "required");
		return true;
	}
	emit("update:error", false);
	emit("update:invalidType", "");
	return false;
}

function handleValidation() {
	if (props.validation === "phone") return;
	if (!textareaRef.value) return;

	const value = textareaRef.value.value;
	if (props.validation === "email") {
		textareaRef.value.value = value.trim();
	}

	const validator = Helper.isValid({
		value: textareaRef.value.value,
		type: props.validation as "email" | "name" | "phone",
	});

	if (validator.isValid) {
		emit("update:error", false);
		emit("update:invalidType", "");
	} else {
		emit("update:error", true);
		emit("update:invalidType", props.validation);
	}
}

function validate() {
	unsetActive();
}

handleId();

defineExpose({
	validate,
});
</script>

<template>
	<div class="i-form-wrapper" :style="wrapperStyle">
		<textarea
			ref="textareaRef"
			:class="textareaClass"
			v-bind="$attrs"
			role="textarea"
			:id="textareaId"
			:value="modelValue"
			:required="isRequired"
			:aria-required="isRequired"
			:aria-placeholder="label ?? undefined"
			:aria-label="
				label === null || (label?.length ?? 0) === 0
					? 'Input field'
					: undefined
			"
			:aria-labelledby="
				label != null && label.length ? textareaId : undefined
			"
			:aria-invalid="
				invalidType && invalidType.length ? true : undefined
			"
			:placeholder="placeholder"
			maxlength="500"
			:style="inputCustomStyle"
			@focus="setActive"
			@blur="unsetActive"
			@input="handleInput"
		/>

		<label
			v-if="label != null && label.length"
			ref="labelRef"
			:for="textareaId"
			:class="labelClass"
		>
			<span v-if="isRequired">*</span> {{ label }}
		</label>

		<small
			v-if="invalidType"
			class="i-form-error-message i-text-regular-1"
		>
			{{ errorLabel }}
		</small>
	</div>
</template>

<style lang="scss">
@use "./ITextarea.scss" as *;
</style>
