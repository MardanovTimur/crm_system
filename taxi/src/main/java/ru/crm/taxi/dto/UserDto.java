package ru.crm.taxi.dto;

public class UserDto {
    private String firstName;
    private String middleName;
    private String secondName;
    private String phoneNumber;
    private String password;

    public UserDto() {

    }

    public UserDto(Builder builder) {
        this.firstName = builder.firstName;
        this.middleName = builder.middleName;
        this.secondName = builder.secondName;
        this.phoneNumber = builder.phoneNumber;
        this.password = builder.password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getSecondName() {
        return secondName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public static class Builder {
        private String firstName;
        private String middleName;
        private String secondName;
        private String phoneNumber;
        private String password;

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

        public Builder password(String arg) {
            password = arg;
            return this;
        }

        public UserDto build() {
            return new UserDto(this);
        }
    }
}
