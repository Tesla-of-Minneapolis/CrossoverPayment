package com.ironyard;

import jodd.json.JsonParser;
import jodd.json.JsonSerializer;
import spark.Spark;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {

    //to store cart data
    public static HashMap<Integer, Integer> cartHashMap = new HashMap<>();
    //to store site inventory
    public static ArrayList<Tesla> productList = new ArrayList<>();


    public static void main(String[] args) throws FileNotFoundException {

        //parse csv into an arraylist
        File f = new File ("RawCarData.csv");
        Scanner csvRead = new Scanner (f);

        while (csvRead.hasNext()){
            String teslaFile = csvRead.nextLine();
            String [] variables = teslaFile.split(",");

            //constructor for product
            Tesla tesla = new Tesla (Integer.parseInt(variables[0]),
                    variables[1], variables[2], Integer.parseInt(variables[3]), variables[4],
                    variables[5], variables[6], Double.parseDouble(variables[7]));

            productList.add(tesla);
        }//end while loop to parse raw data

        Spark.init();

        /* User clicks "see details" on the Home Page, they arrive at "/api/products"
        Data to deliver:  data available for pull */
        Spark.get(
                "/api/products",

                ((request, response) -> {
                    String id = request.queryParams("id");

                    //if a certain product is selected, push that product info
                    if(id != null){
                        Tesla temp = new Tesla();
                        int x = Integer.parseInt(id);

                        for(Tesla t : productList){
                            if(t.id == x){
                                temp = t;
                            }
                            //serialize temp into JSON string
                            JsonSerializer serializer = new JsonSerializer();
                            String json = serializer.include("*").serialize(temp);
                            //return that JSON string
                            return json;
                        }
                    }
                    //if selection is "null," the push all product info

                        //serialize temp into JSON string
                        JsonSerializer serializer = new JsonSerializer();
                        String json = serializer.include("*").serialize(productList);
                        //return that JSON string
                        return json;
                })
        );//end Spark.get /api/products

        Spark.post(
                "/api/addProduct",
                ((request, response) -> {

                    String id = request.queryParams("id");
                    int idId = Integer.parseInt(id);

                    cartHashMap.put(idId,1);

                    return "";
                })
        );//end Spark.post /api/addProduct

        Spark.post(
                "/api/removeProduct",
                ((request, response) -> {
                    int id = Integer.valueOf(request.queryParams("id"));
                    cartHashMap.remove(id);

                    return "";
                })
        );//end Spark.post /api/removeProduct

        Spark.post(
                "/api/adjustQuantity",
                ((request, response) -> {
                    String adjustQuantity = request.queryParams("adjustQuantity");
                    int id = Integer.valueOf(request.queryParams("id"));

                    int quantity = Integer.parseInt(adjustQuantity);

                    cartHashMap.remove(id);
                    cartHashMap.put(id,quantity);

                    return "";
                })
        );//end Spark.post api/adjustQuantity

        Spark.get(
                "/api/cart",
                ((request, response) -> {
                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(cartHashMap);
                    return json;
                })
        );

        //testing purposes
        Spark.get(
                "/api/hello",
                ((request, response) -> {
                    return "Hello World!";
                })
        );//end "/api/hello"


        /*  User clicks "selection button" on specific car, they arrive at "/api/cart"
        Data to deliver: summary of: make, model, year, engine, exteriorColor, interiorColor, price with a price total
         *ALSO NEED TAX API (zip code entry from user, ENTERED INTO A TEXT FIELD)   */
        Spark.get(
                "/api/tax",
                ((request, response) -> {

                    String stringZipCode = request.queryParams("zipCode");

                   /* double taxRate = Double.parseDouble(stringZipCode);

                    String id = request.queryParams("id");

                    double subtotal = Double.parseDouble(id);
                    double tax = subtotal * taxRate;
                    double total = tax + subtotal; */

                   double total = 0;

                   for(Map.Entry<Integer,Integer> entry: cartHashMap.entrySet()) {
                       Integer productId = entry.getKey();
                       Integer productQuantity = entry.getValue();

                       Tesla x = new Tesla();
                       for(Tesla temp:productList) {
                           if(temp.id == productId) {
                               x=temp;
                           }
                       }
                       total = x.getPrice() * productQuantity;
                   }

                    URL taxUrl = new URL("https://taxrates.api.avalara.com:443/postal?country=usa&postal=" + stringZipCode +
                            "&apikey=iUrLhXV%2BczAz9D1bIw3DKkHehBBTZAjDySIQrNcCOQ9UwjJgt%2BWLDETEQSVsObY5q22uv6NZ46T5XsUxA5oJ%2Fw%3D%3D");
                    URLConnection uc = taxUrl.openConnection();
                    BufferedReader in = new BufferedReader(new InputStreamReader(uc.getInputStream()));

                    StringBuilder sb = new StringBuilder();
                    while(in.ready()) {
                        sb.append(in.readLine());
                    }

                    JsonParser parser = new JsonParser();
                    TaxListing listing = parser.parse(sb.toString(), TaxListing.class);
                    listing.setTotalRate(total);

                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(listing);
                    return json;

                }));//end /api/tax

    }//end main()

}//end class Main