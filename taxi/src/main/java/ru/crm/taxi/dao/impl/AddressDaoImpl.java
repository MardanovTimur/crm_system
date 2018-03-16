package ru.crm.taxi.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import ru.crm.taxi.dao.config.HibernateConnectionFactory;
import ru.crm.taxi.dao.interfaces.AddressDao;
import ru.crm.taxi.model.Address;

import java.util.List;

public class AddressDaoImpl implements AddressDao {

    @Override
    public void saveAddress(Address address) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.save(address);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void updateAddress(Address address) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.update(address);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void updateAddress(Address address, long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        session.update(address);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void deleteAddress(long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        Criteria criteria = session.createCriteria(Address.class)
                .add(Restrictions.eq("adr_id", id));
        Address address = (Address) criteria.uniqueResult();
        session.delete(address);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public Address getAddressById(long id) {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        Criteria criteria = session.createCriteria(Address.class)
                .add(Restrictions.eq("adr_id", id));
        Address address = (Address) criteria.uniqueResult();
        session.getTransaction().commit();
        session.close();
        return address;
    }

    @Override
    public List<Address> getAllAddresses() {
        Session session = HibernateConnectionFactory.getSessionFactory().openSession();
        session.beginTransaction();
        List<Address> addresses = session.createCriteria(Address.class).list();
        session.getTransaction().commit();
        session.close();
        return addresses;
    }
}
