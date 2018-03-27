"use strict";

let async = require("async");
let twitter = require("../modules/twitter");
let errorLib = require("../libs/error");
require("dotenv").config();

module.exports = {
  getTwitterData
};

function getTwitterData(event, context, callback) {
  console.log("getTwitterData", event.queryStringParameters);
  let response = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };

  //Error handling/validation
  let requiredArgs = [];
  let queryParams = event.queryStringParameters;
  if (!queryParams.search) requiredArgs.push("search");
  if (!queryParams.count) requiredArgs.push("count");
  if (requiredArgs.length) {
    response.body = JSON.stringify({
      message: errorLib.getErrorString(requiredArgs)
    });
    response.statusCode = 400;
    callback(null, response);
    return;
  }

  //Get Data
  let session = twitter.initSession();
  async.series(
    [
      async.apply(
        twitter.search,
        session,
        queryParams.search,
        queryParams.count
      )
    ],
    (error, results) => {
      if (error) {
        console.error(error);
        response.statusCode = 404;
        response.body = JSON.stringify(error);
        callback(response);
        return;
      }
      response.statusCode = 200;
      response.body = JSON.stringify(results[0]);
      callback(null, response);
    }
  );
}
