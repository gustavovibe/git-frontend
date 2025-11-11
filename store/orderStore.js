import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', () => {
    const orders = ref([])
    const order = ref([])
    const user = ref([])
    const travelers = ref([])
    const flights = ref([])
    const tour_id = ref([])

    async function getAllOrders(url, params) {
        const token = '1234';
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${url}/api/orders-all?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to resource');
            }
            let result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async function getOrder(id) {
        const token = '1234';
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await fetch(`https://vibeadventures.be/api/order/${id}`, config);
            if (!response.ok) {
                throw new Error('Failed to resource');
            }
            let result = await response.json();
            order.value = result.data;
            user.value = result.data.user;
            travelers.value = result.data.travelers;
            flights.value = result.data.flight_tour.flight.data;
            tour_id.value = result.data.tour_id;

            return order;
        } catch (error) {
            throw error;
        }
    }

    async function getPdf(id) {
        try {
            const response = await fetch(`https://vibeadventures.be/api/boooking-pdf?tour_id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch PDF');
            }

            /*     
                const blob = await response.blob();
        
                
                const url = window.URL.createObjectURL(blob);
        
                
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `booking_confirmation_${id}.pdf`); 
                document.body.appendChild(link);
                link.click();
        
                
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url); */
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Abre el PDF en una nueva pestaña
            window.open(url, '_blank');
        } catch (error) {
            throw error;
        }
    }

    async function GetAdminReports(params, url) {
        try {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(params),
            };
            const res = await fetch(`${url}/api/admin-reports`, config);
            const data = await res.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async function GetCsv(url, params) {
        try {
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            };
            const queryString = new URLSearchParams(params).toString();
            const res = await fetch(`${url}/api/orders-csv?${queryString}`, config);
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const blob = await res.blob();
            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = urlBlob;
            a.download = 'ordersCSV.csv';
            document.body.appendChild(a);
            a.click();


            a.remove();
            window.URL.revokeObjectURL(urlBlob);
        } catch (error) {
            throw error;
        }
    }

    return {
        getAllOrders, orders, getOrder, order, user, travelers, flights, getPdf, tour_id, GetAdminReports, GetCsv
    }
});
