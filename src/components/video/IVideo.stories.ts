import type { Meta, StoryObj } from "@storybook/vue3";
import IVideo from "./IVideo.vue";

const meta: Meta<typeof IVideo> = {
	title: "Atoms/Video",
	component: IVideo,
	parameters: {
		docs: {
			description: {
				component:
					"A component that displays video from selfhosted URLs or embedded providers (YouTube, Dailymotion, Vimeo, Loom).",
			},
		},
	},
	argTypes: {
		content: {
			description: "Video content: url, source (selfhosted | youtube | dailymotion | vimeo | loom), and options",
		},
		isMobile: {
			control: "boolean",
			description: "When true, autoplay may be disabled on mobile unless options.mobile is set",
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IVideo>;

export const Selfhosted: Story = {
	args: {
		content: {
			source: "selfhosted",
			url: "https://www.example.com/video.mp4",
			options: {
				controls: true,
				mute: true,
				loop: true,
				startTime: "0:00",
			},
		},
	},
	parameters: {
		docs: {
			description: {
				story: "Selfhosted video using a direct file URL with optional start/end time.",
			},
		},
	},
};

export const Youtube: Story = {
	args: {
		content: {
			source: "youtube",
			url: "https://www.youtube.com/watch?v=_UG-Rrqa80U",
			options: {
				controls: true,
				mute: true,
				loop: true,
				startTime: 0,
			},
		},
	},
	parameters: {
		docs: {
			description: {
				story: "YouTube embed with optional start time, privacy mode, and modest branding.",
			},
		},
	},
};

export const Dailymotion: Story = {
	args: {
		content: {
			source: "dailymotion",
			url: "https://www.dailymotion.com/video/x3zbiv",
			options: {
				controls: true,
				mute: true,
				loop: true,
				startTime: 0,
			},
		},
	},
};

export const Vimeo: Story = {
	args: {
		content: {
			source: "vimeo",
			url: "https://player.vimeo.com/video/390751852",
			options: {
				controls: true,
				mute: true,
				loop: true,
				startTime: "0:00",
			},
		},
	},
};

export const VimeoWithParams: Story = {
	args: {
		content: {
			source: "vimeo",
			url: "https://player.vimeo.com/video/756442506?h=0edce955ef&badge=0&autopause=0&player_id=0&app_id=58479",
			options: {
				controls: true,
				mute: true,
				loop: true,
				startTime: "0:00",
			},
		},
	},
	parameters: {
		docs: {
			description: {
				story: "Vimeo URL with hash and app_id query params preserved in embed.",
			},
		},
	},
};

export const WithDimensions: Story = {
	args: {
		content: {
			source: "youtube",
			url: "https://www.youtube.com/watch?v=_UG-Rrqa80U",
			options: {
				controls: true,
				mute: true,
			},
		},
	},
	render: (args) => ({
		components: { IVideo },
		setup() {
			return { args };
		},
		template: `
			<i-video
				v-bind="args"
				height="315"
				width="550"
			/>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: "Embed with custom width/height via attributes.",
			},
		},
	},
};

export const MobileAutoplayDisabled: Story = {
	args: {
		isMobile: true,
		content: {
			source: "youtube",
			url: "https://www.youtube.com/watch?v=_UG-Rrqa80U",
			options: {
				controls: true,
				autoplay: true,
				mobile: false,
			},
		},
	},
	parameters: {
		docs: {
			description: {
				story: "On mobile, autoplay is disabled when options.mobile is false.",
			},
		},
	},
};
