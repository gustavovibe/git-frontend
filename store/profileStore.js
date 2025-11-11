export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: false, // false means dialog should be open
  }),
  actions: {
    openModalProfile() {
      this.profile = false;
    },
    closeModalProfile() {
      this.profile = true;
    },
  }
});
