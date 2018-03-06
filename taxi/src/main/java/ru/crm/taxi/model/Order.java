package ru.crm.taxi.model;

public class Order {
    private long orderId;
    private Address addressFrom;
    private Address addressTo;
    private User user;
    private Driver driver;
    private double distance;
    private int cost;
    private int userRating;
    private int driverRating;

    public Order() {

    }

    public Order(Builder builder) {
        this.orderId = builder.orderId;
        this.addressFrom = builder.addressFrom;
        this.addressTo = builder.addressTo;
        this.user = builder.user;
        this.driver = builder.driver;
        this.distance = builder.distance;
        this.cost = builder.cost;
        this.userRating = builder.userRating;
        this.driverRating = builder.driverRating;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public Address getAddressFrom() {
        return addressFrom;
    }

    public void setAddressFrom(Address addressFrom) {
        this.addressFrom = addressFrom;
    }

    public Address getAddressTo() {
        return addressTo;
    }

    public void setAddressTo(Address addressTo) {
        this.addressTo = addressTo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getUserRating() {
        return userRating;
    }

    public void setUserRating(int userRating) {
        this.userRating = userRating;
    }

    public int getDriverRating() {
        return driverRating;
    }

    public void setDriverRating(int driverRating) {
        this.driverRating = driverRating;
    }

    public static class Builder {
        private long orderId;
        private Address addressFrom;
        private Address addressTo;
        private User user;
        private Driver driver;
        private double distance;
        private int cost;
        private int userRating;
        private int driverRating;

        public Builder orderId(long arg) {
            orderId = arg;
            return this;
        }

        public Builder addressFrom(Address arg) {
            addressFrom = arg;
            return this;
        }

        public Builder addressTo(Address arg) {
            addressTo = arg;
            return this;
        }

        public Builder user(User arg) {
            user = arg;
            return this;
        }

        public Builder driver(Driver arg) {
            driver = arg;
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

        public Builder userRating(int arg) {
            userRating = arg;
            return this;
        }

        public Builder driverRating(int arg) {
            driverRating = arg;
            return this;
        }
        
        public Order build() {
            return new Order(this);
        }
    }
}
