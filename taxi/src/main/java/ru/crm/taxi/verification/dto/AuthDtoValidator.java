package ru.crm.taxi.verification.dto;

import ru.crm.taxi.exception.IncorrectDataException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AuthDtoValidator {
    private static volatile AuthDtoValidator instance;

    public static AuthDtoValidator getInstance() {
        AuthDtoValidator localInstance = instance;
        if (localInstance == null) {
            synchronized (AuthDtoValidator.class) {
                localInstance = instance;
                if (localInstance == null) {
                    instance = localInstance = new AuthDtoValidator();
                }
            }
        }
        return localInstance;
    }

    public void verifyPhone(String phone) {
        Pattern pattern = Pattern.compile("[0-9]{11}");
        Matcher matcher = pattern.matcher(phone);
        if (!(phone != null && matcher.matches())) {
            throw new IncorrectDataException("phone", "Incorrect phone");
        }
    }

    public void verifyPassword(String password) {
        Pattern pattern = Pattern.compile("[A-Za-z0-9]*");
        Matcher matcher = pattern.matcher(password);
        if (!(password != null && password.length() >= 8 && password.length() <= 40 && matcher.matches())) {
            throw new IncorrectDataException("password", "Incorrect password");
        }
    }
}
