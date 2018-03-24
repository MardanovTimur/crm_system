package ru.crm.taxi.verification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.crm.taxi.dao.interfaces.UserDao;
import ru.crm.taxi.exception.IncorrectDataException;

@Component
public class Verification {

    @Autowired
    UserDao userDao;

    public void verifyUserExistenceById(long id) {
        if (!userDao.userExistenceById(id)) {
            throw new IncorrectDataException("User with this id not found");
        }
    }

    public void verifyUserExistenceByPhone(String phone){
        if (!userDao.userExistenceByPhone(phone)) {
            throw new IncorrectDataException("User with this phone not found");
        }
    }

    public void verifyUserExistenceByToken(String token){
        if (!userDao.userExistenceByToken(token)) {
            throw new IncorrectDataException("User with this token not found");
        }
    }

    public void verifyPhoneUnique(String phone) {
        if (userDao.userExistenceByPhone(phone)) {
            throw new IncorrectDataException("Phone is already exist");
        }
    }
}
