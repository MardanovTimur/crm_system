package ru.crm.taxi.conversion;

import org.springframework.stereotype.Component;
import ru.crm.taxi.dto.DriverDto;
import ru.crm.taxi.dto.OrderDto;
import ru.crm.taxi.dto.UserDto;
import ru.crm.taxi.model.Driver;
import ru.crm.taxi.model.Order;
import ru.crm.taxi.model.User;

@Component
public class ConversionResultFactory {

    public User userDtoToUser(String hashPassword, UserDto userDto) {
        User.Builder builder = new User.Builder();
        builder = UserDtoToUserConverter.getInstance().convert(hashPassword, userDto, builder);
        return builder.build();
    }

    public Driver driverDtoToDriver(String hashPassword, DriverDto driverDto) {
        Driver.Builder builder = new Driver.Builder();
        builder = DriverDtoToDriverConverter.getInstance().convert(hashPassword, driverDto, builder);
        return builder.build();
    }

    public Order orderDtoToOrder(OrderDto orderDto) {
        Order.Builder builder = new Order.Builder();
        builder = OrderDtoToOrderConverter.getInstance().convert(orderDto, builder);
        return builder.build();
    }
}
