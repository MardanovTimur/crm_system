DROP TABLE IF EXISTS t_user CASCADE;
DROP TABLE IF EXISTS t_driver CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS t_order CASCADE;

CREATE TABLE t_user (
  user_id       BIGSERIAL,
  auth_token    VARCHAR UNIQUE,
  hash_password VARCHAR NOT NULL,
  first_name    VARCHAR,
  middle_name   VARCHAR,
  second_name   VARCHAR,
  phone_number  VARCHAR UNIQUE NOT NULL,
  rating        FLOAT DEFAULT 0,
  user_role     VARCHAR NOT NULL,
  count_rating  INT   DEFAULT 0,
  count_order   INT   DEFAULT 0,
  PRIMARY KEY (user_id)
);

CREATE TABLE t_driver (
  driver_id   BIGSERIAL,
  user_id     BIGINT NOT NULL,
  auto_model  VARCHAR NOT NULL,
  auto_number VARCHAR NOT NULL,
  auto_colour VARCHAR NOT NULL,
  auto_year   DATE,
  PRIMARY KEY (driver_id)
);

CREATE TABLE address (
  address_id BIGSERIAL,
  street     VARCHAR NOT NULL,
  house      INT     NOT NULL,
  housing    INT,
  PRIMARY KEY (address_id)
);

CREATE TABLE t_order (
  order_id            BIGSERIAL,
  address_from        BIGINT NOT NULL,
  address_to          BIGINT NOT NULL,
  order_user          BIGINT NOT NULL,
  order_driver        BIGINT NOT NULL,
  order_distance      FLOAT NOT NULL,
  order_cost          INT   NOT NULL,
  order_user_rating   INT,
  order_driver_rating INT,
  PRIMARY KEY (order_id)
);

ALTER TABLE t_driver
  ADD CONSTRAINT fk_1 FOREIGN KEY (user_id) REFERENCES t_user (user_id);
ALTER TABLE t_order
  ADD CONSTRAINT fk_1 FOREIGN KEY (address_from) REFERENCES address (address_id);
ALTER TABLE t_order
  ADD CONSTRAINT fk_2 FOREIGN KEY (address_to) REFERENCES address (address_id);
ALTER TABLE t_order
  ADD CONSTRAINT fk_3 FOREIGN KEY (order_user) REFERENCES t_user (user_id);
ALTER TABLE t_order
  ADD CONSTRAINT fk_4 FOREIGN KEY (order_driver) REFERENCES t_driver (driver_id);
