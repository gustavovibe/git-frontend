import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authentication', () => {

    async function submitRegistry(params, url) {
        let url_api = url
        params.profile_id = 2;
				params.role = "role";
        /*   params.phone = "56861926" */
        /*    params.role = "role"
           params.active = 1 */
        /*   params.suscribed = 1 */
        /* params.hear = "without comment" */

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        };

        try {
            const response = await fetch(`${url_api}/api/register`, config);


            /*  if (!response.ok) {
                 throw new Error('Failed to fetch resource');
             } */
            let result = await response.json();
            console.log('respuesta de servidor:', result);
            return result;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }

    async function login(params, url) {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        };

        try {
            const response = await fetch(`${url}/api/login`, config);

            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }

            let result = await response.json();
            /*     if (!result.access_token) {
                    throw new Error("Auth token not found in response");
                } */
            return result;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }

    async function sumbitGoogle(token, url) {
        try {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(token),
            };

            const response = await fetch(`${url}/api/google-register`, config);

            if (!response.ok) {
                throw new Error('Failed to fetch resource');
            }

            let result = await response.json();
            /* localStorage.setItem('access_token', result.data.access_token); */
            console.log("login result", result.data);
            return result.data;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }

    async function LogOut(url = "https://vibeadventures.be") {
        const token = localStorage.getItem('access_token');
        const user_id = localStorage.getItem('user_id');
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ user_id })
        };

        try {
            const response = await fetch(`${url}/api/logout`, config);
            /*   if (!response.ok) {
                  throw new Error('Failed to fetch resource');
              } */

            let result = await response.json();
            localStorage.clear();
            return result;

        } catch (error) {
            console.error('Error in logout', error.message);
            throw error;
        }
    }

    return {
        submitRegistry,
        login,
        sumbitGoogle,
        LogOut
    }
});