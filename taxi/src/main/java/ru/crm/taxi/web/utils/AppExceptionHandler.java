package ru.crm.taxi.web.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.crm.taxi.exception.IncorrectDataException;
import ru.crm.taxi.web.controller.UserController;

@RestController
@ControllerAdvice
public class AppExceptionHandler {

    @ExceptionHandler(value = IncorrectDataException.class)
    public ResponseEntity<JsonResponse> handleException(IncorrectDataException e) {
        return new ResponseEntity<JsonResponse>(new JsonResponse(e.getFieldName(), e.getMessage()),
                HttpStatus.BAD_REQUEST);
    }
}
