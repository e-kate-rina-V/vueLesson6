<!--Виведіть дані зі свого store у компоненті Vue.-->

<template>
  <div>
    <div>
      <h1>Pinia Store</h1>
      <p>Count: {{ myStore.count }}</p>
      <p>Message: {{ myStore.message }}</p>
      <button @click="myStore.increment">Increment</button>
      <button @click="myStore.decrement">Decrement</button>
      <button @click="updateMessage">Update Message</button>
      <button @click="myStore.reset">Reset Store</button>
      <button @click="fetchData">Fetch Data</button>

      <div v-if="myStore.loading">Loading...</div>
      <div v-if="myStore.error">Error: {{ myStore.error }}</div>
      <div v-if="myStore.asyncData">
        <pre>{{ myStore.asyncData }}</pre>
      </div>
    </div>

    <!--Створіть кілька stores та спробуйте їх комбінувати, доступаючись до одного store з іншого.-->
    <div>
      <h2>FirstStore</h2>
      <p>Value A: {{ firstStore.valueA }}</p>
      <p>Double Value A: {{ firstStore.doubleValueA }}</p>
      <button @click="firstStore.setValueA(30)">Set Value A</button>
    </div>

    <div>
      <h2>SecondStore</h2>
      <p>Value B: {{ secondStore.valueB }}</p>
      <p>Combined Value: {{ secondStore.combinedValue }}</p>
      <button @click="secondStore.setValueB(40)">Set Value B</button>
    </div>
  </div>
</template>

<script>
import { useMyStore } from '@/stores/myStore';
import { useFirstStore } from '@/stores/FirstStore';
import { useSecondStore } from '@/stores/SecondStore';

export default {
  name: 'App',
  setup() {
    const myStore = useMyStore();
    const firstStore = useFirstStore();
    const secondStore = useSecondStore();

    const updateMessage = () => {
      myStore.setMessage('New message from component!');
    };

    const fetchData = async () => {
      await myStore.fetchData();
    };

    return {
      myStore,
      firstStore,
      secondStore,
      updateMessage,
      fetchData,
    };
  },
};
</script>
