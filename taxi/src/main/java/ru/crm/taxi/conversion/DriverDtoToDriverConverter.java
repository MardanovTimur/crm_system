package ru.crm.taxi.conversion;

import ru.crm.taxi.dto.DriverDto;
import ru.crm.taxi.model.Driver;
import ru.crm.taxi.model.User;

public class DriverDtoToDriverConverter {
    private static volatile DriverDtoToDriverConverter instance;

    public static DriverDtoToDriverConverter getInstance() {
        DriverDtoToDriverConverter localInstance = instance;
        if (localInstance == null) {
            synchronized (DriverDtoToDriverConverter.class) {
                localInstance = instance;
                if (localInstance == null) {
                    instance = localInstance = new DriverDtoToDriverConverter();
                }
            }
        }
        return localInstance;
    }

    public Driver.Builder convert(String hashPassword, DriverDto driverDto, Driver.Builder builder) {
        User user = new User.Builder()
                .firstName(driverDto.getFirstName())
                .middleName(driverDto.getMiddleName())
                .secondName(driverDto.getSecondName())
                .phoneNumber(driverDto.getPhoneNumber())
                .hashPassword(hashPassword)
                .build();
        return builder
                .user(user)
                .autoModel(driverDto.getAutoModel())
                .autoNumber(driverDto.getAutoNumber())
                .autoColour(driverDto.getAutoColour())
                .autoYear(driverDto.getAutoYear());
    }
}
