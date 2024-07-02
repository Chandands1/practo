// src/main/resources/static/js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const createForm = document.getElementById('createForm');
    const searchForm = document.getElementById('searchForm');
    const appointmentsTable = document.getElementById('appointmentsTable');

    createForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(createForm);
        const data = {
            patientName: formData.get('patientName'),
            doctorName: formData.get('doctorName'),
            appointmentTime: formData.get('appointmentTime')
        };

        const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Appointment created successfully');
            loadAppointments();
        } else {
            alert('Failed to create appointment');
        }
    });

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const patientName = document.getElementById('searchPatientName').value;
        loadAppointments(patientName);
    });

    async function loadAppointments(patientName = '') {
        const response = await fetch(`/api/appointments/search?patientName=${patientName}`);
        const appointments = await response.json();
        appointmentsTable.innerHTML = '';
        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.id}</td>
                <td>${appointment.patientName}</td>
                <td>${appointment.doctorName}</td>
                <td>${appointment.appointmentTime}</td>
                <td>
                    <button onclick="deleteAppointment(${appointment.id})">Delete</button>
                </td>
            `;
            appointmentsTable.appendChild(row);
        });
    }

    async function deleteAppointment(id) {
        const response = await fetch(`/api/appointments/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Appointment deleted successfully');
            loadAppointments();
        } else {
            alert('Failed to delete appointment');
        }
    }

    window.deleteAppointment = deleteAppointment;
    loadAppointments();
});
