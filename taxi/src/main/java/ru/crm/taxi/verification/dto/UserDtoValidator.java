package ru.crm.taxi.verification.dto;

import ru.crm.taxi.dto.UserDto;
import ru.crm.taxi.exception.IncorrectDataException;

public class UserDtoValidator {
    private static volatile UserDtoValidator instance;

    public static UserDtoValidator getInstance() {
        UserDtoValidator localInstance = instance;
        if (localInstance == null) {
            synchronized (UserDtoValidator.class) {
                localInstance = instance;
                if (localInstance == null) {
                    instance = localInstance = new UserDtoValidator();
                }
            }
        }
        return localInstance;
    }

    public void verify(UserDto userDto) {
        AuthDtoValidator.getInstance().verifyPhone(userDto.getPhoneNumber());
        AuthDtoValidator.getInstance().verifyPassword(userDto.getPassword());
        if (!(userDto.getFirstName() != null && userDto.getFirstName().length() != 0)) {
            throw new IncorrectDataException("firstName", "Incorrect first name");
        }
        if (!(userDto.getSecondName() != null && userDto.getSecondName().length() != 0)) {
            throw new IncorrectDataException("secondName", "Incorrect second name");
        }
    }
}
