import { defineStore } from 'pinia';

export const useTravelerStore = defineStore('traveler', () => {

	const wishCount = ref(null);
	const config = useRuntimeConfig();
	async function updateTraveler(id, params, url) {
		const token = '1234';
		const config = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(params)
		};
		try {
			const response = await fetch(`${url}/api/travelers/${id}`, config);
			if (!response.ok) {
				throw new Error('Failed to resource');
			}
			let result = await response.json();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async function deleteTraveler(id, url, params) {
			const token = '1234';
					const config = {
					method: 'DELETE',
					headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`
					},
					body: JSON.stringify(params)
			};
			try {
					const response = await fetch(`${url}/api/travelers/${id}`, config);
					if (!response.ok) {
							throw new Error('Failed to resource');
					}
					let result = await response.json();
					return result;
			} catch (error) {
					throw error;
			}
	}

	async function travelerData(params,url){
			const queryString = new URLSearchParams(params).toString();
			const config = {  method: 'GET', headers: { 'Content-Type': 'application/json'}};
	
			try {
					const response = await fetch(`${url}/api/showtravelers?${queryString}`, config);
					if (!response.ok) {
							throw new Error('Failed to fetch resource');
					}
	
					let result = await response.json();

					return result;
			}catch (error) {
					console.error("Error parsing JSON:", error.message);
					throw error;
			}
	}

	async function user_travelerId(params, url) {
			const queryString = new URLSearchParams(params).toString();
			const config = { method: 'GET', headers: { 'Content-Type': 'application/json' } };

			try {
				const response = await fetch(`${url}/api/wishlists-check-traveler?${queryString}`, config);
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

	async function getWishCount(user_travelerId, url = config.public.BACKEND_URL) {
  
    const travelerId = user_travelerId || localStorage.getItem('travelerId');
    if (travelerId) {
			const url_wishlist = `${url}/api/wishlists?id=${travelerId}&count=true`;
			const response = await fetch(url_wishlist);
			const data = await response.json();
			const wishlist_items = data.data;

			if (wishlist_items && wishlist_items.length) {
				wishCount.value = wishlist_items.length;
			} else {
				wishCount.value = 0;
			}
    } else {
      wishCount.value = 0;
    }
	} // end async

	async function fetchWishlist(travelerId, url){

		if(travelerId){

			const config = { method: 'GET', headers: { 'Content-Type': 'application/json' } };

			try {

				const response = await fetch(`${url}/api/wishlists?id=${travelerId}`, config);
				if (!response.ok) {
					throw new Error('Failed to fetch resource');
				}

				let result = await response.json();
				return result;

			} catch (error) {
				console.error("Error parsing JSON:", error.message);
				throw error;
			} // end try {
		
		}// end if(travelerId){
			
	}; // end async function fetchWishlist(travelerId, url) {

	async function updateWishCount(type){
		if (type === 'add') {
			wishCount.value++;
		} else if (type === 'remove') {
			wishCount.value--;
			if (wishCount.value < 0) {
				wishCount.value = 0;
			}
		}
	};

	async function updateWishCountNumber(number){
		if(number >= 0){
			wishCount.value = number;
		}
	}
	
	async function toggleWishlist(tourId, userId, actionUrl, method = "POST") {
  if (tourId && userId && actionUrl) {
    try {
      const config = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      if (method !== "DELETE") {
        config.body = JSON.stringify({
          tour_id: tourId,
          user_id: userId,
        });
      }

      const response = await fetch(actionUrl, config);

      if (!response.ok) {
        throw new Error("Failed to update wishlist");
      }

			const result = await response.json();
			return result;

    } catch (error) {
      return {
        success: false,
        message: "Failed to update wishlist: " + error.message,
      };
    }
  } else {
    return {
      success: false,
      message: "Invalid parameters for wishlist update",
    };
  }
}

	onMounted(() => {
		getWishCount();
	});

	return {
		updateTraveler, 
		deleteTraveler,
		user_travelerId, 
		travelerData, 
		fetchWishlist, 
		getWishCount, 
		updateWishCount, 
		toggleWishlist,
		updateWishCountNumber,
		wishCount
	}
});
