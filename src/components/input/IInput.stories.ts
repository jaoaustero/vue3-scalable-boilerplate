import type { Meta, StoryFn, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import IInput from './IInput.vue';

const meta: Meta<typeof IInput> = {
	title: 'Molecules/Input',
	component: IInput,
	parameters: {
		docs: {
			description: {
				component: 'A text box and its variations'
			}
		}
	},
	argTypes: {
		isRequired: {
			control: 'boolean'
		},
		isSuccess: {
			control: 'boolean'
		},
		label: {
			control: 'text'
		},
		size: {
			control: {
				type: 'select'
			},
			options: ['medium', null]
		},
		validation: {
			control: {
				type: 'select'
			},
			options: ['', 'email', 'name', 'phone']
		},
		'onUpdate:modelValue': {
			action: 'update:modelValue'
		},
		onFocus: {
			action: 'focus'
		},
		onBlur: {
			action: 'blur'
		}
	},
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof IInput>;

const DefaultTemplate: StoryFn<typeof IInput> = (args) => ({
	components: { IInput },
	setup() {
		const value = ref('');
		return { args, value };
	},
	template: `
		<div>
			<i-input
				v-model="value"
				v-bind="args"
				placeholder="placeholder" />
			<p>Value: {{ value }}</p>
		</div>`
});

const TemplateWithData: StoryFn<typeof IInput> = (args) => ({
	components: { IInput },
	setup() {
		const value = ref('John');
		return { args, value };
	},
	template: `
		<div>
			<i-input
				v-model="value"
				v-bind="args"
				placeholder="placeholder" />
			<p>Value: {{ value }}</p>
		</div>`
});

const TemplateWithDataDelay: StoryFn<typeof IInput> = (args) => ({
	components: { IInput },
	setup() {
		const value = ref('');
		setTimeout(() => {
			value.value = 'John';
		}, 3000);
		return { args, value };
	},
	template: `
		<div>
			<p>The name will show after 3s, to mock delay data mounting.</p>
			<i-input
				v-model="value"
				v-bind="args"
				placeholder="placeholder" />
			<p>Value: {{ value }}</p>
		</div>`
});

const ValidationTemplate: StoryFn<typeof IInput> = (args) => ({
	components: { IInput },
	setup() {
		const value = ref('');
		const invalidType = ref('');
		const errorMessage = ref<Record<string, string>>({});

		const setError = (isError: boolean) => {
			if (isError) {
				invalidType.value = 'required';
				errorMessage.value = {
					required: 'Error test'
				};
			}
		};

		return { args, value, invalidType, errorMessage, setError };
	},
	template: `
		<div>
			<i-input
				v-model="value"
				v-bind="args"
				:invalidType="invalidType"
				:errorMessage="errorMessage"
				@update:error="setError"
				placeholder="placeholder" />
			<p>Value: {{ value }}</p>
		</div>`
});

const TestTemplate: StoryFn<typeof IInput> = (args) => ({
	components: { IInput },
	setup() {
		const value = ref('support@example.com');
		const invalidType = ref('');
		const errorMessage = ref<Record<string, string>>({});

		const submit = () => {
			invalidType.value = 'validate';
			errorMessage.value = {
				validate: 'Error test'
			};
		};

		return { args, value, invalidType, errorMessage, submit };
	},
	template: `
		<div>
			<i-input
				v-model="value"
				v-bind="args"
				:invalidType="invalidType"
				:errorMessage="errorMessage"
				placeholder="e.g john.doe@test.com" />
			<p>Value: {{ value }}</p>
			<button @click="submit">Click</button>
		</div>`
});

const HeightModifierTemplate: StoryFn<typeof IInput> = (args) => ({
	components: { IInput },
	setup() {
		return { args };
	},
	template: `
		<div style="max-width: 200px">
			<i-input v-bind="args" />
		</div>`
});

export const DefaultStyle: Story = {
	render: DefaultTemplate,
	args: {
		label: 'Input',
		isRequired: true
	}
};

export const WithValue: Story = {
	render: TemplateWithData,
	args: {
		label: 'Input'
	}
};

export const WithValueDelay: Story = {
	render: TemplateWithDataDelay,
	args: {
		label: 'Input'
	}
};

export const SuccessModifier: Story = {
	render: DefaultTemplate,
	args: {
		label: 'Input',
		isSuccess: true
	}
};

export const ErrorModifier: Story = {
	render: DefaultTemplate,
	args: {
		label: 'Input'
	}
};

export const MediumSize: Story = {
	render: DefaultTemplate,
	args: {
		label: 'Input',
		size: 'medium'
	}
};

export const ValidateName: Story = {
	render: ValidationTemplate,
	args: {
		label: 'First name',
		validation: 'name',
		isRequired: true
	}
};

export const ValidateEmail: Story = {
	render: ValidationTemplate,
	args: {
		label: 'Email address',
		validation: 'email',
		isRequired: true
	}
};

export const ValidatePhone: Story = {
	render: ValidationTemplate,
	args: {
		label: 'Phone number',
		validation: 'phone',
		isRequired: true
	}
};

export const TestError: Story = {
	render: TestTemplate,
	args: {
		label: 'Email address',
		validation: 'email'
	}
};

export const HeightModifier: Story = {
	render: HeightModifierTemplate,
	args: {
		label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		modelValue: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
	}
};
