import type { Meta, StoryObj } from "@storybook/vue3";
import IImage from "./IImage.vue";

const meta = {
	title: "Atoms/Image",
	component: IImage,
	tags: ["autodocs"],
	argTypes: {
		src: {
			control: "text",
			description: "Image source URL",
		},
		alt: {
			control: "text",
			description: "Alternative text for the image",
		},
		position: {
			control: "select",
			options: ["left", "right", "center"],
			description: "Image alignment position",
		},
	},
	parameters: {
		docs: {
			description: {
				component: "A component that displays an image with a loading spinner.",
			},
		},
	},
} satisfies Meta<typeof IImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		src: "https://placehold.co/300x200",
		alt: "Placeholder image",
	},
};

export const PositionLeft: Story = {
	args: {
		src: "https://placehold.co/150",
		alt: "Left aligned image",
		position: "left",
	},
};

export const PositionRight: Story = {
	args: {
		src: "https://placehold.co/150",
		alt: "Right aligned image",
		position: "right",
	},
};

export const PositionCenter: Story = {
	args: {
		src: "https://placehold.co/150",
		alt: "Center aligned image",
		position: "center",
	},
};

export const LargeImage: Story = {
	args: {
		src: "https://placehold.co/800x600",
		alt: "Large image",
	},
	parameters: {
		docs: {
			description: {
				story: "Large images will scale to fit their container (max-width: 100%)",
			},
		},
	},
};

export const WithCustomAttributes: Story = {
	args: {
		src: "https://placehold.co/200",
		alt: "Image with custom attributes",
	},
	render: (args) => ({
		components: { IImage },
		setup() {
			const handleImageLoaded = () => {
				console.log("Image loaded!");
			};

			return { args, handleImageLoaded };
		},
		template: `
			<i-image
				v-bind="args"
				@imageLoaded="handleImageLoaded"
				style="border: 2px solid #ccc; padding: 10px;"
			/>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: "The component supports additional HTML attributes and emits an 'imageLoaded' event",
			},
		},
	},
};

export const LoadingState: Story = {
	args: {
		src: "https://placehold.co/300x200?text=Loading...",
		alt: "Slow loading image",
	},
	parameters: {
		docs: {
			description: {
				story: "A loading spinner appears while the image is loading",
			},
		},
	},
};
