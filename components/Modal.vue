<template>
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-8 rounded shadow-lg w-1/2">
        <h2 class="text-xl font-bold mb-4">Choose Apprehension</h2>
        <div class="relative">
          <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option>Sobriety</option>
            <option>Liquor</option>
            <option>Anti-Smoking</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9 11l4-4H7l4 4z"/></svg>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <button class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded mx-3">Submit</button>
          <button @click="closeModal" class="px-4 py-2 border border-gray hover:bg-gray-400 text-gray-800 font-bold rounded">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  }
  </script>