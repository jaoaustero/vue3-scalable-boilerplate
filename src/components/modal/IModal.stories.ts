import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";
import { ref } from "vue";

import IModal from "./IModal.vue";
import IButton from "@/components/button/IButton.vue";
import ICard from "@/components/card/ICard.vue";
import IInput from "@/components/input/IInput.vue";

const meta: Meta<typeof IModal> = {
	title: "Templates/Modal",
	component: IModal,
	parameters: {
		docs: {
			description: {
				component: "Create a simple transparent modal popup",
			},
		},
	},
	argTypes: {
		isOpen: {
			control: "boolean",
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IModal>;

const renderDefault: StoryFn<typeof IModal> = (args) => ({
	components: { IModal, IButton },
	setup() {
		const isModalOpen = ref(false);

		const openModal = () => {
			isModalOpen.value = true;
		};

		const closeModal = () => {
			isModalOpen.value = false;
		};

		return { args, isModalOpen, openModal, closeModal };
	},
	template: `
		<div>
			<IModal
				v-bind="args"
				:is-open="isModalOpen">
				<div style="background: white; padding: 20px; border-radius: 8px; width: 300px;">
					<h2 style="margin-top: 0;">Default Modal</h2>
					<p>This is a simple modal with a white background container.</p>
					<IButton
						size="small"
						@click="closeModal">
						Close
					</IButton>
				</div>
			</IModal>
			<IButton
				size="small"
				@click="openModal">
				Open Modal
			</IButton>
		</div>
	`,
});

const renderWithCard: StoryFn<typeof IModal> = (args) => ({
	components: { IModal, IButton, ICard },
	setup() {
		const isModalOpen = ref(false);

		const openModal = () => {
			isModalOpen.value = true;
		};

		const closeModal = () => {
			isModalOpen.value = false;
		};

		return { args, isModalOpen, openModal, closeModal };
	},
	template: `
		<div>
			<IModal
				v-bind="args"
				:is-open="isModalOpen">
				<ICard>
					<h2 style="margin-top: 0;">Information</h2>
					<p>This card contains important information about your account.</p>
					<p>Please review the details carefully.</p>
					<div style="display: flex; justify-content: center; margin-top: 20px;">
						<IButton
							size="small"
							@click="closeModal">
							Got it
						</IButton>
					</div>
				</ICard>
			</IModal>
			<IButton
				size="small"
				@click="openModal">
				Open Card Modal
			</IButton>
		</div>
	`,
});

const renderWithForm: StoryFn<typeof IModal> = (args) => ({
	components: { IModal, IButton, ICard, IInput },
	setup() {
		const isModalOpen = ref(false);
		const inputValue = ref("");

		const openModal = () => {
			isModalOpen.value = true;
		};

		const handleSubmit = () => {
			console.log("Form submitted with:", inputValue.value);
			isModalOpen.value = false;
		};

		const handleCancel = () => {
			inputValue.value = "";
			isModalOpen.value = false;
		};

		return { args, isModalOpen, inputValue, openModal, handleSubmit, handleCancel };
	},
	template: `
		<div>
			<IModal
				v-bind="args"
				:is-open="isModalOpen">
				<ICard>
					<h2 style="margin-top: 0;">Contact Form</h2>
					<IInput
						v-model="inputValue"
						label="Email"
						placeholder="Enter your email"
						style="margin-bottom: 20px;"
					/>
					<div style="display: flex; justify-content: flex-end; gap: 10px;">
						<IButton
							size="small"
							@click="handleCancel">
							Cancel
						</IButton>
						<IButton
							size="small"
							@click="handleSubmit">
							Submit
						</IButton>
					</div>
				</ICard>
			</IModal>
			<IButton
				size="small"
				@click="openModal">
				Open Form Modal
			</IButton>
		</div>
	`,
});

export const DefaultStyle: Story = {
	render: renderDefault,
	args: {},
};

export const Basic: Story = {
	render: renderDefault,
	args: {},
};

export const WithCard: Story = {
	name: "With Card",
	render: renderWithCard,
	args: {},
};

export const WithForm: Story = {
	name: "With Form",
	render: renderWithForm,
	args: {},
};
