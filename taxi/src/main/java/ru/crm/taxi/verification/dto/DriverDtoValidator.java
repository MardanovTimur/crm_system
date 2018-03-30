package ru.crm.taxi.verification.dto;

import ru.crm.taxi.dto.DriverDto;
import ru.crm.taxi.exception.IncorrectDataException;

import java.sql.Date;
import java.util.Calendar;

public class DriverDtoValidator {
    private static volatile DriverDtoValidator instance;

    public static DriverDtoValidator getInstance() {
        DriverDtoValidator localInstance = instance;
        if (localInstance == null) {
            synchronized (DriverDtoValidator.class) {
                localInstance = instance;
                if (localInstance == null) {
                    instance = localInstance = new DriverDtoValidator();
                }
            }
        }
        return localInstance;
    }

    public void verify(DriverDto driverDto) {
        AuthDtoValidator.getInstance().verifyPhone(driverDto.getPhoneNumber());
        AuthDtoValidator.getInstance().verifyPassword(driverDto.getPassword());
        if (!(driverDto.getFirstName() != null && driverDto.getFirstName().length() != 0)) {
            throw new IncorrectDataException("firstName", "Incorrect first name");
        }
        if (!(driverDto.getSecondName() != null && driverDto.getSecondName().length() != 0)) {
            throw new IncorrectDataException("secondName", "Incorrect second name");
        }
        if (!(driverDto.getAutoModel() != null && driverDto.getAutoModel().length() != 0)) {
            throw new IncorrectDataException("autoModel", "Incorrect auto model");
        }
        if (!(driverDto.getAutoNumber() != null && driverDto.getAutoNumber().length() != 0)) {
            throw new IncorrectDataException("autoNumber", "Incorrect auto number");
        }
        if (!(driverDto.getAutoColour() != null && driverDto.getAutoColour().length() != 0)) {
            throw new IncorrectDataException("autoColour", "Incorrect auto colour");
        }
        if (!(driverDto.getAutoYear() != null
                && driverDto.getAutoYear().before(new Date(Calendar.getInstance().getTime().getTime())))) {
            throw new IncorrectDataException("autoYear", "Incorrect auto year");
        }
    }
}
