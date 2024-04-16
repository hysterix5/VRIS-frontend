<template>
    <div class="text-white sticky top-0 w-full z-10">
      <ul class="flex justify-between items-center py-6 px-6 bg-white">
        <div class="flex items-center">
        </div>
        <div class="flex items-center mx-3">
            <li class="text-gray-500 flex items-center">
                <button @click="logout" class="mr-2">Welcome, {{ user.firstname }} {{ user.lastname }}</button>
                <Icon name="material-symbols:account-circle-full" style="width: 24px; height: 24px;" />
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

};
</script>
