package ru.crm.taxi.model;

public class User {
    private long userId;
    private String authToken;
    private String hashPassword;
    private String firstName;
    private String middleName;
    private String secondName;
    private String phoneNumber;
    private double rating;
    private String role;
    private int countRating;
    private int countOrder;

    public User() {

    }

    public User(Builder builder) {
        this.userId = builder.userId;
        this.authToken = builder.authToken;
        this.hashPassword = builder.hashPassword;
        this.firstName = builder.firstName;
        this.middleName = builder.middleName;
        this.secondName = builder.secondName;
        this.phoneNumber = builder.phoneNumber;
        this.rating = builder.rating;
        this.role = builder.role;
        this.countRating = builder.countRating;
        this.countOrder = builder.countOrder;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
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

    public int getCountRating() {
        return countRating;
    }

    public void setCountRating(int countRating) {
        this.countRating = countRating;
    }

    public int getCountOrder() {
        return countOrder;
    }

    public void setCountOrder(int countOrder) {
        this.countOrder = countOrder;
    }

    public static class Builder {
        private long userId;
        private String authToken;
        private String hashPassword;
        private String firstName;
        private String middleName;
        private String secondName;
        private String phoneNumber;
        private double rating;
        private String role;
        private int countRating;
        private int countOrder;

        public Builder userId(long arg) {
            userId = arg;
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

        public Builder countRating(int arg) {
            countRating = arg;
            return this;
        }

        public Builder countOrder(int arg) {
            countOrder = arg;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}
