package ru.crm.taxi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.crm.taxi.dao.interfaces.UserDao;
import ru.crm.taxi.dto.AuthDto;
import ru.crm.taxi.dto.OrderDto;
import ru.crm.taxi.dto.UserDto;
import ru.crm.taxi.model.Order;
import ru.crm.taxi.model.User;
import ru.crm.taxi.service.interfaces.UserService;
import ru.crm.taxi.service.utils.generators.HashGenerator;
import ru.crm.taxi.service.utils.generators.TokenGenerator;
import ru.crm.taxi.verification.Verification;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;
    @Autowired
    Verification verification;
    @Autowired
    TokenGenerator tokenGenerator;
    @Autowired
    HashGenerator hashGenerator;

    @Override
    public String register(UserDto userDto) {
        //TODO: добавить верификацию полей
        verification.verifyPhoneUnique(userDto.getPhoneNumber());
        User user = new User.Builder()
                .firstName(userDto.getFirstName())
                .secondName(userDto.getSecondName())
                .middleName(userDto.getMiddleName())
                .hashPassword(hashGenerator.encode(userDto.getPassword()))
                .authToken(tokenGenerator.generateToken())
                .phoneNumber(userDto.getPhoneNumber())
                .build();
        userDao.saveUser(user);
        return user.getAuthToken();
    }

    @Override
    public String login(AuthDto authDto) {
        return null;
    }

    @Override
    public User updateInfo(String token, User user) {
        return null;
    }

    @Override
    public Order addOrder(String token, OrderDto orderDto) {
        return null;
    }

    @Override
    public Order getCurrentOrder(String token) {
        return null;
    }

    @Override
    public Order getOrder(String token, long orderId) {
        return null;
    }

    @Override
    public List<Order> getUserOrders(String token, long from, long count) {
        return null;
    }

    @Override
    public User deleteCurrentOrder(String token) {
        return null;
    }

    @Override
    public User addOrderDriverRating(String token, int rating) {
        return null;
    }
}
