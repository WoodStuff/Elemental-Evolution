/**
 * Returns a random number.
 * @param min The minimum, inclusive.
 * @param max The maximum, inclusive.
 */
export function random(min: number, max: number) {
	return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

/**
 * Rounds a number to a given amount of decimal places.
 * @param num The number to round.
 * @param decimalPlaces The amount of decimal places to round to.
 */
export function round(num: number, decimalPlaces = 0) {
	const multiplier = 10 ** decimalPlaces;
	return Math.round(num * multiplier) / multiplier;
}

/**
 * Floors a number to a given amount of decimal places.
 * @param num The number to floor.
 * @param decimalPlaces The amount of decimal places to floor to.
 */
export function floor(num: number, decimalPlaces = 0) {
	const multiplier = 10 ** decimalPlaces;
	return Math.floor(num * multiplier) / multiplier;
}