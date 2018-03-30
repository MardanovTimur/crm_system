package ru.crm.taxi.verification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.crm.taxi.dao.interfaces.AddressDao;
import ru.crm.taxi.dao.interfaces.DriverDao;
import ru.crm.taxi.dao.interfaces.OrderDao;
import ru.crm.taxi.dao.interfaces.UserDao;
import ru.crm.taxi.dto.AuthDto;
import ru.crm.taxi.dto.DriverDto;
import ru.crm.taxi.dto.OrderDto;
import ru.crm.taxi.dto.UserDto;
import ru.crm.taxi.exception.IncorrectDataException;
import ru.crm.taxi.verification.dto.AuthDtoValidator;
import ru.crm.taxi.verification.dto.DriverDtoValidator;
import ru.crm.taxi.verification.dto.OrderDtoValidator;
import ru.crm.taxi.verification.dto.UserDtoValidator;

@Component
public class Verification {

    @Autowired
    UserDao userDao;
    @Autowired
    OrderDao orderDao;
    @Autowired
    DriverDao driverDao;
    @Autowired
    AddressDao addressDao;

    public void verifyUserExistenceById(long id) {
        if (!userDao.userExistenceById(id)) {
            throw new IncorrectDataException("id", "User with this id not found");
        }
    }

    public void verifyUserExistenceByPhone(String phone) {
        if (!userDao.userExistenceByPhone(phone)) {
            throw new IncorrectDataException("phoneNumber", "User with this phone not found");
        }
    }

    public void verifyUserExistenceByToken(String token) {
        if (!userDao.userExistenceByToken(token)) {
            throw new IncorrectDataException("token", "User with this token not found");
        }
    }

    public void verifyPhoneUnique(String phone) {
        if (userDao.userExistenceByPhone(phone)) {
            throw new IncorrectDataException("phoneNumber", "Phone is already exist");
        }
    }

    public void verifyOrderExistenceById(long id) {
        if (!orderDao.orderExistenceById(id)) {
            throw new IncorrectDataException("id", "Order with this id not found");
        }
    }

    public void verifyDriverExistenceById(long id) {
        if (!driverDao.driverExistenceById(id)) {
            throw new IncorrectDataException("id", "Driver with this id not found");
        }
    }

    public void verifyAddressExistenceById(long id) {
        if (!addressDao.addressExistenceById(id)) {
            throw new IncorrectDataException("id", "Address with this id not found");
        }
    }

    public void verifyAuthDto(AuthDto authDto) {
        AuthDtoValidator.getInstance().verifyPhone(authDto.getPhoneNumber());
        AuthDtoValidator.getInstance().verifyPassword(authDto.getPassword());
    }

    public void verifyUserDto(UserDto userDto) {
        UserDtoValidator.getInstance().verify(userDto);
    }

    public void verifyDriverDto(DriverDto driverDto) {
        DriverDtoValidator.getInstance().verify(driverDto);
    }

    public void verifyOrderDto(OrderDto orderDto) {
        OrderDtoValidator.getInstance().verify(orderDto);
    }
}
