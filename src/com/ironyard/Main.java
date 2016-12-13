package com.ironyard;

import jodd.json.JsonSerializer;
import spark.Spark;
import java.util.ArrayList;

public class Main {


    public static ArrayList<Tesla> cart = new ArrayList<>();

    public static void main(String[] args) {

        //parse csv into an arraylist
        ArrayList<Tesla> productList = new ArrayList<>();

        Spark.init();

        /* User clicks "see details" on Cars on the Home Page, they arrive at "/api/cars"
        Data to deliver: car data available for pull */
        Spark.get(
                "/api/cars",

                ((request, response) -> {
                    int id = Integer.valueOf(request.queryParams("id"));

                    Tesla temp = new Tesla();

                    for(Tesla t : productList){
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
        //end "/api/cars"

        /* User clicks "see details" on Energy on the Home Page, they arrive at "/api/energy"
        Data to deliver: energy data available for pull  */
        Spark.get(
                "/api/energy",
                ((request, response) -> {
                    return "energy";
                })
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

//        Spark.get(
//                "/api/cars",
//
//                ((request, response) -> {
//                    int id = Integer.valueOf(request.queryParams("id"));
//                    Tesla x = cart.get(id);
//                    cart.add(x);
//                    response.redirect("/");
//                    return "";
//                })
//        );

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
