<template>
  <div class="user-card" @click="onCardClick">
    <img :src="user.picture.large" :alt="user.name.first" class="user-image" />
    <div class="user-info">
      <h3>{{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</h3>
      <p class="email">{{ user.email }}</p>
    </div>
  </div>
  <div v-if="visibleNotify" class="g-notify">
    <p>The user data form is under development</p>
  </div>
</template>

<script setup>
/*initialize props*/
import { ref } from 'vue';

defineProps({
  user: {
    type: /** @type {Vue.PropType<User>} */ (Object),
    required: true,
  },
});
/**
 * @description Specifies whether to show notify
 * @type {Ref<boolean>}
 */
const visibleNotify = ref(false);
/**
 * Handles the click event on the user card.
 * Displays a notification for 2 seconds when the card is clicked.
 */
function onCardClick() {
  visibleNotify.value = true;
  setTimeout(() => {
    visibleNotify.value = false;
  }, 2000);
}
</script>

<style>
.user-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--card-background);
  cursor: pointer;
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.user-card:hover {
  transform: translateY(-10px);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 16px;
}

.user-image {
  border-radius: 50%;
  width: calc(128px * 2);
  height: calc(128px * 2);
  object-fit: cover;
}

.user-info {
  padding: 1rem;
}

.user-info h3 {
  margin: 0 0 0.5rem;
  color: var(--text-primary);
}

.email {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.g-notify {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: var(--background-error);
  color: var(--text-error);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  z-index: 9999;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  opacity: 1;
  transition: all 0.3s;
  transform: translateX(30px);
}

.g-notify p {
  margin: 0;
}
</style>
