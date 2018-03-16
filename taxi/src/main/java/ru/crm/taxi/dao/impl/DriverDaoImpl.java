package ru.crm.taxi.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import ru.crm.taxi.dao.config.HibernateConnectionFactory;
import ru.crm.taxi.dao.interfaces.DriverDao;
import ru.crm.taxi.model.Driver;

import java.util.List;

public class DriverDaoImpl implements DriverDao {

    @Override
    public void saveDriver(Driver driver) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.save(driver);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void updateDriver(Driver driver) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.update(driver);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void updateDriver(Driver driver, long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.update(driver);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void deleteDriver(long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        Criteria criteria = session.createCriteria(Driver.class)
                .add(Restrictions.eq("dr_id", id));
        Driver driver = (Driver) criteria.uniqueResult();
        session.delete(driver);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public Driver getDriverById(long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        Criteria criteria = session.createCriteria(Driver.class)
                .add(Restrictions.eq("dr_id", id));
        Driver driver = (Driver) criteria.uniqueResult();
        session.getTransaction().commit();
        session.close();
        return driver;
    }

    @Override
    public List<Driver> getAllDrivers() {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        List<Driver> drivers = session.createCriteria(Driver.class).list();
        session.getTransaction().commit();
        session.close();
        return drivers;
    }
}
