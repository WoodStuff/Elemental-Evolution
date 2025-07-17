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
	up_cooldown: 0,

	min_gather: () => Math.round(0.75 * (hydrogen.up_efficiency + 3)),
	max_gather: () => Math.round(1.25 * (hydrogen.up_efficiency + 3)),
	gather: () => rng(hydrogen.min_gather(), hydrogen.max_gather()),
	cooldown_time: () => 2000 * (Math.pow(0.8, hydrogen.up_cooldown)),

	up_efficiency_cost: () => Math.round(Math.pow(1.25, hydrogen.up_efficiency) * 10),
	up_cooldown_cost: () => Math.round(Math.pow(1.5, hydrogen.up_cooldown) * 25),
};

function start() {
	// set up update cycles
	setInterval(updateStats_JS, 1000 / TPS);
	setInterval(updateStats_HTML, 1000 / FPS);

	// set up event listeners for buttons
	$("H-button").addEventListener("click", searchHydrogen);
	$("H-efficiency").addEventListener("click", upgradeEfficiency);
	$("H-cooldown").addEventListener("click", upgradeCooldown);
}

function searchHydrogen() {
	hydrogen.cooldown = true;

	const text = $("H-button-text").textContent;
	const timer = new Timer(() => {
		hydrogen.cooldown = false;
		hydrogen.value += hydrogen.gather();
		$("H-button-text").textContent = text;
	}, hydrogen.cooldown_time(), $("H-button-text"));
	TIMERS.push(timer);

	progressBar();
}

function upgradeEfficiency() {
	hydrogen.value -= hydrogen.up_efficiency_cost();
	hydrogen.up_efficiency++;
}

function upgradeCooldown() {
	hydrogen.value -= hydrogen.up_cooldown_cost();
	hydrogen.up_cooldown++;
}

function progressBar() {
	const progress = $("H-progress");
	progress.style.transition = `${hydrogen.cooldown_time() / 1000}s linear`;
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
	$("H-cooldown").disabled = hydrogen.value < hydrogen.up_cooldown_cost();
	$("H-cooldown-amount").textContent = hydrogen.up_cooldown;
	$("H-cooldown-cost").textContent = hydrogen.up_cooldown_cost();

	// unlocks
	if (hydrogen.value >= 10) $("H-efficiency").classList.remove("hidden");
	if (hydrogen.value >= 25) $("H-cooldown").classList.remove("hidden");
}