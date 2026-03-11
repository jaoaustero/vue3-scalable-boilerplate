import type { Meta, StoryFn, StoryObj } from '@storybook/vue3';

import { ITooltip } from './ITooltip';
import type { ITooltipOptions, ITooltipPosition } from './ITooltip.types';

const positions: ITooltipPosition[] = ['top', 'bottom'];

const meta: Meta = {
	title: 'Directives/Tooltip',
	parameters: {
		docs: {
			description: {
				component:
					'Tooltip directive that displays a tooltip on hover. Reads the tooltip text from `data-text` attribute.',
			},
		},
	},
	argTypes: {
		position: {
			control: { type: 'select' },
			options: positions,
			description: 'Position of the tooltip relative to the trigger element',
		},
		isDynamic: {
			control: { type: 'boolean' },
			description:
				'Whether the tooltip should recalculate position on each mouseover',
		},
	},
	args: {
		position: 'top',
		isDynamic: false,
	} satisfies ITooltipOptions,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const renderTooltip: StoryFn = (args) => ({
	directives: {
		'i-tooltip': ITooltip,
	},
	setup() {
		return { args };
	},
	template: `
		<div style="padding: 80px; display: flex; justify-content: center;">
			<button
				v-i-tooltip="args"
				data-text="This is a tooltip"
				style="padding: 8px 16px; border: 1px solid #d4d4d4; border-radius: 4px; cursor: pointer; background: #fff;"
			>
				Hover me
			</button>
		</div>
	`,
});

export const Default: Story = {
	render: renderTooltip,
	args: {
		position: 'top',
	},
};

export const Bottom: Story = {
	render: renderTooltip,
	args: {
		position: 'bottom',
	},
};

export const Dynamic: Story = {
	render: renderTooltip,
	args: {
		position: 'top',
		isDynamic: true,
	},
};
