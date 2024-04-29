<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h1 class="text-2xl font-semibold mb-4">Registration Form</h1>
        <form @submit.prevent="registerUser">
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-medium text-gray-700">Username:</label>
            <input type="text" id="username" v-model="formData.username" required class="mt-1 p-2 w-full border border-gray-300 rounded-md">
          </div>
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name:</label>
            <input type="text" id="firstName" v-model="formData.firstname" required class="mt-1 p-2 w-full border border-gray-300 rounded-md">
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name:</label>
            <input type="text" id="lastName" v-model="formData.lastname" required class="mt-1 p-2 w-full border border-gray-300 rounded-md">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address:</label>
            <input type="email" id="email" v-model="formData.email" required class="mt-1 p-2 w-full border border-gray-300 rounded-md">
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
            <input type="password" id="password" v-model="formData.password" required class="mt-1 p-2 w-full border border-gray-300 rounded-md">
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Register</button>
        </form>
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          username: '',
          firstname: '',
          lastname: '',
          email: '',
          password: ''
        }
      };
    },
    methods: {
      async registerUser() {
        try {
          // Make a POST request to your Laravel backend
          const response = await axios.post('http://127.0.0.1:8000/api/userRegister', this.formData);
          
          // Handle the response from the backend
          console.log('Registration successful:', response.data);
          
          // Optionally, redirect the user to a different page after successful registration
          this.$router.push('/');
        } catch (error) {
          // Handle errors here
          console.error('Registration failed:', error);
          // Optionally, display an error message to the user
        }
      }
    }
  };
  </script>