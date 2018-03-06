package ru.crm.taxi.model;

import java.sql.Date;

public class Driver extends User {
    private long driverId;
    private String autoModel;
    private String autoNumber;
    private String autoColour;
    private Date autoYear;

    public Driver() {
        super();
    }

    public Driver(Builder builder) {
        super(builder);
        this.driverId = builder.driverId;
        this.autoModel = builder.autoModel;
        this.autoNumber = builder.autoNumber;
        this.autoColour = builder.autoColour;
        this.autoYear = builder.autoYear;
    }

    public long getDriverId() {
        return driverId;
    }

    public void setDriverId(long driverId) {
        this.driverId = driverId;
    }

    public String getAutoModel() {
        return autoModel;
    }

    public void setAutoModel(String autoModel) {
        this.autoModel = autoModel;
    }

    public String getAutoNumber() {
        return autoNumber;
    }

    public void setAutoNumber(String autoNumber) {
        this.autoNumber = autoNumber;
    }

    public String getAutoColour() {
        return autoColour;
    }

    public void setAutoColour(String autoColour) {
        this.autoColour = autoColour;
    }

    public Date getAutoYear() {
        return autoYear;
    }

    public void setAutoYear(Date autoYear) {
        this.autoYear = autoYear;
    }

    public static class Builder extends User.Builder {
        private long driverId;
        private String autoModel;
        private String autoNumber;
        private String autoColour;
        private Date autoYear;

        public Builder driverId(long arg) {
            driverId = arg;
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

        public Driver build() {
            return new Driver(this);
        }
    }
}
