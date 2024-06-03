<template>
  <div class="flex">
    <!-- Form -->
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h1 class="font-semibold mb-4 text-lg">Reports</h1>
      <form @submit.prevent="generateReport">
        <div class="mb-4">
          <label for="apprehension" class="block text-sm font-medium text-gray-700">Apprehension</label>
          <select v-model="reportForm.violation" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
            <option value="" disabled>Select Apprehension</option>
            <option value="Sobriety">Sobriety</option>
            <option value="Liquor">Liquor</option>
            <option value="Anti-Smoking">Anti-Smoking</option>
            <option value="All">All</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="apprehensionType" class="block text-sm font-medium text-gray-700">Apprehension Type</label>
          <select v-model="reportForm.apprehensionType" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
            <option value="Individuals">Individual</option>
            <option value="Establishments">Establishment</option>
            <option value="Public Conveyances">Public Conveyances</option>
            <option value="All">All</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
          <input type="date" id="startDate" v-model="reportForm.startDateQuery" required class="mt-1 p-2 w-full border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
          <input type="date" id="endDate" v-model="reportForm.endDateQuery" required class="mt-1 p-2 w-full border border-gray-300 rounded-md">
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800">Generate Report</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  data() {
    return {
      reportForm: {
        violation: '',
        apprehensionType: '',
        startDateQuery: '',
        endDateQuery: '',
      },
      reportData: [], // Store the generated report data
    };
  },

  methods: {
    async generateReport() {
  try {
    // Make API request using reportForm values as query parameters
    const response = await axios.get('http://localhost:8000/api/generate_report', {
      params: this.reportForm,
    });

    // Assuming response.data contains the generated report data
    this.reportData = response.data;
    console.log(this.reportData);

    // Generate PDF
    const doc = new jsPDF({ orientation: 'landscape' });
    const pageWidth = doc.internal.pageSize.getWidth();

    // Titles and period
    const titles = [
      'Republic of the Philippines',
      'City of Davao',
      'Vices Regulation Unit',
      'LIST OF VIOLATORS',
    ];

    // Convert start date and end date to readable format
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Options for date formatting
    const startDate = new Date(this.reportForm.startDateQuery);
    const endDate = new Date(this.reportForm.endDateQuery);
    const startDateString = startDate.toLocaleDateString('en-US', options);
    const endDateString = endDate.toLocaleDateString('en-US', options);
    const period = `FOR THE PERIOD ${startDateString} - ${endDateString}`;

    // Center text function
    const centerText = (text, y, fontSize = 12, fontStyle = 'normal') => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, fontStyle);
      const textWidth = doc.getTextWidth(text);
      const textOffset = (pageWidth - textWidth) / 2;
      doc.text(text, textOffset, y);
    };
    // Center the titles
    centerText(titles[0], 10, 16, 'bold');
    centerText(titles[1], 17, 14);
    centerText(titles[2], 24, 12, 'italic');
    centerText(titles[3], 40, 12, 'bold');
    // Center the period text
    centerText(period, 50);

    // Table headers
    const head = [['Apprehension', 'Violator Name', 'Address', 'Apprehending Officer', 'Police Station', 'Date of Apprehension', 'Encoded By', 'Date Encoded', 'Remarks']];
    
    // Table body
    const body = this.reportData.map(item => {
      let violatorName;
      let address;
      const createdAt = new Date(item.created_at).toLocaleDateString('en-US', options);
      const apprehension_date = new Date(item.date_apprehended).toLocaleDateString('en-US', options);
      if (item.type === 'Establishments') {
        violatorName = item.name;
        address = item.address;
      } else if (item.type === 'Public Conveyances') {
        violatorName = `${item.driver_firstname} ${item.driver_middlename ? item.driver_middlename : ''} ${item.driver_lastname}`;
        address = item.apprehension_place;
      } else {
        violatorName = `${item.firstname} ${item.middlename ? item.middlename : ''} ${item.lastname}`;
        address = item.address;
      }

      return [
        item.type,
        violatorName,
        address,
        item.apprehending_officer,
        item.police_station,
        apprehension_date,
        item.encoded_by,
        createdAt,
        item.remarks || 'N/A',
      ];
    });

    // Generate the table
    doc.autoTable({
      head,
      body,
      startY: 60,
    });

    // Convert PDF to Blob and create an object URL
    const pdfBlob = doc.output('blob');
    this.pdfUrl = URL.createObjectURL(pdfBlob);

    // Open PDF in a new tab to prompt printing
    window.open(this.pdfUrl, '_blank');

  } catch (error) {
    console.error('Error generating report:', error);
  }
}


  },
};
</script>