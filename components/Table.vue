<template>
  <div class="bg-white">
    <div class="flex mb-4">
      <div class="mt-3">
        <label for="selectedApprehension" class="block text-sm font-medium text-gray-700 mx-3">Select Apprehension</label>
        <select @change="getViolators(selectedApprehension)" v-model="selectedApprehension" class="px-2 py-1 border border-gray-300 rounded-md m-3">
        <option v-for="type in apprehensions" :value="type">{{ type }}</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto" style="width: 1000px;"> <!-- Adjust width as needed -->
      <!-- Individual Table -->
      <div v-if="selectedApprehension === 'Individuals'">
        <table class="table-auto w-full">
          <!-- Table headers -->
          <thead>
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Address</th>
              <th class="px-4 py-2">Apprehension Type</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody>
            <tr v-for="violator in violators" :key="violator.index" class="border-b border-gray-200">
              <td class="px-4 py-2 text-center">{{ violator.id }}</td>
              <td class="px-4 py-2 text-center">{{ violator.firstname + (violator.middlename ? ' ' + violator.middlename : '') + ' ' + violator.lastname }}</td>
              <td class="px-4 py-2 text-center">{{ violator.address }}</td>
              <td class="px-4 py-2 text-center">{{ violator.apprehension.violation }}</td>
              <td class="px-4 py-2 text-center">
                <button class="px-3 py-1 bg-blue-500 text-white rounded-md">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Establishments Table -->
      <div v-if="selectedApprehension === 'Establishments'">
        <table class="table-auto w-full">
          <!-- Table headers -->
          <thead>
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Establishment Name</th>
              <th class="px-4 py-2">Address</th>
              <th class="px-4 py-2">Apprehension Type</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody>
            <tr v-for="establishment in establishments" :key="establishment.index" class="border-b border-gray-200">
              <td class="px-4 py-2 text-center">{{ establishment.id }}</td>
              <td class="px-4 py-2 text-center">{{ establishment.name }}</td>
              <td class="px-4 py-2 text-center">{{ establishment.address }}</td>
              <td class="px-4 py-2 text-center">{{ establishment.apprehension.violation }}</td>
              <td class="px-4 py-2 text-center">
                <button class="px-3 py-1 bg-blue-500 text-white rounded-md">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Public Conveyances Table -->
      <div v-if="selectedApprehension === 'Public Conveyances'">
        <table class="table-auto w-full">
          <!-- Table headers -->
          <thead>
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Driver Name</th>
              <th class="px-4 py-2">Apprehension Place</th>
              <th class="px-4 py-2">Apprehension Type</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody>
            <tr v-for="public_conveyance in public_conveyances" :key="public_conveyance.index" class="border-b border-gray-200">
              <td class="px-4 py-2 text-center">{{ public_conveyance.id }}</td>
              <td class="px-4 py-2 text-center">{{ public_conveyance.driver_name }}</td>
              <td class="px-4 py-2 text-center">{{ public_conveyance.apprehension_place }}</td>
              <td class="px-4 py-2 text-center">{{ public_conveyance.apprehension.violation }}</td>
              <td class="px-4 py-2 text-center">
                <button class="px-3 py-1 bg-blue-500 text-white rounded-md">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      selectedApprehension: null,
      apprehensions: ['Individuals', 'Establishments', 'Public Conveyances'],
      violators: null,
      establishments: [],
      public_conveyances: [],
    }
  },



  methods: {
    getViolators(value) {
    axios.get(`http://localhost:8000/api/get_violators?apprehension=${value}`)
    .then(result => {
      // Access the actual data within the Proxy object
      const responseData = result.data.data;
      console.log(responseData);
      
      // Update violators data with the fetched data
      if (value === 'Individuals') {
        this.violators = responseData;
      } else if (value === 'Establishments') {
        this.establishments = responseData;
      } else if (value === 'Public Conveyances'){
        this.public_conveyances = responseData;
      }
      
    })
    .catch(error => {
      console.error('Error fetching violators:', error);
    });
}

    // getEstablishments() {
    //   axios.get(`http://localhost:8000/api/get_establishments`)
    //     .then(result => {
    //       this.establishments = result.data;
    //     })
    //     .catch(error => {
    //       console.error('Error fetching establishments:', error);
    //     });
    // },

    // getPublicConveyances() {
    //   axios.get(`http://localhost:8000/api/get_public_conveyances`)
    //     .then(result => {
    //       this.public_conveyances = result.data;
    //     })
    //     .catch(error => {
    //       console.error('Error fetching students:', error);
    //     });
    // },
  }
}
</script>