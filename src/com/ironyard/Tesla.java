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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getEngine() {
        return engine;
    }

    public void setEngine(String engine) {
        this.engine = engine;
    }

    public String getExteriorColor() {
        return exteriorColor;
    }

    public void setExteriorColor(String exteriorColor) {
        this.exteriorColor = exteriorColor;
    }

    public String getInteriorColor() {
        return interiorColor;
    }

    public void setInteriorColor(String interiorColor) {
        this.interiorColor = interiorColor;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
