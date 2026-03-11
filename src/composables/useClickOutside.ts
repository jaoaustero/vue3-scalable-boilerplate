import { onMounted, onBeforeUnmount, type Ref } from "vue";

/**
 * Composable to handle clicks outside a given element.
 *
 * @param elementRef - Ref to the element to detect outside clicks for
 * @param callback - Called when a click occurs outside the element
 */
export function useClickOutside(
	elementRef: Ref<HTMLElement | null | undefined>,
	callback: (event: MouseEvent | TouchEvent) => void
) {
	function handleClick(event: MouseEvent | TouchEvent) {
		const el = elementRef.value;
		if (el && !el.contains(event.target as Node)) {
			callback(event);
		}
	}

	onMounted(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("touchstart", handleClick);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClick);
		document.removeEventListener("touchstart", handleClick);
	});
}
