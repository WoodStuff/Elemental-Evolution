/**
 * Returns a random number.
 */
export const random = (min: number, max: number): number => Math.floor(Math.random() * ((max + 1) - min)) + min;