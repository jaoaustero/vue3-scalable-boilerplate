import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";
import { ref } from "vue";

import ISearch from "./ISearch.vue";
import type { ISearchOption } from "./ISearch.types";

const meta: Meta<typeof ISearch> = {
	title: "Organisms/Search",
	component: ISearch,
	parameters: {
		docs: {
			description: {
				component:
					"Search input with dropdown. Emits submitSearch after a delay when typing; supports keyboard navigation and option selection.",
			},
		},
	},
	argTypes: {
		modelValue: { control: "text" },
		placeholderText: { control: "text" },
		hasIcon: { control: "boolean" },
		iconFlip: { control: "boolean" },
		isLoading: { control: "boolean" },
		isOpen: { control: "boolean" },
		optionsLimit: { control: "number" },
		searchDelay: { control: "number" },
		totalResults: { control: "number" },
		"onUpdate:modelValue": { action: "update:modelValue" },
		"onUpdate:isOpen": { action: "update:isOpen" },
		onClearInput: { action: "clearInput" },
		onSubmitSearch: { action: "submitSearch" },
		onSelectOption: { action: "selectOption" },
		onShowAll: { action: "showAll" },
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ISearch>;

const mockOptions: ISearchOption[] = [
	{ id: 1, title: "Option 1", subtitle: "Sample subtitle for demo" },
	{ id: 2, title: "Option 2", subtitle: "" },
	{ id: 3, title: "Option 3", subtitle: "" },
];

const TemplateWithState: StoryFn<typeof ISearch> = (args) => ({
	components: { ISearch },
	setup() {
		const searchValue = ref("");
		const isSearchOpen = ref(false);
		const isSearching = ref(false);
		const articles = ref<ISearchOption[]>([]);

		const getSearchResult = () => {
			isSearching.value = true;
			if (searchValue.value.length) {
				setTimeout(() => {
					isSearching.value = false;
					articles.value = [...mockOptions, ...mockOptions, ...mockOptions];
				}, 800);
			} else {
				isSearching.value = false;
				articles.value = [];
			}
		};

		const handleClearInput = () => {
			articles.value = [];
		};

		const handleShowAll = () => {
			articles.value = [];
			searchValue.value = "";
		};

		const handleSelect = () => {
			articles.value = [];
			searchValue.value = "";
		};

		return {
			args,
			searchValue,
			isSearchOpen,
			isSearching,
			articles,
			getSearchResult,
			handleClearInput,
			handleShowAll,
			handleSelect,
		};
	},
	template: `
		<div style="max-width: 450px">
			<i-search
				v-model="searchValue"
				v-model:is-open="isSearchOpen"
				:is-loading="isSearching"
				:options="articles"
				:total-results="articles.length"
				v-bind="args"
				@submit-search="getSearchResult"
				@clear-input="handleClearInput"
				@show-all="handleShowAll"
				@select-option="handleSelect"
			/>
			<p style="margin-top: 1rem; font-size: 0.875rem;">Value: {{ searchValue }}</p>
		</div>
	`,
});

export const DefaultStyle: Story = {
	render: TemplateWithState,
	args: {
		placeholderText: "Search Here",
	},
};

export const WithIconOnLeft: Story = {
	render: TemplateWithState,
	args: {
		placeholderText: "Search Here",
		iconFlip: true,
	},
};

export const WithOptionsOpen: Story = {
	render: (args) => ({
		components: { ISearch },
		setup() {
			const searchValue = ref("test");
			const isOpen = ref(true);
			const options = ref<ISearchOption[]>([
				{ id: 1, title: "First result", subtitle: "Subtitle" },
				{ id: 2, title: "Second result", subtitle: "" },
			]);
			return { args, searchValue, isOpen, options };
		},
		template: `
			<div style="max-width: 450px">
				<i-search
					v-model="searchValue"
					v-model:is-open="isOpen"
					:options="options"
					:total-results="10"
					v-bind="args"
				/>
			</div>
		`,
	}),
	args: {
		placeholderText: "Search Here",
	},
};

export const Loading: Story = {
	render: (args) => ({
		components: { ISearch },
		setup() {
			const searchValue = ref("query");
			const isOpen = ref(true);
			const isLoading = ref(true);
			return { args, searchValue, isOpen, isLoading };
		},
		template: `
			<div style="max-width: 450px">
				<i-search
					v-model="searchValue"
					v-model:is-open="isOpen"
					:is-loading="isLoading"
					:options="[]"
					v-bind="args"
				/>
			</div>
		`,
	}),
	args: {
		placeholderText: "Search Here",
	},
};
