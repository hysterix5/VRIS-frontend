<template>
    <div>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        multiple
        @change="handleFileUpload"
      />
      <button
        class="bg-gray-50 border border-gray-600 text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-lg rounded-lg text-sm md:text-xs px-4 py-2 text-center"
        @click="$refs.fileInput.click()"
      >
        Upload
      </button>
      <button
        v-if="pdfDataUrl"
        class="bg-gray-50 border border-gray-600 text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-lg rounded-lg text-sm md:text-xs px-4 py-2 text-center mt-4"
        @click="downloadPDF"
      >
        Download PDF
      </button>
    </div>
  </template>
  
  <script>
  import jsPDF from 'jspdf';
  
  export default {
    data() {
      return {
        pdfDataUrl: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        const files = event.target.files;
        const images = [];
  
        // Function to generate PDF once all images are loaded
        const generatePDF = () => {
          const pdf = new jsPDF();
  
          // Create a canvas for each image and add it to the PDF
          images.forEach((image, index) => {
            const img = new Image();
            img.src = image;
            img.onload = () => {
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();
              const imgWidth = img.width;
              const imgHeight = img.height;
  
              // Calculate the aspect ratio to fit the image within the PDF page
              const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
              const newWidth = imgWidth * ratio;
              const newHeight = imgHeight * ratio;
  
              // Add the image to the PDF without resizing
              pdf.addImage(image, 'JPEG', (pdfWidth - newWidth) / 2, (pdfHeight - newHeight) / 2, newWidth, newHeight);
  
              if (index < images.length - 1) {
                pdf.addPage();
              }
  
              if (index === images.length - 1) {
                // Once all images are added, save the PDF as Data URL
                this.pdfDataUrl = pdf.output('datauristring');
              }
            };
          });
        };
  
        // Read each uploaded file as Data URL
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            images.push(e.target.result);
            if (images.length === files.length) {
              // Once all images are loaded, generate PDF
              generatePDF();
            }
          };
          reader.readAsDataURL(files[i]);
        }
      },
      downloadPDF() {
        const link = document.createElement('a');
        link.href = this.pdfDataUrl;
        link.download = 'images.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    },
  };
  </script>
  