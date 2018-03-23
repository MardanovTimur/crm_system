package ru.crm.taxi.dao.impl;

import org.springframework.stereotype.Repository;
import ru.crm.taxi.dao.interfaces.DriverDao;
import ru.crm.taxi.model.Driver;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class DriverDaoImpl implements DriverDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void saveDriver(Driver driver) {
        em.persist(driver);
    }

    @Override
    public Driver updateDriver(Driver driver) {
        Driver driverFromDB = em.merge(driver);
        return driverFromDB;
    }

    @Override
    public void deleteDriver(long id) {
        em.createQuery("delete from Driver u where u.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    @Override
    public Driver getDriverById(long id) {
        Driver driver = em.find(Driver.class, id);
        return driver;
    }

    @Override
    public Driver getDriverByPhone(String phone) {
        Driver driver = (Driver) em.createQuery("from Driver d where d.user.phoneNumber = :phone")
                .setParameter("phone", phone)
                .getSingleResult();
        return driver;
    }

    @Override
    public Driver getDriverByToken(String token) {
        Driver driver = (Driver) em.createQuery("from Driver d where d.user.authToken = :token")
                .setParameter("token", token)
                .getSingleResult();
        return driver;
    }

    @Override
    public List<Driver> getAllDrivers() {
        List<Driver> drivers = em.createQuery("from Driver")
                .getResultList();
        return drivers;
    }
}
