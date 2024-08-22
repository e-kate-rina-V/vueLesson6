<template>
  <div id="app">
    <div class="container">
      <section class="section user-data">
        <h2>User Data</h2>
        <button @click="fetchUserData" class="button">Fetch User Data</button>
        <div v-if="userStore.loading" class="loading">Loading user data...</div>
        <div v-if="userStore.error" class="error">Error: {{ userStore.error }}</div>
        <div v-if="userStore.user" class="user-info">
          <h3>{{ userStore.user.name }}</h3>
          <p>Email: {{ userStore.user.email }}</p>
        </div>
      </section>

      <section class="section posts">
        <h2>Posts</h2>
        <div class="pagination-controls">
          <button @click="goToPreviousPage" :disabled="postsStore.currentPage <= 1" class="button">Previous</button>
          <button @click="goToNextPage" :disabled="postsStore.currentPage >= postsStore.totalPages"
            class="button">Next</button>
        </div>
        <div v-if="postsStore.loading" class="loading">Loading posts...</div>
        <div v-if="postsStore.error" class="error">Error: {{ postsStore.error }}</div>
        <div v-if="postsStore.posts.length">
          <ul class="post-list">
            <li v-for="post in postsStore.posts" :key="post.id" class="post-item">
              <h3>{{ post.title }}</h3>
              <p>{{ post.body }}</p>
            </li>
          </ul>
        </div>
      </section>

      <section class="section my-component">
        <MyComponent />
      </section>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { usePostsStore } from '@/stores/postsStore';
import MyComponent from './components/MyComponent.vue';

export default {
  name: 'App',
  components: {
    MyComponent,
  },
  setup() {
    const userStore = useUserStore();
    const postsStore = usePostsStore();

    const fetchUserData = async () => {
      await userStore.fetchUserData();
    };

    const goToNextPage = () => {
      postsStore.goToNextPage();
    };

    const goToPreviousPage = () => {
      postsStore.goToPreviousPage();
    };

    postsStore.fetchPosts(postsStore.currentPage);

    return {
      userStore,
      postsStore,
      fetchUserData,
      goToNextPage,
      goToPreviousPage,
    };
  },
};
</script>
