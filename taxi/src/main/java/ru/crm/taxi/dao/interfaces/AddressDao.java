package ru.crm.taxi.dao.interfaces;

import ru.crm.taxi.model.Address;

import java.util.List;

public interface AddressDao {

    void saveAddress(Address address);

    void updateAddress(Address address);

    void updateAddress(Address address, long id);

    void deleteAddress(long id);

    Address getAddressById(long id);

    List<Address> getAllAddresses();
}
