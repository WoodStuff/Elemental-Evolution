import { Ref } from "vue";
import { floor } from "../utils";

/**
 * Registers and starts a resource generator.
 * @param perSecond How many of the resource to generate per second.
 * @param generate The function called to generate the resource.
 * @param decimalPlaces How many decimal places to round to. 1 rounds to the nearest tenth, etc.
 */
export function useGenerator(
	perSecond: Ref<number>,
	generate: (toAdd: number) => void,
	decimalPlaces: number = 0
) {
	let lastGenerate = 0;
	let stored = 0;

	const threshold = 10 ** -decimalPlaces;

	requestAnimationFrame(tick);

	function tick(now: number) {
		const elapsedSeconds = (now - lastGenerate) / 1000;
		lastGenerate = now;

		stored += perSecond.value * elapsedSeconds;

		if (stored > threshold) {
			const toAdd = floor(stored, decimalPlaces);
			console.log(`${stored} ${toAdd}`);

			stored -= toAdd;
			generate(toAdd);
		}

		requestAnimationFrame(tick);
	}
}