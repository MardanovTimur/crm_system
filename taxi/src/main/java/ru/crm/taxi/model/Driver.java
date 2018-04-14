package ru.crm.taxi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "t_driver")
public class Driver {
    @Id
    @GenericGenerator(name = "dr_id", strategy = "increment")
    @GeneratedValue(generator = "dr_id")
    private long id;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Column(name = "auto_model")
    private String autoModel;
    @Column(name = "auto_number")
    private String autoNumber;
    @Column(name = "auto_colour")
    private String autoColour;
    @Column(name = "auto_year")
    private Date autoYear;
    @Column(name = "refusing_count", columnDefinition = "int default 0")
    private int refusingCount;
    @Column(name = "penalty_count", columnDefinition = "int default 0")
    private int penaltyCount;

    public Driver() {

    }

    public Driver(Builder builder) {
        this.user = builder.user;
        this.id = builder.id;
        this.autoModel = builder.autoModel;
        this.autoNumber = builder.autoNumber;
        this.autoColour = builder.autoColour;
        this.autoYear = builder.autoYear;
        this.refusingCount = builder.refusingCount;
        this.penaltyCount = builder.penaltyCount;
    }

    @Override
    public String toString(){
        return this.user.getFirstName() + " " + this.user.getSecondName();
    }

    public long getId() {
        return id;
    }

    public void setId(long driverId) {
        this.id = driverId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public int getRefusingCount() {
        return refusingCount;
    }

    public void setRefusingCount(int refusingCount) {
        this.refusingCount = refusingCount;
    }

    public int getPenaltyCount() {
        return penaltyCount;
    }

    public void setPenaltyCount(int penaltyCount) {
        this.penaltyCount = penaltyCount;
    }

    public static class Builder {
        private long id;
        private User user;
        private String autoModel;
        private String autoNumber;
        private String autoColour;
        private Date autoYear;
        private int refusingCount;
        private int penaltyCount;

        public Builder id(long arg) {
            id = arg;
            return this;
        }

        public Builder user(User arg) {
            user = arg;
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

        public Builder refusingCount(int arg) {
            refusingCount = arg;
            return this;
        }

        public Builder penaltyCount(int arg) {
            penaltyCount = arg;
            return this;
        }

        public Driver build() {
            return new Driver(this);
        }
    }
}
