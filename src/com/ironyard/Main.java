package com.ironyard;

import spark.Spark;
import spark.template.mustache.MustacheTemplateEngine;

public class Main {

    public static void main(String[] args) {

        Spark.init();

        Spark.get(
                "/api/hello",
                ((request, response) -> {

                    return "Hello World!";
                })
                //new MustacheTemplateEngine()
        );

    }
}
