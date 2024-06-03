<template>
    <div class="flex bg-white">
        <div class="m-4" v-if="!showAddForm">
            <button @click="toggleForm" class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800">
                Add Citation Tickets
            </button>
            <div class="mt-6">
                <h1 class="mb-3 font-bold">Tickets Inventory</h1>
                <table class="table-auto">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th class="px-4 py-2">ID</th>
                            <th class="px-4 py-2">No. of Pads issued</th>
                            <th class="px-4 py-2">No. of Tickets per Pad</th>
                            <th class="px-4 py-2">Start No. of Ticket</th>
                            <th class="px-4 py-2">End No. of Ticket</th>
                            <th class="px-4 py-2">Date Issued</th>
                            <th class="px-4 py-2">Issued to</th>
                            <th class="px-4 py-2">Issued by</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ticket in ticketsList" :key="ticket.id" class="border-b border-gray-200">
                            <td class="px-4 py-2 text-center">{{ ticket.id }}</td>
                            <td class="px-4 py-2 text-center">{{ ticket.pads_count }}</td>
                            <td class="px-4 py-2 text-center">{{ ticket.tickets_per_pads }}</td>
                            <td class="px-4 py-2 text-center">{{ ticket.page_from }}</td>
                            <td class="px-4 py-2 text-center">{{ ticket.page_to }}</td>
                            <td class="px-4 py-2 text-center">{{ ticket.date_issued }}</td>
                            <td class="px-4 py-2 text-center">{{ ticket.issued_to }}</td>
                            <td class="px-4 py-2 text-center">{{ ticket.issued_by }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="bg-white p-4 rounded-md shadow-md" v-if="showAddForm">
            <div class="flex">
                <div class="bg-white">
                    <h1 class="font-semibold mb-4 text-lg">Add Tickets</h1>
                    <form @submit.prevent="submitTicket">
                        <div class="mb-4">
                            <label for="pads_count" class="block text-sm font-medium text-gray-700">No. of Pads</label>
                            <input v-model="ticketForm.pads_count" type="number" id="pads_count" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
                        </div>
                        <div class="mb-4">
                            <label for="tickets_per_pads" class="block text-sm font-medium text-gray-700">No. of Tickets per Pad</label>
                            <input v-model="ticketForm.tickets_per_pads" type="number" id="tickets_per_pads" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
                        </div>
                        <div class="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label for="page_from" class="block text-sm font-medium text-gray-700">Start of Ticket No.</label>
                                <input v-model="ticketForm.page_from" type="text" id="page_from" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label for="page_to" class="block text-sm font-medium text-gray-700">End of Ticket No.</label>
                                <input v-model="ticketForm.page_to" type="text" id="page_to" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
                            </div>
                        </div>
                        <div class="mb-4">
                            <label for="date_issued" class="block text-sm font-medium text-gray-700">Date of Issuance</label>
                            <input v-model="ticketForm.date_issued" type="date" id="date_issued" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
                        </div>
                        <div class="mb-4">
                            <label for="issued_to" class="block text-sm font-medium text-gray-700">Issued to</label>
                            <input v-model="ticketForm.issued_to" type="text" id="issued_to" class="mt-1 p-2 w-full border border-gray-300 rounded-md">
                        </div>
                        <button type="submit" class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useViceStore } from '~/stores/vris-stores';

export default {
  setup() {
    const viceStore = useViceStore();
    return {
      user: viceStore.user,
    };
  },
  data() {
    return {
      showAddForm: false,
      ticketForm: {
        pads_count: '',
        tickets_per_pads: '',
        date_issued: '',
        issued_by: '',
        issued_to: '',
        page_from: '',
        page_to: '',
      },
      ticketsList: [],
    };
  },
  async mounted() {
    await this.fetchTickets();
  },
  methods: {
    toggleForm() {
      this.showAddForm = !this.showAddForm;
    },
    async submitTicket() {
      try {
        this.ticketForm.issued_by = this.user.username;
        const response = await axios.post('http://localhost:8000/api/tickets_create', this.ticketForm);
        this.resetForm();
        Swal.fire({
          title: 'Success!',
          text: 'Tickets submitted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.showAddForm = false;
        await this.fetchTickets();  // Refresh the tickets list after submission
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Error submitting tickets',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
    resetForm() {
      this.ticketForm = {
        pads_count: '',
        tickets_per_pads: '',
        date_issued: '',
        issued_by: '',
        issued_to: '',
        page_from: '',
        page_to: '',
      };
    },
    async fetchTickets() {
      try {
        const response = await axios.get('http://localhost:8000/api/get_tickets');
        this.ticketsList = response.data.data;
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    },
  },
};
</script>
