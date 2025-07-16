/** Ticks per second; for JS updates */
const TPS = 60;
/** Frames per second; for HTML updates */
const FPS = 60;
/** @type {Timer[]} */
let TIMERS = [];

let hydrogen = {
	value: 0,
	cooldown: false,

	up_efficiency: 0,
	up_speed: 0,

	min_gather: () => Math.round(0.75 * (hydrogen.up_efficiency + 3)),
	max_gather: () => Math.round(1.25 * (hydrogen.up_efficiency + 3)),
	gather: () => rng(hydrogen.min_gather(), hydrogen.max_gather()),

	up_efficiency_cost: () => hydrogen.up_efficiency * 2,
};
const HYDROGEN_COOLDOWN = 2000;

function start() {
	setInterval(updateStats_JS, 1000 / TPS);
	setInterval(updateStats_HTML, 1000 / FPS);

	$("H-button").addEventListener("click", searchHydrogen);
	$("H-efficiency").addEventListener("click", upgradeEfficiency);
}

function searchHydrogen() {
	hydrogen.cooldown = true;

	const text = $("H-button-text").textContent;
	const timer = new Timer(() => {
		hydrogen.cooldown = false;
		hydrogen.value += hydrogen.gather();
		$("H-button-text").textContent = text;
	}, HYDROGEN_COOLDOWN, $("H-button-text"));
	TIMERS.push(timer);

	progressBar();
}

function upgradeEfficiency() {
	hydrogen.value -= hydrogen.up_efficiency_cost();
	hydrogen.up_efficiency++;
}

function progressBar() {
	const progress = $("H-progress");
	progress.style.transition = `${HYDROGEN_COOLDOWN / 1000}s linear`;
	progress.style.width = "100%";

	progress.addEventListener("transitionend", () => {
		progress.style.transition = "0s";
		progress.style.width = "0%";
	});
}

function updateStats_JS() {
	TIMERS = TIMERS.filter(t => t.getRemainingTime() > 0);
	TIMERS.forEach(timer => {
		timer.element.textContent = timer.formatRemainingTime();
	});
}
function updateStats_HTML() {
	$("H-value").textContent = hydrogen.value;
	$("H-button").disabled = hydrogen.cooldown;
	$("H-button-min").textContent = hydrogen.min_gather();
	$("H-button-max").textContent = hydrogen.max_gather();
	$("H-efficiency").disabled = hydrogen.value < hydrogen.up_efficiency_cost();
	$("H-efficiency-amount").textContent = hydrogen.up_efficiency;
	$("H-efficiency-cost").textContent = hydrogen.up_efficiency_cost();
}