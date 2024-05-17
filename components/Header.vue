<template>
  <div class="text-white sticky top-0 w-full z-10">
    <ul class="flex justify-between items-center py-6 px-6 bg-white">
      <div class="flex items-center">
      </div>
      <div class="mx-3">
        <li class="text-gray-500 flex items-center relative">
          <div class="grid-cols-2">
            <button class="mr-2">Welcome, {{ user.username }}</button>
            <div class="relative">
              <h1 class="text-xs py-1 mx-5 rounded-lg text-white text-center"
                  :class="{ 'bg-green-500': user.access_level === 'User', 'bg-red-500': user.access_level === 'Admin' }">
                {{ user.access_level }}
              </h1>

              <div v-if="showDropdown" @click.away="showDropdown = false" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <ul class="py-1">
                  <li><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a></li>
                  <li><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a></li>
                  <li class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Icon name="material-symbols:logout" style="width: 20px; height: 20px;" class="mr-3" />
                    <button @click="logout" class="text-sm text-gray-700 focus:outline-none">Log out</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button @click="toggleDropdown">
            <Icon name="material-symbols:account-circle-full" style="width: 24px; height: 24px;" />
            <span class="ml-1">&#9662;</span> <!-- Downward arrow -->
          </button>

        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { useViceStore } from '~/stores/vris-stores';

export default {
  setup() {
    const viceStore = useViceStore();

    return {
      user: viceStore.user,
    };
  },
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      // Clear user authentication state
      const viceStore = useViceStore();
      viceStore.user = { email: '', password: '', firstname: '', lastname: '' }; // Assuming you have user state in your store
      localStorage.removeItem("_token"); // Clear authentication token from local storage

      // Redirect user to login page
      this.$router.push('/'); // Assuming your login page is '/login'
    }
  }

};
</script>
