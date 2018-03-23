package ru.crm.taxi.dto;

import java.sql.Date;

public class DriverDto {
    private String firstName;
    private String middleName;
    private String secondName;
    private String phoneNumber;
    private String password;
    private String autoModel;
    private String autoNumber;
    private String autoColour;
    private Date autoYear;

    public DriverDto() {

    }

    public DriverDto(Builder builder) {
        this.firstName = builder.firstName;
        this.middleName = builder.middleName;
        this.secondName = builder.secondName;
        this.phoneNumber = builder.phoneNumber;
        this.password = builder.password;
        this.autoModel = builder.autoModel;
        this.autoNumber = builder.autoNumber;
        this.autoColour = builder.autoColour;
        this.autoYear = builder.autoYear;
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

    public String getAutoModel() {
        return autoModel;
    }

    public String getAutoNumber() {
        return autoNumber;
    }

    public String getAutoColour() {
        return autoColour;
    }

    public Date getAutoYear() {
        return autoYear;
    }

    public static class Builder {
        private String firstName;
        private String middleName;
        private String secondName;
        private String phoneNumber;
        private String password;
        private String autoModel;
        private String autoNumber;
        private String autoColour;
        private Date autoYear;

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

        public Builder autoModel(String arg) {
            autoModel = arg;
            return this;
        }

        public Builder autoNumber(String arg) {
            autoNumber = arg;
            return this;
        }

        public Builder autoColour(String arg) {
            autoColour = arg;
            return this;
        }

        public Builder autoYear(Date arg) {
            autoYear = arg;
            return this;
        }

        public DriverDto build() {
            return new DriverDto(this);
        }
    }
}
