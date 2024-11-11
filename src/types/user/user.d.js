// eslint-disable-next-line no-unused-vars
import { ref } from 'vue';

/**
 * API response with users
 * @typedef {Object} FetchUsersResponse
 * @property {User[]} results  - User List.
 */

/**
 * @typedef {Object} UseFetchUser
 * @property {ref<User[]>} users - A list of users.
 * @property {ref<boolean>} isLoading - The loading state.
 * @property {ref<boolean>} isError - The error state.
 * @property {ref<number>} page - The current page number.
 * @property {ref<number>} userPerPage - The number of users per page.
 * @property {Function} fetchData - Function to fetch the user data.
 */
