import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  actions: {
    // Створіть асинхронні дії для взаємодії з API або іншими асинхронними джерелами даних.
    async fetchUserData(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        this.user = await response.json();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
