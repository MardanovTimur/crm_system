package ru.crm.taxi.dao.interfaces;

import ru.crm.taxi.model.Address;

import java.util.List;

public interface AddressDao {

    void saveAddress(Address address);

    boolean addressExistenceById(long id);

    Address updateAddress(Address address);

    void deleteAddress(long id);

    Address getAddressById(long id);

    List<Address> getAllAddresses();
}
