import { ref, computed, onUnmounted } from 'vue'

export function useTimer(durationMs: number, onDone?: () => void) {
	const elapsed = ref(0);
	const running = ref(false);

	let startTime = 0;
	let rafId = 0;

	const progress = computed(() => Math.min(elapsed.value / durationMs, 1));
	const remainingMs = computed(() => Math.max(durationMs - elapsed.value, 0));

	function tick(now: number) {
		elapsed.value = now - startTime;

		if (elapsed.value >= durationMs) {
			elapsed.value = durationMs;
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