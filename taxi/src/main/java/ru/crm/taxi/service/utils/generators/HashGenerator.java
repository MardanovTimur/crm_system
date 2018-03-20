package ru.crm.taxi.service.utils.generators;

public interface HashGenerator {

    String encode(String password);

    boolean match(String rawPassword, String encodedPassword);
}
