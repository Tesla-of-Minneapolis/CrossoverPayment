package com.ironyard;

/**
 * Created by dlocke on 12/12/16.
 */

public class Tesla {

    //variable
    int id;
    String image;
    String model;
    int year;
    String engine;
    String exteriorColor;
    String interiorColor;
    Double price;


    public Tesla(int id, String image, String model, int year, String engine, String exteriorColor, String interiorColor, Double price) {
        this.id = id;
        this.image = image;
        this.model = model;
        this.year = year;
        this.engine = engine;
        this.exteriorColor = exteriorColor;
        this.interiorColor = interiorColor;
        this.price = price;
    }

    public Tesla (){

    }
}
