// Generated by CoffeeScript 1.12.6
(function() {
  var Mollie, mollie;

  Mollie = require("../lib/mollie");


  /*
  	Initialize the Mollie API library with your API key.
  	See: https://www.mollie.com/beheer/account/profielen/
   */

  mollie = new Mollie.API.Client();

  mollie.setApiKey("test_b93kfaAsnngIAT3NysojhYvKEJ5YbP");

  module.exports = mollie;

}).call(this);
