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
  
          <div v-if="selectedApprehension === 'liquor' || selectedApprehension === 'antismoking'">
  <!-- Dropdown for Liquor or Anti-Smoking Type -->
  <select v-model="selectedApprehensionType" class="p-2 border rounded-md mb-3 sm:mb-0 sm:mr-3">
    <option value="" disabled selected>Select Type</option>
    <option v-for="type in apprehensionTypes" :key="type.value" :value="type.value" class="p-2">{{ type.label }}</option>
  </select>

  <input v-if="selectedApprehension === 'antismoking'" v-model="cigaretteClassification" type="text" placeholder="Classify Cigarettes..." class="p-2 border rounded-md">
</div>
        </div>
  

  
        <!-- Display forms based on selected apprehension type -->
        <div v-if="selectedApprehensionType === 'individual' || selectedApprehension === 'sobriety'">
          <!-- Individual Form -->
          <section>
            <form>
    <h1 class="font-bold p-4">Violator</h1>
    <hr class="border-t-2 border-black">
    <div class="grid grid-rows-3">

        <!--first row-->
        <div class="grid grid-cols-3">
        <div class="border-b border-black">
            <div class="m-3">
                <label for="name" class="block">FIRST NAME<span class="text-red-600">*</span></label>
                <input v-model="violator.firstname" type="text" name="name" id="name" class="w-full border">
            </div>
         
        </div>
        <div class="border border-black border-t-0 ">
            <div class="m-3">
                <label for="course" class="block">MIDDLE NAME</label>
                <input v-model="violator.middlename" type="text" name="course" id="course" class="w-full border">
            </div>
        </div>
        <div class="border-b border-black">
            <div class="m-3">
                <label for="year" class="block">LAST NAME<span class="text-red-600">*</span></label>
                <input v-model="violator.lastname" type="text" name="year" id="year" class="w-full border">
            </div>
        </div>
      </div>

      <!--second row-->
      <div class="grid grid-cols-3">
        <div class="border-b border-black">
            <div class="m-3">
             <div class="grid grid-cols-2">
                <div class="pr-3">
                <label for="name" class="block">SUFFIX<span class="text-red-600">*</span></label>
                <input v-model="violator.suffix" type="text" name="name" id="name" class="w-full border">
            </div>
             <div>
                <label for="name" class="block">SEX<span class="text-red-600">*</span></label>
                <input v-model="violator.sex" type="text" name="name" id="name" class="w-full border">
             </div>
            </div>
         </div>
        </div>
        
    
        <div class="border border-black border-t-0">
            <div class="m-3">
                <label class="block">BIRTHDATE</label>
                <input v-model="violator.bday" type="date" class="w-full border">
            </div>
        </div>

        <div class="border-b border-black">
            <div class="m-3">
                <label class="block">DQRCODE<span class="text-red-600">*</span></label>
                <input v-model="violator.dqrcode" type="text"class="w-full border">
            </div>   
        </div>
      </div>

    <!--third row-->
      <div class="grid grid-cols-3">
        
        <div class="border border-black border-t-0 border-x-0">
            <div class="m-3">
                <label class="block">OCCUPATION</label>
                <input v-model="violator.occupation" type="text" class="w-full border">
            </div>
        </div>
    
        <div class="border border-black border-t-0 border-r-0 col-span-2">
            <div class="m-3">
                <label class="block">ADDRESS</label>
                <input v-model="violator.address" type="text" class="w-full border">
            </div>
        </div>
      </div>
    </div>
    </form>
        </section>
        </div>
  
        <div v-else-if="selectedApprehensionType === 'establishment'">
          <!-- Establishment Form -->
          <section>

           <form>
            <h1 class="font-bold p-4">Establishment</h1>
            <hr class="border-t-2 border-black">
            <div class="grid grid-rows-4">

               
                <div class="grid grid-cols-3">
                    <div class="border-b border-black col-span-2">
                        <div class="m-3">
                            <label for="name" class="block">NAME OF ESTABLISHMENT<span class="text-red-600">*</span></label>
                            <input v-model="establishment.name" type="text" name="name" id="name" class="w-full border">
                        </div>
                    </div>
                    <div class="border border-black border-t-0 border-r-0">
                        <div class="m-3">
                            <label for="course" class="block">TYPE OF ESTABLISHMENT</label>
                            <input v-model="establishment.type" type="text" name="course" id="course" class="w-full border">
                        </div>
                    </div>
                </div>

               
                <div class="grid grid-cols-3">
                    <div class="border border-black border-t-0 border-l-0">
                        <div class="m-3">
                            <label class="block">REGISTERED OWNER</label>
                            <input v-model="establishment.registeredOwner" type="text" class="w-full border">
                        </div>
                    </div>
                    <div class="border-b border-black">
                        <div class="m-3">
                            <label class="block">ADDRESS<span class="text-red-600">*</span></label>
                            <input v-model="establishment.address" type="text" class="w-full border">
                        </div>
                    </div>
                    <div class="border border-black border-t-0 border-r-0">
                        <div class="m-3">
                            <label class="block">BUSINESS PERMIT NO.</label>
                            <input v-model="establishment.permit" type="text" class="w-full border">
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
        </form>
        </section>
        </div>
  
        <div v-else-if="selectedApprehensionType === 'publicConveyances'">
          <!-- Public Conveyances Form -->
          <section>
            <form>
            <h1 class="font-bold p-4">Public Conveyances</h1>
            <hr class="border-t-2 border-black">
            <div class="grid grid-rows-3">

                <!-- First row -->
                <div class="grid grid-cols-3">
                    <div class="border-b border-black">
                        <div class="m-3">
                            <label for="name" class="block">NAME OF DRIVER<span class="text-red-600">*</span></label>
                            <input v-model="public_conveyances.drivername" type="text" name="name" id="name" class="w-full border">
                        </div>
                    </div>
                    <div class="border border-black border-t-0 border-r-0 col-span-2">
                        <div class="m-3">
                            <label for="course" class="block">PLACE OF APPREHENSION</label>
                            <input v-model="public_conveyances.apprehensionPlace" type="text" name="course" id="course" class="w-full border">
                        </div>
                    </div>
                </div>

                <!-- Second row -->
                <div class="grid grid-cols-2">
                    <div class="border border-black border-t-0 border-l-0">
                        <div class="m-3">
                            <label class="block">REGISTERED OWNER</label>
                            <input v-model="public_conveyances.registeredOwner" type="text" class="w-full border">
                        </div>
                    </div>
                    <div class="border-b border-black">
                        <div class="m-3">
                            <label class="block">OWNER'S ADDRESS<span class="text-red-600">*</span></label>
                            <input v-model="public_conveyances.ownerAddress" type="text" class="w-full border">
                        </div>
                    </div>
                </div>

                <!-- Third row -->
                <div class="grid grid-cols-2">

                    <div class="border border-black border-t-0 border-l-0">
                        <div class="m-3">
                            <label class="block">PLATE NO.</label>
                            <input v-model="public_conveyances.plateNumber" type="text" class="w-full border">
                        </div>
                    </div>

                    <div class="border border-black border-t-0 border-x-0">
                        <div class="m-3">
                            <label class="block">LICENSE NO.</label>
                            <input v-model="public_conveyances.licenseNumber" type="text" class="w-full border">
                        </div>
                    </div>
                </div>

            </div>
        </form>
        </section>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedApprehension: '', // Selected apprehension
        selectedApprehensionType: '', // Selected liquor type
        selectedAntiSmokingType: '', // Selected anti-smoking type
        cigaretteClassification: '', // Input field value for classification of cigarettes
        apprehensions: [
          { label: 'Sobriety', value: 'sobriety' },
          { label: 'Liquor', value: 'liquor' },
          { label: 'Anti-Smoking', value: 'antismoking' }
        ],
        apprehensionTypes: [
          { label: 'Individual', value: 'individual' },
          { label: 'Establishment', value: 'establishment' },
          { label: 'Public Conveyances', value: 'publicConveyances' }
        ],
      };
    },

    setup () {
        violator =
            {
            firstname: '',
            middlename: '',
            lastname: '',
            sex: '',
            address: '',
            bday: '',
            suffix: '',
            occupation: '',
            dqrcode: '',
            };
      
        establishment = 
            {
            name: '',
            address: '',
            registeredOwner: '',
            permit: '',
            type: '',
            remarks: '',
            },
      
        public_conveyances =
            {
            drivername: '',
            apprehensionPlace: '',
            licenseNumber: '',
            plateNumber: '',
            registeredOwner: '',
            ownerAddress: '',
            };

        return {
            violator,
            establishment,
            public_conveyances,
            }
    }
  };
  </script>
  