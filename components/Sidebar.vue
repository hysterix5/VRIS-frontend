<template>
  <!-- Sidebar component -->
  <div class="flex flex-col bg-white text-gray-700 h-screen w-full max-w-[20rem]">
    <!-- Logo and title -->
    <div class="mb-6 mt-3 p-4 flex flex-col items-center text-center justify-center">
      <NuxtImg src="/img/vris_logo.png" sizes="75px"/>
      <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Vices Regulation Information Systems</h5>
    </div>
    <!-- Sidebar navigation -->
    <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
      <!-- User Account -->
      <div role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4"><Icon name="material-symbols:account-circle-full" style="width: 24px; height: 24px;" /></div>
        <NuxtLink to="/main">User Account</NuxtLink>
      </div>
      <!-- System User -->
      <div role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4"><Icon name="material-symbols:person" style="width: 24px; height: 24px;" /></div>
        <NuxtLink to="/main">System User</NuxtLink>
      </div>
      <!-- Data Entry -->
      <div role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4"><Icon name="material-symbols:list-alt-add" style="width: 24px; height: 24px;" /></div>
        <NuxtLink to="/main/data_entry">Data Entry</NuxtLink>
      </div>
      <!-- Reports -->
      <div role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4"><Icon name="material-symbols:bar-chart" style="width: 24px; height: 24px;" /></div>
        <NuxtLink to="/main">Reports</NuxtLink>
      </div>
      <!-- Inquiry -->
      <div role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4"><Icon name="material-symbols:help-rounded" style="width: 24px; height: 24px;" /></div>
        <NuxtLink to="/main/inquiry">Inquiry</NuxtLink>
      </div>
      <!-- Settings -->
      <div role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4"><Icon name="material-symbols:settings" style="width: 24px; height: 24px;" /></div>
        <NuxtLink to="/main">Settings</NuxtLink>
      </div>
      <!-- Log Out -->
      <div role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4"><Icon name="material-symbols:logout" style="width: 24px; height: 24px;" /></div>
        <button @click="logout">Log Out</button>
      </div>
    </nav>
  </div>
</template>


<script>

import { useViceStore } from '~/stores/vris-stores';

export default {
  methods: {
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
