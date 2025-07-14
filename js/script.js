/** Ticks per second; for JS updates */
const TPS = 60;
/** Frames per second; for HTML updates */
const FPS = 60;
/** @type {Timer[]} */
let TIMERS = [];

let hydrogen = {
	value: 0,
	cooldown: false,
	up_amount: 0,
	up_speed: 0,
};
const HYDROGEN_COOLDOWN = 2000;

function start() {
	setInterval(updateStats_JS, 1000 / TPS);
	setInterval(updateStats_HTML, 1000 / FPS);

	$("H-button").addEventListener("click", searchHydrogen);
}

function searchHydrogen() {
	hydrogen.cooldown = true;

	const text = $("H-button-text").textContent;
	const timer = new Timer(() => {
		hydrogen.cooldown = false;
		hydrogen.value += rng(2, 4);
		$("H-button-text").textContent = text;
	}, HYDROGEN_COOLDOWN, $("H-button-text"));
	TIMERS.push(timer);

	progressBar();
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
}