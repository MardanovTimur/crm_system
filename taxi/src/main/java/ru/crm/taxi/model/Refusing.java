package ru.crm.taxi.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "order_refusing")
public class Refusing {
    @Id
    @GenericGenerator(name = "or_id", strategy = "increment")
    @GeneratedValue(generator = "or_id")
    private long id;
    @OneToOne
    private Order order;
    @OneToOne
    private Driver driver;
    private String comment;

    public Refusing() {

    }

    public Refusing(Builder builder) {
        this.id = builder.id;
        this.order = builder.order;
        this.driver = builder.driver;
        this.comment = builder.comment;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public static class Builder {
        private long id;
        private Order order;
        private Driver driver;
        private String comment;

        public Builder id(long arg) {
            id = arg;
            return this;
        }

        public Builder order(Order arg) {
            order = arg;
            return this;
        }

        public Builder driver(Driver arg) {
            driver = arg;
            return this;
        }

        public Builder comment(String arg) {
            comment = arg;
            return this;
        }

        public Refusing build() {
            return new Refusing(this);
        }
    }
}
