package ru.crm.taxi.dto;

import ru.crm.taxi.model.Address;
import ru.crm.taxi.model.Driver;
import ru.crm.taxi.model.User;

public class OrderDto {
    private Address addressFrom;
    private Address addressTo;
    private long userId;
    private long driverId;
    private double distance;
    private int cost;
    private String comment;

    public OrderDto() {

    }

    public OrderDto(Builder builder) {
        this.addressFrom = builder.addressFrom;
        this.addressTo = builder.addressTo;
        this.userId = builder.userId;
        this.driverId = builder.driverId;
        this.distance = builder.distance;
        this.cost = builder.cost;
        this.comment = builder.comment;
    }

    public Address getAddressFrom() {
        return addressFrom;
    }

    public Address getAddressTo() {
        return addressTo;
    }

    public long getUserId() {
        return userId;
    }

    public long getDriverId() {
        return driverId;
    }

    public double getDistance() {
        return distance;
    }

    public int getCost() {
        return cost;
    }

    public String getComment() {
        return comment;
    }

    public static class Builder {
        private Address addressFrom;
        private Address addressTo;
        private long userId;
        private long driverId;
        private double distance;
        private int cost;
        private String comment;

        public Builder addressFrom(Address arg) {
            addressFrom = arg;
            return this;
        }

        public Builder addressTo(Address arg) {
            addressTo = arg;
            return this;
        }

        public Builder userId(long arg) {
            userId = arg;
            return this;
        }

        public Builder driverId(long arg) {
            driverId = arg;
            return this;
        }

        public Builder distance(double arg) {
            distance = arg;
            return this;
        }

        public Builder cost(int arg) {
            cost = arg;
            return this;
        }

        public Builder comment(String arg) {
            comment = arg;
            return this;
        }

        public OrderDto build() {
            return new OrderDto(this);
        }
    }
}
