import type { Meta, StoryFn, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import IPhoneInput from './IPhoneInput.vue';

const meta: Meta<typeof IPhoneInput> = {
	title: 'Organisms/PhoneInput',
	component: IPhoneInput,
	parameters: {
		docs: {
			description: {
				component:
					'An international phone number input with a searchable country-code flag selector. ' +
					'Validates E.164 format and emits the raw digit string (dial code + subscriber number).',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
		},
		isRequired: {
			control: 'boolean',
		},
		assetPath: {
			control: 'text',
		},
		preSelectCountryCode: {
			control: 'text',
		},
		validation: {
			control: {
				type: 'select',
			},
			options: ['', 'phone'],
		},
		'onUpdate:modelValue': {
			action: 'update:modelValue',
		},
		'onUpdate:error': {
			action: 'update:error',
		},
		'onUpdate:invalidType': {
			action: 'update:invalidType',
		},
		onFocus: {
			action: 'focus',
		},
		onBlur: {
			action: 'blur',
		},
	},
	args: {
		label: 'Phone number',
		assetPath: 'src/assets',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IPhoneInput>;

const DefaultTemplate: StoryFn<typeof IPhoneInput> = (args) => ({
	components: { IPhoneInput },
	setup() {
		const value = ref('');
		const invalidType = ref('');
		const errorMessage = ref<Record<string, string>>({});
		return { args, value, invalidType, errorMessage };
	},
	template: `
		<div style="max-width: 400px">
			<i-phone-input
				v-model="value"
				v-bind="args"
				:invalidType="invalidType"
				:errorMessage="errorMessage"
			/>
			<p style="margin-top: 8px; font-size: 13px; color: #666;">Value: {{ value }}</p>
		</div>`,
});

const ValidationTemplate: StoryFn<typeof IPhoneInput> = (args) => ({
	components: { IPhoneInput },
	setup() {
		const value = ref('');
		const invalidType = ref('');
		const errorMessage = ref<Record<string, string>>({
			required: 'Phone number is required',
			starts_with_zero: 'Phone number cannot start with 0',
			invalid_length: 'Phone number is too short',
			invalid_country_code: 'Invalid phone number format',
		});

		const handleError = (hasError: boolean) => {
			if (!hasError) invalidType.value = '';
		};

		const handleInvalidType = (type: string) => {
			invalidType.value = type;
		};

		return { args, value, invalidType, errorMessage, handleError, handleInvalidType };
	},
	template: `
		<div style="max-width: 400px">
			<i-phone-input
				v-model="value"
				v-bind="args"
				:invalidType="invalidType"
				:errorMessage="errorMessage"
				@update:error="handleError"
				@update:invalidType="handleInvalidType"
			/>
			<p style="margin-top: 8px; font-size: 13px; color: #666;">Value: {{ value }}</p>
		</div>`,
});

const PreselectedTemplate: StoryFn<typeof IPhoneInput> = (args) => ({
	components: { IPhoneInput },
	setup() {
		const value = ref('');
		return { args, value };
	},
	template: `
		<div style="max-width: 400px">
			<i-phone-input
				v-model="value"
				v-bind="args"
			/>
			<p style="margin-top: 8px; font-size: 13px; color: #666;">Value: {{ value }}</p>
		</div>`,
});

const WithValueTemplate: StoryFn<typeof IPhoneInput> = (args) => ({
	components: { IPhoneInput },
	setup() {
		const value = ref('16175551234');
		return { args, value };
	},
	template: `
		<div style="max-width: 400px">
			<i-phone-input
				v-model="value"
				v-bind="args"
			/>
			<p style="margin-top: 8px; font-size: 13px; color: #666;">Value: {{ value }}</p>
		</div>`,
});

export const DefaultStyle: Story = {
	render: DefaultTemplate,
	args: {
		label: 'Phone number',
	},
};

export const Required: Story = {
	render: DefaultTemplate,
	args: {
		label: 'Phone number',
		isRequired: true,
	},
};

export const WithValidation: Story = {
	render: ValidationTemplate,
	args: {
		label: 'Phone number',
		isRequired: true,
		validation: 'phone',
	},
};

export const WithPreselectedCountry: Story = {
	render: PreselectedTemplate,
	args: {
		label: 'Phone number',
		preSelectCountryCode: 'gb',
	},
};

export const WithExistingValue: Story = {
	render: WithValueTemplate,
	args: {
		label: 'Phone number',
	},
};
