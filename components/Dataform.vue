<template>
    <div class="bg-white">
      <!-- component -->
      <div class="bg-white p-4 rounded-md shadow-md">
        <!-- First dropdown to select apprehension -->
        <div class="flex flex-col sm:flex-row items-center mt-2">
          <select v-model="selectedApprehension" class="p-2 border rounded-md mb-3 sm:mb-0 sm:mr-3">
            <option value="" disabled selected>Select Apprehension</option>
            <option v-for="apprehension in apprehensions" :key="apprehension.value" :value="apprehension.value" class="p-2">{{ apprehension.label }}</option>
          </select>
  
          <div v-if="selectedApprehension === 'Anti-Smoking'">
  <!-- Dropdown for Liquor or Anti-Smoking Type -->
  <select v-model="selectedApprehensionType" class="p-2 border rounded-md mb-3 sm:mb-0 sm:mr-3">
    <option value="" disabled selected>Select Type</option>
    <option v-for="type in apprehensionTypes" :key="type.value" :value="type.value" class="p-2">{{ type.label }}</option>
    <option value="publicConveyances">Public Conveyances</option>
  </select>

  <select v-if="selectedApprehension === 'Anti-Smoking'" v-model="cigaretteClassification" class="p-2 border rounded-md">
    <option value="" disabled selected>Classify Cigarettes...</option>
    <option value="E-cigarettes">E-Cigarettes</option>
    <option value="Tobacco">Tobacco</option>
  </select>
</div>
<select v-else-if="selectedApprehension === 'Liquor'" v-model="selectedApprehensionType" class="p-2 border rounded-md">
    <option value="" disabled selected>Select Type</option>
    <option v-for="type in apprehensionTypes" :key="type.value" :value="type.value" class="p-2">{{ type.label }}</option>
  </select> 
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
    <div class="grid grid-cols-2">
                <div class="border-b border-black">
                  <div class="m-3">
                    <label for="officer" class="block">Apprehending Officer</label>
                    <input v-model="violator.apprehending_officer" type="text" id="officer" class="w-full border" />
                  </div>
                </div>
                <div class="border-l border-black">
                  <div class="m-3">
                    <label for="station" class="block">Police Station</label>
                    <input v-model="violator.police_station" type="text" id="station" class="w-full border" />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class=" border-b border-black">
                  <div class="m-3">
                    <label for="encoded_by" class="block">Encoded By</label>
                    <input v-model="violator.encoded_by" type="text" id="encoded_by" class="w-full border" />
                  </div>
                </div>
                <div class="border border-b border-r-0 border-black">
                  <div class="m-3">
                    <label for="encoded_by" class="block">Date of Apprehension</label>
                    <input v-model="violator.date_apprehended" type="date" id="date_apprehended" class="w-full border" />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 row-span-2">
                    <div class="border border-black border-t-0 border-x-0 col-span-3">
                        <div class="m-3">
                            <label class="block">REMARKS</label>
                            <textarea v-model="violator.remarks" class="border w-full h-32 p-1 resize-none"></textarea> 
                        </div>
                    </div>
                </div>
    <div class="mt-4">
  <h2 class="font-bold">Uploaded Images:</h2>
  <ul>
    <li v-for="(imageName, index) in uploadedImageNames" :key="index" class="mt-2">
  {{ imageName }}
  <button class="mx-6" @click="deleteImage(index)">
    <Icon name="material-symbols:cancel-outline" style="width: 20px; height: 20px; color: red;" />
  </button>
  
</li>
  </ul>
</div>
    <div class="flex justify-end p-4">
      <div>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        multiple
        @change="handleFileUpload"
      />
      <button
  type="button"
  class="bg-white border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mr-3 rounded"
  @click.prevent="$refs.fileInput.click()"
>
<Icon name="material-symbols:add-photo-alternate-outline" style="width: 20px; height: 20px;" /> Upload Images
</button>
    </div>
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

                <div class="grid grid-cols-2">
                <div class="border-b border-black">
                  <div class="m-3">
                    <label for="officer" class="block">Apprehending Officer</label>
                    <input v-model="establishment.apprehending_officer" type="text" id="officer" class="w-full border" />
                  </div>
                </div>
                <div class="border-l border-black">
                  <div class="m-3">
                    <label for="station" class="block">Police Station</label>
                    <input v-model="establishment.police_station" type="text" id="station" class="w-full border" />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class=" border-b border-black">
                  <div class="m-3">
                    <label for="encoded_by" class="block">Encoded By</label>
                    <input v-model="establishment.encoded_by" type="text" id="encoded_by" class="w-full border" />
                  </div>
                </div>
                <div class="border border-b border-r-0 border-black">
                  <div class="m-3">
                    <label for="encoded_by" class="block">Date of Apprehension</label>
                    <input v-model="establishment.date_apprehended" type="date" id="date_apprehended" class="w-full border" />
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
              <Upload />
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
        <div class="grid grid-cols-2">
                <div class="border-b border-black">
                  <div class="m-3">
                    <label for="officer" class="block">Apprehending Officer</label>
                    <input v-model="public_conveyances.apprehending_officer" type="text" id="officer" class="w-full border" />
                  </div>
                </div>
                <div class="border-l border-black">
                  <div class="m-3">
                    <label for="station" class="block">Police Station</label>
                    <input v-model="public_conveyances.police_station" type="text" id="station" class="w-full border" />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class=" border-b border-black">
                  <div class="m-3">
                    <label for="encoded_by" class="block">Encoded By</label>
                    <input v-model="public_conveyances.encoded_by" type="text" id="encoded_by" class="w-full border" />
                  </div>
                </div>
                <div class="border border-r-0 border-black">
                  <div class="m-3">
                    <label for="encoded_by" class="block">Date of Apprehension</label>
                    <input v-model="public_conveyances.date_apprehended" type="date" id="date_apprehended" class="w-full" />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3 row-span-2">
                    <div class="border border-black border-t-0 border-x-0 col-span-3">
                        <div class="m-3">
                            <label class="block">REMARKS</label>
                            <textarea v-model="public_conveyances.remarks" class="border w-full h-32 p-1 resize-none"></textarea> 
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
       pdfDataUrl: null,
       uploadedImageNames: [],
       uploadedImages: [],
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
         remarks: '',
         cigarette_type: '',
         apprehending_officer: '',
         police_station: '',
         encoded_by: '',
         date_apprehended: '',
         payment_status: '',
         
       },
       establishment: {
         name: '',
         address: '',
         registered_owner: '',
         permit: '',
         establishment_type: '',
         remarks: '',
         apprehension_type: '',
         cigarette_type: '',
         apprehending_officer: '',
         police_station: '',
         encoded_by: '',
         date_apprehended: '',
         payment_status: '',
       },
       public_conveyances: {
         driver_name: '',
         apprehension_place: '',
         license_no: '',
         plate_no: '',
         registered_owner: '',
         owner_address: '',
         apprehension_type: '',
         cigarette_type: '',
         remarks: '',
         apprehending_officer: '',
         police_station: '',
         encoded_by: '',
         date_apprehended: '',
         payment_status: '',
       },
       nameSuffixes: ['Jr.', 'Sr.', 'II', 'III', 'IV'],
       selectedDistrict: '', // Selected district
       selectedBarangay: '', // Selected barangay
       barangay: [], // Array to store all barangays
       filteredBarangays: [] // Array to store filtered barangays based on district
     };
   },
   async mounted() {
    await this.fetchBarangay();
  },
   methods: {

    deleteImage(index) {
    // Remove the corresponding image name from the uploadedImageNames array
    this.uploadedImageNames.splice(index, 1);
    // Remove the corresponding image file from the uploadedImages array
    this.uploadedImages.splice(index, 1);
  },
    handleFileUpload(event) {
    const files = event.target.files;
    const images = [];
    const imageNames = [];

    // Function to generate PDF once all images are loaded
    // const generatePDF = () => {
    //   const pdf = new jsPDF();

    //   // Create a canvas for each image and add it to the PDF
    //   images.forEach((image, index) => {
    //     const img = new Image();
    //     img.src = image;
    //     img.onload = () => {
    //       const pdfWidth = pdf.internal.pageSize.getWidth();
    //       const pdfHeight = pdf.internal.pageSize.getHeight();
    //       const imgWidth = img.width;
    //       const imgHeight = img.height;

    //       // Calculate the aspect ratio to fit the image within the PDF page
    //       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    //       const newWidth = imgWidth * ratio;
    //       const newHeight = imgHeight * ratio;

    //       // Add the image to the PDF without resizing
    //       pdf.addImage(image, 'JPEG', (pdfWidth - newWidth) / 2, (pdfHeight - newHeight) / 2, newWidth, newHeight);

    //       if (index < images.length - 1) {
    //         pdf.addPage();
    //       }

    //       if (index === images.length - 1) {
    //         // Once all images are added, save the PDF as Data URL
    //         this.pdfDataUrl = pdf.output('datauristring');
    //       }
    //     };
    //   });
    // };

    // Read each uploaded file as Data URL
    for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      // Push the image file and name into the corresponding arrays
      this.uploadedImages.push(files[i]);
      this.uploadedImageNames.push(files[i].name);
    };
    reader.readAsDataURL(files[i]);
  }
  },
      // downloadPDF() {
      //   const link = document.createElement('a');
      //   link.href = this.pdfDataUrl;
      //   link.download = 'images.pdf';
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      // },
    filterBarangaysByDistrict() {
        // Filter the barangays based on the selected district
        this.filteredBarangays = this.barangay.filter(barangay => barangay.district == this.selectedDistrict);
        // Reset the selected barangay when the district changes
        this.selectedBarangay = '';
    },
    async submitViolator() {
    try {
      // Your form submission logic here
      this.violator.apprehension_type = this.selectedApprehension;
    this.violator.cigarette_type = this.cigaretteClassification;


    // Your form submission logic here
    const response = await axios.post('http://localhost:8000/api/violator', this.violator);
    console.log('Response:', response.data);

    // Reset form fields after successful submission
    this.resetViolatorForm();


      alert('Violator data submitted successfully!');
    } catch (error) {
      console.error('Error submitting violator data:', error.response ? error.response.data.message : error.message);
      alert('Error submitting violator data. Please try again.');
    }
  },
async submitEstablishment() {
    try { 
      this.establishment.apprehension_type = this.selectedApprehension;
      this.establishment.cigarette_type = this.cigaretteClassification;
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
      this.public_conveyances.apprehension_type = this.selectedApprehension;
      this.public_conveyances.cigarette_type = this.cigaretteClassification;
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
        this.barangay = response.data;
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
         referenceid: '',
         remarks: '',
         cigarette_type: '',
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
         remarks: '',
         cigarette_type: '',
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
         ownerAddress: '',
         remarks: '',
         cigarette_type: '',
       };
     }
   }
 };
 </script>