import {defineStore} from 'pinia';

export const useActionLogStore = defineStore('action_log', () => {
    const actionLogs = ref([]);
    const total = ref(0);
    const loadingActionLogs = ref(false);

    async function getAllActionLogs(params, url) {
        loadingActionLogs.value = true;
        const token = '1234';
        const queryString = new URLSearchParams(params).toString();
        const config = {
            method: 'GET', headers: {
                'Content-Type': 'application/json', Authorization: `Bearer ${token}`
            },
        };
        try {
            const response = await fetch(`${url}/api/action-logs?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
            let result = await response.json();
            actionLogs.value = result.data.data;
            total.value = result.data.total;
            return actionLogs;
        } catch (error) {
            throw error;
        } finally {
            loadingActionLogs.value = false;
        }
    }

    return {
        actionLogs,
        getAllActionLogs,
        total,
        loadingActionLogs
    }
});
