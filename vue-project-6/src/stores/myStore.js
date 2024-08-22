// Створіть свій перший store з базовим станом і декількома діями або мутаціями.
// Розбийте ваш store на модулі для кращої організації коду.

import { defineStore } from 'pinia';

export const useMyStore = defineStore('myStore', {
  state: () => ({
    count: 0,
    message: 'Hello from Pinia!',
    asyncData: null,
    loading: false,
    error: null,
  }),

  // Створіть мутації для зміни стану в вашому store.
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    setMessage(newMessage) {
      this.message = newMessage;
    },
    reset() {
      this.count = 0;
      this.message = 'Hello from Pinia!';
    },
    // Створіть дії для виклику мутацій та обробки асинхронних операцій.
    async fetchData() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.asyncData = data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
