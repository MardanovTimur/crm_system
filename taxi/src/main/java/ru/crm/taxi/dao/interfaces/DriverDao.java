package ru.crm.taxi.dao.interfaces;

import ru.crm.taxi.model.Driver;

import java.util.List;

public interface DriverDao {

    void saveDriver(Driver driver);

    void updateDriver(Driver driver);

    void updateDriver(Driver driver, long id);

    void deleteDriver(long id);

    Driver getDriverById(long id);

    List<Driver> getAllDrivers();
}
