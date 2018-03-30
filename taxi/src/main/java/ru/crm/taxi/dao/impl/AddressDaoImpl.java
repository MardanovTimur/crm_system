package ru.crm.taxi.dao.impl;

import org.springframework.stereotype.Repository;
import ru.crm.taxi.dao.interfaces.AddressDao;
import ru.crm.taxi.model.Address;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class AddressDaoImpl implements AddressDao {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void saveAddress(Address address) {
        em.persist(address);
    }

    @Override
    public boolean addressExistenceById(long id) {
        List<Address> address = em.createQuery("from Address a where a.id = :id")
                .setParameter("id", id)
                .getResultList();
        return address.size() > 0;
    }

    @Override
    public Address updateAddress(Address address) {
        Address addressFromDB = em.merge(address);
        return addressFromDB;
    }

    @Override
    public void deleteAddress(long id) {
        em.createQuery("delete from Address a where a.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    @Override
    public Address getAddressById(long id) {
        Address address = em.find(Address.class, id);
        return address;
    }

    @Override
    public List<Address> getAllAddresses() {
        List<Address> addresses = em.createQuery("from Address")
                .getResultList();
        return addresses;
    }
}
