package ru.crm.taxi.model;


public class Address {
    private long addressId;
    private String street;
    private int house;
    private int housing;

    public Address() {

    }

    public Address(Builder builder) {
        this.addressId = builder.addressId;
        this.street = builder.street;
        this.house = builder.house;
        this.housing = builder.housing;
    }

    public long getAddressId() {
        return addressId;
    }

    public void setAddressId(long addressId) {
        this.addressId = addressId;
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
        private long addressId;
        private String street;
        private int house;
        private int housing;

        public Builder addressId(long arg) {
            addressId = arg;
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
