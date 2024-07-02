package com.practo.service;

import com.practo.entity.Appointment;
import com.practo.exception.AppointmentNotFoundException;
import com.practo.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException(id));
    }

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Long id, Appointment appointmentDetails) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException(id));

        appointment.setPatientName(appointmentDetails.getPatientName());
        appointment.setDoctorName(appointmentDetails.getDoctorName());
        appointment.setAppointmentTime(appointmentDetails.getAppointmentTime());

        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException(id));
        appointmentRepository.delete(appointment);
    }
    public List<Appointment> searchAppointmentsByPatientName(String patientName) {
        return appointmentRepository.findByPatientNameContainingIgnoreCase(patientName);
    }

    public List<Appointment> getAppointmentsBetween(LocalDateTime startTime, LocalDateTime endTime) {
        return appointmentRepository.findByAppointmentTimeBetween(startTime, endTime);
    }

}
