package ru.crm.taxi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "t_user")
public class User {
    @Id
    @GenericGenerator(name="us_id" , strategy="increment")
    @GeneratedValue(generator="us_id")
    private long id;
    @Column(name = "auth_token", unique = true)
    private String authToken;
    @Column(name = "hash_password", nullable = false)
    private String hashPassword;
    @Column(name = "first_name", length = 40)
    private String firstName;
    @Column(name = "middle_name", length = 40)
    private String middleName;
    @Column(name = "second_name", length = 40)
    private String secondName;
    @Column(name = "phone_number", unique = true, nullable = false, length = 20)
    private String phoneNumber;
    @Column(columnDefinition = "int default 0")
    private double rating;
    @Column(name = "user_role", columnDefinition = "VARCHAR default 'USER'", length = 20, nullable = false)
    private String role;
    @Column(name = "rating_count", columnDefinition = "int default 0")
    private int ratingCount;
    @Column(name = "order_count", columnDefinition = "int default 0")
    private int orderCount;

    public User() {

    }

    public User(Builder builder) {
        this.id = builder.id;
        this.authToken = builder.authToken;
        this.hashPassword = builder.hashPassword;
        this.firstName = builder.firstName;
        this.middleName = builder.middleName;
        this.secondName = builder.secondName;
        this.phoneNumber = builder.phoneNumber;
        this.rating = builder.rating;
        this.role = builder.role;
        this.ratingCount = builder.ratingCount;
        this.orderCount = builder.orderCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long userId) {
        this.id = userId;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    public String getHashPassword() {
        return hashPassword;
    }

    public void setHashPassword(String hashPassword) {
        this.hashPassword = hashPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(int countRating) {
        this.ratingCount = countRating;
    }

    public int getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(int countOrder) {
        this.orderCount = countOrder;
    }

    public static class Builder {
        private long id;
        private String authToken;
        private String hashPassword;
        private String firstName;
        private String middleName;
        private String secondName;
        private String phoneNumber;
        private double rating;
        private String role;
        private int ratingCount;
        private int orderCount;

        public Builder id(long arg) {
            id = arg;
            return this;
        }

        public Builder authToken(String arg) {
            authToken = arg;
            return this;
        }

        public Builder hashPassword(String arg) {
            hashPassword = arg;
            return this;
        }

        public Builder firstName(String arg) {
            firstName = arg;
            return this;
        }

        public Builder middleName(String arg) {
            middleName = arg;
            return this;
        }

        public Builder secondName(String arg) {
            secondName = arg;
            return this;
        }

        public Builder phoneNumber(String arg) {
            phoneNumber = arg;
            return this;
        }

        public Builder rating(double arg) {
            rating = arg;
            return this;
        }

        public Builder role(String arg) {
            role = arg;
            return this;
        }

        public Builder ratingCount(int arg) {
            ratingCount = arg;
            return this;
        }

        public Builder orderCount(int arg) {
            orderCount = arg;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}
