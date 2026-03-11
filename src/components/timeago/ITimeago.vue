<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { ITimeagoProps } from "./ITimeago.types";

const msPerMinute = 1000 * 60;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;

defineOptions({
	name: "ITimeago"
});

const props = withDefaults(
	defineProps<ITimeagoProps>(),
	{
		isLive: false,
		isDuration: false,
		timeOnly: false,
		format: () => ({
			just: "Just Now",
			past: "#time ago",
			today: "Today, #time",
			second: {
				one: "#num second",
				other: "#num seconds"
			},
			minute: {
				one: "#num minute",
				other: "#num minutes"
			},
			hour: {
				one: "#num hour",
				other: "#num hours"
			},
			days: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			],
			months: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		}),
		pluralize: (n: number) => {
			if (n === 1) {
				return "one";
			}
			return "other";
		}
	}
);

const timeElement = ref<HTMLElement | null>(null);
const refreshMilliSeconds = 60000;
const updateInterval = ref<ReturnType<typeof setInterval> | null>(null);

const difference = (datetime: Date | number): number => {
	if (datetime instanceof Date) {
		datetime = datetime.getTime();
	}
	return Math.floor(new Date().getTime() - datetime);
};

const toDate = (timestamp: string | Date | number): Date => {
	return new Date(timestamp);
};

const getTimeOnly = (): string => {
	const parsetime = toDate(props.datetime);
	const hours = parsetime.getHours();
	const minutes = parsetime.getMinutes();

	return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

const getDuration = (): string => {
	const parsetime = toDate(props.datetime);
	const mSeconds = difference(parsetime);
	const pastTime = props.format.past;

	if (mSeconds < msPerMinute) {
		return props.format.just;
	}

	let timeValue: string;
	if (mSeconds < msPerHour) {
		const time = Math.round(mSeconds / msPerMinute);
		const pluralType = props.pluralize(time);
		timeValue = props.format.minute[pluralType].replace("#num", time.toString());
	} else {
		const time = Math.round(mSeconds / msPerHour);
		const pluralType = props.pluralize(time);
		timeValue = props.format.hour[pluralType].replace("#num", time.toString());
	}

	return pastTime.replace("#time", timeValue);
};

const getDateTime = (): string => {
	const inputDate = toDate(props.datetime);
	const today = new Date();
	const time = getTimeOnly();

	const inputDateCopy = new Date(inputDate);
	const todayCopy = new Date(today);
	inputDateCopy.setHours(0, 0, 0, 0);
	todayCopy.setHours(0, 0, 0, 0);

	if (inputDateCopy.getTime() === todayCopy.getTime()) {
		return props.format.today.replace("#time", time);
	}

	const diffDays = Math.floor((today.getTime() - inputDate.getTime()) / msPerDay);
	const day = props.format.days[inputDate.getDay()];

	if (diffDays < 7) {
		return `${day}, ${time}`;
	}

	const date = inputDate.getDate();
	const month = props.format.months[inputDate.getMonth()];
	const year = inputDate.getFullYear();

	if (year === today.getFullYear()) {
		return `${month} ${date}, ${time}`;
	}

	return `${month} ${date} ${year}, ${time}`;
};

const display = (): void => {
	if (!timeElement.value) return;

	let datetime: string;

	if (props.isDuration) {
		datetime = getDuration();
	} else if (props.timeOnly) {
		datetime = getTimeOnly();
	} else {
		datetime = getDateTime();
	}

	timeElement.value.textContent = datetime;
};

onMounted(() => {
	display();

	if (props.isLive) {
		updateInterval.value = setInterval(() => {
			display();
		}, refreshMilliSeconds);
	}
});

onBeforeUnmount(() => {
	if (updateInterval.value) {
		clearInterval(updateInterval.value);
	}
});
</script>

<template>
	<time
		ref="timeElement"
		class="i-timeago"
		v-bind="$attrs" />
</template>

<style lang="scss">
@use "./ITimeago.scss" as *;
</style>
