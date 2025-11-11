import { defineStore } from 'pinia';

export const useDestinationStore = defineStore('destination', () => {
    const destinations = ref([]);
    const totalDestinations = ref(0);
    const loadingDestinations = ref(false);
    const destination = ref({});
    const destination_details = ref({});


    async function getAllDestinations(params, url) {
        loadingDestinations.value = true;
        const token = '1234';
        const queryString = new URLSearchParams(params).toString();
        const config = {
            method: 'GET', headers: {
                'Content-Type': 'application/json', Authorization: `Bearer ${token}`
            },
        };

        try {
            const response = await fetch(`${url}/api/destinationsV2?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
            let result = await response.json();
            destinations.value = result.data.data;
            totalDestinations.value = result.data.total;
            return result;
        } catch (error) {
            throw error;
        } finally {
            loadingDestinations.value = false;
        }
    }

    async function getAllDestinationsExport(params, url) {
        loadingDestinations.value = true;
        const token = '1234';
        params.export = 'excel';
        const queryString = new URLSearchParams(params).toString();
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const response = await fetch(`${url}/api/destinationsV2?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }

            if (params.export === 'excel') {
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'destinations.xlsx');  // Nombre del archivo
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(downloadUrl);
                return;
            }

            const result = await response.json();
            destinations.value = result.data.data;
            totalDestinations.value = result.data.total;

            return result;
        } catch (error) {
            console.error('Error fetching destinations:', error);
            throw error;
        } finally {
            loadingDestinations.value = false;
        }
    }

    async function getDestination(params, url) {
        const id = params.id
        const category = params.category
        const config = {
            method: 'GET', headers: {
                'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
        };
        try {
            const response = await fetch(`${url}/api/admin-destinations/${id}?category=${category}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
            let result = await response.json();
            destination.value = result.data;
            destination_details.value = destination.value.destination;

            return destination;
        } catch (error) {
            throw error;
        }
    }

    async function addDestination(params, url) {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify(params),
        };
        try {
            const response = await fetch(`${url}/api/admin-destinations`, config);
            const responseBody = await response.json();
            if (!response.ok) {
                throw new Error(responseBody.message || 'Failed to fetch resource');
            }
            return responseBody;
        } catch (error) {
            throw error;
        }
    }

    async function SendSummary(params, url) {
        try {
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            };
            const queryString = new URLSearchParams(params).toString();
            const res = await fetch(`${url}/api/boooking-summary?${queryString}`, config);
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch resource');
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    async function GetCountries(params, url = "https://vibeadventures.be") {
        try {
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            };
            const queryString = new URLSearchParams(params).toString();
            const res = await fetch(`${url}/api/countries-filter?${queryString}`, config);
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch resource');
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    async function GetNaturalDestinations(params, url) {
        try {
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            };
            const queryString = new URLSearchParams(params).toString();
            const res = await fetch(`${url}/api/tour-natural-destinations?${queryString}`, config);
            const data = await res.json();
            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch resource');
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    async function GetCities(params, url) {
        try {
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            };
            const queryString = new URLSearchParams(params).toString();
            const res = await fetch(`${url}/api/cities-c?${queryString}`, config);
            const data = await res.json();
            if (!data.status) {
                throw new Error(data.message || 'Failed to fetch resource');
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    async function GetTourCountries(params, url) {
        try {
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            };
            const queryString = new URLSearchParams(params).toString();
            const res = await fetch(`${url}/api/countries?${queryString}`, config);
            const data = await res.json();
            return data;
        } catch (error) {
            throw error;
        }
    }



    function clean() {
        destinations.value = [];
        totalDestinations.value = 0;
    }

    return {
        totalDestinations,
        getAllDestinations,
        getAllDestinationsExport,
        destinations,
        clean,
        loadingDestinations,
        getDestination,
        destination,
        destination_details,
        addDestination,
        SendSummary,
        GetCountries,
        GetNaturalDestinations,
        GetCities,
        GetTourCountries
    }
});
