import { ref, computed, onUnmounted, Ref } from 'vue'

export function useTimer(durationMs: Ref<number, number>, onDone?: () => void) {
	const elapsed = ref(0);
	const running = ref(false);

	let startTime = 0;
	let rafId = 0;
	let currentDuration = 0;

	const progress = computed(() => Math.min(elapsed.value / currentDuration, 1));
	const remainingMs = computed(() => Math.max(currentDuration - elapsed.value, 0));

	function tick(now: number) {
		elapsed.value = now - startTime;

		if (elapsed.value >= currentDuration) {
			elapsed.value = currentDuration;
			stop();
			onDone?.();
			return;
		}

		rafId = requestAnimationFrame(tick);
	}

	function start() {
		cancelAnimationFrame(rafId);

		elapsed.value = 0;
		running.value = true;
		currentDuration = durationMs.value;
		startTime = performance.now();

		rafId = requestAnimationFrame(tick);
	}

	function stop() {
		running.value = false;
		elapsed.value = 0;
		cancelAnimationFrame(rafId);
	}

	onUnmounted(stop);

	return {
		progress,
		remainingMs,
		running,
		start,
		stop,
	};
}