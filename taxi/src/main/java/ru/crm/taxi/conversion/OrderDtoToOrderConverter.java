package ru.crm.taxi.conversion;

import ru.crm.taxi.dto.OrderDto;
import ru.crm.taxi.model.Order;

public class OrderDtoToOrderConverter {
    private static volatile OrderDtoToOrderConverter instance;

    public static OrderDtoToOrderConverter getInstance() {
        OrderDtoToOrderConverter localInstance = instance;
        if (localInstance == null) {
            synchronized (OrderDtoToOrderConverter.class) {
                localInstance = instance;
                if (localInstance == null) {
                    instance = localInstance = new OrderDtoToOrderConverter();
                }
            }
        }
        return localInstance;
    }

    public Order.Builder convert(OrderDto orderDto, Order.Builder builder) {
        return builder
                .addressFrom(orderDto.getAddressFrom())
                .addressTo(orderDto.getAddressTo())
                .distance(orderDto.getDistance())
                .cost(orderDto.getCost())
                .comment(orderDto.getComment());
    }
}
