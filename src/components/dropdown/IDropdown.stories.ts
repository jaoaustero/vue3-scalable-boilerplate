import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";
import { ref } from "vue";

import IDropdown from "./IDropdown.vue";
import IButton from "@/components/button/IButton.vue";
import type { IDropdownPosition } from "./IDropdown.types";

const meta: Meta<typeof IDropdown> = {
	title: "Molecules/Dropdown",
	component: IDropdown,
	parameters: {
		docs: {
			description: {
				component: "Dropdown component with menu positioning options",
			},
		},
	},
	argTypes: {
		isOpen: {
			control: "boolean",
		},
		position: {
			control: {
				type: "select",
			},
			options: ["left", "right"] as IDropdownPosition[],
		},
	},
	args: {
		isOpen: false,
		position: "right",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IDropdown>;

const renderDropdown: StoryFn<typeof IDropdown> = (args) => ({
	components: { IDropdown, IButton },
	setup() {
		const isDropdownOpen = ref(args.isOpen || false);
		const toggleDropdown = () => {
			isDropdownOpen.value = !isDropdownOpen.value;
		};
		const onOptionClick = (option: string) => {
			window.alert('Option ' + option + ' clicked');
			isDropdownOpen.value = false;
		};
		return {
			args,
			isDropdownOpen,
			toggleDropdown,
			onOptionClick,
		};
	},
	template: `
	<div style="height: 100px;">
		<i-dropdown
			v-model:isOpen="isDropdownOpen"
			:position="args.position">
			<i-button
				@click="toggleDropdown">
				Dropdown
			</i-button>

			<template #menu>
				<ul>
					<li v-for="i in 3" :key="i">
						<i-button
							:isText="true"
							@click="onOptionClick(i)">
							Option {{ i }}
						</i-button>
					</li>
				</ul>
			</template>
		</i-dropdown>
	</div>
	`,
});

export const DefaultStyle: Story = {
	render: renderDropdown,
	args: {
		isOpen: false,
		position: undefined,
	},
};

export const PositionModifier: Story = {
	render: renderDropdown,
	args: {
		isOpen: false,
		position: "right",
	},
};
