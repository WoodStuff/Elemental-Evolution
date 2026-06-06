import { computed, ref } from "vue";
import { random } from "../../utils";
import { useUpgrade } from "../useUpgrade";
import { useGenerator } from "../useGenerator";

// Main
const amount = ref(0);
const total = ref(0);
const highest = ref(0);

// Gathering
const baseGather = computed(() => {
	const eff = upEfficiency.amount.value;
	return (3 + eff) * Math.pow(1.04, eff);
});
const minGather = computed(() => Math.round(baseGather.value * 0.75));
const maxGather = computed(() => Math.round(baseGather.value * 1.25));
const _baseCooldown = 2000;
const gatherCooldown = computed(() => _baseCooldown * (Math.pow(0.8, upCooldown.amount.value)));

// Dihydrogen
const dihydrogen = ref(0);

// Upgrades
const upEfficiency = useUpgrade(
	"Efficiency",
	"Increases the amount of hydrogen you find from gathering.",
	amount, n => Math.round(Math.pow(1.25, n) * 10),
);
const upCooldown = useUpgrade(
	"Cooldown",
	"Makes gathering quicker, while finding the same amount of hydrogen.",
	amount, n => Math.round(Math.pow(1.6, n) * 50),
);

const upAttraction = useUpgrade(
	"Attraction",
	"Make your H₂ more massive, causing each molecule to attract 2 hydrogen per second per level.",
	dihydrogen, n => Math.round(Math.pow(2, n) * 5),
);

// Actions
function gain(n: number) {
	amount.value += n;
	total.value += n;
	if (amount.value > highest.value) highest.value = amount.value;
}
function take(n: number) {
	amount.value -= n;
	if (amount.value < 0) amount.value = 0;
}
function gather() {
	const gatherAmount = random(minGather.value, maxGather.value);
	gain(gatherAmount);
}

// Generators
const attractionGen = computed(() => 2 * dihydrogen.value * upAttraction.amount.value);

const perSecond = computed(() => attractionGen.value);
useGenerator(perSecond, gain);

if (1) {
	amount.value = 177;
	total.value = 1500;
	highest.value = 300;
	upEfficiency.amount.value = 14;
	upCooldown.amount.value = 4;
}

export function useHydrogen() {
	return {
		amount,
		total,
		highest,
		perSecond,

		baseGather,
		minGather,
		maxGather,
		gatherCooldown,

		dihydrogen,

		upEfficiency,
		upCooldown,
		upAttraction,

		gain,
		take,
		gather,
	}
}