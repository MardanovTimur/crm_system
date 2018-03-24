package ru.crm.taxi.service.interfaces;

import ru.crm.taxi.dto.UserDto;
import ru.crm.taxi.model.User;

public interface UserService {

    String register(UserDto userDto);
}
