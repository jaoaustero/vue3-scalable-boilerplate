<script setup lang="ts">
import { ref, computed } from 'vue';

import IFlag from '@/components/flag/IFlag.vue';
import IIcon from '@/components/icon/IIcon.vue';
import IButton from '@/components/button/IButton.vue';
import IDropdown from '@/components/dropdown/IDropdown.vue';
import IList from '@/components/list/IList.vue';

import { Phone } from '@/utils';
import type { PhoneCountry } from './IPhoneInput.types';

defineOptions({
	name: 'IPhoneInputCountryDropdown',
});

interface IPhoneInputCountryDropdownProps {
	/** Base asset path forwarded to IFlag */
	assetPath?: string;
	/** Currently selected country */
	selectedCountry: PhoneCountry;
}

interface IPhoneInputCountryDropdownEmits {
	(e: 'selectCountry', country: PhoneCountry): void;
	(e: 'update:isOpen', isOpen: boolean): void;
}

const props = withDefaults(defineProps<IPhoneInputCountryDropdownProps>(), {
	assetPath: '',
});

const emit = defineEmits<IPhoneInputCountryDropdownEmits>();

const isOpen = ref(false);
const search = ref('');

const filteredCountries = computed(() => {
	const query = search.value.toLowerCase();

	return Phone.getCodeList().filter(
		(country) =>
			country.label.toLowerCase().includes(query) ||
			country.dialCode.includes(query),
	);
});

const handleToggle = () => {
	isOpen.value = !isOpen.value;
	emit('update:isOpen', isOpen.value);
};

const handleDropdownClose = (value: boolean) => {
	if (isOpen.value !== value) {
		isOpen.value = value;
		emit('update:isOpen', value);
	}
};

const handleSelectCountry = (country: PhoneCountry) => {
	isOpen.value = false;
	search.value = '';
	emit('update:isOpen', false);
	emit('selectCountry', {
		label: country.label,
		value: country.value,
		dialCode: country.dialCode.replace(/[+]/g, ''),
		priority: country.priority,
		areaCodes: country.areaCodes,
	});
};
</script>

<template>
	<IDropdown :isOpen="isOpen" @update:isOpen="handleDropdownClose">
		<IButton
			class="i-phone-input-dropdown-button"
			:label="selectedCountry.label"
			@click="handleToggle"
		>
			<IFlag
				:assetPath="assetPath"
				:type="selectedCountry.value"
				size="medium"
			/>
			<IIcon type="caret-down" size="xsmall" />
		</IButton>

		<template #menu>
			<div class="i-phone-input-dropdown-menu-header">
				<input
					class="i-input"
					type="text"
					placeholder="Search"
					v-model="search"
				/>
			</div>

			<IList class="i-phone-input-country-list">
				<li
					v-for="country in filteredCountries"
					:key="country.value"
					:class="[
						'i-phone-input-country-item',
						selectedCountry.value === country.value && 'i-active',
					]"
					@click="handleSelectCountry(country)"
				>
					<div class="i-phone-input-country-item-inner">
						<div class="i-phone-input-country-flag">
							<IFlag
								:assetPath="assetPath"
								:type="country.value"
								size="medium"
							/>
						</div>
						<div class="i-phone-input-country-name">{{ country.label }}</div>
						<div class="i-phone-input-country-dial">(+{{ country.dialCode }})</div>
					</div>
				</li>
			</IList>
		</template>
	</IDropdown>
</template>
