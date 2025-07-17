/**
 * Acquires an element.
 * @param {string} id
 */
const $ = id => document.getElementById(id);
/**
 * Returns a random number.
 * @param {number} min
 * @param {number} max
 */
const rng = (min, max) => Math.floor(Math.random() * ((max + 1) - min)) + min;