import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";

import ITimeago from "./ITimeago.vue";
import type { TimeagoFormatConfig } from "./ITimeago.types";

const meta: Meta<typeof ITimeago> = {
	title: "Atoms/Timeago",
	component: ITimeago,
	parameters: {
		docs: {
			description: {
				component: "Convert timestamp into human readable format",
			},
		},
	},
	argTypes: {
		datetime: {
			control: "date",
		},
		isLive: {
			control: "boolean",
		},
		isDuration: {
			control: "boolean",
		},
		timeOnly: {
			control: "boolean",
		},
		format: {
			control: "object",
		},
		pluralize: {
			control: false,
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ITimeago>;

const render: StoryFn<typeof ITimeago> = (args) => ({
	components: { ITimeago },
	setup() {
		return { args };
	},
	template: '<i-timeago v-bind="args" />',
});

const currentTime = new Date().getTime();

export const LiveAgo: Story = {
	render,
	args: {
		datetime: currentTime,
		isLive: true,
		isDuration: true,
	},
};

const minutes = new Date(Date.now());
minutes.setMinutes(minutes.getMinutes() - 4);

export const MinsAgo: Story = {
	render,
	args: {
		datetime: minutes.getTime(),
		isDuration: true,
	},
};

const hours = new Date(Date.now());
hours.setMinutes(hours.getMinutes() - 120);

export const HoursAgo: Story = {
	render,
	args: {
		datetime: hours.getTime(),
		isDuration: true,
	},
};

export const TimeOnly: Story = {
	render,
	args: {
		datetime: currentTime,
		timeOnly: true,
	},
};

export const TodayDateTime: Story = {
	render,
	args: {
		datetime: currentTime,
	},
};

const yesterday = new Date(Date.now());
yesterday.setHours(yesterday.getHours() - 24);

export const YesterdayDateTime: Story = {
	render,
	args: {
		datetime: yesterday.getTime(),
	},
};

const sameMonth = new Date(Date.now());
sameMonth.setDate(sameMonth.getDate() - 19);

export const ThisMonthDateTime: Story = {
	render,
	args: {
		datetime: sameMonth.getTime(),
	},
};

const lastYear = new Date(Date.now());
lastYear.setFullYear(lastYear.getFullYear() - 1);

export const LastYearDateTime: Story = {
	render,
	args: {
		datetime: lastYear.getTime(),
	},
};
