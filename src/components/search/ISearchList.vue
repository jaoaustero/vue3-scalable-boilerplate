<script setup lang="ts">
import { computed } from "vue";
import IIcon from "@/components/icon/IIcon.vue";
import ILoader from "@/components/loader/ILoader.vue";
import type { ISearchOption } from "./ISearch.types";

defineOptions({
	name: "ISearchList",
});

const props = withDefaults(
	defineProps<{
		highlightItem: number;
		highlightShowAll: boolean;
		isLoading: boolean;
		options: ISearchOption[];
		optionsLimit: number;
		reducedOptions: ISearchOption[];
		totalResults?: number;
		textAlign?: boolean;
	}>(),
	{ totalResults: 0, textAlign: false }
);

const emit = defineEmits<{
	handleSelectItem: [option: ISearchOption];
	handleShowAll: [];
}>();

function handleClick(option: ISearchOption) {
	emit("handleSelectItem", option);
}

function handleShowAll() {
	emit("handleShowAll");
}

const showAllLabel = computed(() => `Show all results (${props.totalResults})`);
</script>

<template>
	<div>
		<ul v-if="options.length" class="i-search-list">
			<li
				v-if="options.length < totalResults && !isLoading"
				:class="[
					'i-search-list-title',
					'i-search-list-title-button',
					'i-outline',
					highlightShowAll && 'i-active',
				]"
				tabindex="0"
				@click="handleShowAll"
				@keydown.enter="handleShowAll"
				@keydown.space.prevent="handleShowAll"
			>
				<div class="i-search-list-title-icon">
					<IIcon type="searches" />
				</div>
				<div class="i-search-list-title-label" role="status">
					<p>{{ showAllLabel }}</p>
				</div>
			</li>
			<li
				v-for="(option, index) in reducedOptions"
				:key="option.id"
				:class="[
					'i-flex',
					'i-flex-middle',
					'i-outline',
					highlightItem === index ? 'i-active' : '',
					textAlign && 'i-text-right i-flex-row-reverse',
				]"
				@click="handleClick(option)"
			>
				<div
					:class="
						textAlign ? 'i-margin-small-left' : 'i-margin-small-right'
					"
				>
					<svg
						class="i-search-list-icon"
						height="24"
						width="24"
						viewBox="0 0 20 25"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M19.76575,7.69043c-0.04767-0.11377-0.11658-0.21631-0.20221-0.30273
							c-0.00098-0.00098-0.00128-0.00244-0.00226-0.00342l-6.66699-6.66797c-0.00336-0.00342-0.00818-0.00439-0.01154-0.00781
							c-0.0849-0.08228-0.1839-0.15039-0.2948-0.19678c-0.11481-0.04785-0.23877-0.07373-0.36554-0.07373H3.33276
							c-1.74902,0-3.17236,1.42383-3.17236,3.17285v17.7793c0,1.74902,1.42334,3.17188,3.17236,3.17188h13.33398
							c1.74951,0,3.17285-1.42285,3.17285-3.17188V8.05615C19.8396,7.9292,19.81372,7.80542,19.76575,7.69043z M13.17261,3.68237
							l3.4231,3.42358h-3.4231V3.68237z M16.66675,22.66162H3.33276c-0.70166,0-1.27197-0.57031-1.27197-1.27148V3.61084
							c0-0.70215,0.57031-1.27246,1.27197-1.27246h7.93945v5.71777c0,0.52441,0.42529,0.9502,0.9502,0.9502h5.7168v12.38379
							C17.93921,22.09131,17.36841,22.66162,16.66675,22.66162z M15.39478,13.61182c0,0.52441-0.42529,0.9502-0.9502,0.9502H5.55493
							c-0.5249,0-0.9502-0.42578-0.9502-0.9502s0.42529-0.9502,0.9502-0.9502h8.88965
							C14.96948,12.66162,15.39478,13.0874,15.39478,13.61182z M15.39478,18.05615c0,0.52441-0.42529,0.9502-0.9502,0.9502H5.55493
							c-0.5249,0-0.9502-0.42578-0.9502-0.9502s0.42529-0.9502,0.9502-0.9502h8.88965
							C14.96948,17.10596,15.39478,17.53174,15.39478,18.05615z M4.60474,9.1665c0-0.52441,0.42529-0.9502,0.9502-0.9502h2.22266
							c0.5249,0,0.9502,0.42578,0.9502,0.9502s-0.42529,0.9502-0.9502,0.9502H5.55493C5.03003,10.1167,4.60474,9.69092,4.60474,9.1665z"
							fill-rule="evenodd"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div>
					<p class="i-text-regular-2" v-html="option.title" />
					<p
						v-if="option.subtitle?.length"
						class="i-text-regular-2"
						v-html="option.subtitle"
					/>
				</div>
			</li>
		</ul>

		<div
			v-if="isLoading"
			class="i-search-loader i-flex i-flex-middle"
		>
			<ILoader class="i-margin-small-right" type="icon" />
			<ILoader />
		</div>
	</div>
</template>
