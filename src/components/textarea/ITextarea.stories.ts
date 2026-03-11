import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";
import { ref } from "vue";

import ITextarea from "./ITextarea.vue";

const meta: Meta<typeof ITextarea> = {
	title: "Molecules/Textarea",
	component: ITextarea,
	parameters: {
		docs: {
			description: {
				component:
					"Multi-line text input with label, validation, and error/success states.",
			},
		},
	},
	argTypes: {
		label: { control: "text" },
		placeholder: { control: "text" },
		modelValue: { control: "text" },
		isRequired: { control: "boolean" },
		isSuccess: { control: "boolean" },
		invalidType: { control: "text" },
		errorMessage: { control: "object" },
		validation: {
			control: { type: "select" },
			options: ["", "email", "name", "phone"],
		},
		width: { control: "number" },
		"onUpdate:modelValue": { action: "update:modelValue" },
		onFocus: { action: "focus" },
		onBlur: { action: "blur" },
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITextarea>;

const DefaultTemplate: StoryFn<typeof ITextarea> = (args) => ({
	components: { ITextarea },
	setup() {
		const value = ref("");
		return { args, value };
	},
	template: `
		<div>
			<i-textarea
				v-model="value"
				v-bind="args"
			/>
			<p>Value: {{ value }}</p>
		</div>`,
});

const TemplateWithValue: StoryFn<typeof ITextarea> = (args) => ({
	components: { ITextarea },
	setup() {
		const value = ref(
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
		);
		return { args, value };
	},
	template: `
		<div>
			<i-textarea
				v-model="value"
				v-bind="args"
			/>
			<p>Value: {{ value }}</p>
		</div>`,
});

export const Default: Story = {
	render: DefaultTemplate,
	args: {
		label: "Textarea",
		placeholder: "This is a sample placeholder",
	},
};

const TemplateWithInitialValue: StoryFn<typeof ITextarea> = (args) => ({
	components: { ITextarea },
	setup() {
		const value = ref("Valid content");
		return { args, value };
	},
	template: `
		<div>
			<i-textarea
				v-model="value"
				v-bind="args"
			/>
			<p>Value: {{ value }}</p>
		</div>`,
});

export const SuccessModifier: Story = {
	render: TemplateWithInitialValue,
	args: {
		label: "Textarea",
		placeholder: "placeholder",
		isSuccess: true,
	},
};

export const ErrorModifier: Story = {
	render: DefaultTemplate,
	args: {
		label: "Textarea",
		placeholder: "This is a sample placeholder",
		invalidType: "required",
		errorMessage: {
			required: "Empty is not allowed!",
		},
	},
};

export const WithValue: Story = {
	render: TemplateWithValue,
	args: {
		label: "Message",
		placeholder: "Enter your message",
		width: 250,
	},
};

export const Required: Story = {
	render: DefaultTemplate,
	args: {
		label: "Required field",
		placeholder: "Required placeholder",
		isRequired: true,
	},
};

export const WithInputHandler: Story = {
	render: DefaultTemplate,
	args: {
		label: "Textarea",
		placeholder: "Type here...",
	},
};
