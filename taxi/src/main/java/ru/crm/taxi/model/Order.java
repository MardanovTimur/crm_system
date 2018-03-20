package ru.crm.taxi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "t_order")
public class Order {
    @Id
    @GenericGenerator(name="or_id" , strategy="increment")
    @GeneratedValue(generator="or_id")
    private long id;
    @ManyToOne
    @JoinColumn(name = "address_from", nullable = false)
    private Address addressFrom;
    @ManyToOne
    @JoinColumn(name = "address_to", nullable = false)
    private Address addressTo;
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;
    @ManyToOne
    private Driver driver;
    private double distance;
    private int cost;
    @Column(name = "user_rating")
    private int userRating;
    @Column(name = "driver_rating")
    private int driverRating;
    private String comment;

    public Order() {

    }

    public Order(Builder builder) {
        this.id = builder.id;
        this.addressFrom = builder.addressFrom;
        this.addressTo = builder.addressTo;
        this.user = builder.user;
        this.driver = builder.driver;
        this.distance = builder.distance;
        this.cost = builder.cost;
        this.userRating = builder.userRating;
        this.driverRating = builder.driverRating;
        this.comment = builder.comment;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public static class Builder {
        private long id;
        private Address addressFrom;
        private Address addressTo;
        private User user;
        private Driver driver;
        private double distance;
        private int cost;
        private int userRating;
        private int driverRating;
        private String comment;

        public Builder id(long arg) {
            id = arg;
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

        public Builder comment(String arg) {
            comment = arg;
            return this;
        }
        
        public Order build() {
            return new Order(this);
        }
    }
}
