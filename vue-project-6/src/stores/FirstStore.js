import { defineStore } from 'pinia';

export const useFirstStore = defineStore('firstStore', {
  state: () => ({
    valueA: 10,
  }),
  actions: {
    setValueA(newValue) {
      this.valueA = newValue;
    },
  },
  // Створіть селектори для вирахування похідних даних на основі стану.
  getters: {
    doubleValueA(state) {
      return state.valueA * 2;
    },
  },
});
