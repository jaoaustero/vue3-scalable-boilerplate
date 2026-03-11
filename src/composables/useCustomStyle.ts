import { reactive } from 'vue';
import { Helper } from '@/utils';

export interface InputCustomStyle {
	height: string;
	paddingTop: string;
}

/**
 * Composable for managing custom input styles based on label height
 */
export function useCustomStyle() {
	const inputCustomStyle = reactive<InputCustomStyle>({
		height: '',
		paddingTop: ''
	});

	let labelCustomSize = false;

	/**
	 * Calculates and sets custom styles for input and label
	 *
	 * @param clientHeight - Height of the input element
	 * @param labelHeight - Height of the label element
	 */
	const customStyle = (clientHeight: number, labelHeight: number) => {
		if (labelHeight > 16) {
			inputCustomStyle.height = `${Helper.convertPixelToRem((labelHeight / 1.3) + clientHeight)}rem !important`;
			inputCustomStyle.paddingTop = `${Helper.convertPixelToRem(labelHeight / 1.3)}rem !important`;
			labelCustomSize = true;
		}
	};

	return {
		inputCustomStyle,
		labelCustomSize,
		customStyle
	};
}
