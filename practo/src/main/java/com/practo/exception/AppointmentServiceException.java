package com.practo.exception;

public class AppointmentServiceException extends RuntimeException {

    public AppointmentServiceException(String message) {
        super(message);
    }
}