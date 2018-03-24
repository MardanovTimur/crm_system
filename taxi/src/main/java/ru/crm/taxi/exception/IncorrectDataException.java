package ru.crm.taxi.exception;

/**
 * Created by Kamil Karimov on 18.11.2016.
 */
public class IncorrectDataException extends RuntimeException {
    public IncorrectDataException(String string){
        super(string);
    }
}
