<template>
    <!-- component -->

    <select v-model="selectedForm" class="p-2 my-3">
      <option value="" disabled selected>Select Apprehension</option>
      <option value="violator">Sobriety</option>
      <option value="establishment">Liquor</option>
      <option value="publicConveyances">Anti-Smoking</option>
    </select>
    <div class="bg-white">
      <!-- Dropdown to select form -->
      
      <!-- Display selected form -->
      <div v-if="selectedForm === 'violator'">
        <!-- Violator Form -->
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
                <input  type="text" name="name" id="name" class="w-full border">
            </div>
         
        </div>
        <div class="border border-black border-t-0 ">
            <div class="m-3">
                <label for="course" class="block">MIDDLE NAME</label>
                <input  type="text" name="course" id="course" class="w-full border">
            </div>
        </div>
        <div class="border-b border-black">
            <div class="m-3">
                <label for="year" class="block">LAST NAME<span class="text-red-600">*</span></label>
                <input  type="text" name="year" id="year" class="w-full border">
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
                <input  type="text" name="name" id="name" class="w-full border">
            </div>
             <div>
                <label for="name" class="block">SEX<span class="text-red-600">*</span></label>
                <input  type="text" name="name" id="name" class="w-full border">
             </div>
            </div>
         </div>
        </div>
        
    
        <div class="border border-black border-t-0">
            <div class="m-3">
                <label class="block">BIRTHDATE</label>
                <input type="date" class="w-full border">
            </div>
        </div>

        <div class="border-b border-black">
            <div class="m-3">
                <label class="block">DQRCODE<span class="text-red-600">*</span></label>
                <input type="text"class="w-full border">
            </div>   
        </div>
      </div>

    <!--third row-->
      <div class="grid grid-cols-3">
        
        <div class="border border-black border-t-0 border-x-0">
            <div class="m-3">
                <label class="block">OCCUPATION</label>
                <input type="text" class="w-full border">
            </div>
        </div>
        
    
        <div class="border border-black border-t-0 border-r-0 col-span-2">
            <div class="m-3">
                <label class="block">ADDRESS</label>
                <input type="text" class="w-full border">
            </div>
        </div>


      </div>
    </div>
    </form>
        </section>
      </div>


      <div v-else-if="selectedForm === 'establishment'">
        <!-- Establishment Form -->
        <section>
           <form>
            <h1 class="font-bold p-4">Establishment</h1>
            <hr class="border-t-2 border-black">
            <div class="grid grid-rows-4">

                <!-- First row -->
                <div class="grid grid-cols-3">
                    <div class="border-b border-black col-span-2">
                        <div class="m-3">
                            <label for="name" class="block">NAME OF ESTABLISHMENT<span class="text-red-600">*</span></label>
                            <input type="text" name="name" id="name" class="w-full border">
                        </div>
                    </div>
                    <div class="border border-black border-t-0 border-r-0">
                        <div class="m-3">
                            <label for="course" class="block">TYPE OF ESTABLISHMENT</label>
                            <input type="text" name="course" id="course" class="w-full border">
                        </div>
                    </div>
                </div>

                <!-- Second row -->
                <div class="grid grid-cols-3">
                    <div class="border border-black border-t-0 border-l-0">
                        <div class="m-3">
                            <label class="block">REGISTERED OWNER</label>
                            <input type="text" class="w-full border">
                        </div>
                    </div>
                    <div class="border-b border-black">
                        <div class="m-3">
                            <label class="block">ADDRESS<span class="text-red-600">*</span></label>
                            <input type="text" class="w-full border">
                        </div>
                    </div>
                    <div class="border border-black border-t-0 border-r-0">
                        <div class="m-3">
                            <label class="block">BUSINESS PERMIT NO.</label>
                            <input type="text" class="w-full border">
                        </div>
                    </div>
                </div>

                <!-- Third row -->
                <div class="grid grid-cols-3 row-span-2">
                    <div class="border border-black border-t-0 border-x-0 col-span-3">
                        <div class="m-3">
                            <label class="block">REMARKS</label>
                            <textarea class="border w-full h-32 p-1 resize-none"></textarea> <!-- Adjusted padding and added fixed height -->
                        </div>
                    </div>
                </div>

            </div>
        </form>
        </section>
      </div>

      
      <div v-else-if="selectedForm === 'publicConveyances'">
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
                            <input type="text" name="name" id="name" class="w-full border">
                        </div>
                    </div>
                    <div class="border border-black border-t-0 border-r-0 col-span-2">
                        <div class="m-3">
                            <label for="course" class="block">PLACE OF APPREHENSION</label>
                            <input type="text" name="course" id="course" class="w-full border">
                        </div>
                    </div>
                </div>

                <!-- Second row -->
                <div class="grid grid-cols-2">
                    <div class="border border-black border-t-0 border-l-0">
                        <div class="m-3">
                            <label class="block">REGISTERED OWNER</label>
                            <input type="text" class="w-full border">
                        </div>
                    </div>
                    <div class="border-b border-black">
                        <div class="m-3">
                            <label class="block">OWNER'S ADDRESS<span class="text-red-600">*</span></label>
                            <input type="text" class="w-full border">
                        </div>
                    </div>
                </div>

                <!-- Third row -->
                <div class="grid grid-cols-2">

                    <div class="border border-black border-t-0 border-l-0">
                        <div class="m-3">
                            <label class="block">PLATE NO.</label>
                            <input type="text" class="w-full border">
                        </div>
                    </div>

                    <div class="border border-black border-t-0 border-x-0">
                        <div class="m-3">
                            <label class="block">LICENSE NO.</label>
                            <input type="text" class="w-full border">
                        </div>
                    </div>
                </div>

            </div>
            <button type="submit" class="my-4 float-right text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
        </form>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedForm: '' // Default form to display
      };
    }
  };
  </script>