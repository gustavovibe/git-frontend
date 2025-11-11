import { defineStore } from 'pinia';

export const useGravitecStore = defineStore('gravitec', () => {
  const config = useRuntimeConfig();

  /**
   * Validates if user is subscribed to Gravitec push notifications
   * If not subscribed, triggers registration
   * @param {string|number} userId - User ID
   * @param {string|number} [tourId] - Optional tour ID
   */
  async function validateUserNotifications(userId, tourId = null) {
    var Gravitec = Gravitec || [];
    Gravitec.push(["isSubscribed", function (isSubscribed) {
      if (!isSubscribed) {
        console.log('User not subscribed to Gravitec');
        gravitecRegister(userId, tourId);
      }
    }]);
  }

  /**
   * Registers user for Gravitec push notifications
   * @param {string|number} userId - User ID
   * @param {string|number} [tourId] - Optional tour ID
   */
  async function gravitecRegister(userId, tourId = null) {
    var Gravitec = Gravitec || [];

    // Check if user is already subscribed
    Gravitec.push(["isSubscribed", function (isSubscribed) {
      if (!isSubscribed) {
        // If not subscribed, initiate subscription prompt
        Gravitec.push(["registerUserForPush", function(response) {
          console.log("Register Response:", response);
        }]);
      } else {
        // If already subscribed, get subscription data
        Gravitec.push([
          "getSubscriptionData", function(data) {
            console.log(data.permission);
            console.log(data.subscription);
            if(data.subscription) {
              pushNotificationsRegister(data.subscription, userId, tourId);
            }
          }, function(err) {
            console.log(err.message);
          }
        ]);
      }
    }]);

    // Handle subscription result
    Gravitec.push([
      "subscriptionResult", function(data) {
        console.log("Permission:", data.permission);
        console.log("Subscription:", data.subscription);
        if (data.subscription) {
          console.log("GRAVITEC:", data.subscription);
          pushNotificationsRegister(data.subscription, userId, tourId);
        }
      }, function(err) {
        console.error("Error in subscription process:", err.message);
      }
    ]);
  }

  /**
   * Registers push notification subscription with backend API
   * @param {object} gravitec_data - Gravitec subscription data
   * @param {string|number|ref} userId - User ID (can be ref or value)
   * @param {string|number|ref} [tourId] - Optional tour ID (can be ref or value)
   */
  async function pushNotificationsRegister(gravitec_data, userId, tourId = null) {
    try {
      
      const user_id = userId ? userId : 0;
      const tour_id = tourId ? tourId : 0;
      
			if(user_id == 0){
				console.log("User ID is 0 from gravitec register");
				return;
			}
      const requestBody = {
        user_id: user_id,
        gravitec_data: gravitec_data
      };

      if (tour_id > 0) {
        requestBody.tour_id = tour_id;
      }

      const response = await fetch(`${config.public.BACKEND_URL}/api/push_notifications_register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if(response.data?.value){
        console.log(response.data.value);
      }
    } catch (error) {
      console.error("Failed to register user notifications", error);
    }
  }

  /**
   * Sends push notification for wishlist updates
   * @param {Array} wishlistItems - Array of wishlist items
   * @param {string|number} userId - User ID
   */
  async function sendPushNotificationWishlist(wishlistItems, userId) {
    try {
      const response = await fetch(`${config.public.BACKEND_URL}/api/send_push_notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          data: wishlistItems,
          notification_type: 'wishlist_update',
          user_id: userId
        }),
      });
      const data = await response.json();
      if(data.value){
        console.log(data.value);
      }
    } catch (error) {
      console.error("Failed to send push", error);
    }
  }

  /**
   * Sends abandoned cart notification (push or email)
   * @param {string} type - 'push' or 'email'
   * @param {object} tour - Tour data
   * @param {string|number} userId - User ID
   */
  async function sendAbandonedCartNotification(type, tour, userId) {
    const url = type === 'push' 
      ? `${config.public.BACKEND_URL}/api/send_push_notification` 
      : `${config.public.BACKEND_URL}/api/send_ac_notification`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          data: tour,
          notification_type: 'abandoned_cart',
          user_id: userId,
          tour_id: tour
        }),
      });
      const data = await response.json();
      if(data.value){
        console.log(data.value);
      }
    } catch (error) {
      console.error("Failed to send notification", error);
    }
  }

  /**
   * Checks if user is subscribed and triggers callback
   * @param {Function} callback - Callback function to execute if subscribed
   */
  function checkSubscription(callback) {
    var Gravitec = Gravitec || [];
    Gravitec.push(["isSubscribed", function (isSubscribed) {
      if (isSubscribed && callback) {
        callback();
      }
    }]);
  }

  return {
    validateUserNotifications,
    gravitecRegister,
    pushNotificationsRegister,
    sendPushNotificationWishlist,
    sendAbandonedCartNotification,
    checkSubscription
  };
});

