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
        class="bg-white border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mr-3 rounded"
        @click="$refs.fileInput.click()"
      >
      <Icon name="material-symbols:add-photo-alternate-outline" style="width: 20px; height: 20px;" /> Upload Images
      </button>
      <button
        v-if="pdfDataUrl"
        class="bg-white border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 mr-3 rounded"
        @click="downloadPDF"
      >
      <Icon name="material-symbols:picture-as-pdf-outline" style="width: 20px; height: 20px;" />
        Download Images as PDF
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
  