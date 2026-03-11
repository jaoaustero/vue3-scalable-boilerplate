import type { Meta, StoryFn, StoryObj } from "@storybook/vue3";
import IChatBubble from "./IChatBubble.vue";
import type {
	IChatBubbleProps,
	ChatBubbleAttachment,
	ChatBubbleAttachments,
	ChatBubbleVideoAttachment,
} from "./IChatBubble.types";

const meta: Meta<typeof IChatBubble> = {
	title: "Molecules/Chat Bubble",
	component: IChatBubble,
	parameters: {
		docs: {
			description: {
				component:
					"Create a message or chat bubble for conversation with support for text, images, videos, audio, and file attachments.",
			},
		},
	},
	argTypes: {
		isActive: {
			control: "boolean",
			description: "To set active color",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
				category: "Props",
			},
		},
		attachments: {
			control: "object",
			description: "A list of attachments (videos, images, audios, files)",
			table: {
				type: {
					summary: "ChatBubbleAttachments",
					detail: `{
  videos?: ChatBubbleVideoAttachment[];
  images?: ChatBubbleAttachment[];
  audios?: ChatBubbleAttachment[];
  files?: ChatBubbleAttachment[];
}`,
				},
				defaultValue: {
					summary: "{}",
					detail: "{ videos: [], images: [], audios: [], files: [] }",
				},
				category: "Props",
			},
		},
		onImageLoaded: {
			action: "imageLoaded",
			description: "Emitted when an image has finished loading",
			table: {
				type: { summary: "() => void" },
				category: "Events",
			},
		},
	},
	args: {
		isActive: false,
		attachments: {
			videos: [],
			images: [],
			audios: [],
			files: [],
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IChatBubble>;

const renderWithSlot =
	(slotMarkup = ""): StoryFn<typeof IChatBubble> =>
	(args) => ({
		components: { IChatBubble },
		setup() {
			return { args };
		},
		template: `
			<div style="width: 350px; background-color: #FFFFFF; padding: 12px; border: 1px solid #e9e9e9; border-radius: 4px;">
				<div style="width: 90%;">
					<i-chat-bubble v-bind="args">
						${slotMarkup}
					</i-chat-bubble>
				</div>
			</div>
		`,
	});

export const DefaultStyle: Story = {
	render: renderWithSlot(
		"While we don't have a physical showroom, we provide high-definition images and 360-degree videos of our gemstones on our website. Thank you."
	),
	args: {
		isActive: false,
	},
};

export const ActiveStyle: Story = {
	render: renderWithSlot(
		"While we don't have a physical showroom, we provide high-definition images and 360-degree videos of our gemstones on our website. Thank you."
	),
	args: {
		isActive: true,
	},
};

export const SingleImage: Story = {
	render: renderWithSlot(
		"While we don't have a physical showroom, we provide high-definition images and 360-degree videos of our gemstones on our website. Thank you."
	),
	args: {
		attachments: {
			images: [
				{
					source:
						"https://imgv3.fotor.com/images/gallery/feature-background-gallery-marble-ink-2.jpg",
					name: "Dummy Image 1",
				},
			],
		},
	},
};

export const TwoImages: Story = {
	render: renderWithSlot(
		"While we don't have a physical showroom, we provide high-definition images and 360-degree videos of our gemstones on our website. Thank you."
	),
	args: {
		attachments: {
			images: [
				{
					source:
						"https://imgv3.fotor.com/images/gallery/feature-background-gallery-marble-ink-2.jpg",
					name: "Dummy Image 1",
				},
				{
					source:
						"https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg",
					name: "Dummy Image 2",
				},
			],
		},
	},
};

export const ThreeImages: Story = {
	render: renderWithSlot(
		"While we don't have a physical showroom, we provide high-definition images and 360-degree videos of our gemstones on our website. Thank you."
	),
	args: {
		attachments: {
			images: [
				{
					source:
						"https://imgv3.fotor.com/images/gallery/feature-background-gallery-marble-ink-2.jpg",
					name: "Dummy Image 1",
				},
				{
					source:
						"https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg",
					name: "Dummy Image 2",
				},
				{
					source:
						"https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Photoshop-Replace-Background-Featured.jpg",
					name: "Dummy Image 3",
				},
			],
		},
	},
};

export const FourImages: Story = {
	render: renderWithSlot(
		"While we don't have a physical showroom, we provide high-definition images and 360-degree videos of our gemstones on our website. Thank you."
	),
	args: {
		attachments: {
			images: [
				{
					source:
						"https://imgv3.fotor.com/images/gallery/feature-background-gallery-marble-ink-2.jpg",
					name: "Dummy Image 1",
				},
				{
					source:
						"https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg",
					name: "Dummy Image 2",
				},
				{
					source:
						"https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Photoshop-Replace-Background-Featured.jpg",
					name: "Dummy Image 3",
				},
				{
					source:
						"https://img.freepik.com/premium-photo/colorful-yellow-marble-pattern-abstract-background-image-ai-generated-art_856480-1096.jpg",
					name: "Dummy Image 4",
				},
			],
		},
	},
};

export const FiveImages: Story = {
	render: renderWithSlot(
		"While we don't have a physical showroom, we provide high-definition images and 360-degree videos of our gemstones on our website. Thank you."
	),
	args: {
		attachments: {
			images: [
				{
					source:
						"https://imgv3.fotor.com/images/gallery/feature-background-gallery-marble-ink-2.jpg",
					name: "Dummy Image 1",
				},
				{
					source:
						"https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg",
					name: "Dummy Image 2",
				},
				{
					source:
						"https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Photoshop-Replace-Background-Featured.jpg",
					name: "Dummy Image 3",
				},
				{
					source:
						"https://img.freepik.com/premium-photo/colorful-yellow-marble-pattern-abstract-background-image-ai-generated-art_856480-1096.jpg",
					name: "Dummy Image 4",
				},
				{
					source:
						"https://imgv3.fotor.com/images/gallery/feature-background-gallery-marble-ink-2.jpg",
					name: "Dummy Image 5",
				},
			],
		},
	},
};

export const FileContent: Story = {
	render: renderWithSlot(
		"While we don't have a physical showroom, we provide high-definition images and 360-degree videos of our gemstones on our website. Thank you."
	),
	args: {
		attachments: {
			files: [
				{
					source: "/files/dummy.pdf",
					name: "Brochure.pdf",
					size: "32mb",
				},
			],
		},
	},
};

export const SelfHostedVideo: Story = {
	render: renderWithSlot(
		"Here's a product demonstration video for you."
	),
	args: {
		attachments: {
			videos: [
				{
					source: "https://peach.blender.org/wp-content/uploads/bbb-splash.png",
					name: "Big Buck Bunny",
					type: "video/mp4",
					url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
					options: {
						controls: true,
						mute: false,
						loop: false,
						autoplay: false,
					},
				},
			],
		},
	},
};

export const SelfHostedVideoWithAutoplay: Story = {
	render: renderWithSlot(
		"This video will autoplay when loaded."
	),
	args: {
		attachments: {
			videos: [
				{
					source: "https://peach.blender.org/wp-content/uploads/bbb-splash.png",
					name: "Big Buck Bunny - Autoplay",
					type: "video/mp4",
					url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
					options: {
						controls: true,
						mute: true,
						loop: true,
						autoplay: true,
					},
				},
			],
		},
	},
};

export const YouTubeVideo: Story = {
	render: renderWithSlot(
		"Check out this YouTube video about our services."
	),
	args: {
		attachments: {
			videos: [
				{
					source: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
					name: "YouTube Video",
					type: "video/youtube",
					url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
					options: {
						controls: true,
						mute: false,
						loop: false,
						autoplay: false,
					},
				},
			],
		},
	},
};

export const YouTubeVideoWithStartTime: Story = {
	render: renderWithSlot(
		"This YouTube video starts at a specific timestamp."
	),
	args: {
		attachments: {
			videos: [
				{
					source: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
					name: "Me at the zoo - Start at 10s",
					type: "video/youtube",
					url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
					options: {
						controls: true,
						mute: false,
						loop: false,
						autoplay: false,
						startTime: 10,
					},
				},
			],
		},
	},
};

export const VimeoVideo: Story = {
	render: renderWithSlot(
		"Here's a Vimeo video showcasing our work."
	),
	args: {
		attachments: {
			videos: [
				{
					source: "https://i.vimeocdn.com/video/928117638-66dab03485f7d528a3ac23a49ab3ff4c06a98f0e7db86a4b51e01771696a3568-d_640",
					name: "Vimeo Video",
					type: "video/vimeo",
					url: "https://vimeo.com/76979871",
					options: {
						controls: true,
						mute: false,
						loop: false,
						autoplay: false,
					},
				},
			],
		},
	},
};

export const VimeoVideoMuted: Story = {
	render: renderWithSlot(
		"This Vimeo video plays muted."
	),
	args: {
		attachments: {
			videos: [
				{
					source: "https://i.vimeocdn.com/video/928117638-66dab03485f7d528a3ac23a49ab3ff4c06a98f0e7db86a4b51e01771696a3568-d_640",
					name: "Vimeo Video - Muted",
					type: "video/vimeo",
					url: "https://vimeo.com/76979871",
					options: {
						controls: true,
						mute: true,
						loop: false,
						autoplay: false,
					},
				},
			],
		},
	},
};

export const MultipleVideos: Story = {
	render: renderWithSlot(
		"Here are multiple videos from different sources."
	),
	args: {
		attachments: {
			videos: [
				{
					source: "https://peach.blender.org/wp-content/uploads/bbb-splash.png",
					name: "Self-hosted Video",
					type: "video/mp4",
					url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
					options: {
						controls: true,
						mute: false,
						loop: false,
						autoplay: false,
					},
				},
				{
					source: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
					name: "YouTube Video",
					type: "video/youtube",
					url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
					options: {
						controls: true,
						mute: false,
						loop: false,
						autoplay: false,
					},
				},
				{
					source: "https://i.vimeocdn.com/video/928117638-66dab03485f7d528a3ac23a49ab3ff4c06a98f0e7db86a4b51e01771696a3568-d_640",
					name: "Vimeo Video",
					type: "video/vimeo",
					url: "https://vimeo.com/76979871",
					options: {
						controls: true,
						mute: false,
						loop: false,
						autoplay: false,
					},
				},
			],
		},
	},
};

export const VideoWithImages: Story = {
	render: renderWithSlot(
		"Here's a video along with some images."
	),
	args: {
		attachments: {
			videos: [
				{
					source: "https://peach.blender.org/wp-content/uploads/bbb-splash.png",
					name: "Product Demo",
					type: "video/mp4",
					url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
					options: {
						controls: true,
						mute: false,
						loop: false,
						autoplay: false,
					},
				},
			],
			images: [
				{
					source: "https://imgv3.fotor.com/images/gallery/feature-background-gallery-marble-ink-2.jpg",
					name: "Product Image 1",
				},
				{
					source: "https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg",
					name: "Product Image 2",
				},
			],
		},
	},
};

export const VideoLooping: Story = {
	render: renderWithSlot(
		"This video will loop continuously."
	),
	args: {
		attachments: {
			videos: [
				{
					source: "https://peach.blender.org/wp-content/uploads/bbb-splash.png",
					name: "Looping Video",
					type: "video/mp4",
					url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
					options: {
						controls: true,
						mute: false,
						loop: true,
						autoplay: false,
					},
				},
			],
		},
	},
};

export const MixedContent: Story = {
	render: renderWithSlot(`
		<p>Here's a comprehensive overview of our product with <strong>all attachment types</strong>:</p>
		<ul>
			<li>Product demonstration video</li>
			<li>High-resolution product images</li>
			<li>Audio walkthrough guide</li>
			<li>Downloadable brochure</li>
		</ul>
		<p>Feel free to explore all the materials above!</p>
	`),
	args: {
		attachments: {
			videos: [
				{
					source: "https://peach.blender.org/wp-content/uploads/bbb-splash.png",
					name: "Product Demo Video",
					type: "video/mp4",
					url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
					options: {
						controls: true,
						mute: false,
						loop: false,
						autoplay: false,
					},
				},
			],
			images: [
				{
					source: "https://imgv3.fotor.com/images/gallery/feature-background-gallery-marble-ink-2.jpg",
					name: "Product Image 1",
				},
				{
					source: "https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg",
					name: "Product Image 2",
				},
				{
					source: "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Photoshop-Replace-Background-Featured.jpg",
					name: "Product Image 3",
				},
			],
			audios: [
				{
					source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
					name: "Product Audio Guide.mp3",
					type: "audio/mpeg",
					size: "4.5mb",
				},
			],
			files: [
				{
					source: "/files/product-brochure.pdf",
					name: "Product Brochure.pdf",
					type: "application/pdf",
					size: "2.3mb",
				},
				{
					source: "/files/specifications.docx",
					name: "Technical Specifications.docx",
					type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					size: "856kb",
				},
			],
		},
	},
};

export const HTMLElements: Story = {
	render: renderWithSlot(`
		<strong>Bold text</strong>
		<br><br>
		<i>Italic text</i>
		<br><br>
		<del>strike through</del>
		<br><br>
		<blockquote>Blockquote as example</blockquote>
		<br>
		<ol>
			<li>First item as ordered</li>
			<li>Second </li>
			<li>This is the last as ordered</li>
		</ol>
		<br>
		<ul>
			<li>First item</li>
			<li>Second </li>
			<li>This is the last</li>
		</ul>
		<br>
		<br><br>
		<code>inline code</code>
	`),
	args: {},
};
