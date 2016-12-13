package com.ironyard;

import java.util.ArrayList;

/**
 * Created by dlocke on 12/13/16.
 */
public class TaxListing {
    double totalRate;
    ArrayList<Tax> rates;

    public TaxListing(){

    }

    public double getTotalRate() {
        return totalRate;
    }

    public void setTotalRate(double totalRate) {
        this.totalRate = totalRate;
    }

    public ArrayList<Tax> getRates() {
        return rates;
    }

    public void setRates(ArrayList<Tax> rates) {
        this.rates = rates;
    }
}
