<template>
  <div class="flex items-center justify-center">
    <div class="block max-w-lg p-6 bg-slate-100 border border-green-800 rounded-lg shadow-xl">
      <div class="font-normal flex items-center">
        <NuxtImg src="/img/davgov.png" class="mr-4" />
        <div>
          <p>Republic of the Philippines</p>
          <p class="font-bold">VICES REGULATION INFORMATION SYSTEM</p>
          <p>City Government of Davao</p>
        </div>
      </div>
      <div class="border-t my-6"></div>
      <div class="text-center">
        <h1>Maayong Hapon!</h1>
        <p>Today is <span class="font-bold">{{ currentDate }}</span></p>
        <p>Time is <span class="font-bold">{{ currentTime }}</span></p>
      </div>
      <div class="border-t my-6"></div>
      <div class="font-small text-center">
        <p>© 2024 City Government of Davao</p>
        <p>All Rights Reserved</p>
        <p>Developed by CITC. Version 1.1.0</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {


    data() {
      return {
        currentDate: "",
        currentTime: ""
      };
    },
    mounted() {
      this.getCurrentDate();
      this.getCurrentTime();
      // Update time every second
      setInterval(() => {
        this.getCurrentTime();
      }, 1000);
    },
    methods: {
        getCurrentDate() {
    const today = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    this.currentDate = today.toLocaleDateString("en-US", options);
  },

  getCurrentTime() {
    const now = new Date();
    const options = { hour: "numeric", minute: "numeric", second: "numeric", hour12: false };
    this.currentTime = now.toLocaleTimeString("en-US", options);
  }
  }
  
  };
  </script>
  
  