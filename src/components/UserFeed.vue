<template>
  <div class="navbar-container">
    <div class="navbar">
      <a href="https://emcd.io/ru">
        <LogoNavbar class="logoNavbar" height="18" width="68" />
      </a>
      Выгружено {{ users.length }} пользователей
    </div>
  </div>
  <div class="user-feed">
    <div v-if="isError" class="error">
      Whoa, ease up there cowboy. You've requested 20340 users in the last minute. Help us keep this service free and
      spare some bandwidth for other users please :)
    </div>
    <div v-if="users.length" class="user-grid">
      <UserCard v-for="user in users" :key="user.login.uuid" :user="user" />
    </div>
    <div ref="loadMoreTrigger" class="load-more-trigger"></div>
    <div v-if="isLoading" class="loader-container">
      <div style="margin-top: 5px" class="loader"></div>
    </div>
  </div>
</template>

<script setup>
import UserCard from './UserCard.vue';
import { useFetchUser } from '../composables/useUserLoader.js';
import { onMounted, onUnmounted, ref } from 'vue';
import LogoNavbar from '../assets/logo-navbar.svg';

const { users, isLoading, isError, loadMore } = useFetchUser();
const loadMoreTrigger = ref();
/**
 * @type {boolean}
 * @description Flag to track if the load more trigger is intersecting with the viewport
 */
let isIntersecting = false;
/**
 * Handles intersection events to implement infinite scrolling
 * Triggers new data loading when user reaches bottom of feed
 * @param {IntersectionObserverEntry[]} entries - Array of intersection observer entries
 */
const handleIntersection = async (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      await loadMore();
    }
    isIntersecting = entry.isIntersecting;
    if (isIntersecting) {
      /**
       * Asynchronously loads more data with a delay of 100ms.
       * @returns {Promise<void>} - A promise that resolves after loading more data.
       */
      async function reLoadMore() {
        return await new Promise((resolve) => {
          setTimeout(async () => {
            await loadMore();
            resolve();
          }, 100);
        });
      }
      while (isIntersecting) {
        if (triggerVisibilityCheck()) {
          await reLoadMore();
        } else {
          isIntersecting = false;
        }
      }
    }
  }
};
/**
 * Manually checks if the loadMoreTrigger element is visible on the screen.
 * @returns {boolean} - True if the element is visible, false otherwise.
 */
function triggerVisibilityCheck() {
  const rect = loadMoreTrigger.value.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

let observer;
onMounted(async () => {
  /**
   * Lifecycle hook that runs when the component is mounted.
   * Initializes the IntersectionObserver to handle infinite scrolling.
   */
  observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  // Observe the loadMoreTrigger element if it exists
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

/**
 * Lifecycle hook that runs when the component is unmounted.
 * Cleans up the IntersectionObserver to prevent memory leaks.
 */
onUnmounted(() => {
  // Unobserve the loadMoreTrigger element if it exists
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
  }
});
</script>

<style>
.user-feed {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.user-grid {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
.navbar-container {
  background-color: var(--card-background);
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  z-index: 1;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.load-more-trigger {
  height: 1px;
}
.error {
  border: 1px solid #ff5959;
  padding: 10px;
  margin: 0 auto;
  margin-top: 20px;
  width: 400px;
  color: #ff4949;
}
.logoNavbar {
  fill: var(--text-primary);
}
</style>
