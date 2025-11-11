import {defineStore} from 'pinia';

export const UsersStore = defineStore('users', () => {
    const users = ref([]);

    async function getAllUsers(paramsSent,url) {
        const token = '1234';
        const queryString = new URLSearchParams(paramsSent).toString();
        const config = {
            method: 'GET', headers: {
                'Content-Type': 'application/json', Authorization: `Bearer ${token}`
            },
        };

        try {
            const response = await fetch(`${url}/api/get-users?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
            let result = await response.json();
            console.log('API result:', result);
            users.value = result.response.data;
            console.log('Users assigned:', users.value);
            return users;
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            throw error;
        }
    }

    async function CheckTokenReset(paramsSent,url){
        
        const token = '1234';
        const queryString = new URLSearchParams(paramsSent).toString();
        const config = {
            method: 'GET', headers: {
                'Content-Type': 'application/json', Authorization: `Bearer ${token}`
            },
        };

        try {
            const response = await fetch(`${url}/api/check-token-pass?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
            let result = await response.json();
            return result;
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            throw error;
        }
    }

    async function RecoverPass(paramsSent,url){
        const token = '1234';
        const queryString = new URLSearchParams(paramsSent).toString();
        const config = {
            method: 'GET', headers: {
                'Content-Type': 'application/json', Authorization: `Bearer ${token}`
            },
        };

        try {
            const response = await fetch(`${url}/api/recover-pass?${queryString}`, config);
            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }
            let result = await response.json();
            return result;
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            throw error;
        }
    }

    async function GetUserOrdersCsv(url,params){
        try{
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            };
            const queryString = new URLSearchParams(params).toString();
            const res = await fetch(`${url}/api/users-orders-csv?${queryString}`, config);
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            const blob = await res.blob();
            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = urlBlob;
            a.download = 'users_ordersCSV.csv'; 
            document.body.appendChild(a);
            a.click();
    
            
            a.remove();
            window.URL.revokeObjectURL(urlBlob);
        }catch(error){
            throw error;
        }
    }

    async function ContacUs(url,params){
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        };

        try {
            const response = await fetch(`${url}/api/add-contact`, config);

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
        users,
        getAllUsers,
        CheckTokenReset,
        RecoverPass,
        GetUserOrdersCsv,
        ContacUs
    }
});