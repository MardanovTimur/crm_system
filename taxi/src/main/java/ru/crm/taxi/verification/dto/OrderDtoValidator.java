package ru.crm.taxi.verification.dto;

import ru.crm.taxi.dto.OrderDto;
import ru.crm.taxi.exception.IncorrectDataException;
import ru.crm.taxi.model.Address;

public class OrderDtoValidator {
    private static volatile OrderDtoValidator instance;

    public static OrderDtoValidator getInstance() {
        OrderDtoValidator localInstance = instance;
        if (localInstance == null) {
            synchronized (OrderDtoValidator.class) {
                localInstance = instance;
                if (localInstance == null) {
                    instance = localInstance = new OrderDtoValidator();
                }
            }
        }
        return localInstance;
    }

    public void verify(OrderDto orderDto) {
        verifyAddress(orderDto.getAddressFrom());
        verifyAddress(orderDto.getAddressTo());
        if (!(orderDto.getDistance() > 0)) {
            throw new IncorrectDataException("distance", "Incorrect distance");
        }
        if (!(orderDto.getCost() > 0)) {
            throw new IncorrectDataException("cost", "Incorrect cost");
        }
    }

    public void verifyAddress(Address address) {
        if (!(address.getHouse() >= 0)) {
            throw new IncorrectDataException("house", "Incorrect house");
        }
        if (!(address.getStreet() != null && address.getStreet().length() != 0)) {
            throw new IncorrectDataException("street", "Incorrect street");
        }
    }
}
