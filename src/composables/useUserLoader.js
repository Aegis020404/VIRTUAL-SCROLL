import { ref } from 'vue';
const API_URL_USER = 'https://randomuser.me/api';
const USER_PER_PAGE = 20;

/**
 * Custom composable for managing user data loading
 * @returns {UseFetchUser} User loading state and methods
 */
export function useFetchUser() {
  /**
   * @type {ref<string>}
   */
  const users = ref([]);
  const isLoading = ref(false);
  const isError = ref(false);
  const page = ref(1);

  /**
   * @description Fetches a list of users
   * @param {number} pageNumber - Page number to fetch
   * @returns {Promise<Object>} API response object
   * @throws {Error} Throws an error if the response is not successful
   */
  const fetchUsers = async (pageNumber) => {
    /**
     * @type {Response}
     * @description Raw data witch we got from the rest-api,
     * it is able to convert to JSON
     */
    const response = await fetch(`${API_URL_USER}/?page=${pageNumber}&results=${USER_PER_PAGE}&seed=abc`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  /**
   * Loads more users and appends them to the existing list
   * Implements error handling and loading state management
   */
  const loadMore = async () => {
    /**
     * Prevents the loadMore function from being called if it is already in the process of loading.
     * This ensures that multiple concurrent requests are not made.
     */
    if (isLoading.value) return;
    try {
      isLoading.value = true;
      const data = await fetchUsers(page.value);
      users.value.push(...data.results);
      page.value++;
    } catch (error) {
      console.warn('Error loading users:', error);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    users,
    isLoading,
    isError,
    loadMore,
  };
}
