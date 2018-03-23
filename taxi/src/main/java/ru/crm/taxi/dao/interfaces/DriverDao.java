package ru.crm.taxi.dao.interfaces;

import ru.crm.taxi.model.Driver;

import java.util.List;

public interface DriverDao {

    void saveDriver(Driver driver);

    Driver updateDriver(Driver driver);

    void deleteDriver(long id);

    Driver getDriverById(long id);

    Driver getDriverByPhone(String phone);

    Driver getDriverByToken(String token);

    List<Driver> getAllDrivers();
}
