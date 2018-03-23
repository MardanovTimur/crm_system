package ru.crm.taxi.dto;

public class AuthDto {
    private String phoneNumber;
    private String password;

    public AuthDto() {

    }

    public AuthDto(Builder builder) {
        this.phoneNumber = builder.phoneNumber;
        this.password = builder.password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public static class Builder {
        private String phoneNumber;
        private String password;

        public Builder phoneNumber(String arg) {
            phoneNumber = arg;
            return this;
        }

        public Builder password(String arg) {
            password = arg;
            return this;
        }

        public AuthDto build() {
            return new AuthDto(this);
        }
    }
}
