import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostsStore = defineStore('postsStore', {
  state: () => ({
    posts: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPosts(page = 1) {
      this.loading = true;
      this.error = null;

      try {
        // Реалізуйте пагінацію зі стороннього API, використовуючи Pinia store.
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);

        this.posts = response.data;
        this.currentPage = page;

        const totalPosts = parseInt(response.headers['x-total-count'], 10);
        this.totalPages = Math.ceil(totalPosts / 10);
      } catch (err) {
        this.error = 'Failed to fetch posts';
      } finally {
        this.loading = false;
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchPosts(this.currentPage + 1);
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.fetchPosts(this.currentPage - 1);
      }
    },
  },
});
