package ru.crm.taxi.conversion;

import ru.crm.taxi.dto.UserDto;
import ru.crm.taxi.model.User;

public class UserDtoToUserConverter {
    private static volatile UserDtoToUserConverter instance;

    public static UserDtoToUserConverter getInstance() {
        UserDtoToUserConverter localInstance = instance;
        if (localInstance == null) {
            synchronized (UserDtoToUserConverter.class) {
                localInstance = instance;
                if (localInstance == null) {
                    instance = localInstance = new UserDtoToUserConverter();
                }
            }
        }
        return localInstance;
    }

    public User.Builder convert(String hashPassword, UserDto userDto, User.Builder builder) {
        return builder
                .firstName(userDto.getFirstName())
                .middleName(userDto.getMiddleName())
                .secondName(userDto.getSecondName())
                .phoneNumber(userDto.getPhoneNumber())
                .hashPassword(hashPassword);
    }
}
