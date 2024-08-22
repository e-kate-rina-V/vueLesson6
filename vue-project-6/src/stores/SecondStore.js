import { defineStore } from 'pinia';
import { useFirstStore } from './FirstStore';

export const useSecondStore = defineStore('secondStore', {
  state: () => ({
    valueB: 20,
  }),
  actions: {
    setValueB(newValue) {
      this.valueB = newValue;
    },
    useFirstStoreValue() {
      const firstStore = useFirstStore();
      console.log('Value from FirstStore:', firstStore.valueA);
    },
  },
  getters: {
    combinedValue(state) {
      const firstStore = useFirstStore();
      return state.valueB + firstStore.doubleValueA;
    },
  },
});
