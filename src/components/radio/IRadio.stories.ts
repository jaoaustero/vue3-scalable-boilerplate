import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";
import { ref } from "vue";

import IRadio from "./IRadio.vue";
import IButton from "@/components/button/IButton.vue";
import type { RadioOption } from "./IRadio.types";

const meta: Meta<typeof IRadio> = {
	title: "Molecules/Radio",
	component: IRadio,
	parameters: {
		docs: {
			description: {
				component: "Radio group with validation and custom options",
			},
		},
	},
	argTypes: {
		label: {
			control: "text",
		},
		isRequired: {
			control: "boolean",
		},
		options: {
			control: "object",
		},
		modelValue: {
			control: "text",
		},
		checked: {
			control: "text",
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
type Story = StoryObj<typeof IRadio>;

const renderWithValidation: StoryFn<typeof IRadio> = (args) => ({
	components: { IRadio, IButton },
	setup() {
		const radiobuttons = ref<InstanceType<typeof IRadio> | null>(null);
		const field = {
			errorMessage: {
				required: "This field is required",
			},
		};

		const onSubmit = () => {
			radiobuttons.value?.validate();
			window.alert(`Selected value: ${args.modelValue}`);
		};

		return {
			args,
			field,
			radiobuttons,
			onSubmit,
		};
	},
	template: `
		<div>
			<i-radio
				v-bind="args"
				ref="radiobuttons"
				:modelValue="args.modelValue"
				@update:modelValue="args.modelValue = $event"
				@input="args.onInput?.($event)"
				:errorMessage="field.errorMessage"
				@update:error="args['onUpdate:error']?.($event)" />


			<i-button @click="onSubmit">Submit</i-button>
		</div>
	`,
});

export const Default: Story = {
	render: renderWithValidation,
	args: {
		label: "* How can we help?",
		modelValue: "",
		options: [
			{
				id: "free-chat-widget",
				label: "Free Chat Widget",
				name: "option",
				value: "Free Chat Widget",
			},
			{
				id: "hire-chat-agents",
				label: "Hire Chat Agents $1/hour",
				name: "option",
				value: "Hire Chat Agents $1/hour",
			},
			{
				id: "report-abuse",
				label: "Report Abuse",
				name: "option",
				value: "Report Abuse",
			},
			{
				id: "other",
				label: "Other",
				name: "option",
				value: "Other",
			},
		],
		isRequired: true,
	},
};

const BasicTemplate: StoryFn<typeof IRadio> = (args) => ({
	components: { IRadio },
	setup() {
		return { args };
	},
	template: "<i-radio v-bind='args' />",
});

export const Basic: Story = {
	render: BasicTemplate,
	args: {
		modelValue: "2",
		options: [
			{ id: "default", label: "Default", name: "option", value: 1 },
			{ id: "selected", label: "Selected", name: "option", value: 2 },
			{ id: "disabled", label: "Disabled", disabled: true, name: "option", value: 3 },
		],
	},
};

export const Preselected: Story = {
	render: renderWithValidation,
	args: {
		label: "* How can we help?",
		modelValue: "Free Chat Widget",
		options: [
			{
				id: "free-chat-widget",
				label: "Free Chat Widget",
				name: "option",
				value: "Free Chat Widget",
			},
			{
				id: "hire-chat-agents",
				label: "Hire Chat Agents $1/hour",
				name: "option",
				value: "Hire Chat Agents $1/hour",
			},
			{
				id: "report-abuse",
				label: "Report Abuse",
				name: "option",
				value: "Report Abuse",
			},
			{
				id: "other",
				label: "Other",
				name: "option",
				value: "Other",
			},
		],
		isRequired: true,
	},
};
