import { ref, onUnmounted } from 'vue';
import TravelTips from '@/public/data/travelTips';

export function useTravelTips(delay = 8000) {
    const showMainMessage = ref(true);
    const currentTip = ref('');
    let tipInterval = null;

    const setRandomTip = () => {
        const index = Math.floor(Math.random() * TravelTips.length);
        currentTip.value = TravelTips[index];
    };

    const startTips = () => {
        showMainMessage.value = true;
        setTimeout(() => {
            showMainMessage.value = false;
            setRandomTip();
            tipInterval = setInterval(setRandomTip, delay);
        }, delay);
    };

    const stopTips = () => {
        clearInterval(tipInterval);
    };

    onUnmounted(stopTips);

    return {
        showMainMessage,
        currentTip,
        startTips,
        stopTips,
    };
}
