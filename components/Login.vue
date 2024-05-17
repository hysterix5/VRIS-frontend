<template>
    <div class="bg-white h-screen w-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-blue-200 sm:mx-0" style="height: 500px">
            <div class="flex flex-col w-full md:w-1/2 p-4">
                <div class="flex flex-col flex-1 justify-center items-center mb-8">
                  <div class="flex mb-6">
                     <NuxtImg src="/img/davgov.png" class="mr-4" style="height: 75px; width: 75px;"/>
                    <NuxtImg src="/img/vris_logo.png" class="mr-4" style="height: 75px; width: 75px;"/>
                  </div>
                    <h1 class="text-center font-bold">Vices Regulation Information System</h1>
                    <div class="w-full mt-4">
                        <form class="form-horizontal w-3/4 mx-auto" @submit.prevent="loginUser">
                            <div class="flex flex-col mt-4">
                                <input id="text" v-model="userData.username" type="text" class="flex-grow h-8 px-2 border rounded border-grey-400" placeholder="Username">
                            </div>
                            <div class="flex flex-col mt-4">
                                <input id="password" v-model="userData.password" type="password" class="flex-grow h-8 px-2 rounded border border-grey-400" required placeholder="Password">
                            </div>
                            <div v-if="errorMessage" class="text-red-500 mt-3">{{ errorMessage }}</div>
                            <div class="flex flex-col mt-8">
                                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded">
                                    Login
                                </button>
                            </div>
                        </form>
                        <div class="text-center items-center mt-4">
                            <!-- <NuxtLink class="no-underline hover:underline text-blue-dark text-xs" to="/register">
                                Sign Up
                            </NuxtLink> -->
                        </div>
                        <NuxtImg src="/img/davao.png" alt="Image" class="mx-auto mt-8" sizes="150px"/>
                    </div>
                </div>
            </div>
            <div class="hidden md:block md:w-1/2 rounded-r-lg" style="background: url('/img/smoke.png') center center / cover;"></div>
        </div>
    </div>
</div>
  </template>
  
  <script>
import axios from 'axios';
import { useViceStore } from '~/stores/vris-stores';


export default {
  setup() {
    const viceStore = useViceStore();


    const userData = ref({
      username: '',
      password: ''
    });
    const errorMessage = ref('');

    // Method for logging in user
    const loginUser = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/login', userData.value);

        // Check if the response contains an error message
        if (response.data.message) {
            errorMessage.value = "Incorrect Email or Password";
        } else {
            // Check if user data exists in the response
            if (response.data.data.user) {
                // Assuming your Laravel API responds with data, you can handle the response here
                localStorage.setItem("_token", response.data.token)
                const { firstname, lastname } = response.data.data.user;
                console.log(response.data.data.user);
                viceStore.user.username = userData.value.username;
                viceStore.user.password = userData.value.password;
                viceStore.user.firstname = firstname;
                viceStore.user.lastname = lastname;
                viceStore.user.access_level = response.data.data.user.access_level;
                await navigateTo('/main');
            } else {
                errorMessage.value = "User data not found";
            }
        }

        // reset the form fields
        userData.value.username = '';
        userData.value.password = '';

    } catch (error) {
        // Handle errors here
        console.log('Error submitting form:', error);
        // Display error message
    }
};
    // Expose options to template
    return {
      userData,
      errorMessage,
      loginUser
    };
  },
};
</script>
  