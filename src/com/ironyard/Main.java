package com.ironyard;


import spark.Spark;
import spark.template.mustache.MustacheTemplateEngine;
import java.util.ArrayList;

public class Main {

    public static ArrayList<Tesla> cart = new ArrayList<>();

    public static void main(String[] args) {

        Spark.init();

//        Spark.get(
//                "/api/homePage",
//                ((request, response) -> {
//                    return "homePage";
//                })
//        );//end "/api/homePage"

        /* DANNY:
        User clicks "see details" on Cars on the Home Page, they arrive at "/api/cars"
        Data to deliver: image, make, model, year, engine, exteriorColor, interiorColor, price ...
        */
        Spark.get(
                "/api/cars",
                ((request, response) -> {
                    return "cars";
                })
        );//end "/api/cars"

        /* RYAN:
        User clicks "see details" on Energy on the Home Page, they arrive at "/api/energy"
        Data to deliver: size and image
        also an option to go to "api/cart"
        also an option to return to "api/cars"
        */
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



        /*  GILBERT:
        User clicks "selection button" on specific car on the car page, they arrive at "/api/cart"
        Data to deliver: summary of: make, model, year, engine, exteriorColor, interiorColor, price
         with a price total
         ****ALSO NEED TAX API (zip code entry from user, ENTERED INTO A TEXT FIELD)******   */
        Spark.get(
                "/api/cart",
                ((request, response) -> {
                    return "cart";
                })
        );//end "/api/cart"

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
                    String idString = request.queryParams("id");
                    int id = Integer.parseInt(idString);

                    Tesla x = new Tesla();
                    cart.add(x);

                    response.redirect("/");
                    return "";
                })
        );//end Spark.post /api/addProduct

        Spark.post(
                "/api/removeProduct",
                ((request, response) -> {
                    String idString = request.queryParams("id");
                    int id = Integer.parseInt(idString);

                    Tesla tesla = cart.get(id);
                    String removeProduct = request.queryParams("removeProduct");

                    int x = Integer.parseInt(removeProduct);
                    cart.remove(x -1);

                    response.redirect("/");
                    return "";
                })
        );//end Spark.post /api/removeProduct



//        Spark.get(
//                "/api/success",
//                ((request, response) -> {
//                    return "success";
//                })
//        );//end "/api/success"

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
