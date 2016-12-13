package com.ironyard;

/**
 * Created by dlocke on 12/13/16.
 */

public class Tax {
    double rate;
    String name;
    String type;

    public Tax(){}

    public Tax(double rate, String name, String type){
        this.rate = rate;
        this.name = name;
        this.type = type;

    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
