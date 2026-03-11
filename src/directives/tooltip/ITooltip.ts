import type { ITooltipOptions, ITooltipDirective } from './ITooltip.types';

interface TooltipData {
	tooltipEl: HTMLSpanElement;
	tooltipArrowEl: HTMLSpanElement;
	mouseoverHandler: () => void;
}

const tooltipDataMap = new WeakMap<HTMLElement, TooltipData>();

export const ITooltip: ITooltipDirective = {
	beforeMount(el, binding) {
		let tooltipPosition = '';
		const tooltipText = el.getAttribute('data-text');
		const tooltipEl = document.createElement('span');
		const tooltipArrowEl = document.createElement('span');
		const tooltipOptions: ITooltipOptions = binding.value || {};

		if (tooltipOptions.position) {
			tooltipPosition = tooltipOptions.position;
		}

		tooltipArrowEl.className = 'i-tooltip-arrow';
		tooltipEl.innerHTML = tooltipText || '';
		tooltipEl.className = `i-tooltip-hover ${tooltipPosition}`.trim();

		tooltipEl.appendChild(tooltipArrowEl);
		el.appendChild(tooltipEl);
		el.classList.add('i-tooltip');

		const mouseoverHandler = () => {
			const bodyEl = el.ownerDocument ? el.ownerDocument.body : null;

			let maxOffsetX: number;
			const buttonProps = el.getBoundingClientRect();
			let tooltipTop = buttonProps.top;
			let tooltipLeft =
				buttonProps.left + buttonProps.width / 2 - tooltipEl.offsetWidth / 2;

			if (bodyEl) {
				maxOffsetX = bodyEl.clientWidth;
			} else {
				maxOffsetX = el.clientWidth;
			}

			const tooltipWidth = tooltipEl.offsetWidth + 1;

			if (tooltipLeft + tooltipWidth > maxOffsetX) {
				tooltipLeft = maxOffsetX - tooltipWidth;
			}

			tooltipEl.style.cssText += `left:${tooltipLeft}px; right: unset;`;

			const arrowXOffset =
				buttonProps.left - tooltipLeft + buttonProps.width / 2;

			tooltipArrowEl.style.cssText += `left:${arrowXOffset - 8}px;`;

			if (tooltipPosition === 'bottom') {
				tooltipTop -= buttonProps.height + 24;
			} else {
				tooltipTop += buttonProps.height + 4;
			}

			tooltipEl.style.cssText += `top: ${tooltipTop}px;`;

			if (!tooltipOptions.isDynamic) {
				el.removeEventListener('mouseover', mouseoverHandler, false);
			}
		};

		el.addEventListener('mouseover', mouseoverHandler, false);
		tooltipDataMap.set(el, { tooltipEl, tooltipArrowEl, mouseoverHandler });
	},

	unmounted(el) {
		const data = tooltipDataMap.get(el);

		if (data) {
			el.removeEventListener('mouseover', data.mouseoverHandler, false);

			if (data.tooltipEl.parentNode) {
				data.tooltipEl.parentNode.removeChild(data.tooltipEl);
			}

			el.classList.remove('i-tooltip');
			tooltipDataMap.delete(el);
		}
	},
};
