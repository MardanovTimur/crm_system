package ru.crm.taxi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "address")
public class Address {
    @Id
    @GenericGenerator(name = "adr_id", strategy = "increment")
    @GeneratedValue(generator = "adr_id")
    private long id;
    @Column(nullable = false)
    private String street;
    @Column(nullable = false)
    private int house;
    @Column
    private int housing;

    public Address() {

    }

    public Address(Builder builder) {
        this.id = builder.id;
        this.street = builder.street;
        this.house = builder.house;
        this.housing = builder.housing;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public int getHouse() {
        return house;
    }

    public void setHouse(int house) {
        this.house = house;
    }

    public int getHousing() {
        return housing;
    }

    public void setHousing(int housing) {
        this.housing = housing;
    }

    public static class Builder {
        private long id;
        private String street;
        private int house;
        private int housing;

        public Builder id(long arg) {
            id = arg;
            return this;
        }

        public Builder street(String arg) {
            street = arg;
            return this;
        }

        public Builder house(int arg) {
            house = arg;
            return this;
        }

        public Builder housing(int arg) {
            housing = arg;
            return this;
        }

        public Address build() {
            return new Address(this);
        }
    }
}
