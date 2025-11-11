import {defineStore} from 'pinia';

export const tourStore = defineStore('action_log', () => {

    async function sendEnquiry(params,url){
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        };

        try {
            const response = await fetch(`${url}/api/add-enquiry`, config);

            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }

            let result = await response.json();
        
            return result;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }

    async function cancelFlight(params, url) {
        const queryString = new URLSearchParams(params).toString();
        const config = {  method: 'GET', headers: { 'Content-Type': 'application/json'},
        };
    
        try {
            const response = await fetch(`${url}/api/duffel-cancel-check?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
    
            let result = await response.json();

            return result;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }

    async function getOperators(params, url) {
        const queryString = new URLSearchParams(params).toString();
        const config = {  method: 'GET', headers: { 'Content-Type': 'application/json'},
        };
    
        try {
            const response = await fetch(`${url}/api/operators-list?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
    
            let result = await response.json();

            return result;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }

    async function getTourTypes(params, url) {
        const queryString = new URLSearchParams(params).toString();
        const config = {  method: 'GET', headers: { 'Content-Type': 'application/json'},
        };
    
        try {
            const response = await fetch(`${url}/api/tour-type-list?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
    
            let result = await response.json();

            return result;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }

    async function getTourList(params, url) {
        const queryString = new URLSearchParams(params).toString();
        const config = {  method: 'GET', headers: { 'Content-Type': 'application/json'},
        };
    
        try {
            const response = await fetch(`${url}/api/tours?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
    
            let result = await response.json();

            return result;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }

    async function getCarrierList(url) {
        const config = {  method: 'GET', headers: { 'Content-Type': 'application/json'},
        };
    
        try {
            const response = await fetch(`${url}/api/carrier-list`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
    
            let result = await response.json();

            return result;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }
    
    async function cancelConfirm(params,url){
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        };
        
        try {
            const response = await fetch(`${url}/api/duffel-cancel-confirm`, config);

            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }

            let result = await response.json();
        
            return result;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }

    return {
        sendEnquiry,
        cancelFlight,
        cancelConfirm,
        getOperators,
        getTourTypes,
        getTourList,
        getCarrierList
    }
});