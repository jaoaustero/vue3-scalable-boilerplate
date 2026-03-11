import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";
import { ref } from "vue";

import ICheckbox from "./ICheckbox.vue";
import IButton from "@/components/button/IButton.vue";
import type { CheckboxOption } from "./ICheckbox.types";

const meta: Meta<typeof ICheckbox> = {
	title: "Molecules/Checkbox",
	component: ICheckbox,
	parameters: {
		docs: {
			description: {
				component: "Checkbox group component with validation and error handling",
			},
		},
	},
	argTypes: {
		id: {
			control: "text",
		},
		label: {
			control: "text",
		},
		modelValue: {
			control: "object",
		},
		value: {
			control: "object",
		},
		options: {
			control: "object",
		},
		errorMessage: {
			control: "object",
		},
		isRequired: {
			control: "boolean",
		},
		isSuccess: {
			control: "boolean",
		},
		onInput: {
			action: "input",
		},
		"onUpdate:modelValue": {
			action: "update:modelValue",
		},
		"onUpdate:error": {
			action: "update:error",
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ICheckbox>;

const renderWithValidation: StoryFn<typeof ICheckbox> = (args) => ({
	components: { ICheckbox, IButton },
	setup() {
		const field = ref({
			errorMessage: {
				required: "This field is required",
			},
			isError: false,
		});

		const selectedValues = ref(args.modelValue || args.value || []);

		const setError = (isError: boolean) => {
			field.value.isError = isError;
		};

		const checkboxRef = ref<InstanceType<typeof ICheckbox> | null>(null);

		const onSubmit = () => {
			checkboxRef.value?.validate();
			window.alert(JSON.stringify(selectedValues.value));
		};

		return {
			args,
			field,
			selectedValues,
			setError,
			checkboxRef,
			onSubmit,
		};
	},
	template: `
		<div>
			<i-checkbox
				ref="checkboxRef"
				v-bind="args"
				v-model="selectedValues"
				:errorMessage="field.errorMessage"
				@update:error="setError"
				@input="args.onInput"
				@update:modelValue="args['onUpdate:modelValue']" />
			<i-button @click="onSubmit">Submit</i-button>
		</div>
	`,
});

export const Default: Story = {
	render: renderWithValidation,
	args: {
		label: "How can we help?",
		modelValue: [],
		options: [
			{ id: 1, label: "Label", value: "check-1" },
			{ id: 2, label: "Label", value: "check-2" },
			{ id: 3, label: "Label", value: "check-3" },
		],
		isRequired: true,
	},
};

const renderBasic: StoryFn<typeof ICheckbox> = (args) => ({
	components: { ICheckbox },
	setup() {
		const onChecked = ref(args.modelValue || args.value || []);
		return { args, onChecked };
	},
		template: `
		<i-checkbox
			v-bind="args"
			v-model="onChecked"
			@input="args.onInput"
			@update:modelValue="args['onUpdate:modelValue']" />
	`,
});

export const Basic: Story = {
	render: renderBasic,
	args: {
		label: "Select options",
		modelValue: ["check-2"],
		options: [
			{ id: 1, label: "Default", value: "check-1" },
			{ id: 2, label: "Checked", value: "check-2" },
			{ id: 3, label: "Disabled", value: "check-3", disabled: true },
		],
	},
};
