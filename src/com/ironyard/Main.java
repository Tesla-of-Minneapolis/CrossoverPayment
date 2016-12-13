package com.ironyard;

import jodd.json.JsonParser;
import jodd.json.JsonSerializer;
import spark.ModelAndView;
import spark.Spark;
import spark.template.mustache.MustacheTemplateEngine;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class Main {

    public static ArrayList<Tesla> cart = new ArrayList<>();

    public static void main(String[] args) throws FileNotFoundException {

        //parse csv into an arraylist
        File f = new File ("RawCarData.csv");
        Scanner csvRead = new Scanner (f);

        while (csvRead.hasNext()){
            String teslaFile = csvRead.nextLine();
            String [] variables = teslaFile.split(",");
            Tesla tesla = new Tesla (Integer.parseInt(variables[0]),
                    variables[1], variables[2], Integer.parseInt(variables[3]), variables[4],
                    variables[5], variables[6], Double.parseDouble(variables[7]));
            ArrayList<Tesla> productList = new ArrayList<>();
            productList.add(tesla);
        }//end whle loop


        Spark.init();

        /* User clicks "see details" on Cars on the Home Page, they arrive at "/api/cars"
        Data to deliver: car data available for pull */
        Spark.get(
                "/api/products",

                ((request, response) -> {
                    int id = Integer.valueOf(request.queryParams("id"));

                    Tesla temp = new Tesla();

                    for(Tesla t : cart){
                        if(t.id == id){
                            temp = t;
                        }
                    }
                    //serialize temp into JSON string
                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(temp);
                    //return that JSON string
                    return json;
                })
        );
<<<<<<< HEAD
        //end "/api/products"
=======
        //end "/api/cars"

<<<<<<< HEAD
        /* User clicks "see details" on Energy on the Home Page, they arrive at "/api/energy"
        Data to deliver: energy data available for pull  */
        Spark.get(
                "/api/energy",
                ((request, response) -> {
                    int id = Integer.valueOf(request.queryParams("id"));
                    Energy powerWall = cart.get(id);
                    cart.add(powerWall);
                    return "energy";
                }),
                new MustacheTemplateEngine()
        );//end "/api/energy"


>>>>>>> c1ce9a2a2061ecb2a4f490aab7f689366634428c
=======
>>>>>>> b76425b346972befd50a48e2a1ba13f844abc1fb

        /*  GILBERT:
        User clicks "selection button" on specific car on the car page, they arrive at "/api/cart"
        Data to deliver: summary of: make, model, year, engine, exteriorColor, interiorColor, price
         with a price total
         ****ALSO NEED TAX API (zip code entry from user, ENTERED INTO A TEXT FIELD)******   */
//        Spark.get(
//                "/api/cart",
//                ((request, response) -> {
//                    String stringZipCode = request.queryParams("zipCode");
//                    URL taxUrl = new URL("https://taxrates.api.avalara.com:443/postal?country=usa&postal=" + stringZipCode + "&apikey=iUrLhXV%2BczAz9D1bIw3DKkHehBBTZAjDySIQrNcCOQ9UwjJgt%2BWLDETEQSVsObY5q22uv6NZ46T5XsUxA5oJ%2Fw%3D%3D");
//                    URLConnection uc = taxUrl.openConnection();
//                    BufferedReader in = new BufferedReader(new InputStreamReader(uc.getInputStream()));
//                    String inputLine = in.readLine();
//
//                    System.out.println(inputLine);
//
//                    JsonParser parser = new JsonParser();
//                    TaxListing listing = parser.parse(inputLine, TaxListing.class);
//
//                    HashMap m = new HashMap();
//                    m.put("zipCode", stringZipCode);
//                    m.put("rates", listing.getRates());
//                    return new ModelAndView(m, );
//
//                }),
//                new MustacheTemplateEngine()
//        );


        /*  User enters zip code AND clicks "buy now" on cart page, they arrive at "/api/confirmation"
        Data to deliver:  Review summary
         */
        Spark.get(
                "/api/confirmation",
                ((request, response) -> {
                    return "confirmation";
                })
        );//end "/api/confirmation"

        Spark.post(
                "/api/addProduct",
                ((request, response) -> {
                    int id = Integer.valueOf(request.queryParams("id"));
                    Tesla x = cart.get(id);
                    cart.add(x);

                    response.redirect("/");
                    return "";
                })
        );//end Spark.post /api/addProduct

        Spark.post(
                "/api/removeProduct",
                ((request, response) -> {
                    int id = Integer.valueOf(request.queryParams("id"));
                    Tesla x = cart.get(id);
                    cart.remove(x);

                    response.redirect("/");
                    return "";
                })
        );//end Spark.post /api/removeProduct

        Spark.get(
                "/api/hello",
                ((request, response) -> {
                    return "Hello World!";
                })
        );//end "/api/hello"


        /*  EXAMPLE CODE FOR JSON FILES **********
        Spark.get(
               "/json",
               ((request, response) -> {
                   String replyId = request.queryParams("replyId");
                   int replyIdNum = -1;
                   if (replyId != null) {
                       replyIdNum = Integer.parseInt(replyId);
                   }

                   ArrayList<Message> threads = new ArrayList<>();
                   for (Message message : messages) {
                       if (message.replyId == replyIdNum) {
                           threads.add(message);
                       }
                   }
                   JsonSerializer serializer = new JsonSerializer();
                   String json = serializer.include("*").serialize(threads);
                   return json;



         EXAMPLE FOR PULLING TAX API

         Spark.get(
               "/holiday",
               ((request, response) -> {
                   String year = request.queryParams("year");
                   String month = request.queryParams("month");
                   URL holidayUrl = new URL("https://holidayapi.com/v1/holidays?key=8a7a3b21-37f9-49c8-9e72-fc9a6f72eedb&country=US&year=" + year + "&month=" + month);
                   URLConnection uc = holidayUrl.openConnection();
                   BufferedReader in = new BufferedReader(new InputStreamReader(uc.getInputStream()));
                   String inputLine = in.readLine();


                   System.out.println(inputLine);

                   JsonParser parser = new JsonParser();
                   HolidayListing listing = parser.parse(inputLine, HolidayListing.class);


                   HashMap m = new HashMap();
                   m.put("month", month);
                   m.put("year", year);
                   m.put("holidays", listing.getHolidays());
                   return new ModelAndView(m, "holiday.html");
               }),
               new MustacheTemplateEngine()
       );
         */

    }//end main()

}//end class Main
