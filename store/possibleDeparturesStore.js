/*
import { defineStore } from 'pinia';

export const usePossibleDeparturesStore = defineStore('PossibleDeparturesStore', {
  state: () => ({
    userData: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.userData,
    userName: (state) => state.userData?.name || 'Guest',
  },

  actions: {
    async fetchUserData(userId) {
      this.loading = true;
      this.error = null;
      try {
        // Simulate an API call
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.userData = await response.json();
      } catch (error) {
        this.error = error.message;
        this.userData = null;
      } finally {
        this.loading = false;
      }
    },

    clearUserData() {
      this.userData = null;
    },
  },
});