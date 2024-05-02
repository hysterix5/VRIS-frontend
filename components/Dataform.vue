<template>
    <div class="bg-white">
      <!-- component -->
      <div class="bg-white p-4 rounded-md shadow-md">
        <!-- First dropdown to select apprehension -->
        <div class="flex flex-col sm:flex-row items-center">
          <select v-model="selectedApprehension" class="p-2 border rounded-md mb-3 sm:mb-0 sm:mr-3">
            <option value="" disabled selected>Select Apprehension</option>
            <option v-for="apprehension in apprehensions" :key="apprehension.value" :value="apprehension.value" class="p-2">{{ apprehension.label }}</option>
          </select>
  
          <div v-if="selectedApprehension === 'Liquor' || selectedApprehension === 'Anti-Smoking'">
  <!-- Dropdown for Liquor or Anti-Smoking Type -->
  <select v-model="selectedApprehensionType" class="p-2 border rounded-md mb-3 sm:mb-0 sm:mr-3">
    <option value="" disabled selected>Select Type</option>
    <option v-for="type in apprehensionTypes" :key="type.value" :value="type.value" class="p-2">{{ type.label }}</option>
  </select>

  <select v-if="selectedApprehension === 'Anti-Smoking'" v-model="cigaretteClassification" class="p-2 border rounded-md">
  <option value="" disabled selected>Classify Cigarettes...</option>
  <option value="E-cigarettes">E-Cigarettes</option>
  <option value="Tobacco">Tobacco</option>
  </select>  
</div>
</div>
  

  
        <!-- Display forms based on selected apprehension type -->
        <div v-if="selectedApprehensionType === 'individual' || selectedApprehension === 'Sobriety'">
          <!-- Individual Form -->
          <section>
            <form @submit.prevent="submitViolator">
    <h1 class="font-bold p-4">Individual</h1>
    <hr class="border-t-2 border-black">
    <div class="grid grid-rows-3">

        <!--first row-->
        <div class="grid grid-cols-3">
        <div class="border-b border-black">
            <div class="m-3">
                <label for="name" class="block">FIRST NAME<span class="text-red-600">*</span></label>
                <input v-model="violator.firstname" type="text" class="w-full border" >
            </div>
        </div>

        <div class="border border-black border-t-0 ">
            <div class="m-3">
                <label for="course" class="block">MIDDLE NAME</label>
                <input v-model="violator.middlename" type="text" class="w-full border">
            </div>
        </div>
        <div class="border-b border-black">
            <div class="m-3">
                <label for="year" class="block">LAST NAME<span class="text-red-600">*</span></label>
                <input v-model="violator.lastname" type="text" class="w-full border" >
            </div>
        </div>
      </div>

      <!--second row-->
      <div class="grid grid-cols-3">
        <div class="border-b border-black">
            <div class="m-3">
             <div class="grid grid-cols-2">
                <div class="pr-3">
                <label for="name" class="block">SUFFIX</label>
                <select v-model="violator.suffix" class="w-full border">
                  <option value=""></option>
                  <option v-for="suffix in nameSuffixes" :value="suffix">{{ suffix }}</option>
                </select>
            </div>
            <div>
             <label for="sex" class="block">SEX<span class="text-red-600">*</span></label>
              <select v-model="violator.sex" id="sex" class="w-full border" >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              </select>
            </div>
            </div>
         </div>
        </div>
        
    
        <div class="border border-black border-t-0">
            <div class="m-3">
                <label class="block">BIRTHDATE<span class="text-red-600">*</span></label>
                <input v-model="violator.birthdate" type="date" class="w-full border" >
            </div>
        </div>

        <div class="border-b border-black">
            <div class="m-3">
                <label class="block">ID Issued for Reference</label>
                <input v-model="violator.referenceid" type="text"class="w-full border">
            </div>   
        </div>
      </div>

    <!--third row-->
      <div class="grid grid-cols-3">
        
        <div class="border border-black border-t-0 border-x-0">
            <div class="m-3">
                <label class="block">OCCUPATION<span class="text-red-600">*</span></label>
                <input v-model="violator.occupation" type="text" class="w-full border" >
            </div>
        </div>
    
<!-- District dropdown -->
<div class="border border-black border-t-0 border-r-0">
    <div class="m-3">
        <label class="block">DISTRICT<span class="text-red-600">*</span></label>
        <select v-model="selectedDistrict" class="w-full border" required @change="filterBarangaysByDistrict">
            <option value="" disabled selected>Select District</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    </div>
</div>

<!-- Barangay dropdown -->
<div class="border border-black border-t-0 border-r-0" :class="{ 'opacity-50 bg-gray-300': !selectedDistrict }">
    <div class="m-3">
        <label class="block">BARANGAY<span class="text-red-600">*</span></label>
        <select v-model="selectedBarangay" class="w-full border" :disabled="!selectedDistrict" required>
            <option v-for="barangay in filteredBarangays" :key="barangay.barangay_name" :value="barangay.barangay_name">{{ barangay.barangay_name }}</option>
        </select>
    </div>
</div>
      </div>
    </div>
    <div class="grid grid-cols-3">
        <div class="border-b border-black col-span-3">
            <div class="m-3">
                <label for="name" class="block">ADDRESS<span class="text-red-600">*</span></label>
                <input v-model="violator.address" type="text" class="w-full border" placeholder="Block/Lot/House no./Subdivision/Village" required>
            </div>
        </div>
    </div>
    <div class="flex justify-end p-4">
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </div>
    </form>
        </section>
        </div>
  
        <div v-else-if="selectedApprehensionType === 'establishment'">
          <!-- Establishment Form -->
          <section>

           <form @submit.prevent="submitEstablishment">
            <h1 class="font-bold p-4">Establishment</h1>
            <hr class="border-t-2 border-black">
            <div class="grid grid-rows-4">

               
                <div class="grid grid-cols-3">
                    <div class="border-b border-black col-span-2">
                        <div class="m-3">
                            <label for="name" class="block">NAME OF ESTABLISHMENT<span class="text-red-600">*</span></label>
                            <input v-model="establishment.name" type="text" name="name" id="name" class="w-full border" required>
                        </div>
                    </div>
                    <div class="border border-black border-t-0 border-r-0">
                        <div class="m-3">
                            <label for="course" class="block">TYPE OF ESTABLISHMENT<span class="text-red-600">*</span></label>
                            <input v-model="establishment.establishment_type" type="text" name="course" id="course" class="w-full border" required>
                        </div>
                    </div>
                </div>

               
                <div class="grid grid-cols-3">
                    <div class="border border-black border-t-0 border-l-0">
                        <div class="m-3">
                            <label class="block">REGISTERED OWNER<span class="text-red-600">*</span></label>
                            <input v-model="establishment.registered_owner" type="text" class="w-full border" required>
                        </div>
                    </div>
                    <div class="border-b border-black">
                        <div class="m-3">
                            <label class="block">ADDRESS<span class="text-red-600">*</span></label>
                            <input v-model="establishment.address" type="text" class="w-full border" required>
                        </div>
                    </div>
                    <div class="border border-black border-t-0 border-r-0">
                        <div class="m-3">
                            <label class="block">BUSINESS PERMIT NO.<span class="text-red-600">*</span></label>
                            <input v-model="establishment.permit" type="text" class="w-full border" required>
                        </div>
                    </div>
                </div>

               
                <div class="grid grid-cols-3 row-span-2">
                    <div class="border border-black border-t-0 border-x-0 col-span-3">
                        <div class="m-3">
                            <label class="block">REMARKS</label>
                            <textarea v-model="establishment.remarks" class="border w-full h-32 p-1 resize-none"></textarea> 
                        </div>
                    </div>
                </div>

            </div>
            <div class="flex justify-end p-4">
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </div>
        </form>
        </section>
        </div>
  
        <div v-else-if="selectedApprehensionType === 'publicConveyances'">
          <!-- Public Conveyances Form -->
          <section>
            <form @submit.prevent="submitPublicConveyances">
            <h1 class="font-bold p-4">Public Conveyances</h1>
            <hr class="border-t-2 border-black">
            <div class="grid grid-rows-3">

                <!-- First row -->
                <div class="grid grid-cols-3">
                    <div class="border-b border-black">
                        <div class="m-3">
                            <label for="name" class="block">NAME OF DRIVER<span class="text-red-600">*</span></label>
                            <input v-model="public_conveyances.driver_name" type="text" name="name" id="name" class="w-full border" required>
                        </div>
                    </div>
                    <div class="border border-black border-t-0 border-r-0 col-span-2">
                        <div class="m-3">
                            <label for="course" class="block">PLACE OF APPREHENSION<span class="text-red-600">*</span></label>
                            <input v-model="public_conveyances.apprehension_place" type="text" name="course" id="course" class="w-full border" required>
                        </div>
                    </div>
                </div>

                <!-- Second row -->
                <div class="grid grid-cols-2">
                    <div class="border border-black border-t-0 border-l-0">
                        <div class="m-3">
                            <label class="block">REGISTERED OWNER<span class="text-red-600">*</span></label>
                            <input v-model="public_conveyances.registered_owner" type="text" class="w-full border" required>
                        </div>
                    </div>
                    <div class="border-b border-black">
                        <div class="m-3">
                            <label class="block">OWNER'S ADDRESS<span class="text-red-600">*</span></label>
                            <input v-model="public_conveyances.owner_address" type="text" class="w-full border" required>
                        </div>
                    </div>
                </div>

                <!-- Third row -->
                <div class="grid grid-cols-2">

                    <div class="border border-black border-t-0 border-l-0">
                        <div class="m-3">
                            <label class="block">PLATE NO.<span class="text-red-600">*</span></label>
                            <input v-model="public_conveyances.plate_no" type="text" class="w-full border" required>
                        </div>
                    </div>

                    <div class="border border-black border-t-0 border-x-0">
                        <div class="m-3">
                            <label class="block">LICENSE NO.<span class="text-red-600">*</span></label>
                            <input v-model="public_conveyances.license_no" type="text" class="w-full border" required>
                        </div>
                    </div>
                </div>

            </div>
            <div class="flex justify-end p-4">
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </div>
        </form>
        </section>
        </div>
      </div>
    </div>
  </template>
  
 <script>
 import axios from 'axios';
 
 export default {
   data() {
     return {
       selectedApprehension: '', // Selected apprehension
       selectedApprehensionType: '', // Selected liquor type
       selectedAntiSmokingType: '', // Selected anti-smoking type
       cigaretteClassification: '', // Input field value for classification of cigarettes
       apprehensions: [
         { label: 'Sobriety', value: 'Sobriety' },
         { label: 'Liquor', value: 'Liquor' },
         { label: 'Anti-Smoking', value: 'Anti-Smoking' }
       ],
       apprehensionTypes: [
         { label: 'Individual', value: 'individual' },
         { label: 'Establishment', value: 'establishment' },
         { label: 'Public Conveyances', value: 'publicConveyances' }
       ],
       violator: {
         firstname: '',
         middlename: '',
         lastname: '',
         sex: '',
         address: '',
         birthdate: '',
         suffix: '',
         occupation: '',
         referenceid: '',
         apprehension_type: '',
       },
       establishment: {
         name: '',
         address: '',
         registered_owner: '',
         permit: '',
         establishment_type: '',
         remarks: '',
         apprehension_type: '',
       },
       public_conveyances: {
         driver_name: '',
         apprehension_place: '',
         license_no: '',
         plate_no: '',
         registered_owner: '',
         owner_address: '',
         apprehension_type: '',
       },
       nameSuffixes: ['Jr.', 'Sr.', 'II', 'III', 'IV'],
       selectedDistrict: '', // Selected district
       selectedBarangay: '', // Selected barangay
       barangays: [], // Array to store all barangays
       filteredBarangays: [] // Array to store filtered barangays based on district
     };
   },
   async mounted() {
    await this.fetchBarangay();
  },
   methods: {
    filterBarangaysByDistrict() {
        // Filter the barangays based on the selected district
        this.filteredBarangays = this.barangays.filter(barangay => barangay.district == this.selectedDistrict);
        // Reset the selected barangay when the district changes
        this.selectedBarangay = '';
    },
    async submitViolator() {
  try {
    this.violator.apprehension_type = this.selectedApprehension; 
    // Check if district and barangay are already present in the address
    const addressParts = this.violator.address.split(',');
    const hasDistrictAndBarangay = addressParts.some(part => part.trim().startsWith('District') || this.barangays.some(barangay => part.trim() === barangay));
    if (!hasDistrictAndBarangay) {
      this.violator.address += `, District ${this.selectedDistrict}, ${this.selectedBarangay}`;
    }
    console.log(this.violator)
    const response = await axios.post('http://localhost:8000/api/violator', this.violator);
    console.log('Response:', response.data);
    // Reset form fields after successful submission
    this.resetViolatorForm();
    alert('Violator data submitted successfully!');
  } catch (error) {
    console.error('Error submitting violator data:', error.response.data.message);
    alert(error.response.data.message);
  }
},
  async submitEstablishment() {
    try { 
      this.establishment.apprehension_type = this.selectedApprehension; // Assign selected apprehension to the form data
      const response = await axios.post('http://localhost:8000/api/establishment', this.establishment);
      console.log('Response:', response.data);
      // Handle submission of establishment form
      console.log('Establishment form submitted:', this.establishment);
      // Reset form fields after submission
      this.resetEstablishmentForm();
      alert('Establishment data submitted successfully!');
    } catch (error) {
      console.error('Error submitting establishment data:', error);
      alert('Error submitting establishment data. Please try again.');
    }
  },
  async submitPublicConveyances() {
    try {
      this.public_conveyances.apprehension_type = this.selectedApprehension; // Assign selected apprehension to the form data
      const response = await axios.post('http://localhost:8000/api/public', this.public_conveyances);
      console.log('Response:', response.data);
      // Handle submission of public conveyances form
      console.log('Public Conveyances form submitted:', this.public_conveyances);
      // Reset form fields after submission
      this.resetPublicConveyancesForm();
      alert('Public Conveyances data submitted successfully!');
    } catch (error) {
      console.error('Error submitting public conveyances data:', error);
      alert('Error submitting public conveyances data. Please try again.');
    }
  },

  async fetchBarangay() {
    try {
        const response = await axios.get('http://localhost:8000/api/fetch_barangay');
        this.barangays = response.data;
        console.log(this.barangays);
    } catch (error) {
        console.error('Error fetching barangay data:', error);
        // Handle error
    }
},
     resetViolatorForm() {
       // Reset violator form fields
       this.violator = {
         firstname: '',
         middlename: '',
         lastname: '',
         sex: '',
         address: '',
         birthdate: '',
         suffix: '',
         occupation: '',
         referenceid: ''
       };
     },
     resetEstablishmentForm() {
       // Reset establishment form fields
       this.establishment = {
         name: '',
         address: '',
         registeredOwner: '',
         permit: '',
         type: '',
         remarks: ''
       };
     },
     resetPublicConveyancesForm() {
       // Reset public conveyances form fields
       this.public_conveyances = {
         drivername: '',
         apprehensionPlace: '',
         licenseNumber: '',
         plateNumber: '',
         registeredOwner: '',
         ownerAddress: ''
       };
     }
   }
 };
 </script>