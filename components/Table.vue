<template>
  <div>
    <div class="flex justify-end mb-4">
      <select v-model="selectedApprehensionType" class="px-2 py-1 border border-gray-300 rounded-md">
        <option value="" disabled selected>Select Apprehensions</option>
        <option v-for="type in apprehensionTypes" :value="type">{{ type }}</option>
      </select>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow-lg">
      <div v-if="selectedApprehensionType === 'Individuals'">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Address</th>
              <th class="px-4 py-2">Apprehension Type</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="violator in violators" :key="violator.id" class="border-b border-gray-200">
              <td class="px-4 py-2 text-center">{{ violator.id }}</td>
              <td class="px-4 py-2 text-center">{{ violator.firstname + (violator.middlename ? ' ' + violator.middlename : '') + ' ' + violator.lastname }}</td>
              <td class="px-4 py-2 text-center">{{ violator.address }}</td>
              <td class="px-4 py-2 text-center">{{ violator.apprehension_type }}</td>
              <td class="px-4 py-2 text-center">
                <button class="px-3 py-1 bg-blue-500 text-white rounded-md">Edit</button>              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="selectedApprehensionType === 'Establishments'">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Establishment Name</th>
              <th class="px-4 py-2">Address</th>
              <th class="px-4 py-2">Apprehension Type</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="establishment in establishments" :key="establishment.id" class="border-b border-gray-200">
              <td class="px-4 py-2 text-center">{{ establishment.id }}</td>
              <td class="px-4 py-2 text-center">{{ establishment.name }}</td>
              <td class="px-4 py-2 text-center">{{ establishment.address }}</td>
              <td class="px-4 py-2 text-center">{{ establishment.apprehension_type }}</td>
              <td class="px-4 py-2 text-center">
                <button class="px-3 py-1 bg-blue-500 text-white rounded-md">Edit</button>              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="selectedApprehensionType === 'Public Conveyances'">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Driver Name</th>
              <th class="px-4 py-2">Apprehension Place</th>
              <th class="px-4 py-2">Apprehension Type</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="public_conveyance in public_conveyances" :key="public_conveyances.id" class="border-b border-gray-200">
              <td class="px-4 py-2 text-center">{{ public_conveyance.id }}</td>
              <td class="px-4 py-2 text-center">{{ public_conveyance.driver_name }}</td>
              <td class="px-4 py-2 text-center">{{ public_conveyance.apprehension_place }}</td>
              <td class="px-4 py-2 text-center">{{ public_conveyance.apprehension_type }}</td>
              <td class="px-4 py-2 text-center">
                <button class="px-3 py-1 bg-blue-500 text-white rounded-md">Edit</button>              </td>
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
      selectedApprehensionType: '',
      apprehensionTypes: ['Individuals', 'Establishments', 'Public Conveyances'],

      violators: [],
      establishments: [],
      public_conveyances: [],
    }
  },

  mounted() {
    this.getViolators();
    this.getEstablishments();
    this.getPublicConveyances();
  },

  methods: {
    getViolators() {
      axios.get(`http://localhost:8000/api/get_violators`)
        .then(result => {
          this.violators = result.data;
        })
        .catch(error => {
          console.error('Error fetching violators:', error);
        });
    },

    getEstablishments() {
      axios.get(`http://localhost:8000/api/get_establishments`)
        .then(result => {
          this.establishments = result.data;
        })
        .catch(error => {
          console.error('Error fetching establishments:', error);
        });
    },

    getPublicConveyances() {
      axios.get(`http://localhost:8000/api/get_public_conveyances`)
        .then(result => {
          this.public_conveyances = result.data;
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    },
  }
}
</script>